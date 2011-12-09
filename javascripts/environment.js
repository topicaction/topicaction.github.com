if (window.TA == undefined) window.TA = {};

TA.Env = {
  test: function() {
    return !!window.location.host.match(/localhost/);
  },
  refresh: function() {
    return window.location.search.match(/refresh/);
  }
};
