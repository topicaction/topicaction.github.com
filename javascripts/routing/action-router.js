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
      var actionView;

      TA.Console.log("routed to show", action);

      if (self.cohort().isControl()) {
        window.location = action.get('url');
      } else {
        $("#header .container").html(new TA.ActionHeader({ model: action }).el);
        $("#topic").fadeOut(function() {
          actionView = new TA.ActionShowView(_.extend(self.options, { model: action, id: 'act-now' }));
          $("#action").html(actionView.el);
        });
      }
    },

    index: function() {
      if (this.pathname() == "/") { return new TA.TopicIndexView(); }

      var self = this;
      var topic = self.topic();

      $('#header .container').html(new TA.TopicHeader({ model: topic }).el);
      $("#action").empty();
      self.topicShowView(topic);
      return null;
    },

    topicShowView: function(topic) {
      var self = this;

      if (!self._view) {
        // Cache the topic show page
        self._view = new TA.TopicShowView({ model: topic });
        return self._view;
      } else {
        return self._view.render();
      }
    },

    topic: function() {
      return TA.Topics.findByPathname(this.pathname());
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
