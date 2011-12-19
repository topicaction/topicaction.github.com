(function() {
  TA.Topic = Backbone.Model.extend({

    actions: function() {
      var self = this;
      if (self._actions) return self._actions;
      return (self._actions = new TA.ActionCollection(TA.Actions.findAllByTopic(self)));
    },

    actionType: function() {
      return this.get('action_type');
    }

  });

  TA.TopicCollection = Backbone.Collection.extend({
    model: TA.Topic,

    url: '/javascripts/data/topics.json',

    findByPathname: function(pathname) {
      return this.find(function(topic){ return topic.get('pathname') == pathname; });
    }

  });

  TA.Topics = new TA.TopicCollection;

  TA.Topics.fetch({
    async: false
  });

})();