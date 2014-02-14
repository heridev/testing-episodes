$(function(){
  $.ajaxSetup({
    'beforeSend': function(xhr) {
      var token = $("meta[name='user-token']").attr("content");
      xhr.setRequestHeader("userToken", token);
      xhr.setRequestHeader("accept", "application/json");
    }
  });

  window.ServerUrl = 'http://localhost:3000'
  window.UserToken = ''

  var router = new Router;
  Backbone.history.start();
});

$( document ).ajaxError(function(e, jqxhr) {
  if (jqxhr.status === 401 || jqxhr.status === 403) {
    var router = new Router;
    router.navigate('', { trigger: true});
  };
});
