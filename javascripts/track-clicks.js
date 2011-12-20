(function(){
  var clickCount = 0;

  $.fn.trackClicks = function(options) {
    options = options || {};
    var mixpanel = options.mixpanel;

  	return this.on('click', 'a', function ( e ) {
  		var $anchor = $(this);
      // onclick
      // make all links colored
      // assign saveID();
      if (mixpanel) trackMixpanel(mixpanel, { url: $anchor.attr("href") });
  		saveID($anchor.attr('href'));
  		$anchor.visited();
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

  function trackMixpanel(mixpanel, options) {
    clickCount += 1;
    mixpanel.track('clicked link', _.extend(options, { count : clickCount }));
  }

  function saveID(id) {
    if ($.cookie('idCookie')) {
      $.cookie('idCookie', $.cookie('idCookie') + "," + id);
    } else {
      $.cookie('idCookie', id, {expires: 365});
    }
  }

})();
