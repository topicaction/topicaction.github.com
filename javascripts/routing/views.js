(function() {
  // To experiment with mustache-style templates:
  // _.templateSettings = {
  //   evaluate    : /\{%([\s\S]+?)%\}/g,
  //   interpolate : /\{\{([\s\S]+?)\}\}/g,
  //   escape      : /\{-([\s\S]+?)-\}/g
  // };

  // render() no-op for topic index view
  TA.Header = {
    html: function(html) {
      $('#header').show().find('.container').html(html);
    }
  };

  TA.TopicIndexView = Backbone.View;

  TA.TopicShowView = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      _.bindAll(self, "render", "fadeIn", "fadeOut");
    },

    el: '#topic',

    render: function() {
      var self = this;

      // Reaching outside of view to set header content
      TA.Header.html(_.template('<h1><%= title %></h1>', { title: this.model.get('title') }));

      self.$('.list-items').replaceWith(new TA.ActionListView({ model: this.model, className: 'list-items' }).el);
      self.fadeIn();
      return self;
    },

    fadeIn: function() { $(this.el).fadeIn(); },

    fadeOut: function(callback) { $(this.el).fadeOut('slow', callback); },

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

  TA.ActionListView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function() {
      var self = this;
      var $el = $(self.el);
      var template = _.template($('#action-list-template').html());
      $el.html(template({ topic: self.model }));
      $el.highlightVisitedLinks();
      return self;
    }
  });

  TA.ActionShowView = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      self.options = options || {};
      _.bindAll(self, "render", "remove", "newAction");
      self.render();

      $('#header').on('click', 'a.view-index', this.remove);  // preferably should not bind outside of scope
    },

    events: {
      "click a.add-action" : "newAction"
    },

    render: function() {
      var self        = this;
      var $el         = $(self.el);
      var headerTmpl  = _.template($('#act-now-header-template').html());
      var $iframe;

      TA.Header.html(headerTmpl({ action: self.model }));

      // self.preventIframeBust(); // Trial solution to iframe busting sites
      $iframe = self.renderIframe(self.model.get("url"), $el.height());
      $el.html($iframe);

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