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
      },
			{
				className: 'add-action',
				displayName: 'Add Action'
			}
    ];
  }

  TA.detectCohort = function(cohortName, cohorts) {
    if (cohortName == null) return null;
    var cohort;

    $.each(cohorts, function(i, coh) {
      if (cohortName == coh.displayName) {
        cohort = coh;
      }
    });

    return cohort;
  };

  TA.randomlySelectNewCohort = function(cohorts) {
    var cohortIndex = Math.floor(Math.random() * cohorts.length);
    return cohorts[cohortIndex];
  };

  TA.getCohortFromStorage = function(opts) {
    opts = opts || {};

    var cohortKey   = 'topicaction-12082011';
    var cohortName  = amplify.store(cohortKey);
    var cohorts     = TA.CohortData;
    var cohort      = TA.detectCohort(cohortName, cohorts);

    if (!cohort || TA.Env.refresh()) {
      cohort = TA.randomlySelectNewCohort(cohorts);
      amplify.store(cohortKey, cohort.displayName);
    }

    return cohort;
  };

})();
