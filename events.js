/* Keep the existing menu and event dialog usable by keyboard and assistive tech. */
(function(){
  var entries=[
    {dialog:document.querySelector('.menu'),opener:document.querySelector('.menu-btn')},
    {dialog:document.querySelector('.sheet'),opener:document.querySelector('#dial')}
  ].filter(function(entry){return entry.dialog&&entry.opener;});
  function focusable(dialog){
    return Array.prototype.slice.call(dialog.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]')).filter(function(el){return el.getClientRects().length>0;});
  }
  function sync(entry){
    var open=entry.dialog.classList.contains('open');
    entry.dialog.inert=!open;
    entry.dialog.setAttribute('aria-hidden',String(!open));
    entry.opener.setAttribute('aria-expanded',String(open));
    if(open&&!entry.wasOpen){
      var first=focusable(entry.dialog)[0];
      if(first)first.focus();
    }
    if(!open&&entry.wasOpen&&entry.dialog.contains(document.activeElement))entry.opener.focus();
    entry.wasOpen=open;
    document.documentElement.classList.toggle('ko-dialog-open',entries.some(function(item){return item.dialog.classList.contains('open');}));
  }
  entries.forEach(function(entry){
    sync(entry);
    new MutationObserver(function(){sync(entry);}).observe(entry.dialog,{attributes:true,attributeFilter:['class']});
  });
  document.addEventListener('keydown',function(event){
    if(event.key!=='Tab')return;
    var entry=entries.filter(function(item){return item.dialog.classList.contains('open');}).pop();
    if(!entry)return;
    var items=focusable(entry.dialog),first=items[0],last=items[items.length-1];
    if(!first){event.preventDefault();return;}
    if(event.shiftKey&&(document.activeElement===first||!entry.dialog.contains(document.activeElement))){event.preventDefault();last.focus();}
    else if(!event.shiftKey&&(document.activeElement===last||!entry.dialog.contains(document.activeElement))){event.preventDefault();first.focus();}
  });
})();
