TA.Mixpanel = function(mpq) {
  this.mpq = mpq;
};

TA.Mixpanel.create = function(mpq) {
  return new TA.Mixpanel(mpq);
};

TA.Mixpanel.prototype = {
  registerCohort: function(cohort) {
    this.mpq.register({ 'cohort' : cohort.get("displayName") });
  },

  trackPageView: function() {
    this.track('page viewed', {'page name' : document.title, 'url' : window.location.pathname});
  },

  track: function(eventName, options) {
    TA.Console.log('mixpanel.track', eventName, options);
    this.mpq.track(eventName, options);
  }
};
