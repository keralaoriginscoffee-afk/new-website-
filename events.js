/* Full-photo viewer. Every photo is an ordinary image link without JS. */
(function(){
'use strict';
var links=Array.from(document.querySelectorAll('a[data-gallery-link]'));
if(!links.length||!window.HTMLDialogElement||!HTMLDialogElement.prototype.showModal)return;
var dialog=document.createElement('dialog');dialog.className='ko-lightbox';dialog.setAttribute('aria-label','Event photographs');
dialog.innerHTML='<div class="ko-lightbox-bar"><p class="ko-lightbox-count" aria-live="polite" aria-atomic="true"></p><button type="button" class="ko-lightbox-close" aria-label="Close photograph">Close ×</button></div><figure><img alt="" /><figcaption></figcaption></figure><div class="ko-lightbox-actions"><button type="button" class="ko-lightbox-prev">← Previous</button><a class="ko-lightbox-original" target="_blank" rel="noopener">Open full image ↗</a><button type="button" class="ko-lightbox-next">Next →</button></div>';
document.body.appendChild(dialog);
var photo=dialog.querySelector('img'),caption=dialog.querySelector('figcaption'),counter=dialog.querySelector('.ko-lightbox-count');
var previous=dialog.querySelector('.ko-lightbox-prev'),next=dialog.querySelector('.ko-lightbox-next'),close=dialog.querySelector('.ko-lightbox-close'),original=dialog.querySelector('.ko-lightbox-original');
var active=[],index=0,returnTo;
function render(){
 var link=active[index],thumb=link.querySelector('img');photo.src=link.href;photo.alt=thumb?thumb.alt:(link.dataset.caption||'Event photograph');
 caption.textContent=link.dataset.caption||photo.alt;counter.textContent='Photo '+(index+1)+' of '+active.length;original.href=link.href;
 previous.disabled=index===0;next.disabled=index===active.length-1;
}
function move(delta){var target=index+delta;if(target>=0&&target<active.length){index=target;render();}}
links.forEach(function(link){link.addEventListener('click',function(event){
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||event.button!==0)return;
 event.preventDefault();active=links.filter(function(item){return item.dataset.gallery===link.dataset.gallery;});index=active.indexOf(link);returnTo=link;render();
 dialog.showModal();document.documentElement.classList.add('ko-gallery-open');close.focus();
});});
previous.addEventListener('click',function(){move(-1);});next.addEventListener('click',function(){move(1);});close.addEventListener('click',function(){dialog.close();});
dialog.addEventListener('keydown',function(event){if(event.key==='ArrowLeft'){event.preventDefault();move(-1);}if(event.key==='ArrowRight'){event.preventDefault();move(1);}});
dialog.addEventListener('click',function(event){if(event.target!==dialog)return;var rect=dialog.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();});
dialog.addEventListener('close',function(){document.documentElement.classList.remove('ko-gallery-open');photo.removeAttribute('src');if(returnTo)returnTo.focus();});
})();
