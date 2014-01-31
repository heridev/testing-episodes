var KindlesView = Backbone.View.extend({

  initialize: function(options){
    this.pageInfo = options.pageInfo;
    var _this = this;
    $(window).bind('scroll', function(event){
      _this.checkScroll();
    });
  },

  events: {
    'click #load-more-kindles'    :   'loadMoreKindles'
  },

  checkScroll: function(){
    if($(window).innerHeight() + $(window).scrollTop() >= $('body').height()){
      this.getMoreKindles();
    }
  },

  render: function(){
    this.template();
  },

  template: function(){
    var _this = this;
    console.log(this);
    this.$el.loadFromTemplate({
      template: 'kindles',
      data: { current_page: _this.pageInfo['current_page'] },
      render_method: this.pageInfo['renderMethod'],
      extension: '.html',
      path: 'templates/',
      callback: function(){
        _this.addAllKindles(_this.collection);
      }
    });
  },

  loadMoreKindles: function(event){
    event.preventDefault();
    this.getMoreKindles();
  },

  getMoreKindles: function(){
    var next_page = this.pageInfo['current_page'] + 1;
    this.removeButtonIfLastPage();
    var _this = this;
    kindles = new KindlesCollection();
    kindles.fetch({
      data: { page:  next_page },
      dataType: 'jsonp',
      success: function(data, response, jqXHR){
        _this.pageInfo['current_page'] = response.current_page,
        _this.pageInfo['total_pages'] = response.total_pages,
        _this.addAllKindles(response.models);
      },
      error: function(){
        alert('ocurrio un error intentelo mas tarde..');
      }
    });
  },


  removeButtonIfLastPage: function(){
    if(this.pageInfo['total_pages'] == this.pageInfo['current_page']){
      $('#load-more-kindles').remove();
    }
  },

  addAllKindles: function(models){
    _.each(models, function(kindle){
      new KindleView( { model: kindle, el: $('#kindles-list') } );
    })
  }

});
