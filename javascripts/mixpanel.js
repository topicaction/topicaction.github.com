TA.Mixpanel = function(mpq) {
  this.mpq = mpq;

  this.mpq.push(['set_config', {'test': TA.Env.test() }]);

  this.clickCounts = {};
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
    var visitCount = amplify.store('page-view') || 0;
    amplify.store('page-view', ++visitCount);
    this.track('page viewed', { visit: visitCount });
  },

  trackActionView: function(action, options) {
    this.track('action viewed', _.extend({ 'type': action.type(), 'src': action.src() }, options));
  },

  baseOptions: function() {
    return {'page name' : document.title, 'url' : window.location.pathname };
  },

  track: function(eventName, options) {
    var count = this.incrementCount(eventName);
    options = _.extend({ count: count }, this.baseOptions(), options);
    TA.Console.log('mixpanel.track', eventName, options);
    this.mpq.track(eventName, options);
  },

  incrementCount: function(eventName) {
    var count = this.clickCounts[eventName] || 0;
    return this.clickCounts[eventName] = ++count;
  }

};
