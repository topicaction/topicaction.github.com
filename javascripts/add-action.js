(function() {

  var ADD_ACTION_URL      = 'http://challengepost.wufoo.com/forms/z7x1x7/';
  var SAVE_FOR_LATER_URL  = 'http://challengepost.wufoo.com/forms/z7x1w3/';
  var WINDOW_SETTINGS = 'height=497, width=680, toolbar=0, location=0, status=1, scrollbars=1, resizable=1';

  TA.saveForLater = function() {
    openForm(SAVE_FOR_LATER_URL);
  };

  $.fn.addAction = function(options) {
    options = options || {};
    return this.on('click', (options.selector || ''), function() {
      trackMixpanel(options.mixpanel);
      openForm(ADD_ACTION_URL);
      return false;
    });
  };

  function openForm(url) {
    return window.open(url, null, WINDOW_SETTINGS);
  }

  function trackMixpanel(mixpanel) {
    if (!mixpanel) return false;
    mixpanel.track('clicked add action', {'page name' : document.title, 'url' : window.location.pathname});
  }

})();