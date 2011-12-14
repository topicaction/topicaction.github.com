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
      var action = TA.Actions.findByParam(actionParam);
      var indexView;
      TA.Console.log("routed to show", action);

      if (self.cohort().isControl()) {
        window.location = action.get('url');
      } else {
        indexView = self.view();
        indexView.fadeOut(function() {
          var actionView = new TA.ActionShowView(_.extend(self.options, { model: action, id: 'act-now' }));
          actionView.displayAfter(indexView.el);
        });
      }
    },

    index: function() {
      this.view().render();
    },

    view: function(topic) {
      var self = this;

      // Visiting root is edge case so we don't cache the view
      if (location.pathname == "/") { return new TA.TopicIndexView(); }

      if (!self._view) {
        // Cache the topic show page
        var topic = TA.Topics.findByPathname(location.pathname);
        self._view = new TA.TopicShowView({ model: topic });
      }

      return self._view;
    }

  }, {

    start: function(options) {
      new this(options);
      Backbone.history.start();
    }

  });

})();
