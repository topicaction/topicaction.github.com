(function() {
  TA.Action = Backbone.Model.extend({

    topic: function() {
      return TA.Topics.findByPathname(this.get('topic_pathname'));
    },

    topicTitle: function() {
      return this.topic().get('title');
    }
  });

  TA.ActionCollection = Backbone.Collection.extend({
    model: TA.Action,

    findByParam: function(param) {
      return this.find(function(action) { return action.get("param") == param; });
    },

    findAllByTopic: function(topic) {
      return this.select(function(action) {
        return action.get("topic_pathname") == topic.get("pathname");
      });
    }
  });

  TA.Actions = new TA.ActionCollection;

  // Money Saving Tips
  TA.Actions.add([
    {
      param : "bring-change",
      title : "Bring all your change to the bank",
      url   : "http://bucks.blogs.nytimes.com/2011/06/02/banks-where-you-can-still-count-your-change/",
      topic_pathname: '/money-saving-tips.html'
    },
    {
      param : "price-check",
      title : "Price check in-store items on Amazon for a 5% discount",
      url   : "http://www.amazon.com/gp/feature.html?docId=1000749751",
      topic_pathname: '/money-saving-tips.html'
    },
    {
      param : "bill-savings",
      title : "A bill by bill guide to save money on your monthly",
      url   : "http://lifehacker.com/5823762/a-bill+by+bill-guide-to-saving-money-on-your-monthly-expenses",
      topic_pathname: '/money-saving-tips.html'
    },
    {
      param : "direct-deposit",
      title : "Split your direct deposit to automatically save",
      url   : "http://finlit.blogspot.com/2009/02/savings-tip-of-day-split-your-direct.html",
      topic_pathname: '/money-saving-tips.html'
    }
  ]);

  // Occupy Wall Street
  TA.Actions.add([
    {
      param : "move-to-credit-union",
      title : "Move your money from a big bank to a credit union",
      url   : "http://moveyourmoneyproject.org/find-bankcredit-union",
      user_count: 83,
      relevancy: 4.6,
      topic_pathname: '/occupy-wall-st.html'
    },
    {
      param : "send-credit-card-offers-back",
      title : "Send unsolicited credit card offers back to the banks",
      url   : "http://www.youtube.com/watch?v=2JlxbKtBkGM&feature=youtu.be",
      user_count: 93,
      relevancy: 4.1,
      topic_pathname: '/occupy-wall-st.html'
    },
    {
      param : "attend-a-rally",
      title : "Attend a rally",
      url   : "http://en.wikipedia.org/wiki/List_of_Occupy_movement_protest_locations",
      user_count  : 47,
      relevancy   : 3.8,
      topic_pathname: '/occupy-wall-st.html'
    },
    {
      param : "add-a-twibbon",
      title : "Add a Twibbon (twitter ribbon) to your twitter picture",
      url   : "http://twibbon.com/join/i-support-occupy-wall-st",
      user_count  : 38,
      relevancy   : 3.7,
      topic_pathname: '/occupy-wall-st.html'
    },
    {
      param : "donate-to-ows",
      title : "Donate to Occupy Wall Street",
      url   : "http://occupywallst.org/donate/",
      user_count  : 11,
      relevancy   : 3.2,
      topic_pathname: '/occupy-wall-st.html'
    },
    {
      param : "join-facebook-group-ows",
      title : "Join the group on Facebook",
      url   : "http://www.facebook.com/OccupyWallSt",
      user_count  : 59,
      relevancy   : 3.1,
      topic_pathname: '/occupy-wall-st.html'
    }
  ]);

  // Stop SOPA
  TA.Actions.add([
    {
      param : "sopa-video-intro",
      title : "Watch a short video to learn more",
      url   : "http://vimeo.com/31100268",
      user_count  : 83,
      relevancy   : 4.6,
      topic_pathname: '/stop-sopa.html'
    },
    {
      param : "sopa-infographic",
      title : "Check out this infographic",
      url   : "http://americancensorship.org/infographic.html",
      user_count  : 93,
      relevancy   : 4.1,
      topic_pathname: '/stop-sopa.html'
    },
    {
      param : "sopa-call-senator",
      title : "Call your senator",
      url   : "http://americancensorship.org/callwidget",
      user_count  : 47,
      relevancy   : 3.8,
      topic_pathname: '/stop-sopa.html'
    },
    {
      param : "sopa-write-congress",
      title : "Write to Congress",
      url   : "http://act.fightforthefuture.org/page/speakout/pipa",
      user_count  : 38,
      relevancy   : 3.7,
      topic_pathname: '/stop-sopa.html'
    },
    {
      param : "sopa-filibuster",
      title : "Ask Senator Wyden to read your name during his filibuster",
      url   : "http://stopcensorship.org/",
      user_count  : 11,
      relevancy   : 3.2,
      topic_pathname: '/stop-sopa.html'
    },
    {
      param : "sopa-filibuster",
      title : "Sign this whitehouse.gov petition",
      url   : "https://wwws.whitehouse.gov/petitions#!/petition/stop-e-parasite-act/SWBYXX55",
      user_count  : 59,
      relevancy   : 3.1,
      topic_pathname: '/stop-sopa.html'
    }
  ]);

  // Stop Bullying
  TA.Actions.add([
    {
      param : "bulling-facts",
      title : "Get the facts about bullying",
      url   : "http://www.stopbullying.gov/",
      user_count  : 83,
      relevancy   : 4.6,
      topic_pathname: '/stop-bullying.html'
    },
    {
      param : "anti-bulling-pledge",
      title : "Sign the Anti-Bullying pledge",
      url   : "http://www.drphil.com/page/students/",
      user_count  : 93,
      relevancy   : 4.1,
      topic_pathname: '/stop-bullying.html'
    },
    {
      param : "it-gets-better-video",
      title : "Watch and share an It Gets Better video",
      url   : "http://www.itgetsbetter.org",
      user_count  : 47,
      relevancy   : 3.8,
      topic_pathname: '/stop-bullying.html'
    },
    {
      param : "self-defense-tips",
      title : "Get some basic self-defense tips",
      url   : "http://lifehacker.com/5825528/basic-self+defense-moves-anyone-can-do-and-everyone-should-know_",
      user_count  : 38,
      relevancy   : 3.7,
      topic_pathname: '/stop-bullying.html'
    },
    {
      param : "stop-bulling-comic",
      title : "Make your own Stop Bullying comic",
      url   : "http://stopbullying.bitstrips.com/challenge/",
      user_count  : 59,
      relevancy   : 3.1,
      topic_pathname: '/stop-bullying.html'
    }
  ]);

  // NYC Homeless
  TA.Actions.add([
    {
      param : "volunteer-soup-kitchen",
      title : "Volunteer at a soup kitchen",
      url   : "http://www.foodbanknyc.org/how-you-can-help/volunteer",
      user_count  : 83,
      relevancy   : 4.6,
      topic_pathname: '/new-york-city-homeless.html'
    },
    {
      param : "plan-food-drive",
      title : "Plan a food drive",
      url   : "http://www.cityharvest.org/donate-food/donation-drives",
      user_count  : 93,
      relevancy   : 4.1,
      topic_pathname: '/new-york-city-homeless.html'
    },
    {
      param : "donate-virtual-can",
      title : "Donate a virtual can",
      url   : "https://www.nyccah.org/civicrm/contribute/transact?reset=1&id=7",
      user_count  : 47,
      relevancy   : 3.8,
      topic_pathname: '/new-york-city-homeless.html'
    },
    {
      param : "set-aside-housing-for-homeless-children",
      title : "Write a letter to Mayor Bloomberg to set aside housing for homeless children",
      url   : "http://www.coalitionforthehomeless.org/page/speakout/one-in-three-solution?js=false",
      user_count  : 38,
      relevancy   : 3.7,
      topic_pathname: '/new-york-city-homeless.html'
    },
    {
      param : "offer-leftover-food",
      title : "Offer leftover food from a catered event to a nearby shelter",
      url   : "http://g.co/maps/97hzf",
      user_count  : 59,
      relevancy   : 3.1,
      topic_pathname: '/new-york-city-homeless.html'
    }
  ]);

  // Driving while texting

  TA.Actions.add([
    {
      param : "driving-while-texting-facts",
      title : "Get the facts about texting while driving",
      url   : "http://distraction.gov",
      user_count  : 83,
      relevancy   : 4.6,
      topic_pathname: '/driving-while-texting.html'
    },
    {
      param : "driving-while-texting-video",
      title : "Watch this shocking PSA about texting while driving",
      url   : "http://www.youtube.com/watch?v=DGE8LzRaySk",
      user_count  : 93,
      relevancy   : 4.1,
      topic_pathname: '/driving-while-texting.html'
    },
    {
      param : "no-phone-zone-pledge",
      title : "Take Oprah's No Phone Zone pledge",
      url   : "http://www.oprah.com/questionaire/ipledge.html?id=4",
      user_count  : 47,
      relevancy   : 3.8,
      topic_pathname: '/driving-while-texting.html'
    },
    {
      param : "lobby-for-local-laws",
      title : "Lobby for local laws",
      url   : "http://www.textfreedriving.org/",
      user_count  : 38,
      relevancy   : 3.7,
      topic_pathname: '/driving-while-texting.html'
    },
    {
      param : "driving-while-texting-talk-to-your-kids",
      title : "Talk to your kids about texting while driving",
      url   : "/talk-to-your-kids.html",
      user_count  : 11,
      relevancy   : 3.1,
      topic_pathname: '/driving-while-texting.html'
    },
    {
      param : "driving-while-texting-employer-policy",
      title : "If you're an employer, adopt an employee no-texting policy",
      url   : "employer-pledge.html",
      user_count  : 59,
      relevancy   : 3.1,
      topic_pathname: '/driving-while-texting.html'
    }
  ]);

})();