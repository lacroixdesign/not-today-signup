//= require_tree ./lib/directives
//= require_tree ./lib/services
//= require app/services
//= require app/config
//= require app/controllers
//= require app/init

/* globals FastClick */

// enable :active state for links on touch screens
document.addEventListener("touchstart", function(){}, true);

// enable Fastclick lib for faster touch responses
window.addEventListener('load', function() {
  FastClick.attach(document.body);
}, false);
