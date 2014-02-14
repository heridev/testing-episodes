var Router = Backbone.Router.extend({

  routes: {
    ""                 : "login",
    "kindles"          : "manageKindles",
    "add-kindle"       : "addKindle",
    "logout"           : "logOut",
    "*path"            : "authenticateUser",
  },

  login: function(){
    this.addUserToken();
    this.renderPage(new LoginView);
  },

  logOut: function(){
    var userLogOut = ServerUrl + '/api/sessions/destroy?access_token=';
    var user_token = UserToken || $.cookie('UserToken')
    $.ajax({
      url: userLogOut + user_token,
      success: function(resp) {
        UserToken = '';
        $.removeCookie('UserToken');
        $('#main-menu').html('');
        KindlesApp.Router.navigate('', { trigger: true});
      }
    });
  },

  authenticateUser: function(){
    var url =   window.document.URL;
    var acToken =   this.getTokensFromUrl(url, 'access_token');
    this.validateToken(acToken);
  },

  validateToken: function(access_token){
    var _this = this;
    var userAuthUrl = ServerUrl + '/api/sessions/create?access_token=';
    $.ajax({
      url: userAuthUrl + access_token,
      success: function(resp) {
        UserToken = access_token;
        $.cookie('UserToken', access_token, { expires: 1 });
        _this.loadLayoutOptions();
        var router = new Router;
        router.navigate('kindles', { trigger: true});
      }
    });
  },

  loadLayoutOptions: function(){
    $('#main-menu').loadFromTemplate({
      template : 'menu',
      extension : ".html",
      render_method: 'html',
      data: {},
      path: 'templates/',
    });
  },

  getTokensFromUrl: function( url, name ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\#&]" + name + "=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return ( results == null &&  "" ) || (results && results[1]);
  },

  manageKindles:  function(){
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
    this.addUserToken();
    this.renderPage(new addKindleView);
  },

  renderPage: function(view){
    $('.body_container').empty().html(view.render().el);
  },

  addUserToken: function(){
    var userToken = (UserToken || $.cookie('UserToken') || 'invalid-token');
    if(($("meta[name='user-token']").length == 0) && (userToken != 'invalid-token')) {
      this.loadLayoutOptions();
      var metaTag = '<meta http-equiv="X-UA-Compatible" content="' + userToken + '" name="user-token"/> ';
      $('head').append(metaTag);
    }
  }
});
