var Idowedo = Idowedo || {};

// Currently empty, but lets keep stuff namespaced in here
Idowedo.CampaignPurchase = (function() {
  var $purchaseButtonSpan, casePrice, numToPurchase, campaignName;

  return {
    init: init
  }

  // Public functions

  function init() {
    console.log('initing');
    // Setup vars
    $purchaseButtonSpan = $("#purchase_button_span");
    casePrice = parseFloat($("#case_price_span").data("case_price"));
    campaignName = $(".campaign_title").text().trim();
    // initialize functions
    purchaseButton();
    campaignCountdown();
    initializeStateInput();
  }

  // Campaign Functions

  function purchaseButton() {
    numSelectListener();
    var stripePublishableKey = $("#strip_publishable_key").data("key");
    var handler = StripeCheckout.configure({
      key: stripePublishableKey,
      locale: 'auto',
      token: function(token) {
        // set email and token from stripe
        $("#order_stripe_token").val(token.id);
        $("#order_email").val(token.email);
        // submit the form
        console.log('serial ', $("form#new_order").serialize());
        $("form#new_order").submit();
      }
    });

    $('.submit_purchase_button').on('click', function(e) {
      
      e.preventDefault();
      
      var price, desc;

      if ($purchaseButtonSpan.hasClass("step1")) {
        // The button requires two clicks
        $purchaseButtonSpan.removeClass("step1").addClass("step2").text("Charge my card and send me my cases!");
        // Open up the second part of the form
        $("#step_2_panel").collapse('show');
      } else if ($purchaseButtonSpan.hasClass("step2")) {
        var price = currentTotalPrice() * 100;
        var desc = 'Purchasing ' + numToPurchase + ' cases from "' + campaignName + '" campaign.';
        // Open Checkout with further options:
        handler.open({
          name: 'Idowedo',
          description: desc,
          amount: price
        });
      }
    });

    // Close Checkout on page navigation:
    $(window).on('popstate', function() {
      handler.close();
    });


  }

  function numSelectListener() {
    // This updated the text on the button to represent the number of phones
    // selected and the total price
    $("#order_num_items").on("change", function(e) {
      numToPurchase = parseFloat($(e.target).val());
      updateButton();
    }).trigger("change");
  }

  function updateButton() {
    if (numToPurchase == 1) {
      $purchaseButtonSpan.text("1 case for $" + currentTotalPrice());
    } else if (numToPurchase > 1) {
      $purchaseButtonSpan.text(numToPurchase + " cases for $" + currentTotalPrice());
    } else {
      $purchaseButtonSpan.text("");
    }
  }

  function currentTotalPrice() {
    return casePrice * numToPurchase;
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

  function initializeStateInput() {
    updateStateInput(); // run it on init
    $("#order_address_country").on('change', function(e) {
      updateStateInput();
    });
  }

  function updateStateInput() {
    var $inputEl = $("#state_input_field");
    var inputTemplate = $("script#state_input_template").html().trim();
    var selectTemplate = $("script#state_select_template").html().trim();

    if ($("#order_address_country").val() == "US") {
      $inputEl.empty().html(selectTemplate);
    } else {
      $inputEl.empty().html(inputTemplate);
    }
  }
})();