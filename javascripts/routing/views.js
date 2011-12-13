(function() {
  // To experiment with mustache-style templates:
  // _.templateSettings = {
  //   evaluate    : /\{%([\s\S]+?)%\}/g,
  //   interpolate : /\{\{([\s\S]+?)\}\}/g,
  //   escape      : /\{-([\s\S]+?)-\}/g
  // };

  // render() no-op for topic index view
  TA.Header = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      _.bindAll(self, 'viewIndex', 'render');
      options = options || {};
      self.html = options.html;
    },

    events: {
      "click a.did-it"      : "didIt",
      "click a.add-action"  : "saveForLater",
      "click a.view-index"  : "viewIndex"
    },

    el: '#header',

    render: function() {
      var self      = this;
      var template  = _.template($("#header-template").html());
      var $el       = $(self.el);
      $el.children().fadeOut('fast');
      $el.html(template({ html: self.html })).show();
      return self;
    },

    viewIndex: function(event) {
      this.trigger('viewIndex', event);
    },

    didIt: function(event) {
      $(event.target).text('Done!');
      return false;
    },

    saveForLater: function() {
      TA.saveForLater({ mixpanel: TA.user.mixpanel });
      return false;
    }
  });

  TA.Header.update = function(options) {
    options = options || {};
    if (!this._instance) { this._instance = new this(options); }
    this._instance.html = options.html;
    return this._instance.render();
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
      var headerHtml = _.template('<h1><%= title %></h1>', { title: this.model.get('title') });

      // Reaching outside of view to set header content
      TA.Header.update({ html: headerHtml });

      self.$('.list-items').replaceWith(new TA.ActionListView({ model: this.model, className: 'list-items' }).el);
      self.fadeIn();
      return self;
    },

    fadeIn: function() { $(this.el).fadeIn('fast'); },

    fadeOut: function(callback) { $(this.el).fadeOut('fast', callback); },

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
      _.bindAll(self, "render", "remove");
      self.render();
    },

    render: function() {
      var self        = this;
      var $el         = $(self.el);
      var $iframe;

      self.renderHeader();

      // self.preventIframeBust(); // Trial solution to iframe busting sites
      $iframe = self.renderIframe(self.model.get("url"), $el.height());
      $el.html($iframe);

      return self;
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

    renderHeader: function() {
      var self = this;
      var headerHtml  = _.template($('#act-now-header-template').html(), { action: self.model });
      self.header = TA.Header.update({ html: headerHtml });
      self.header.bind('viewIndex', function(event) {
        self.remove();
        return false;
      });
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