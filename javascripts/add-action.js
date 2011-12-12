(function() {

  var ADD_ACTION_URL  = 'http://challengepost.wufoo.com/forms/z7x1x7/';
  var WINDOW_SETTINGS = 'height=497, width=680, toolbar=0, location=0, status=1, scrollbars=1, resizable=1';

  TA.addAction = function(options) {
    options = options || {};
    var mixpanel = options.mixpanel;
    if (mixpanel) trackMixpanel(mixpanel);
    window.open(ADD_ACTION_URL, null, WINDOW_SETTINGS);
    return null;
  };

  $.fn.addAction = function(options) {
    options = options || {};
    return this.on('click', (options.selector || ''), function() {
      TA.addAction(options);
      return false;
    });
  };

  function trackMixpanel(mixpanel) {
    mixpanel.track('clicked add action', {'page name' : document.title, 'url' : window.location.pathname});
  }

})();