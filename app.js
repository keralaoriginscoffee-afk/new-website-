/* Kerala Origins: visible content first; optional interactions second. */
(function(){
'use strict';
var root=document.documentElement, reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
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
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
  if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
 });
 root.classList.add('ko-enhanced');
}
document.querySelectorAll('.ticker-track').forEach(function(track){
 if(track.dataset.duplicated)return;
 Array.from(track.children).forEach(function(child){var copy=child.cloneNode(true);copy.setAttribute('aria-hidden','true');track.appendChild(copy);});
 track.dataset.duplicated='true';
});
document.querySelectorAll('.slider').forEach(function(slider){
 var track=slider.querySelector('[data-track]'),prev=slider.querySelector('.sl-prev'),next=slider.querySelector('.sl-next');if(!track)return;
 function step(){var first=track.querySelector('.slide');return first?first.getBoundingClientRect().width+(parseFloat(getComputedStyle(track).columnGap)||0):track.clientWidth;}
 function sync(){var max=Math.max(0,track.scrollWidth-track.clientWidth);if(prev)prev.disabled=track.scrollLeft<=2;if(next)next.disabled=track.scrollLeft>=max-2;}
 function move(direction){track.scrollBy({left:direction*step(),behavior:reduce.matches?'auto':'smooth'});}
 if(prev)prev.addEventListener('click',function(){move(-1);});if(next)next.addEventListener('click',function(){move(1);});
 track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync,{passive:true});
 track.querySelectorAll('img').forEach(function(img){img.addEventListener('load',sync);});
 slider.classList.add('ko-slider-ready');sync();
});
var videos=Array.from(document.querySelectorAll('video[data-background-video],video[data-motion-video]'));
var motionPaused=reduce.matches,footer=document.querySelector('footer .wrap'),motionButton,videoStates=[];
function mayPlay(state){return state.visible&&!state.manualPause&&!document.hidden&&!(navigator.connection&&navigator.connection.saveData);}
function pauseMotion(paused){
 motionPaused=paused;root.dataset.motion=paused?'paused':'running';
 if(motionButton){motionButton.textContent=paused?'Resume motion':'Pause motion';motionButton.setAttribute('aria-pressed',String(paused));}
 videoStates.forEach(function(state){if(paused)state.video.pause();else if(mayPlay(state))state.play();});
}
if(footer){
 motionButton=document.createElement('button');motionButton.type='button';motionButton.className='ko-motion-toggle';
 motionButton.addEventListener('click',function(){pauseMotion(!motionPaused);});footer.appendChild(motionButton);
}
pauseMotion(motionPaused);
if(reduce.addEventListener)reduce.addEventListener('change',function(event){pauseMotion(event.matches);});
videos.forEach(function(video){
 video.removeAttribute('autoplay');video.muted=true;
 var button=document.createElement('button');button.type='button';button.className='ko-video-control';button.textContent='Play background video';video.parentElement.appendChild(button);
 var state={video:video,visible:false,manualPause:false,play:play};videoStates.push(state);
 function sync(){button.textContent=video.paused?'Play background video':'Pause background video';}
 function play(){var attempt=video.play();if(attempt&&attempt.catch)attempt.catch(sync);}
 button.addEventListener('click',function(){if(video.paused){state.manualPause=false;play();}else{state.manualPause=true;video.pause();}});
 video.addEventListener('play',sync);video.addEventListener('pause',sync);
 if('IntersectionObserver' in window){
  var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){state.visible=entry.isIntersecting;if(!entry.isIntersecting)video.pause();else if(!motionPaused&&mayPlay(state))play();});},{threshold:.15});
  observer.observe(video);
 }
 document.addEventListener('visibilitychange',function(){if(document.hidden)video.pause();else if(!motionPaused&&mayPlay(state))play();});
});
})();
