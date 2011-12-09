(function() {
  TA.ActionRouter = Backbone.Router.extend({

    routes: {
      "/"                   : "show-topic",
      "act-now/:actionParam": "actNow"
    },

    foobar: function() {
      TA.Console.log("routed to foo", this);
    },

    actNow: function(actionParam) {
      var action = TA.Actions.findByParam(actionParam)
      TA.Console.log("routed to act-now", action);
      $("#topic .content").slideUp('slow', function() {
        new TA.ActNowView({model: action}).render();
      });
    }

  });

})();
