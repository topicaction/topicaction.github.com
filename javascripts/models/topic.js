(function() {
  TA.Topic = Backbone.Model.extend({
    actions: function() {
      var self = this;
      if (self._actions) return self._actions;

      return (self._actions = new TA.ActionCollection(TA.Actions.findAllByTopic(self)));
    }

  });

  TA.TopicCollection = Backbone.Collection.extend({
    model: TA.Topic,

    findByPathname: function(pathname) {
      return this.find(function(topic){ return topic.get('pathname') == pathname; });
    }

  });

  TA.Topics = new TA.TopicCollection;

  TA.Topics.add([
    {
      title       : "Texting while driving awareness",
      description : "Actions you can do today to increase driver safety and stop texting while driving.",
      pathname    : "/driving-while-texting.html"
    },
    {
      title       : "Free money tips now",
      description : "Actions you can do today to save money.",
      pathname    : "/money-saving-tips.html"
    },
    {
      title       : "5 things to help the homeless in New York City",
      description : "Actions you can do today to help combat homelessness in New York City",
      pathname    : "/new-york-city-homeless.html"
    },
    {
      title       : "Occupy Wall Street",
      description : "Actions you can do today to help support Occupy Wall Street",
      pathname    : "/occupy-wall-st.html"
    },
    {
      title       : "Occupy Wall St.",
      description : "Actions you can do today to help support Occupy Wall Street",
      pathname    : "/occupy-wall-st-v.html"
    },
    {
      title       : "Occupy Wall Street (OWS)",
      description : "Actions you can do today to help support Occupy Wall Street",
      pathname    : "/occupy-wall-st-r.html"
    },
    {
      title       : "Stop SOPA / PIPA",
      description : "Actions you can do today to stop SOPA and PIPA from passing.",
      pathname    : "/stop-sopa.html"
    },
    {
      title       : "Stop Bullying",
      description : "Actions you can do today to help stop bullying.",
      pathname    : "/stop-bullying.html"
    },
    {
      title       : "Stop Bullying Now",
      description : "Actions you can do today to help stop bullying.",
      pathname    : "/stop-bullying-v.html"
    },
    {
      title       : "Help Stop Bullying",
      description : "Actions you can do to help stop bullying.",
      pathname    : "/stop-bullying-r.html"
    }
  ]);

})();