var KindleView = Backbone.View.extend({

  initialize: function(options){
    this.render_method = (options.render_method || 'append')
  },

  tagName: 'article',

  events: {
    'click .edit-kindle'    :   'editKindle',
    'click .remove-kindle'  :   'removeKindle'
  },

  render: function(){
    var _this = this;
    this.$el.loadFromTemplate({
      template: 'kindle_details',
      data: _this.model,
      extension: '.html',
      async_mode: false,
      path: 'templates/'
    })
    return this;
  },

  removeKindle: function(event){
    event.preventDefault();
    var element = this.$(event.currentTarget).closest('div');
    kindle = this.setKindle(element);

    if(confirm('Esta seguro que desea eliminar este kindle?')){
      kindle.destroy({
        success: function(model, response){
          element.remove();
        },
        error: function(model, response){
          alert('ocurrio un error al momento de eliminar el kindle');
        }
      })
    }
  },

  editKindle: function(event){
    event.preventDefault();
    var element = this.$(event.currentTarget).closest('div');
    kindle = this.setKindle(element);

    kindle.fetch({
      success: function(){
        var view = new kindleEditView({
          model: kindle
        });
        element.html(view.render().el);
      }
    })
  },

  setKindle: function(element){
    var kindleId = element.attr('id');

    return new KindleModel({
      id: kindleId
    })
  }
});
