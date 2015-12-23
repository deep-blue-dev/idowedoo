// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require turbolinks
//= require_tree .


// dirty implementation of an existential operator
function exists(object){
  return (typeof object !== "undefined" && object !== null && object.length > 0)
}

// Checks what pages we are on so we can conditionally execute code

function currentView(controllerString, actionString){

  $controller = $('#' + controllerString);
  $action = $('.' + actionString);

  return ( exists($controller) && exists($action) )

}
