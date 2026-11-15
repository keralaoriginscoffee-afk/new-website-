/* Kerala Origins: visible content first; optional interactions second. */
(function(){
'use strict';
var root=document.documentElement;
var menu=document.querySelector('.menu'), opener=document.querySelector('.menu-btn'), close=document.querySelector('.menu-x'), previousInert=[];
function menuItems(){return Array.from(menu.querySelectorAll('a[href],button:not([disabled])')).filter(function(el){return el.getClientRects().length;});}
function setMenu(open){
 if(!menu||!opener||open===menu.classList.contains('open'))return;
 menu.classList.toggle('open',open);menu.inert=!open;menu.setAttribute('aria-hidden',String(!open));opener.setAttribute('aria-expanded',String(open));root.classList.toggle('ko-dialog-open',open);
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
  track.scrollTo({left:target===undefined?(direction>0?max:0):target,behavior:'auto'});
 }
 if(prev)prev.addEventListener('click',function(){move(-1);});if(next)next.addEventListener('click',function(){move(1);});
 track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync,{passive:true});
 track.querySelectorAll('img').forEach(function(img){img.addEventListener('load',sync);});
 slider.classList.add('ko-slider-ready');sync();
});

/* Keep the original films available without autoplay or automatic resumption. */
document.querySelectorAll('.ko-film-section').forEach(function(section){
 var video=section.querySelector('video[data-background-video]'),button=section.querySelector('.ko-film-toggle');
 if(!video||!button)return;
 var visible=true,failed=false,loading=false;
 var playLabel=button.dataset.playLabel||'Play film';
 var status=document.createElement('span');status.className='ko-film-status';status.setAttribute('role','status');section.appendChild(status);
 video.removeAttribute('autoplay');video.removeAttribute('loop');video.controls=false;video.pause();
 button.hidden=false;button.setAttribute('aria-pressed','false');
 function sync(){
  if(failed)return;
  var playing=!video.paused&&!video.ended;
  button.textContent=loading?'Loading film…':playing?'Pause film':video.ended?'Replay film':playLabel;
  button.setAttribute('aria-label',button.textContent);
  button.setAttribute('aria-pressed',String(playing));
 }
 function unavailable(){
  if(failed)return;failed=true;loading=false;video.pause();
  button.textContent='Film unavailable';button.setAttribute('aria-label','Film unavailable');button.setAttribute('aria-pressed','false');button.disabled=true;
  status.textContent='The film could not load. You can still enjoy the photograph.';
  if(video.poster){var poster=document.createElement('img');poster.className=video.className+' ko-film-poster';poster.src=video.poster;poster.alt='';poster.setAttribute('aria-hidden','true');video.before(poster);video.hidden=true;}
 }
 button.addEventListener('click',function(){
  if(failed||loading)return;
  if(!video.paused){video.pause();return;}
  loading=true;status.textContent='';sync();
  var attempt=video.play();
  if(attempt&&attempt.then){attempt.then(function(){loading=false;if(!visible||document.hidden)video.pause();sync();}).catch(function(error){loading=false;if(video.error){unavailable();return;}status.textContent=error&&error.name==='AbortError'?'':'Playback could not start. Please try again.';sync();});}
  else{loading=false;sync();}
 });
 video.addEventListener('playing',function(){loading=false;sync();});
 video.addEventListener('pause',sync);video.addEventListener('ended',sync);video.addEventListener('error',unavailable);
 video.querySelectorAll('source').forEach(function(source){source.addEventListener('error',unavailable);});
 if('IntersectionObserver' in window){
  new IntersectionObserver(function(entries){entries.forEach(function(entry){visible=entry.isIntersecting&&entry.intersectionRatio>=.1;if(!visible)video.pause();});},{threshold:[0,.1]}).observe(section);
 }
 document.addEventListener('visibilitychange',function(){if(document.hidden)video.pause();});
 sync();
});
})();
