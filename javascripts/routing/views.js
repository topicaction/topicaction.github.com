(function() {

  // _.templateSettings = {
  //   evaluate    : /<%([\s\S]+?)%>/g,
  //   interpolate : /<%=([\s\S]+?)%>/g,
  //   escape      : /<%-([\s\S]+?)%>/g
  // };
  // _.templateSettings = {
  //   evaluate    : /\{%([\s\S]+?)%\}/g,
  //   interpolate : /\{\{([\s\S]+?)\}\}/g,
  //   escape      : /\{-([\s\S]+?)-\}/g
  // };

  TA.ActionIndexView = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      _.bindAll(self, "render", "fadeIn", "fadeOut");
      self.render();
    },

    el: '#topic',

    render: function() {
      this.fadeIn();
    },

    fadeIn: function() {
      $(this.el).fadeIn();
    },

    fadeOut: function(callback) {
      $(this.el).fadeOut('slow', callback);
    },

    animateAction: function(anchor) {
      var $li = $(anchor).parents("li");
      var $liClone = $li.clone();
      $liClone.appendTo('body');
        $liClone.css({
        "position": "absolute",
        "top": $li.position().top+'px',
        "left": $li.position().left+'px'
      }).show();
      $liClone.animate({ top: 0, 'opacity': 0 });
    }
  });

  TA.ActionShowView = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      self.options = options || {};
      _.bindAll(self, "render", "remove", "newAction");
      self.render();
    },

    events: {
      "click a.view-index" : "remove",
      "click a.add-action" : "newAction"
    },

    render: function() {
      var self      = this;
      var $el       = $(self.el);
      var template  = _.template($('#act-now-template').html());
      var $viewHtml = template({ title: self.model.get('title') });
      var $iframe;

      // Trial solution to iframe busting sites
      // self.preventIframeBust();

      $el.html($viewHtml);
      $iframe = self.renderIframe(self.model.get("url"), $el.height());
      $el.append($iframe);

      return self;
    },

    newAction: function() {
      TA.addAction({ mixpanel: this.options.mixpanel });
      return false;
    },

    displayAfter: function(sibling) {
      var self = this, $el = $(self.el);
      $el.css({"opacity": 0, "display": "block"});
      $(sibling).after($el);
      $el.animate({"opacity": 1});
    },

    renderIframe: function(url, height) {
      var $iframe   = $("<iframe />");
      $iframe.attr("src", url);
      $iframe.width("100%");
      $iframe.height($(window).height() - height);
      $iframe.attr({
        "frameborder":"0",
        "noresize":"noresize"
      });
      return $iframe;
    },

    preventIframeBust: function() {
      var prevent_bust = 0;
      window.onbeforeunload = function() { prevent_bust++; };
      setInterval(function() {
        if (prevent_bust > 0) {
          prevent_bust -= 2;
          window.top.location = 'http://localhost:9292';  // responds with 204
        }
      }, 1);
    }

  });

})();