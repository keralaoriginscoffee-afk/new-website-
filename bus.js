/* A Kerala bus: sound only follows a deliberate click, tap or keyboard press. */
(function () {
  'use strict';
  var wrap = document.querySelector('.bus-wrap');
  if (!wrap) return;
  var button = wrap.querySelector('.bus');
  var ticket = wrap.querySelector('.ticket');
  var hint = wrap.querySelector('.bus-hint');
  var status = wrap.querySelector('.bus-status');
  var audio = document.getElementById('ko-bus-horn');
  var root = document.documentElement;
  var preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  var timers = [], attempt = 0;

  function motionAllowed() {
    return !preference.matches && !root.classList.contains('ko-motion-paused');
  }
  function clearMotion() {
    timers.forEach(window.clearTimeout);
    timers = [];
    wrap.classList.remove('arrive', 'honk', 'depart');
  }
  function later(fn, delay) { timers.push(window.setTimeout(fn, delay)); }
  function soundError(message) {
    status.classList.add('has-error');
    status.textContent = message;
  }
  function showTicket() {
    ticket.hidden = false;
    // Establish the ticket's start frame before revealing it; the link stays usable.
    void ticket.offsetWidth;
    wrap.classList.add('out');
  }

  if ('IntersectionObserver' in window) {
    var arrival = new IntersectionObserver(function (entries) {
      if (!entries.some(function (entry) { return entry.isIntersecting; })) return;
      if (motionAllowed()) wrap.classList.add('arrive');
      arrival.disconnect();
    }, {threshold: .2});
    arrival.observe(wrap);
  }
  wrap.addEventListener('animationend', function (event) {
    if (event.animationName === 'busIn') wrap.classList.remove('arrive');
    if (event.animationName === 'busRoundTrip') wrap.classList.remove('depart');
  });

  button.addEventListener('click', function () {
    clearMotion();
    status.classList.remove('has-error');
    status.textContent = '';
    showTicket();
    hint.textContent = 'Tap again to sound the horn.';
    var thisAttempt = ++attempt;
    // Reuse the media element, restarting the original short horn on each gesture.
    audio.pause();
    try { audio.currentTime = 0; } catch (ignore) {}
    try {
      var play = audio.play();
      if (play && play.catch) play.catch(function (error) {
        if (thisAttempt !== attempt || error.name === 'AbortError') return;
        soundError(audio.error ? 'The horn could not load. You can still use the contact options.' : 'Sound could not start. Tap the bus to try again.');
      });
    } catch (error) {
      soundError('Sound could not start. Tap the bus to try again.');
    }
    if (motionAllowed()) {
      void wrap.offsetWidth;
      wrap.classList.add('honk');
      later(function () {
        wrap.classList.remove('honk');
        if (motionAllowed()) wrap.classList.add('depart');
      }, 950);
      later(function () { wrap.classList.remove('depart'); }, 2800);
    }
  });
  audio.addEventListener('playing', function () {
    status.classList.remove('has-error');
    status.textContent = 'We heard you. Choose a way to get in touch.';
  });
  audio.addEventListener('error', function () {
    if (attempt) soundError('The horn could not load. You can still use the contact options.');
  });
  // A background tab should not keep making a sound or running the entrance.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) { attempt++; audio.pause(); clearMotion(); }
  });
  function respectMotion() { if (!motionAllowed()) clearMotion(); }
  if (preference.addEventListener) preference.addEventListener('change', respectMotion);
  else if (preference.addListener) preference.addListener(respectMotion);
  new MutationObserver(respectMotion).observe(root, {attributes: true, attributeFilter: ['class']});
})();
