// Convert canvas into JSON object that can be saved to the DB, and reloaded
function serializeCanvas() {
  var projectJSON = canvas.toJSON();
  projectJSON.caseTemplateURL = canvas.caseTemplateURL;
  return projectJSON;
}

// Loading objects onto the canvas from saved JSON object made in serializeCanvas()
function deserializeCanvas(data) {
  loadPhoneCase(data.caseTemplateURL);
  canvas.loadFromJSON(data,canvas.renderAll.bind(canvas));
}

// Add SVG To Canvas as a mask and center it
function loadPhoneCase(casePath){
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
function updateCanvasSize() {
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