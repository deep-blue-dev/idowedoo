var CaseCreator = (function (mod) {

  mod.setupListeners = function() {
    $(window).on('resize', mod.updateCanvasSize);
    mod.$editCaseForm.on('submit', mod.saveCase); 
    $('#fileUpload').on('click', mod.handleFileUploadClick);
  }

  return mod;
}(CaseCreator || {}));