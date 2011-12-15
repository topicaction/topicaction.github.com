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

  // Add cohort members by environment
  // if (TA.Env.test()) {
  //   TA.Cohorts.add([
  //     {
  //       className:  'testing-1',
  //       displayName: 'Testing 1'
  //     },
  //     {
  //       className:  'testing-2',
  //       displayName: 'Testing 2'
  //     },
  //     {
  //       className:  'control-testing-3',
  //       displayName: 'Testing 3'
  //     }
  //   ]);
  //
  // } else {
  //   switch(TA.Cohorts.storageKey) {
  //     case 'topicaction-12082011':
  //       TA.Cohorts.add([
  //         {
  //           className:  'control-group',
  //           displayName: 'Control Group'
  //         },
  //         {
  //           className:  'social-buttons',
  //           displayName: 'Social buttons'
  //         },
  //         {
  //           className: 'popularity',
  //           displayName: 'Popularity'
  //         },
  //         {
  //           className: 'relevancy',
  //           displayName: 'Relevancy'
  //         },
  //         {
  //           className: 'add-action',
  //           displayName: 'Add Action'
  //         }
  //       ]);
  //       break;
  //
  //     case 'topicaction-12122011':
  //       TA.Cohorts.add([
  //         {
  //           className:  'control-group',
  //           displayName: 'Control Group'
  //         },
  //         {
  //           className: 'did-it-only',
  //           displayName: 'Did it only'
  //         }
  //       ]);
  //     break;
  //   }
  // }

})();
