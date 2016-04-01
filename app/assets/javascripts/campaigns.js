CampaignSetup = (function() {
  

  // Public interface
  
  return {
    init: init
  }


  // Constants

  var UNIT_GOAL;
  var MIN_BASE_PRICE;
  var BASE_PRICE;

  
  // setup functions

  function init(valuesHash) {
    parseValuesHash(valuesHash);
    setupVars();
    setupListeners();
    setup();
  }

  function parseValuesHash(valuesHash) {
    MIN_BASE_PRICE        = valuesHash.caseMinBasePrice;
    BASE_PRICE            = valuesHash.caseRecommendedPrice;
    UNIT_GOAL             = valuesHash.initialGoalValue;
  }

  function setupVars() {
    // Slider to chose campaign goal, should be in sync with input
    this.$campaignGoalSlider    = $(".campaignGoalSlider");
    // Text input to enter goal, should be in sync with slider
    this.$campaignGoalInput     = $(".campaignGoalInput")
    this.$campaignProfitDisplay = $("#campaignProfitDisplay");
    this.$campaignCaseBasePrice = $("#campaign_base_price");
    this.$profitPerCase         = $("#profit_per_case");
  }

  function setupListeners() {
    // Goal Slider
    $campaignGoalSlider.on("change", function(e) {
      goalValueChanged($(this).val());
    });

    // Goal Input
    $campaignGoalInput.on("change", function(e) {
      goalValueChanged($(this).val());
    });

    // Case Base Price Input
    $campaignCaseBasePrice.on("change", function(e) {
      basePriceChanged($(this).val());
    })
  }

  function setup() {
    setGoal(UNIT_GOAL);
    setBasePrice(BASE_PRICE);
    updateWithCurrentConstants();
  }


  // callbacks

  function goalValueChanged(newVal) {
    setGoal(newVal);
    updateWithCurrentConstants();
  }

  function basePriceChanged(newVal) {
    setBasePrice(newVal);
    updateWithCurrentConstants();
  }


  // helpers

  function updateWithCurrentConstants() {
    calcTotalProfit(UNIT_GOAL, BASE_PRICE);
    calcUnitProfit(BASE_PRICE);
  }

  function calcTotalProfit(goalVal, basePrice) {
    var totalProfit = (basePrice * goalVal) - (MIN_BASE_PRICE * goalVal)
    setTotalProfitDisplay(totalProfit)
  }

  function calcUnitProfit(basePrice) {
    var unitProfit = basePrice - MIN_BASE_PRICE;
    setUnitProfitDisplay(unitProfit);
  }

  function setGoal(val) {
    UNIT_GOAL = val;
    this.$campaignGoalSlider.val(val);
    this.$campaignGoalInput.val(val);
  }

  function setTotalProfitDisplay(val) {
    var newVal = "$" + Math.floor(val) + "+";
    this.$campaignProfitDisplay.text(newVal);
  }

  function setUnitProfitDisplay(val) {
    $profitPerCase.text(val);
  }

  function setBasePrice(val) {
    if (val < MIN_BASE_PRICE) {
      // if below cost, reset to old value
      Idowedo.Flash.display("Price is below cost, minimum price is $" + MIN_BASE_PRICE, "danger", 5000);
      setBasePrice(BASE_PRICE);
    } else {
      // else update
      BASE_PRICE = val;
      this.$campaignCaseBasePrice.val(val);
      calcUnitProfit(val);
    }
  }

  function getBasePrice() {
    return this.$campaignCaseBasePrice.val();
  }
})();
