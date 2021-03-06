(function(){
  window.Backbone.UI.Button = Backbone.View.extend({
    options : {
      tagName : 'a',

      // true will disable the button
      // (muted non-clickable) 
      disabled : false,

      // true will activate the button
      // (depressed and non-clickable)
      active : false,

      hasBorder : true,

      // A callback to invoke when the button is clicked
      onClick : null,

      // renders this button as an input type=submit element as opposed to an anchor.
      isSubmit : false
    },

    initialize : function() {
      this.mixin([Backbone.UI.HasModel]);

      _(this).bindAll('render');

      $(this.el).addClass('button');

      $(this.el).bind('click', _(function(e) {
        if(!this.options.disabled && !this.options.active && this.options.onClick) {
          this.options.onClick(e); 
        }
        return false;
      }).bind(this));
    },

    render : function() {
      var labelText = this.resolveContent();

      this._observeModel(this.render);

      $(this.el).empty();
      $(this.el).toggleClass('has_border', this.options.hasBorder);

      if(this.options.isSubmit) {
        $.el.input({
          type : 'submit',
          value : ''
        }).appendTo(this.el);
      }

      this.el.appendChild($.el.span({className : 'label'}, labelText));

      // add appropriate class names
      this.setEnabled(!this.options.disabled);
      this.setActive(this.options.active);

      return this;
    },

    // sets the enabled state of the button
    setEnabled : function(enabled) {
      if(enabled) {
        this.el.href = '#';
      } else { 
        this.el.removeAttribute('href');
      }
      this.options.disabled = !enabled;
      $(this.el)[enabled ? 'removeClass' : 'addClass']('disabled');
    },

    // sets the active state of the button
    setActive : function(active) {
      this.options.active = active;
      $(this.el)[active ? 'addClass' : 'removeClass']('active');
    }
  });
}());

