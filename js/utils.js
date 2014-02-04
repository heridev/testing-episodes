$(function(){
  $.ajaxSetup({
    'beforeSend': function(xhr) {
      xhr.setRequestHeader("accept", "application/json");
    }
  });

  var router = new Router;
  Backbone.history.start();
});
