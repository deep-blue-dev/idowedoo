// The JS in this project is mostly jQuery event listeners
// General JS functions should be put into canvas_functions.js
// Event handler functions (only called by jQuery events), should be put here

var CaseCreator = (function (mod) {

  mod.saveCase = function(e) {
    mod.stopEvent(e);
    var jsonData = mod.serializeCanvas();
    $("#case_saved_data").val(JSON.stringify(jsonData));
    this.submit();
  }

  mod.createCampaign = function(e) {
    mod.stopEvent(e);
    var jsonData = mod.serializeCanvas();
    $(".case_saved_data").val(JSON.stringify(jsonData));
    var casePng = canvas.toDataURL('png');
    $(".case_saved_png").val(casePng);
    this.submit();
  }

  mod.handleAddTextClick = function(e) {
    // Add text from input

    // Get text from input
    var text = mod.$textInput.val();

    // Create Fabric Text Object
    var fabricText = new fabric.Text( text, {
      left: fabric.util.getRandomInt(0, 200),
      top: fabric.util.getRandomInt(0, 400),
      fontFamily: 'helvetica',
      angle: 0,
      fill: '#000000',
      scaleX: 0.5,
      scaleY: 0.5,
      fontWeight: '',
      hasRotatingPoint: true,
      lockUniScaling: true,
      centeredScaling: true
    });

    // Add Fabric Text Object to Canvas

    canvas.add(fabricText);
    canvas.setActiveObject(fabricText);
    mod.centerActiveObject();

  };

  mod.handleSendBackwards = function(e){
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.sendBackwards();
      canvas.renderAll();
    }
  }

  mod.handleTextItalicClick = function(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.fontStyle = (activeObject.fontStyle == "normal" ? "italic" : "normal");
      (activeObject.fontStyle == "italic" ? mod.$textItalic.addClass('active') : mod.$textItalic.removeClass('active'));
      canvas.renderAll();
    }
  }

  mod.handleTextBoldClick = function(e){
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.fontWeight = (activeObject.fontWeight == "normal" ? "bold" : "normal");
      (activeObject.fontWeight == "bold" ? mod.$textBold.addClass('active') : mod.$textBold.removeClass('active'));
      canvas.renderAll();
    }
  }

  mod.handleTextInputKeyup = function(e){
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.text = this.value;
      canvas.renderAll();
    }
  }

  mod.handleScaleControlChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.scaleValue.value = Math.floor(parseFloat(this.value));
    activeObject.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleScaleValueChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.scaleControl.value = Math.floor(parseFloat(this.value));
    activeObject.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleTopControlChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.topValue.value = Math.floor(parseFloat(this.value));
    activeObject.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleTopValueChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.topControl.value = Math.floor(parseFloat(this.value));
    activeObject.setTop(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleLeftControlChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.leftValue.value = Math.floor(parseFloat(this.value));
    activeObject.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleLeftValueChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.leftControl.value = Math.floor(parseFloat(this.value));
    activeObject.setLeft(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleAngleValueChange = function(e){
    var activeObject = canvas.getActiveObject();
    mod.angleControl.value = Math.floor(parseFloat(this.value));
    activeObject.setAngle(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleAngleControlChange = function (e) {
    var activeObject = canvas.getActiveObject();
    mod.angleValue.value = Math.floor(parseFloat(this.value));
    activeObject.setAngle(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
    mod.updateControls();
  }

  mod.handleCaseColorMoveSpectrum = function (e, tinycolor) {
    var color = tinycolor.toHexString();
    canvas.backgroundColor = color;
    canvas.renderAll();
  }

  mod.handleFontColorMoveSpectrum = function (e, tinycolor) {
    var activeObject = canvas.getActiveObject();
    var color = tinycolor.toHexString();
    if (activeObject && activeObject.type === 'text') {
      activeObject.fill = color;
      canvas.renderAll();
    }
  }

  mod.handleOutlineColorMoveSpectrum = function (e, tinycolor) {
    var activeObject = canvas.getActiveObject();
    var color = tinycolor.toHexString();
    if (activeObject && activeObject.type === 'text') {
      activeObject.stroke = color;
      canvas.renderAll();
    }
  }

  mod.handleTextOutlineClick = function (e) {
    var stroke = parseFloat(e.target.dataset.stroke);
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.strokeWidth = stroke;
      canvas.renderAll();
    }
  }

  mod.handleFontDropHiddenBSDropdown = function (e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      activeObject.fontFamily = $('#fontFamily > span.selection').val();
      canvas.renderAll();
    }
  }

  mod.handleDropdownMenuLiAClick = function(e){
    mod.stopEvent(e);
    $(this).parents(".dropdown").find('.selection').text($(this).text());
    $(this).parents(".dropdown").find('.selection').val($(this).text());
  }

  mod.handleDeleteClick = function(e){
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.remove();
      activeObject.setCoords();
      canvas.renderAll();
    }
  }

  mod.handleBringForward = function handleBringForward(e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.bringForward();
      canvas.renderAll();
    }
  }

  mod.handleFileUploadButtonClick = function(e){
    mod.stopEvent(e);
    mod.$uploadInput.click();
    mod.$uploadInput.off().on('change', function(e){
      var form = $(this).parent("form")[0];
      var formData = new FormData(form);
      $.ajax({
          url: form.action,
          type: 'POST',
          data: formData,
          async: false,
          success: function (data) {
          },
          cache: false,
          contentType: false,
          processData: false
      });

      return false;
    });
    mod.stopEvent(e);
  }

  return mod;
}(CaseCreator || {}));