(function(){

  $.fn.trackClicks = function(mixpanel) {
    setVisitedLinks(this);

  	return this.on('click', 'a', function ( e ) {
  		var a = $(this);
      // onclick
      // make all links colored
      // assign saveID()
      mixpanel.track('clicked link', { url: a.attr("href") });
  		saveID(a.attr('href'));
  		a.visited();
    });
  };

  $.fn.visited = function() {
    return this.addClass('visited');
  };

  var saveID = function(id) {
    if ($.cookie('idCookie')) {
      $.cookie('idCookie', $.cookie('idCookie') + "," + id);
    } else {
      $.cookie('idCookie', id, {expires: 365});
    }
  };

  var setVisitedLinks = function(scope) {
    var $scope = $(scope);
    if ($.cookie('idCookie')) {
      var idArray = $.cookie('idCookie').split(',');
      for (var x=0; x<idArray.length; x++) {
        $scope.find('a[href="'+idArray[x]+'"]').visited();
      }
    }
  };

})();
