/* Kerala Origins: visible content first; optional interactions second. */
(function(){
'use strict';
var root=document.documentElement,reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
var savedPause=false,motionPaused=false,motionButton,videoStates=[],tickerRefresh=[];
try{savedPause=localStorage.getItem('ko-motion-paused')==='true';}catch(error){}
function updateVideos(){videoStates.forEach(function(state){state.update();});}
function setMotion(){
 motionPaused=reduce.matches||savedPause;
 root.classList.toggle('ko-motion-paused',motionPaused);
 root.dataset.motion=motionPaused?'paused':'running';
 if(!motionPaused)tickerRefresh.forEach(function(build){build();});
 if(motionButton){
  motionButton.textContent=reduce.matches?'Motion reduced':motionPaused?'Resume motion':'Pause motion';
  motionButton.disabled=reduce.matches;
  motionButton.setAttribute('aria-pressed',String(motionPaused));
  motionButton.title=reduce.matches?'Your device prefers reduced motion.':'';
 }
 updateVideos();
 document.dispatchEvent(new CustomEvent('ko:motionchange',{detail:{paused:motionPaused}}));
}
setMotion();
var footer=document.querySelector('footer .wrap');
if(footer){
 motionButton=document.createElement('button');motionButton.type='button';motionButton.className='ko-motion-toggle';
 motionButton.addEventListener('click',function(){savedPause=!savedPause;try{localStorage.setItem('ko-motion-paused',String(savedPause));}catch(error){}setMotion();});
 footer.appendChild(motionButton);setMotion();
}
if(reduce.addEventListener)reduce.addEventListener('change',setMotion);
else if(reduce.addListener)reduce.addListener(setMotion);
document.addEventListener('visibilitychange',function(){root.classList.toggle('ko-page-hidden',document.hidden);updateVideos();});
root.classList.toggle('ko-page-hidden',document.hidden);
/* Every text block is visible before JavaScript runs. Reveal adds movement once. */
if('IntersectionObserver' in window){
 var reveals=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(!entry.isIntersecting)return;entry.target.classList.add('in');if(!motionPaused)entry.target.classList.add('ko-reveal');reveals.unobserve(entry.target);});},{threshold:.06});
 document.querySelectorAll('.fx').forEach(function(el){reveals.observe(el);});
}
/* Two equal groups give the marquee a seamless join at every viewport width. */
document.querySelectorAll('.ticker-track').forEach(function(track){
 var originals=Array.from(track.children).filter(function(el){return el.getAttribute('aria-hidden')!=='true';}).map(function(el){return el.cloneNode(true);});
 if(!originals.length)return;
 function cloneItem(el,hidden){var copy=el.cloneNode(true);copy.removeAttribute('id');copy.querySelectorAll('[id]').forEach(function(item){item.removeAttribute('id');});if(hidden)copy.setAttribute('aria-hidden','true');return copy;}
 function build(){
  track.classList.remove('ko-ticker-ready');track.replaceChildren();
  var group=document.createElement('div');group.className='ko-ticker-group';
  originals.forEach(function(el){group.appendChild(cloneItem(el,false));});track.appendChild(group);
  var passes=0;
  while(group.getBoundingClientRect().width<track.parentElement.clientWidth&&passes++<8){originals.forEach(function(el){group.appendChild(cloneItem(el,true));});}
  var copy=group.cloneNode(true);copy.setAttribute('aria-hidden','true');copy.inert=true;track.appendChild(copy);
  track.style.setProperty('--ticker-time',Math.max(20,group.getBoundingClientRect().width/42)+'s');
  track.classList.add('ko-ticker-ready');
 }
 tickerRefresh.push(build);build();
});
var tickerResize;
window.addEventListener('resize',function(){clearTimeout(tickerResize);tickerResize=setTimeout(function(){tickerRefresh.forEach(function(build){build();});},120);},{passive:true});
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(function(){tickerRefresh.forEach(function(build){build();});});
var menu=document.querySelector('.menu'), opener=document.querySelector('.menu-btn'), close=document.querySelector('.menu-x'), previousInert=[];
function menuItems(){return Array.from(menu.querySelectorAll('a[href],button:not([disabled])')).filter(function(el){return el.getClientRects().length;});}
function setMenu(open){
 if(!menu||!opener||open===menu.classList.contains('open'))return;
 menu.classList.toggle('open',open);menu.inert=!open;menu.setAttribute('aria-hidden',String(!open));opener.setAttribute('aria-expanded',String(open));root.classList.toggle('ko-dialog-open',open);updateVideos();
 if(open){
  previousInert=Array.from(document.body.children).filter(function(el){return el!==menu&&!['SCRIPT','STYLE'].includes(el.tagName);}).map(function(el){var state={el:el,inert:el.inert};el.inert=true;return state;});
  var first=menuItems()[0];if(first)first.focus();
 }else{previousInert.forEach(function(state){state.el.inert=state.inert;});previousInert=[];opener.focus();}
}
if(menu&&opener){
 menu.id=menu.id||'site-menu';menu.inert=true;menu.setAttribute('aria-hidden','true');
 opener.setAttribute('aria-controls',menu.id);opener.setAttribute('aria-expanded','false');
 opener.addEventListener('click',function(){setMenu(true);});if(close)close.addEventListener('click',function(){setMenu(false);});
 menu.addEventListener('keydown',function(event){
  if(event.key==='Escape'){event.preventDefault();setMenu(false);}
  if(event.key!=='Tab')return;
  var items=menuItems(),first=items[0],last=items[items.length-1];
  if(!first){event.preventDefault();return;}
  if(event.shiftKey&&(document.activeElement===first||!menu.contains(document.activeElement))){event.preventDefault();last.focus();}
  if(!event.shiftKey&&(document.activeElement===last||!menu.contains(document.activeElement))){event.preventDefault();first.focus();}
 });
 menu.querySelectorAll('a[href]').forEach(function(link){link.addEventListener('click',function(){setMenu(false);});});
 root.classList.add('ko-enhanced');
}
document.querySelectorAll('.slider').forEach(function(slider){
 var track=slider.querySelector('[data-track]'),prev=slider.querySelector('.sl-prev'),next=slider.querySelector('.sl-next');if(!track)return;
 function sync(){var max=Math.max(0,track.scrollWidth-track.clientWidth);if(prev)prev.disabled=track.scrollLeft<=2;if(next)next.disabled=track.scrollLeft>=max-2;}
 function move(direction){
  var current=track.scrollLeft,max=Math.max(0,track.scrollWidth-track.clientWidth),left=track.getBoundingClientRect().left;
  var positions=Array.from(track.querySelectorAll('.slide')).map(function(slide){return Math.max(0,Math.min(max,slide.getBoundingClientRect().left-left+current));});
  var target=direction>0?positions.find(function(position){return position>current+2;}):positions.reverse().find(function(position){return position<current-2;});
  track.scrollTo({left:target===undefined?(direction>0?max:0):target,behavior:motionPaused?'auto':'smooth'});
 }
 if(prev)prev.addEventListener('click',function(){move(-1);});if(next)next.addEventListener('click',function(){move(1);});
 track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync,{passive:true});
 track.querySelectorAll('img').forEach(function(img){img.addEventListener('load',sync);});
 slider.classList.add('ko-slider-ready');sync();
});

/* Background films are muted, inline and visible-only; manual pause is remembered. */
document.querySelectorAll('.ko-film-section').forEach(function(section){
 var video=section.querySelector('video[data-background-video]'),button=section.querySelector('.ko-film-toggle');
 if(!video||!button)return;
 var visible=false,failed=false,loading=false,manualPause=false,manualPlay=false,autoplayBlocked=false;
 var playLabel=button.dataset.playLabel||'Play film';
 var status=document.createElement('span');status.className='ko-film-status';status.setAttribute('role','status');section.appendChild(status);
 video.removeAttribute('autoplay');video.controls=false;video.muted=true;video.defaultMuted=true;video.setAttribute('muted','');video.setAttribute('playsinline','');video.playsInline=true;video.loop=true;video.pause();
 button.hidden=false;button.setAttribute('aria-pressed','false');
 function sync(){
  if(failed)return;
  var playing=!video.paused&&!video.ended;
  button.textContent=loading?'Loading film…':playing?'Pause film':playLabel;
  button.setAttribute('aria-label',button.textContent);
  button.setAttribute('aria-pressed',String(playing));
 }
 function unavailable(){
  if(failed)return;failed=true;loading=false;video.pause();
  button.textContent='Film unavailable';button.setAttribute('aria-label','Film unavailable');button.setAttribute('aria-pressed','false');button.disabled=true;
  status.textContent='The film could not load. You can still enjoy the photograph.';
  if(video.poster){var poster=document.createElement('img');poster.className=video.className+' ko-film-poster';poster.src=video.poster;poster.alt='';poster.setAttribute('aria-hidden','true');video.before(poster);video.hidden=true;}
 }
 function obscured(){return document.hidden||root.classList.contains('ko-dialog-open')||root.classList.contains('ko-gallery-open');}
 function allowed(){return visible&&!obscured()&&!manualPause&&!motionPaused&&!(navigator.connection&&navigator.connection.saveData);}
 function play(automatic){
  if(failed||loading||(!video.paused&&!video.ended))return;
  if(automatic&&autoplayBlocked)return;
  loading=true;if(!automatic){status.textContent='';manualPlay=true;}sync();
  var attempt=video.play();
  if(attempt&&attempt.then){attempt.then(function(){loading=false;if(!visible||obscured()||(!manualPlay&&!allowed()))video.pause();sync();}).catch(function(error){loading=false;if(video.error){unavailable();return;}if(automatic)autoplayBlocked=true;else status.textContent=error&&error.name==='AbortError'?'':'Playback could not start. Please try again.';sync();});}
  else{loading=false;sync();}
 }
 function update(){
  if(failed)return;
  if(!visible||obscured()||manualPause||(motionPaused&&!manualPlay)){video.pause();return;}
  if(allowed())play(true);
 }
 button.addEventListener('click',function(){
  if(failed)return;
  if(loading||!video.paused){manualPause=true;manualPlay=false;video.pause();loading=false;sync();return;}
  manualPause=false;autoplayBlocked=false;play(false);
 });
 video.addEventListener('playing',function(){loading=false;sync();});
 video.addEventListener('pause',sync);video.addEventListener('ended',sync);video.addEventListener('error',unavailable);
 video.querySelectorAll('source').forEach(function(source){source.addEventListener('error',unavailable);});
 videoStates.push({update:update});
 document.addEventListener('ko:motionchange',function(){manualPlay=false;update();});
 if('IntersectionObserver' in window){
  new IntersectionObserver(function(entries){entries.forEach(function(entry){visible=entry.isIntersecting&&entry.intersectionRatio>=.15;if(!visible)manualPlay=false;update();});},{threshold:[0,.15]}).observe(section);
 }else{visible=true;autoplayBlocked=true;}
 sync();
});
/* Dialog overlays hide the film even when it remains geometrically in view. */
if('MutationObserver' in window)new MutationObserver(updateVideos).observe(root,{attributes:true,attributeFilter:['class']});
})();
