(function() {

  TA.ActionsRouter = Backbone.Router.extend({
    initialize: function(options) {
      this.options = options || {};

      $("#header").after(new TA.UserHeader({ id: "#user" }).el);
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

      $("#action").empty();                                                       // Clean up previous view
      $('#header .container').html(new TA.TopicHeader({ model: topic }).el);      // Set new header
      self.topicShowView(topic);                                                  // Set main content

      return null;
    },

    getMyActions: function() {
      var self = this;
      var topic = findTopic();

      $("#action").empty();
      $("#topic").fadeOut();
    },

    getAction: function(actionParam) {
      var self = this;
      var action = TA.Actions.findByParam(actionParam);
      var actionView, viewOptions;

      TA.Console.log("routed to show", action);

      if (self.cohort().isControl()) {
        navigateOffSite(action.get('url'));
      } else {
        self.topicShowView().fadeOut();                                           // Clean up previous view
        $("#header .container").html(new TA.ActionHeader({ model: action, }).el);  // Set new header
        viewOptions = _.extend(self.options, { model: action, id: 'act-now' });
        actionView = new TA.ActionShowView(viewOptions);                          // Set main content
        $("#action").html(actionView.el);
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
