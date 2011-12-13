(function(){

  $.fn.trackClicks = function(options) {
    options = options || {};
    var mixpanel = options.mixpanel;

  	return this.on('click', 'a', function ( e ) {
  		var a = $(this);
      // onclick
      // make all links colored
      // assign saveID()
      if (mixpanel) trackMixpanel(mixpanel, a);
  		saveID(a.attr('href'));
  		a.visited();
    });
  };

  $.fn.visited = function() {
    return this.addClass('visited');
  };

  $.fn.highlightVisitedLinks = function() {
    return this.each(function() {
      var $scope = $(this);
      if ($.cookie('idCookie')) {
        var idArray = $.cookie('idCookie').split(',');
        for (var x=0; x<idArray.length; x++) {
          $scope.find('a[href="'+idArray[x]+'"]').visited();
        }
      }
    });
  };

  function trackMixpanel(mixpanel, $anchor) {
    mixpanel.track('clicked link', { url: $anchor.attr("href") });
  }

  function saveID(id) {
    if ($.cookie('idCookie')) {
      $.cookie('idCookie', $.cookie('idCookie') + "," + id);
    } else {
      $.cookie('idCookie', id, {expires: 365});
    }
  }

})();
