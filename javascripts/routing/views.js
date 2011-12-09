(function() {

  TA.ActNowView = Backbone.View.extend({

    el: '#act-now',

    render: function() {
      var self      = this;
      var $el       = $(self.el);
      var template  = _.template($('#act-now-view').html());

      $el.html(template({ action: self.model })).show();
      $el.append(self.renderIframe());
      return self;
    },

    renderIframe: function() {
      var action    = this.model;
      var $iframe   = $("<iframe />");

      $iframe.attr("src", action.get("url"));
      $iframe.width("100%");
      $iframe.height("500px");
      return $iframe;
    }

  });

})();