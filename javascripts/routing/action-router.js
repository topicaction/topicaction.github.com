(function() {

  TA.ActionRouter = Backbone.Router.extend({

    routes: {
      ""                    : "index",
      "act-now/:actionParam": "show"
    },

    show: function(actionParam) {
      var self = this;
      var action = TA.Actions.findByParam(actionParam);
      var indexView = self.view();

      TA.Console.log("routed to show", action);
      indexView.fadeOut(function() {
        var actionView = new TA.ActionShowView({ model: action, id: 'act-now' });
        actionView.displayAfter(indexView.el);
      });
    },

    index: function() {
      this.view().fadeIn();
    },

    view: function() {
      var self = this;
      if (!self._view) self._view = new TA.ActionIndexView;
      return self._view;
    }

  }, {

    start: function() {
      new this;
      Backbone.history.start();
    }

  });

})();
