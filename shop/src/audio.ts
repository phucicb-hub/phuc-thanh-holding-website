export async function processAudio(files:File[], mode:string, threshold:number) {
  const ctx=new AudioContext({sampleRate:44100});
  try {
    const buffers=[];
    for(const file of files) buffers.push(await ctx.decodeAudioData(await file.arrayBuffer()));
    const data:Float32Array[]=[];
    for(const buffer of buffers) {
      const mono=new Float32Array(buffer.length);
      for(let c=0;c<buffer.numberOfChannels;c++){const channel=buffer.getChannelData(c);for(let i=0;i<mono.length;i++)mono[i]+=channel[i]/buffer.numberOfChannels;}
      if(mode==='silence-remover') {
        const chunks=[];const window=2205;
        for(let start=0;start<mono.length;start+=window){const chunk=mono.slice(start,start+window);let sum=0;for(const x of chunk)sum+=x*x;if(Math.sqrt(sum/chunk.length)>threshold)chunks.push(chunk);}
        const result=new Float32Array(chunks.reduce((n,x)=>n+x.length,0));let offset=0;for(const chunk of chunks){result.set(chunk,offset);offset+=chunk.length;}data.push(result);
      } else if(mode==='audio-enhancer') {
        let previous=0,out=0,peak=0;for(let i=0;i<mono.length;i++){const value=mono[i];out=0.985*(out+value-previous);previous=value;mono[i]=out;peak=Math.max(peak,Math.abs(out));}if(peak>0)for(let i=0;i<mono.length;i++)mono[i]*=0.95/peak;data.push(mono);
      } else data.push(mono);
    }
    const length=data.reduce((n,x)=>n+x.length,0);if(!length)throw new Error('Không còn âm thanh sau khi xử lý; hãy giảm ngưỡng cắt.');
    const wav=new ArrayBuffer(44+length*2), view=new DataView(wav);const string=(offset:number,value:string)=>{for(let i=0;i<value.length;i++)view.setUint8(offset+i,value.charCodeAt(i));};
    string(0,'RIFF');view.setUint32(4,36+length*2,true);string(8,'WAVE');string(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,44100,true);view.setUint32(28,88200,true);view.setUint16(32,2,true);view.setUint16(34,16,true);string(36,'data');view.setUint32(40,length*2,true);let offset=44;for(const chunk of data)for(const sample of chunk){view.setInt16(offset,Math.max(-1,Math.min(1,sample))*32767,true);offset+=2;}
    return new Blob([wav],{type:'audio/wav'});
  } finally {await ctx.close();}
}
