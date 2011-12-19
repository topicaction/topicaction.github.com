(function() {
  TA.Action = Backbone.Model.extend({

    topic: function() {
      return TA.Topics.findByPathname(this.get('topic_pathname'));
    },

    topicTitle: function() {
      return this.topic().get('title');
    },

    src: function() {
      return this.get('src');
    },

    type: function() {
      return this.get('type') || this.topic().actionType() || 'blank';
    }
  });

  TA.ActionCollection = Backbone.Collection.extend({
    model: TA.Action,

    url: '/javascripts/data/actions.json',

    findByParam: function(param) {
      return this.find(function(action) { return action.get("param") == param; });
    },

    findByPathnameAndParam: function(pathname, param) {
      return this.find(function(action) { return action.get("topic_pathname") == pathname && action.get("param") == param; });
    },

    findAllByTopic: function(topic) {
      return this.select(function(action) {
        return action.get("topic_pathname") == topic.get("pathname");
      });
    }
  });

  TA.Actions = new TA.ActionCollection;

  TA.Actions.fetch({
    async: false
  });

})();