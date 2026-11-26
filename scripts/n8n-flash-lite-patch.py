import json,re,sys
from pathlib import Path

MODEL='gemini/gemini-3.1-flash-lite-preview'

def patch(workflows):
    changes=[]
    for workflow in workflows:
        count=0
        for node in workflow.get('nodes',[]):
            parameters=node.get('parameters',{})
            if node.get('type')!='n8n-nodes-base.httpRequest': continue
            if parameters.get('url') not in ('http://9router:20128/v1/chat/completions','http://127.0.0.1:20128/v1/chat/completions'): continue
            if workflow.get('active') or workflow.get('activeVersionId'):
                raise ValueError('Published workflow requires separate review: '+workflow.get('name',''))
            body=parameters.get('jsonBody')
            if isinstance(body,str):
                pattern=r'''((?:["']model["']|\bmodel)\s*:\s*)(["'])(gemini/[^"']+)\2'''
                matches=list(re.finditer(pattern,body))
                if len(matches)!=1: raise ValueError('Model expression not recognized: '+workflow.get('name',''))
                parameters['jsonBody']=re.sub(pattern,lambda m:m[1]+m[2]+MODEL+m[2],body)
            elif isinstance(body,dict) and str(body.get('model','')).startswith('gemini/'):
                body['model']=MODEL
            else:
                fields=parameters.get('bodyParameters',{}).get('parameters',[])
                models=[field for field in fields if field.get('name')=='model' and str(field.get('value','')).startswith('gemini/')]
                if len(models)!=1: raise ValueError('Model field not recognized: '+workflow.get('name',''))
                models[0]['value']=MODEL
            count+=1
        if count:
            changes.append(workflow)
            print('WORKFLOW_MODEL_PREPARED='+workflow.get('name','')+' | nodes='+str(count))
    if not changes: raise ValueError('No 9Router chat workflows found; save workflows in n8n first.')
    return changes

if __name__=='__main__':
    source,destination=map(Path,sys.argv[1:3])
    workflows=json.loads(source.read_text())
    if not isinstance(workflows,list): raise SystemExit('WORKFLOW_EXPORT_INVALID')
    try: changed=patch(workflows)
    except ValueError as error: raise SystemExit(str(error))
    destination.write_text(json.dumps(changed,ensure_ascii=False,indent=2))
    destination.chmod(0o600)
    print('WORKFLOWS_PREPARED='+str(len(changed)))
