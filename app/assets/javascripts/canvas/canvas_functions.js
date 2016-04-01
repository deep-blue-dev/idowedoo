var CaseCreator = (function (mod) {

  // Initializer Function

  mod.init = function (currentCase) {
    mod.setupCanvas(currentCase);
    mod.setupVars();
    mod.setupListeners();
  }

  // functions

  mod.addImageFromURL = function(url) {
    fabric.Image.fromURL(url,
      function(oImg){
        canvas.add(oImg)
      },
      {
        // Place in center of screen
        left: canvas.getWidth()/2,
        top: canvas.getHeight()/2,
        angle: 0,
        hasRotatingPoint: true,
        //locks aspect ratio & scales from center
        lockUniScaling: true,
        centeredScaling: true
      }
    );  
  }

  mod.setupCanvas = function (currentCase) {
    var canvas = this.__canvas = new fabric.Canvas('c');
    window.canvas = mod.canvas = canvas;
    if (typeof currentCase != "undefined") {
      mod.deserializeCanvas(currentCase)
    }
    // canvas settings
    mod.updateCanvasSize();
    fabric.Object.prototype.transparentCorners = false;

    // sidebar initialization
    mod.initializeSpectrum();
  }

  // Convert canvas into JSON object that can be saved to the DB, and reloaded
  mod.serializeCanvas = function() {
    var projectJSON = canvas.toJSON();
    projectJSON.caseTemplateURL = canvas.caseTemplateURL;
    return projectJSON;
  }


  // Loading objects onto the canvas from saved JSON object made in serializeCanvas()
  mod.deserializeCanvas = function(data) {
    mod.loadPhoneCase(data.caseTemplateURL);
    canvas.loadFromJSON(data,canvas.renderAll.bind(canvas));
  }

  // Add SVG To Canvas as a mask and center it
  mod.loadPhoneCase = function(casePath){
    // used to serialize phone on save
    canvas.caseTemplateURL = casePath;

    // Use native fabric SVG Loader
    fabric.loadSVGFromURL(casePath, function(objects, options) {

      // Create Fabric Object from parsed SVG
      var phoneCase = fabric.util.groupSVGElements(objects, options);

      // Set phoneCase position to the center of the canvas
      phoneCase.set({
        left: canvas.height * 0.25,
        scaleY: (canvas.width / phoneCase.height),
        scaleX: (canvas.width / phoneCase.height)
      });

      // Mask the canvas to phoneCase
      canvas.clipTo = function(ctx){
        phoneCase.render(ctx)
      };

      // Refresh Canvas
      canvas.renderAll();

      window.phone = phone;
      window.canvas = canvas;
    });
  }

  // Get the canvas height and width dynamically
  mod.updateCanvasSize = function() {
    const $canvasArea = $('.canvas-area')[0];
    const $canvasContainer = $('.camb')
    const $upperCanvas = $('.upper-canvas');

    var $canvasHeight = $canvasArea.clientWidth;
    var $canvasWidth = $canvasArea.clientWidth;
    $upperCanvas.width = $canvasArea.clientWidth;
    $upperCanvas.height = $canvasArea.clientWidth;
    $('.canvas-container').width = $canvasArea.clientWidth;
    $('.canvas-container').height = $canvasArea.clientWidth;
    canvas.setWidth($canvasHeight);
    canvas.setHeight($canvasWidth);
    canvas.calcOffset();
  }

  mod.handleFileUploadClick = function(e) {
    mod.$uploadInput.click();
    mod.$uploadInput.off().on('change', function(e){
      mod.addFileToCanvas(e);
    });
    mod.stopEvent(e);
 }

  mod.addFileToCanvas = function (e){

    var f;
    var file = "";

   if (e.originalEvent.dataTransfer != null){
    f = e.originalEvent.dataTransfer.files[0]
    file = URL.createObjectURL(f);
   } else if (e.target.files != null){
    f = e.target.files[0]
    file = URL.createObjectURL(f);
   }

   console.log('f is', f);

   fabric.Image.fromURL(file,
       function(oImg){canvas.add(oImg)},
       {
         left: fabric.util.getRandomInt(0, 200),
         top: fabric.util.getRandomInt(0, 400),
         angle: 0,
         hasRotatingPoint: true,
         //locks aspect ratio & scales from center
         lockUniScaling: true,
         centeredScaling: true
       }
   );

 }

  mod.initializeSpectrum = function () {
    // Spectrum color picker initializer
    $("#togglePaletteOnly, #strokePalette").spectrum({
     showPaletteOnly: true,
     togglePaletteOnly: true,
     togglePaletteMoreText: 'more',
     togglePaletteLessText: 'less',
     color: 'black',
     palette: [
      ["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
      ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
      ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
      ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
      ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
      ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
      ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
      ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]
     ]
    });
  }

  mod.centerActiveObject = function() {
    var activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.center();
      activeObject.setCoords();
      canvas.renderAll();
      mod.updateControls();
    }
  }

  mod.updateControls = function() {
    var activeObject = canvas.getActiveObject();

    mod.$textInput.val(activeObject.text);

    // Toggle Italics
    if (activeObject && activeObject.type == "text"){
      (activeObject.fontStyle == "italic" ? mod.$textItalic.addClass('active') : mod.$textItalic.removeClass('active'))
    }

    // Toggle Bold
    if (activeObject && activeObject.type == "text"){
      (activeObject.fontWeight == "bold" ? mod.$textBold.addClass('active') : mod.$textBold.removeClass('active'))
    }

    // Advanced Controls
    mod.scaleControl.val(
      parseFloat(activeObject.getScaleX())
    );
    mod.scaleValue.val(
      parseFloat(activeObject.getScaleX())
    );
    mod.angleControl.val(
      parseFloat(activeObject.getAngle())
    );
    mod.angleValue.val(
      parseFloat(activeObject.getAngle())
    );
    mod.leftControl.val(
      parseFloat(activeObject.getLeft())
    );
    mod.leftValue.val(
      parseFloat(activeObject.getLeft())
    );
    mod.topControl.val(
      parseFloat(activeObject.getTop())
    );
    mod.topValue.val(
      parseFloat(activeObject.getTop())
    );
  }

  mod.stopEvent = function (e){
    e.preventDefault();
    e.stopPropagation();
  }

  return mod;
}(CaseCreator || {}));
