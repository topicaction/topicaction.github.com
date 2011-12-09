(function() {
  TA.Topic = Backbone.Model;

  TA.TopicCollection = Backbone.Collection.extend({
    model: TA.Topic
  });

  TA.Topics = new TA.TopicCollection;

  TA.Topics.add([
    {
      title       : "Texting while driving awareness"
      description : "Actions you can do today to increase driver safety and stop texting while driving."
    },
    {
      title       : "5 free money tips you can do right now",
      description : "Actions you can do today to save money."
    },
    {
      title       : "5 things to help the homeless in New York City",
      description : "Actions you can do today to help combat homelessness in New York City"
    },
    {
      title       : "Occupy Wall Street"
      description : "Actions you can do today to help support Occupy Wall Street"
    },
    {
      title       : "Stop SOPA / PIPA",
      description : "Actions you can do today to stop SOPA and PIPA from passing."
    }
  ]);

})();