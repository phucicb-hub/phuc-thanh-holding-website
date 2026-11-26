export const toolGroups={
 youtube:['views-per-hour','keyword-research','outliers','trends','spy-video','spy-channel','spy-competitors','your-channel'],
 gemini:['viral-prompts','topic-research','launch-channel','yt-metadata','optimisation','transcribe','dubbing'],
 tts:['text-to-speech','voice-design'], image:['image-video'],
 media:['silence-remover','audio-enhancer','merge-audio','thumbnail-generator'],
 unavailable:['sound-effects','music','voice-changer','watermark-remover','voice-isolator']
};
export function toolRegistry(env){
 const all=env.ENABLE_PROVIDER_REQUESTS==='true';
 const ready={youtube:!!env.YOUTUBE_API_KEY&&(all||env.ENABLE_YOUTUBE_REQUESTS==='true'),gemini:!!(env.GEMINI_API_KEY&&env.GEMINI_TEXT_MODEL)&&(all||env.ENABLE_GEMINI_REQUESTS==='true'),tts:!!(env.GEMINI_API_KEY&&env.GEMINI_TTS_MODEL)&&all,image:!!(env.GEMINI_API_KEY&&env.GEMINI_IMAGE_MODEL)&&all,media:true,unavailable:false};
 const labels={youtube:'YouTube API đã cấu hình',gemini:'Gemini đã cấu hình',tts:'Gemini TTS đã cấu hình',image:'Gemini tạo ảnh đã cấu hình',media:'Xử lý tại backend',unavailable:'Chưa có dịch vụ xử lý'};
 return Object.entries(toolGroups).flatMap(([group,ids])=>ids.map(id=>({id,group,execution:group==='unavailable'?'unavailable':'backend',available:ready[group],status:ready[group]?labels[group]:group==='unavailable'?labels[group]:'Chưa cấu hình dịch vụ',model:['gemini','tts','image'].includes(group)?env[group==='gemini'?'GEMINI_TEXT_MODEL':group==='tts'?'GEMINI_TTS_MODEL':'GEMINI_IMAGE_MODEL']||null:null})));
}
