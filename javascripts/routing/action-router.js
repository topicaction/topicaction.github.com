(function() {

  TA.ActionRouter = Backbone.Router.extend({
    initialize: function(options) {
      this.options = options || {};
    },

    cohort: function() {
      return this.options.cohort;
    },

    routes: {
      ""                    : "index",
      "act-now/:actionParam": "show"
    },

    show: function(actionParam) {
      var self = this;
      var action = TA.Actions.findByParam(actionParam);;
      var view = self.topicShowView();
      TA.Console.log("routed to show", action);

      if (self.cohort().isControl()) {
        window.location = action.get('url');
      } else {
        view.fadeOut(function() {
          var actionView = new TA.ActionShowView(_.extend(self.options, { model: action, id: 'act-now' }));
          actionView.displayAfter(view.el);
        });
      }
    },

    index: function() {
      var self = this;
      if (self.pathname() == "/") { return new TA.TopicIndexView(); }

      self.topicShowView().render();
      return null;
    },

    topicShowView: function() {
      var self = this;
      if (!self._view) {
        // Cache the topic show page
        var topic = TA.Topics.findByPathname(self.pathname());
        self._view = new TA.TopicShowView({ model: topic });
      }

      return self._view;
    },

    pathname: function() {
      return window.location.pathname;
    }

  }, {

    start: function(options) {
      new this(options);
      Backbone.history.start();
    }

  });

})();
