function setCohortAndBodyClass() {
  var cohortKey = 'cohort-test-12152011';

  var cohorts = [
    {
      className:  'cohort-1',
      displayName: 'Cohort One'
    },
    {
      className: 'cohort-2',
      displayName: 'Cohort Two'
    }
  ];

  // for testing
  amplify.store(cohortKey, null);
  var cohort;
  var cohortName = amplify.store(cohortKey);

  if (!cohortName) {
    // set the cohort via A/B
    console.log("setting cohort");
    var partitions  = 1.0 / cohorts.length;
    var cohortIndex = Math.floor(Math.random() / partitions);

    cohort      = cohorts[cohortIndex];
    cohortName  = cohort.displayName;

    amplify.store(cohortKey, cohortName);
    // mpq.register_once('cohort', cohortName);
  } else {
    // search for cohort
    $.each(cohorts, function(i, coh) {
      if (cohortName == coh.displayName) {
        cohort = coh;
      }
    });
  }

  $('body').addClass(cohort.className);
}
