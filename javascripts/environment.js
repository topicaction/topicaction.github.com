if (window.TA == undefined) window.TA = {};

TA.Env = {
  test: function() {
    return !!(window.location.host.match(/localhost/) && !window.location.search.match(/production/));
  },
  refresh: function() {
    return !!window.location.search.match(/refresh/);
  }
};

TA.Console = {
  log: function() {
    if (!TA.Env.test()) return;

    console.log.apply(console, arguments);
  }
};
