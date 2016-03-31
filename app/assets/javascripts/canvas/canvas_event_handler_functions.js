// The JS in this project is mostly jQuery event listeners
// General JS functions should be put into canvas_functions.js
// Event handler functions (only called by jQuery events), should be put here

var CaseCreator = (function (mod) {

  mod.saveCase = function(e) {
    e.preventDefault();
    var jsonData = mod.serializeCanvas();
    $("#case_saved_data").val(JSON.stringify(jsonData));
    this.submit();
  }

  return mod;
}(CaseCreator || {}));