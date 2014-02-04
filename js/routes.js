var Router = Backbone.Router.extend({

  routes: {
    ''            :   'home',
    'add-kindle'  :   'addKindle'
  },

  home:  function(){
    var _this = this;
    kindles = new KindlesCollection();
    kindles.fetch({
      data: { page: 1 },
      success: function(data, response, jqXHR){
        var pageInfo = {
          renderMethod: 'html',
          current_page: response.current_page,
          perPage: response.perPage,
          total_page: response.total_pages
        }
        var currentView = new KindlesView({
          pageInfo: pageInfo,
          collection: response.models,
        });
        _this.renderPage(currentView);
      }
    });
  },

  addKindle: function(){
    this.renderPage(new addKindleView);
  },

  renderPage: function(view){
    console.log
    $('.body_container').empty().html(view.render().el);
  }
});
