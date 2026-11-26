import {mkdtemp,writeFile,readFile,stat,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {failure} from './providers.mjs';
const exec=promisify(execFile);let active=0;
export const mediaTools=new Set(['merge-audio','silence-remover','audio-enhancer','thumbnail-generator']);
export async function processMedia(tool,body,env=process.env){
 if(!mediaTools.has(tool))throw failure(400,'Công cụ media không hợp lệ.');
 if(active>=2)throw failure(429,'Máy chủ đang xử lý file khác; vui lòng thử lại sau.');
 const files=body.files||[];if(!Array.isArray(files)||files.length>6)throw failure(400,'Tối đa 6 file mỗi yêu cầu.');
 const image=tool==='thumbnail-generator';if(!image&&!files.length)throw failure(400,'Chọn file audio.');if(tool!=='merge-audio'&&files.length>1)throw failure(400,'Công cụ chỉ nhận một file.');
 let total=0;const buffers=files.map(f=>{if(!f||typeof f.data!=='string'||! /^[A-Za-z0-9+/]*={0,2}$/.test(f.data)||f.data.length>14000000)throw failure(400,'File không hợp lệ.');if(image?!['image/png','image/jpeg','image/webp'].includes(f.mime):! /^audio\/[\w.+-]+$/.test(f.mime||''))throw failure(400,'Định dạng file không được hỗ trợ.');const data=Buffer.from(f.data,'base64');total+=data.length;return data;});
 if(total>10*1024*1024)throw failure(413,'Tổng file tối đa 10 MB.');
 if(image&&(typeof body.input!=='string'||!body.input.trim()||body.input.length>160))throw failure(400,'Tiêu đề thumbnail cần 1–160 ký tự.');
 const threshold=Number(body.threshold??0.015);if(!Number.isFinite(threshold)||threshold<0.001||threshold>0.1)throw failure(400,'Ngưỡng âm thanh không hợp lệ.');
 active++;let dir;
 try{
  dir=await mkdtemp(join(tmpdir(),'ptshop-media-'));
  const run=async args=>{try{await exec(env.FFMPEG_PATH||'ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-y',...args],{cwd:dir,timeout:45000,maxBuffer:1024*1024,windowsHide:true});}catch(e){if(e.code==='ENOENT')throw failure(503,'Máy chủ chưa cài FFmpeg.');throw failure(422,'Không xử lý được file. Kiểm tra định dạng, thời lượng và nội dung file.');}};
  for(let i=0;i<buffers.length;i++)await writeFile(join(dir,'input-'+i),buffers[i]);
  let output,mime;
  if(image){
   const words=body.input.trim().split(/\s+/);let lines=[''];for(const word of words){let i=lines.length-1;if(lines[i].length+word.length>26&&lines[i]){lines.push('');i++;}lines[i]+=(lines[i]?' ':'')+word;}if(lines.length>5)throw failure(400,'Tiêu đề quá dài cho bố cục thumbnail.');
   await writeFile(join(dir,'title.txt'),lines.join('\n'));
   const font=env.FFMPEG_FONT||(process.platform==='win32'?'C:/Windows/Fonts/arial.ttf':'/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf');
   const escaped=font.replaceAll('\\','/').replaceAll(':','\\:').replaceAll("'","\\'");
   const filter=`scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,drawbox=x=0:y=0:w=iw:h=ih:color=black@0.35:t=fill,drawtext=fontfile='${escaped}':textfile=title.txt:expansion=none:fontsize=72:fontcolor=white:x=70:y=(h-text_h)/2`;
   const source=files.length?['-protocol_whitelist','file,pipe','-i','input-0']:['-f','lavfi','-i','color=c=0x39105c:s=1280x720'];
   output='result.png';mime='image/png';await run([...source,'-vf',filter,'-frames:v','1','-threads','1',output]);
  }else{
   for(let i=0;i<buffers.length;i++)await run(['-protocol_whitelist','file,pipe','-i','input-'+i,'-t','600','-vn','-ac','1','-ar','44100','-c:a','pcm_s16le','normalized-'+i+'.wav']);
   output='result.wav';mime='audio/wav';
   if(tool==='merge-audio'){await writeFile(join(dir,'concat.txt'),buffers.map((_,i)=>"file 'normalized-"+i+".wav'").join('\n'));await run(['-f','concat','-safe','1','-protocol_whitelist','file,pipe','-i','concat.txt','-t','600','-c:a','pcm_s16le',output]);}
   else {const filter=tool==='silence-remover'?`silenceremove=start_periods=1:start_duration=0.05:start_threshold=${threshold}:stop_periods=-1:stop_duration=0.1:stop_threshold=${threshold}`:'highpass=f=80,loudnorm=I=-16:TP=-1.5:LRA=11';await run(['-i','normalized-0.wav','-af',filter,'-ac','1','-ar','44100','-t','600','-c:a','pcm_s16le',output]);}
  }
  if((await stat(join(dir,output))).size>64*1024*1024)throw failure(413,'File đầu ra quá lớn.');const data=await readFile(join(dir,output));if(!image&&data.length<100)throw failure(422,'Không còn âm thanh sau xử lý; thử giảm ngưỡng cắt.');
  return {result:image?'Backend đã tạo thumbnail PNG 1280 × 720.':'Backend đã xử lý audio, xuất WAV mono 44.1 kHz. Mỗi file đầu vào xử lý tối đa 10 phút.',media:data.toString('base64'),mime,source:'FFmpeg backend'};
 }finally{active--;if(dir)await rm(dir,{recursive:true,force:true});}
}
