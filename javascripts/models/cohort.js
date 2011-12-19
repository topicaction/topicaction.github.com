(function() {
  // Define cohort model
  TA.Cohort = Backbone.Model.extend({

    isControl: function() {
      return !!this.get('className').match(/control/);
    }

  });

  // Define cohort collection class
  TA.CohortCollection = Backbone.Collection.extend({
    model: TA.Cohort,

    storageKey: 'topicaction-12122011',

    findRandom: function() {
      return this.at(Math.floor(Math.random() * this.length));
    },

    findByDisplayName: function(displayName) {
      if (!displayName) return null;

      return this.find(function(cohort) { return cohort.get("displayName") == displayName; });
    },

    assignNewCohort: function(displayName) {
      var self   = this;
      var cohort = self.findRandom();
      amplify.store(self.storageKey, cohort.get("displayName"));
      return cohort;
    },

    findOrAssignCohort: function() {
      var self        = this;
      var cohortName  = amplify.store(self.storageKey);
      var cohort      = self.findByDisplayName(cohortName);

      if (!cohort || TA.Env.refresh()) {
        return self.assignNewCohort(cohortName);
      } else {
        return cohort;
      }
    },

    url: function() {
      var base = "/javascripts/data/cohort-<%= name %>.json";
      var cohortName = TA.Env.test() ? 'testing' : this.storageKey;
      return _.template(base, { name: cohortName });
    }
  });

  // Create global cohort collection instance for application
  TA.Cohorts = new TA.CohortCollection;

  TA.Cohorts.fetch({
    async: false
  });

})();
