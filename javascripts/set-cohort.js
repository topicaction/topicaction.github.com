function setCohortAndBodyClass() {
  var cohortKey = 'topicaction-12082011';

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

  mpq.register({ 'cohort' : cohortName });

  $('body').addClass(cohort.className);
}
