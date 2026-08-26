/* Kerala Origins shared behaviour */
(function(){
  var btn=document.querySelector('.menu-btn'),
      menu=document.querySelector('.menu'),
      x=document.querySelector('.menu-x');
  if(btn&&menu){
    btn.addEventListener('click',function(){menu.classList.add('open');});
    if(x)x.addEventListener('click',function(){menu.classList.remove('open');});
    document.addEventListener('keydown',function(e){
      if(e.key==='Escape')menu.classList.remove('open');
    });
  }

  /* duplicate ticker content for a seamless -50% loop */
  document.querySelectorAll('.ticker-track').forEach(function(t){
    t.innerHTML=t.innerHTML+t.innerHTML;
  });

  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}
    });
  },{threshold:.16});
  document.querySelectorAll('.fx').forEach(function(el,i){
    el.style.transitionDelay=(i%4)*90+'ms';io.observe(el);
  });

  /* edition photo sliders */
  document.querySelectorAll('.slider').forEach(function(sl){
    var track=sl.querySelector('[data-track]'),
        prev=sl.querySelector('.sl-prev'),
        next=sl.querySelector('.sl-next');
    if(!track)return;
    var step=function(){var f=track.querySelector('.slide');return f?f.getBoundingClientRect().width+14:300;};
    if(prev)prev.addEventListener('click',function(){track.scrollBy({left:-step(),behavior:'smooth'});});
    if(next)next.addEventListener('click',function(){track.scrollBy({left:step(),behavior:'smooth'});});
  });

  /* coffee-cherry cursor, desktop pointer devices only */
  if(matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion: reduce)').matches){
    var c=document.createElement('div');
    c.style.cssText='position:fixed;z-index:999;width:14px;height:14px;border-radius:50%;'+
      'background:#D6472F;border:2px solid #191510;pointer-events:none;'+
      'transform:translate(-50%,-50%);transition:transform .12s ease;left:-40px;top:-40px';
    document.body.appendChild(c);
    addEventListener('mousemove',function(e){c.style.left=e.clientX+'px';c.style.top=e.clientY+'px';},{passive:true});
    addEventListener('mousedown',function(){c.style.transform='translate(-50%,-50%) scale(1.6)';});
    addEventListener('mouseup',function(){c.style.transform='translate(-50%,-50%)';});
  }
})();
