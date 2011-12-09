(function() {
  TA.CohortData = [];

  if (TA.Env.test()) {
    TA.CohortData = [
      {
        className:  'testing-1',
        displayName: 'Testing 1'
      },
      {
        className:  'testing-2',
        displayName: 'Testing 2'
      }
    ];

  } else {
    TA.CohortData = [
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
      }
    ];
  }


  TA.getCohortFromStorage = function(opts) {
    opts = opts || {};

    var cohortKey   = 'topicaction-12082011';
    var cohortName  = amplify.store(cohortKey);
    var cohorts     = TA.CohortData;
    var cohort;

    if (!cohortName || TA.Env.refresh()) {
      // set the cohort via A/B
      var cohortIndex = Math.floor(Math.random() * cohorts.length);

      cohort      = cohorts[cohortIndex];
      cohortName  = cohort.displayName;

      amplify.store(cohortKey, cohortName);
    } else {
      // search for cohort
      $.each(cohorts, function(i, coh) {
        if (cohortName == coh.displayName) {
          cohort = coh;
        }
      });
    }

    return cohort;
  };

})();
