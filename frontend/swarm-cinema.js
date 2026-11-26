/* DDEI mission cinema — browser-only visualization of fictional events.
   Anime.js v3.2.2 (MIT) supplies motion interpolation, with native fallback. */
(function () {
  'use strict';
  const byId = id => document.getElementById(id);
  const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const locations = { supervisor:[400,210], enrollment:[145,100], payments:[655,100], learning:[145,320], support:[655,320] };
  const names = { supervisor:'COMMAND CORE', enrollment:'ENROLLMENT', payments:'PAYMENT RECOVERY', learning:'LEARNING', support:'SUPPORT' };
  let animations = [], audio = null, active = [], previous = [], stageState = 'ready';
  function stopMotion() {
    animations.forEach(a=>{ if(a && a.pause)a.pause(); else if(a && a.cancel)a.cancel(); });
    animations=[];
    const layer=byId('cinemaPackets'); if(layer)layer.replaceChildren();
  }
  function animate(el, options) {
    if (!el || reduced()) return;
    if(typeof window.anime==='function') {
      const a=window.anime(Object.assign({targets:el},options)); animations.push(a); return a;
    }
    if(el.animate && options.opacity) {
      const a=el.animate([{opacity:0.2},{opacity:1}],{duration:Math.min(options.duration||500,700),fill:'forwards'}); animations.push(a);
    }
  }
  function svg(tag, attrs) {
    const el=document.createElementNS('http://www.w3.org/2000/svg',tag);
    Object.entries(attrs).forEach(([k,v])=>el.setAttribute(k,String(v)));
    return el;
  }
  function packet(from,to,blocked) {
    const start=locations[from], end=locations[to], layer=byId('cinemaPackets');
    if(!start||!end||!layer||from===to)return;
    const color=blocked?'#ffc166':'#9dfff4';
    const path=svg('path',{d:'M'+start.join(' ')+' Q400 '+(start[1]+end[1])/2+' '+end.join(' '),fill:'none',stroke:color,'stroke-width':2,'stroke-dasharray':'4 9',opacity:.65});
    const dot=svg('circle',{cx:0,cy:0,r:6,fill:color,filter:'url(#cinemaGlow)'});
    layer.append(path,dot);
    if(reduced()){dot.setAttribute('transform','translate('+end.join(' ')+')');return;}
    if(typeof window.anime==='function'){
      const route=window.anime.path(path);
      animations.push(window.anime({targets:dot,translateX:route('x'),translateY:route('y'),duration:1000,easing:'easeInOutSine',loop:true}));
    }else{
      const motion=svg('animateMotion',{path:path.getAttribute('d'),dur:'1s',repeatCount:'indefinite'});
      dot.appendChild(motion);
    }
  }
  function sound(enabled,blocked) {
    if(!enabled||!audio||audio.state!=='running')return;
    try{
      const osc=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;
      osc.type='sine';osc.frequency.setValueAtTime(blocked?180:420,now);osc.frequency.exponentialRampToValueAtTime(blocked?95:680,now+.18);
      gain.gain.setValueAtTime(.045,now);gain.gain.exponentialRampToValueAtTime(.001,now+.28);
      osc.connect(gain);gain.connect(audio.destination);osc.start(now);osc.stop(now+.3);
    }catch(_){}
  }
  function voice(text){
    const box=byId('cinemaVoice');
    if(!box?.checked||!window.speechSynthesis||!window.SpeechSynthesisUtterance)return;
    window.speechSynthesis.cancel();
    const line=new SpeechSynthesisUtterance(text);line.lang='en-GB';line.rate=.95;window.speechSynthesis.speak(line);
  }
  function reset(){
    stopMotion(); if(window.speechSynthesis)window.speechSynthesis.cancel();
    active=[];previous=[];stageState='ready';
    const stage=byId('cinemaTheater');if(!stage)return;
    stage.dataset.phase='ready';stage.dataset.blocked='false';stage.dataset.paused='true';
    if(byId('cinemaFlash'))byId('cinemaFlash').style.opacity='0';
    byId('cinemaShot').textContent='STANDBY // AWAITING MISSION';
    byId('cinemaHandoff').textContent='Choose a scenario and launch the simulation.';
    byId('cinemaChapter').textContent='00';
    stage.querySelectorAll('[data-cinema-agent]').forEach(n=>{n.dataset.state='idle'; const label=n.querySelector('.cinema-agent-status');if(label)label.textContent='STANDBY';});
  }
  function pause(){
    stopMotion();if(window.speechSynthesis)window.speechSynthesis.cancel();
    const stage=byId('cinemaTheater');if(stage)stage.dataset.paused='true';
    if(byId('cinemaFlash'))byId('cinemaFlash').style.opacity='0';
    if(byId('cinemaWorld'))byId('cinemaWorld').style.transform='';
  }
  function scene(step,index,total){
    const stage=byId('cinemaTheater');if(!stage)return;
    stopMotion();stage.dataset.paused='false';
    previous=active;active=step.agents.slice();
    const blocked=Boolean(step.blocked?.length);stage.dataset.blocked=String(blocked);
    stageState=step.outcome?'final':'active';stage.dataset.phase=stageState;
    byId('cinemaChapter').textContent=String(index).padStart(2,'0');
    byId('cinemaShot').textContent=step.outcome?'MISSION // '+step.outcome.toUpperCase(): 'SCENE '+String(index).padStart(2,'0')+' // '+step.title.toUpperCase();
    const from=previous.length?previous.map(a=>names[a]).join(' + '):'MISSION INPUT';
    byId('cinemaHandoff').textContent=from+' → '+active.map(a=>names[a]).join(' + ');
    stage.querySelectorAll('[data-cinema-agent]').forEach(n=>{
      const a=n.dataset.cinemaAgent;
      if(active.includes(a))n.dataset.state=(step.blocked||[]).includes(a)?'blocked':step.outcome?'done':'running';
      else if(n.dataset.state==='running')n.dataset.state='done';
      const label=n.querySelector('.cinema-agent-status');
      if(label)label.textContent=({idle:'STANDBY',running:'EXECUTING',done:'COMPLETE',blocked:'POLICY GATE'})[n.dataset.state]||'STANDBY';
    });
    if(!step.outcome){
      active.forEach(a=>{
        if(a==='supervisor'){previous.filter(p=>p!=='supervisor').forEach(p=>packet(p,'supervisor',blocked));}
        else packet('supervisor',a,blocked);
      });
    }
    animate(byId('cinemaShot'),{opacity:[.1,1],translateY:[12,0],duration:550,easing:'easeOutCubic'});
    animate(byId('cinemaHandoff'),{opacity:[.15,1],duration:650,easing:'easeOutCubic'});
    animate(byId('cinemaFlash'),{opacity:[.42,0],duration:850,easing:'easeOutQuad'});
    if(!reduced() && typeof window.anime==='function')animate(byId('cinemaWorld'),{scale:[1.025,1],duration:850,easing:'easeOutCubic'});
    sound(byId('cinemaSound')?.checked,blocked);
    voice(step.title+'. '+step.narration);
  }
  function init(){
    const stage=byId('cinemaTheater');if(!stage)return;
    const box=byId('cinemaSound');
    box?.addEventListener('change',async()=>{
      if(!box.checked)return;
      try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw Error('unsupported');audio ||= new AC();await audio.resume();}
      catch(_){box.checked=false;}
    });
    byId('cinemaVoice')?.addEventListener('change',()=>{if(!byId('cinemaVoice').checked&&window.speechSynthesis)window.speechSynthesis.cancel();});
    reset();
  }
  window.DDEICinema={init,scene,reset,pause};
})();
