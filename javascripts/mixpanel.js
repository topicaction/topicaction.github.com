TA.Mixpanel = function(mpq) {
  this.mpq = mpq;
};

TA.Mixpanel.prototype = {
  registerCohort: function(cohort) {
    this.mpq.register({ 'cohort' : cohort.displayName });
  },

  trackPageView: function() {
    this.track('page viewed', {'page name' : document.title, 'url' : window.location.pathname});
  },

  track: function(eventName, options) {
    this.mpq.track(eventName, options);
  }
};
