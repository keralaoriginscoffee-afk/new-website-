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
 function step(){var first=track.querySelector('.slide');return first?first.getBoundingClientRect().width+(parseFloat(getComputedStyle(track).columnGap)||0):track.clientWidth;}
 function sync(){var max=Math.max(0,track.scrollWidth-track.clientWidth);if(prev)prev.disabled=track.scrollLeft<=2;if(next)next.disabled=track.scrollLeft>=max-2;}
 function move(direction){track.scrollBy({left:direction*step(),behavior:'auto'});}
 if(prev)prev.addEventListener('click',function(){move(-1);});if(next)next.addEventListener('click',function(){move(1);});
 track.addEventListener('scroll',sync,{passive:true});window.addEventListener('resize',sync,{passive:true});
 track.querySelectorAll('img').forEach(function(img){img.addEventListener('load',sync);});
 slider.classList.add('ko-slider-ready');sync();
});
})();
