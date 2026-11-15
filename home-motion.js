(function(){
 'use strict';
 var hero=document.querySelector('.hero'),picture=document.querySelector('.ghats picture');
 if(!hero||!picture)return;
 var visible=true,queued=false,reduce=matchMedia('(prefers-reduced-motion: reduce)');
 function update(){
  queued=false;
  if(reduce.matches||document.documentElement.classList.contains('ko-motion-paused')){picture.style.removeProperty('--mountain-y');return;}
  if(!visible||document.hidden)return;
  var distance=Math.max(0,-hero.getBoundingClientRect().top);
  picture.style.setProperty('--mountain-y',Math.min(28,distance*(innerWidth<=820?.035:.06))+'px');
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update);}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 document.addEventListener('ko:motionchange',schedule);document.addEventListener('visibilitychange',schedule);
 if('IntersectionObserver' in window)new IntersectionObserver(function(entries){visible=entries[0].isIntersecting;hero.classList.toggle('ko-offscreen',!visible);if(visible)schedule();}).observe(hero);
 if(reduce.addEventListener)reduce.addEventListener('change',schedule);
 schedule();
})();
