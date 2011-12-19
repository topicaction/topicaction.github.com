TA.Mixpanel = function(mpq) {
  this.mpq = mpq;
};

TA.Mixpanel.create = function(mpq) {
  return new TA.Mixpanel(mpq);
};

TA.Mixpanel.prototype = {
  registerCohort: function(cohort) {
    TA.Console.log('mixpanel.register', 'cohort', cohort.get("displayName"));
    this.mpq.register({ 'cohort' : cohort.get("displayName") });
  },

  trackPageView: function() {
    this.track('page viewed');
  },

  trackActionView: function(action, options) {
    this.track('action viewed', _.extend({ 'type': action.type(), 'src': action.src() }, options));
  },

  trackClick: function(eventName, options) {
    this.track(eventName, options);
  },

  baseOptions: function() {
    return {'page name' : document.title, 'url' : window.location.pathname};
  },

  track: function(eventName, options) {
    TA.Console.log('mixpanel.track', eventName, options);
    this.mpq.track(eventName, _.extend(this.baseOptions(), options));
  }
};
