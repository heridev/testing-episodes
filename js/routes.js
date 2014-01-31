var Router = Backbone.Router.extend({

  routes: {
    ''            :   'home',
  },

  home:  function(){
    kindles = new KindlesCollection();
    kindles.fetch({
      dataType: 'jsonp',
      data: { page: 1 },
      success: function(data, response, jqXHR){
        var pageInfo = {
          renderMethod: 'html',
          current_page: response.current_page,
          perPage: response.perPage,
          total_page: response.total_pages
        }
        var kindlesView = new KindlesView({
          pageInfo: pageInfo,
          collection: response.models,
          el: $('.body_container')
        });
        kindlesView.render();
      }
    });
  },
});
