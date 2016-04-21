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
//= require jquery.remotipart
//= require bootstrap-sprockets
//= require spectrum
//= require fabric-1.5.0.min
//= require_tree .
var Idowedo = Idowedo || {};

// Currently empty, but lets keep stuff namespaced in here
Idowedo.Main = (function() {
  return {
    init: init
  }

  // Public functions

  function init() {
    setupListeners();
    campaignShow();
  }

  // Private functions
  function setupListeners() {
    $("input.cancelSubmit").on("keypress", function(e) {
      if (e.which == 13) {
        $(this).blur();
        return false;
      }
    });
  }

  // Campaign Functions

  function campaignShow() {
    campaignPurchaseButton();
    campaignCountdown();
  }

  function campaignPurchaseButton() {
    var $span = $("#purchase_button_span");
    $("#order_num_items").on("change", function(e) {
      var numToPurchase = parseInt($(e.target).val());
      if (numToPurchase == 1) {
        $span.text("1 case");
      } else if (numToPurchase > 1) {
        $span.text(numToPurchase + " cases");
      }
    }).trigger("change");
  }

  function campaignCountdown() {
    var endtime = $("#campaign_countdown").data("endtime"); 
    initializeClock("campaign_countdown", endtime);
  }

  function getTimeRemaining(endtime){
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  }

  function initializeClock(id, endtime){
    var clock = document.getElementById(id);
    var timeinterval = setInterval(function(){
      var t = getTimeRemaining(endtime);
      clock.innerHTML = '<div class="heading">Time Remaining:</div> <ul>' + 
                          '<li>' + t.days + '<span>Days</span></li>' +
                          '<li>' + t.hours + '<span>Hours</span></li>' +
                          '<li>' + t.minutes + '<span>Minutes</span></li>' +
                          '<li>' + t.seconds + '<span>Seconds</span></li>' +
                        '</ul>';
      if(t.total<=0){
        clearInterval(timeinterval);
      }
    },1000);
  }

})();

$(document).on("ready", function() {
  Idowedo.Main.init();
})