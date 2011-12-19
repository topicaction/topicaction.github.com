(function() {

  TA.ActionsRouter = Backbone.Router.extend({
    initialize: function(user) {
      var self = this;
      self.currentUser = user || {};

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
      return this.currentUser.cohort;
    },

    routes: {
      ""                        : "getTopicActions",
      "act-now/:actionParam"    : "getAction",
      "my-actions"              : "getMyActions",
      "act-later/:actionParam"  : "getActLater"
    },

    getTopicActions: function() {
      if (pathname() == "/") { return new TA.TopicIndexView(); }                  // This could be an action on a separate "TopicsRouter"
      TA.Console.log("routed to getTopicActions", pathname());

      var self = this;
      var topic = findTopic();

      self.$header().html(new TA.TopicHeader({ model: topic }).el);      // Set new header
      self.topicShowView(topic);                                                  // Set main content

      return null;
    },

    getMyActions: function() {
      var self = this;
      var topic = findTopic();
      TA.Console.log("routed to getMyActions");
    },

    getAction: function(actionParam) {
      var self = this;
      var action = TA.Actions.findByPathnameAndParam(pathname(), actionParam);
      var actionView, viewOptions;

      TA.Console.log("routed to getAction", action);
      self.currentUser.mixpanel.trackActionView(action);

      if (self.cohort().isControl()) {
        navigateOffSite(action.src());
      } else {
        self.$header().html(new TA.ActionHeader({ model: action }).el);           // Set new header
        viewOptions = _.extend(self.currentUser, { model: action, id: 'act-now' });
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

    getActLater: function(actionParam) {
      var self = this;
      var action = TA.Actions.findByPathnameAndParam(pathname(), actionParam);
      self.currentUser.mixpanel.trackClick('Do later');

      // renders in fancybox

      new TA.DoActionLaterView({
        model: action,
        onComplete: function() {
          self.navigate('act-now/' + actionParam);
        }
      });
      return false;
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

    start: function(user) {
      new this(user);
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
    window.location = url;
  }

})();
