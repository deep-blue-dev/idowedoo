//
// Add Phone Case To Canvas
//

// Add SVG To Canvas as a mask and center it
function loadPhoneCase(casePath){

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