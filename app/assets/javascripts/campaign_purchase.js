var Idowedo = Idowedo || {};

// Currently empty, but lets keep stuff namespaced in here
Idowedo.CampaignPurchase = (function() {
  var $purchaseButtonSpan, casePrice, numToPurchase, campaignName;

  return {
    init: init
  }

  // Public functions

  function init() {
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
        $("form#new_order").submit();
      }
    });

    // $('.submit_purchase_button').on('click', function(e) {
    $('form#new_order').on('submit', function(e) {
      if ($(this).find("#order_stripe_token").val().length > 0) {
        // form is valid and has a stripe token, do nothing and 
        // allow the form to submit
        return true;
      } else {
        // Form is not yet finished, stop form from validating
        e.preventDefault();
        //  and move to the next step

        
        var price, desc;

        if ($purchaseButtonSpan.hasClass("step1")) {
          // The button requires two clicks
          $purchaseButtonSpan.removeClass("step1").addClass("step2").text("Charge my card and send me my cases!");
          // Open up the second part of the form
          $("#step_2_panel").collapse('show');
          // Focus the first form input
          $("form#new_order").find(".focus_on_show").focus();
        } else if ($purchaseButtonSpan.hasClass("step2")) {
          $form = $(this);
          if (formIsValid($form)) {
            var price = currentTotalPrice() * 100;
            var desc = 'Purchasing ' + numToPurchase + ' cases from "' + campaignName + '" campaign.';
            // Open Checkout with further options:
            handler.open({
              name: 'Idowedo',
              description: desc,
              amount: price
            });
          }
        }
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

  function formIsValid($form) {
    var numMissing = 0;
    var $formErrors = $(".form_errors");
    $formErrors.empty();
    $(".will_validate").each(function(i, elem) {
      var $elem = $(elem);
      var attr = $elem.data("attr-name");
      $(".ermess").remove();
      if ($elem.val().length <= 0 && $elem.hasClass("required")) {
        $elem.before("<div style='color:red;' class='ermess'>Please fill in "+ attr +"</div>").removeClass("noError").addClass("hasError");
        numMissing += 1;
      } else {
        $elem.removeClass("hasError").addClass("noError");
      }
    });
    if (numMissing == 0) {
      return true;
    } else {
      var numFields = (numMissing == 1) ? "1 field" : numMissing + " fields"
      var message = "Please fill in all the required fields. You are missing " + numFields;
      $formErrors.append("<li>" + message + "</li>");
      return false;
    }
  }
})();