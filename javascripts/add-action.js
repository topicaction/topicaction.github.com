;( function ( undefined ) {
  var FORM_POPUP_CONSTANTS = {
    'ADD_ACTION_URL': 'http://challengepost.wufoo.com/forms/z7x1x7/'
    , 'SAVE_FOR_LATER_URL': 'http://challengepost.wufoo.com/forms/z7x1w3/'
    /* popup options */
    , 'WINDOW_SETTINGS': 'height=497, width=680, toolbar=0, location=0, status=1, scrollbars=1, resizable=1'
  };

  $.fn.addAction = function ( options ) {
    options = options || {};

    return this.on( 'click', ( options.selector || '' ), function () {

      trackMixpanel( options.mixpanel );
      openForm( ADD_ACTION_URL );

      return false;
    });
  };

  function openForm( form ) {
    return window.open( FORM_POPUP_CONSTANTS[ form ], null, FORM_POPUP_CONSTANTS[ 'WINDOW_SETTINGS' ] );
  }

  function trackMixpanel( mixpanel ) {

    if ( !mixpanel ) {
      return false;
    }

    mixpanel.track( 'clicked add action' );
  }

} )( /* , undefined */ );