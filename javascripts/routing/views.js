(function() {
  // To experiment with mustache-style templates:
  // _.templateSettings = {
  //   evaluate    : /\{%([\s\S]+?)%\}/g,
  //   interpolate : /\{\{([\s\S]+?)\}\}/g,
  //   escape      : /\{-([\s\S]+?)-\}/g
  // };

  $.fn.disableLink = function() {
    this.addClass('disabled').click(function() {
      return false;
    });
  };

  TA.UserHeader = Backbone.View.extend({
    initialize: function() {
      this.render();
    },

    render: function() {
      var self = this;
      $(self.el).html($("#user-header-template").html());
      return self;
    }
  });

  TA.TopicHeader = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.render();
    },

    render: function() {
      var self = this;
      var $el  = $(self.el);
      var html = _.template('<h1><%= title %></h1>', { title: self.model.get('title') });
      $el.html(html);
      return self;
    }
  });

  TA.ActionHeader = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      _.bindAll(self, 'viewIndex', 'render', 'didIt', 'doLater', 'viewIndex');
      self.render();
    },

    events: {
      "click a.act-later-link"  : "doLater",
      "click a.did-it-link"     : "didIt",
      "click a.view-index"      : "viewIndex"
    },

    render: function() {
      var self = this;
      var $el  = $(self.el);
      var html = _.template($('#act-now-header-template').html(), { action: self.model, cohort: TA.user.cohort });
      $el.html(html);
      return self;
    },

    viewIndex: function(event) {
      this.trigger('viewIndex', event);
    },

    didIt: function(event) {
      var $target = $(event.target);

      TA.user.mixpanel.track('clicked button', { text: $target.text() });
      $target.text('Done!');
      $('.btn.act-later-link').disableLink();   // disable other button
    },

    doLater: function(event) {
      TA.user.mixpanel.track('clicked button', { text: $(event.target).text() });
      $('.btn.did-it-link').disableLink();  // disable other button
    }

  });

  TA.TopicIndexView = Backbone.View;

  TA.TopicShowView = Backbone.View.extend({
    initialize: function(options) {
      var self = this;
      _.bindAll(self, "render", "fadeIn", "fadeOut");
      self.render();
    },

    el: '#topic',

    events: {
      "click a.action"  : "fadeOut"
    },

    render: function() {
      var self = this;
      var $el   = $(self.el);
      self.$('.list-items').replaceWith(new TA.ActionListView({ model: this.model, className: 'list-items' }).el);
      $el.show();
      return self;
    },

    fadeIn: function() { $(this.el).fadeIn('fast'); },

    fadeOut: function() { $(this.el).fadeOut('fast'); }

  });

  TA.ActionListView = Backbone.View.extend({
    initialize: function() {
      _.bindAll(this, 'render');
      this.template = _.template($('#action-list-template').html());
      this.render();
    },

    render: function() {
      var self = this;
      var $el = $(self.el);
      $el.html(self.template({ topic: self.model }));
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

      // self.preventIframeBust(); // Trial solution to iframe busting sites
      $iframe = self.renderIframe(self.model.src(), $el.height());
      $el.html($iframe);

      return self;
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

  TA.DoActionLaterView = Backbone.View.extend({
    initialize: function(options) {
      options = options || {};
      var self = this;
      self.onComplete = options.onComplete || function() {};
      self.render();
    },

    render: function() {
      var self = this;
      var html = _.template($("#wufoo-do-later-template").html(), { action: this.model });
      $.fancybox(html, { onClosed: this.onComplete });
      return this;
    }
  });

  TA.ActionDoneView = Backbone.View.extend( {
    initialize: function ( options ) {
      var self = this;

      options = options || {};

      self.onComplete = options.onComplete || function () {};
      self.render();
    },

    render: function () {
      var self = this
        , html;

      html = _.template( $( '#wufoo-done-template' ).html(), { action: self.model } );

      $.fancybox(html, { onClosed: self.onComplete });
      return this;
    }
  });

})();