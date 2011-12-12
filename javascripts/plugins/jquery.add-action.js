(function() {

  var ADD_ACTION_URL  = 'http://challengepost.wufoo.com/forms/z7x1x7/';
  var WINDOW_SETTINGS = 'height=497, width=680, toolbar=0, location=0, status=1, scrollbars=1, resizable=1';

  $.fn.addAction = function(options) {
    options = options || {};
    var mixpanel = options.mixpanel;

    return this.on('click', function() {
      trackMixpanel(mixpanel);
      window.open(ADD_ACTION_URL, null, WINDOW_SETTINGS);
      return false;
    });
  };

  function trackMixpanel(mixpanel) {
    mixpanel.track('clicked add action', {'page name' : document.title, 'url' : window.location.pathname});
  }

})();