var CaseCreator = (function (mod) {

  mod.setupListeners = function() {
    $(window).on('resize', mod.updateCanvasSize);
    mod.$editCaseForm.on('submit', mod.saveCase);
    mod.$createCampaignForm.on("submit", mod.createCampaign);
    $('#fileUpload').on('click', mod.handleFileUploadClick);
    mod.$textAdd.on('click', mod.handleAddTextClick);
    mod.$center.on('click', mod.centerActiveObject);
    mod.$sendBackwards.on('click', mod.handleSendBackwards);
    mod.$bringForward.on('click', mod.handleBringForward);
    mod.$textItalic.on('click', mod.handleTextItalicClick);
    mod.$textBold.on('click', mod.handleTextBoldClick);
    mod.$textInput.keyup(mod.handleTextInputKeyup);
    mod.scaleControl.on('change', mod.handleScaleControlChange);
    mod.scaleValue.on('change', mod.handleScaleValueChange);
    mod.topControl.on('change', mod.handleTopControlChange);
    mod.topValue.on('change', mod.handleTopValueChange);
    mod.leftControl.on('change', mod.handleLeftControlChange);
    mod.leftValue.on('change', mod.handleLeftValueChange);
    mod.angleValue.on('change', mod.handleAngleValueChange);
    mod.angleControl.on('change', mod.handleAngleControlChange);
    mod.$caseColor.on('move.spectrum', mod.handleCaseColorMoveSpectrum);
    mod.$fontColor.on('move.spectrum', mod.handleFontColorMoveSpectrum);
    mod.$outlineColor.on('move.spectrum', mod.handleOutlineColorMoveSpectrum);
    mod.$textOutline.on('click', mod.handleTextOutlineClick);
    mod.$fontDrop.on('hidden.bs.dropdown', mod.handleFontDropHiddenBSDropdown);
    mod.$dropdownMenuLiA.on('click', mod.handleDropdownMenuLiAClick);
    mod.$delete.on('click', mod.handleDeleteClick);
    mod.canvas.on({
      'object:selected': mod.updateControls,
      'object:moving': mod.updateControls,
      'object:scaling': mod.updateControls,
      'object:resizing': mod.updateControls,
      'object:rotating': mod.updateControls
    });
  }

  return mod;
}(CaseCreator || {}));