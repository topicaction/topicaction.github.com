(function(){
  var clickCount = 0;

  $.fn.trackClicks = function(options) {
    options = options || {};
    var mixpanel = options.mixpanel;

  	return this.on('click', 'a', function ( e ) {
  		var $anchor = $(this);
      if (mixpanel) trackMixpanel(mixpanel, { url: $anchor.attr("href") });
  		saveLink($anchor.attr('href'));
  		$anchor.visited();
    });
  };

  $.fn.visited = function() {
    return this.addClass('visited');
  };

  $.fn.highlightVisitedLinks = function() {
    return this.each(function() {
      var $scope = $(this);
      if (amplify.store('visitedLinks')) {
        var idArray = amplify.store('visitedLinks').split(',');
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

  function saveLink(link) {
    // store visited links as comma-separated string, removing nulls, avoiding duplicates
    amplify.store('visitedLinks', _([amplify.store('visitedLinks'), link]).chain().compact().unique().value().join(','));
  }

})();
