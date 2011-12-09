(function() {
  TA.Action = Backbone.Model;

  TA.ActionCollection = Backbone.Collection.extend({
    model: TA.Action,

    findByParam: function(param) {
      return this.find(function(action) { return action.get("param") == param; });
    }
  });

  TA.Actions = new TA.ActionCollection;

  TA.Actions.add([
    {
      param : "bring-change",
      title : "Bring all your change to the bank",
      url   : "http://bucks.blogs.nytimes.com/2011/06/02/banks-where-you-can-still-count-your-change/"
    },
    {
      param : "price-check",
      title : "Price check in-store items on Amazon for a 5% discount",
      url   : "http://www.amazon.com/gp/feature.html?docId=1000749751"
    },
    {
      param : "bill-savings",
      title : "A bill by bill guide to save money on your monthly",
      url   : "http://lifehacker.com/5823762/a-bill+by+bill-guide-to-saving-money-on-your-monthly-expenses"
    },
    {
      param : "direct-deposit",
      title : "Split your direct deposit to automatically save",
      url   : "http://finlit.blogspot.com/2009/02/savings-tip-of-day-split-your-direct.html"
    }
  ]);

})();