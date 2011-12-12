(function() {
  // Define cohort model
  TA.Cohort = Backbone.Model;

  // Define cohort collection class
  TA.CohortCollection = Backbone.Collection.extend({
    model: TA.Cohort,

    storageKey: 'topicaction-12082011',

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
    }
  });

  // Create global cohort collection instance for application
  TA.Cohorts = new TA.CohortCollection;

  // Add cohort members by environment
  if (!TA.Env.test()) {
    TA.Cohorts.add([
      {
        className:  'testing-1',
        displayName: 'Testing 1'
      },
      {
        className:  'testing-2',
        displayName: 'Testing 2'
      }
    ]);

  } else {
    switch(TA.Cohorts.storageKey) {
      case 'topicaction-12082011':
        TA.Cohorts.add([
          {
            className:  'control-group',
            displayName: 'Control Group'
          },
          {
            className:  'social-buttons',
            displayName: 'Social buttons'
          },
          {
            className: 'popularity',
            displayName: 'Popularity'
          },
          {
            className: 'relevancy',
            displayName: 'Relevancy'
          },
          {
            className: 'add-action',
            displayName: 'Add Action'
          }
        ]);
        break;

      case 'topicaction-12122011':
        TA.Cohorts.add([
          {
            className:  'control-group',
            displayName: 'Control Group'
          },
          {
            className: 'done-this',
            displayName: 'Done this'
          },
          {
            className: 'save-for-later',
            displayName: 'Save for Later'
          }
        ]);
      break;
    }
  }

})();
