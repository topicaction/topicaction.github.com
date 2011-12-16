(function() {

  TA.ActionsRouter = Backbone.Router.extend({
    initialize: function(options) {
      var self = this;
      self.options = options || {};

      $("#header").after(new TA.UserHeader({ id: "#user" }).el);

      self.
        bind("route:getTopicActions", function() {
          self.$action().empty();
        }).
        bind("route:getMyActions", function() {
          self.$action().empty();
          self.$topic().fadeOut();
        }).
        bind("route:getAction", function() {
          self.$topic().fadeOut();
        });
    },

    cohort: function() {
      return this.options.cohort;
    },

    routes: {
      ""                    : "getTopicActions",
      "act-now/:actionParam": "getAction",
      "my-actions"          : "getMyActions"
    },

    getTopicActions: function() {
      if (pathname() == "/") { return new TA.TopicIndexView(); }                  // This could be an action on a separate "TopicsRouter"

      var self = this;
      var topic = findTopic();

      self.$header().html(new TA.TopicHeader({ model: topic }).el);      // Set new header
      self.topicShowView(topic);                                                  // Set main content

      return null;
    },

    getMyActions: function() {
      var self = this;
      var topic = findTopic();
    },

    getAction: function(actionParam) {
      var self = this;
      var action = TA.Actions.findByParam(actionParam);
      var actionView, viewOptions;

      TA.Console.log("routed to show", action);

      if (self.cohort().isControl()) {
        navigateOffSite(action.get('url'));
      } else {
        self.$header().html(new TA.ActionHeader({ model: action }).el);  // Set new header
        viewOptions = _.extend(self.options, { model: action, id: 'act-now' });
        actionView = new TA.ActionShowView(viewOptions);                          // Set main content
        self.$action().html(actionView.el);
      }
    },

    topicShowView: function(topic) {
      var self = this;

      if (!self._view) {
        self._view = new TA.TopicShowView({ model: topic });                      // Cache the topic show page
        return self._view;
      } else {
        return self._view.render();
      }
    },

    $header: function() {
      return $("#header .container");
    },

    $action: function() {
      return $('#action');
    },

    $topic: function() {
      return $('#topic');
    }

  }, {

    start: function(options) {
      new this(options);
      Backbone.history.start();
    }

  });

  function pathname() {
    return window.location.pathname;
  }

  function findTopic() {
    return TA.Topics.findByPathname(pathname());
  }

  function navigateOffSite(url) {
    window.location = action.get('url');
  }

})();
