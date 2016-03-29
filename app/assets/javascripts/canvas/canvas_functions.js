deserializeCanvas = function(data) {
    loadPhoneCase(data.caseTemplateURL);
    canvas.loadFromJSON(data,canvas.renderAll.bind(canvas));
  }

  loadPhoneCase = function(casePath){
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

var CaseCreator = (function (mod) {

  // Initializer Function

  mod.init = function (currentCase) {
    mod.setupCanvas(currentCase);
    mod.setupVars();
    mod.setupListeners();
  }

  // Private Functions

  mod.setupCanvas = function (currentCase) {
    var canvas = this.__canvas = new fabric.Canvas('c');
    window.canvas = canvas
    if (typeof currentCase != "undefined") {
      deserializeCanvas(currentCase)
    }
    // canvas settings
    mod.updateCanvasSize();
    fabric.Object.prototype.transparentCorners = false;
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

 mod.stopEvent = function (e){
  e.preventDefault();
  e.stopPropagation();
}

  return mod;
}(CaseCreator || {}));
