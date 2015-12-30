
$(document).on('ready page:load', function() {

  if ( currentView('cases', 'new') ) {
    initialize()
  }

 function initialize(){

   window.debug = true;

   // Tabs

   $('.tab-content div').click(function (e) {
     //e.preventDefault();
     $(this).tab('show');
   });

   ///////////////////
   //
   // Builder
   //
   //////////////////

   // Initialize the canvas
   var canvas = this.__canvas = new fabric.Canvas('c');


   fabric.Object.prototype.transparentCorners = false;

   // Set the canvas size
   updateCanvasSize();


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

   // Load Phone Case from Case Path Selection
   const $caseSelection = $('.phone-case');
   $caseSelection.on('click', function(e){

     // Get casePath from the link
     const casePath = this.dataset.casePath;

     // Stop the event bubble
     stopEvent(e);

     // Call loadPhoneCase with the casePath
     loadPhoneCase(casePath);

   });


   //
   // Resize Canvas Handler
   //

   // Set the canvas size when window is resized
   $(window).on('resize', function(){
     updateCanvasSize();
   });

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


   //
   // Text Controls
   //

   //  Input
   //

   var $textInput = $('#textInput');
   var $textAdd = $('#textAdd');

   // Add text from input


   $textAdd.on('click', function() {

     // Get text from input
     var text = $textInput.val();

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
     centerActiveObject();
   });

   // Set the current value of text object to the input
   $textInput.keyup(function(){
     var activeObject = canvas.getActiveObject();
     if (activeObject && activeObject.type === 'text') {
       activeObject.text = this.value;
       canvas.renderAll();
     }
   });


   // Text Italize
   //

   var $textItalic = $('#textItalic');

   // Set Object to Italics and toggle button
   $textItalic.on('click', function(e){
     var activeObject = canvas.getActiveObject();
     if (activeObject && activeObject.type === 'text') {
       activeObject.fontStyle = (activeObject.fontStyle == "normal" ? "italic" : "normal");
       (activeObject.fontStyle == "italic" ? $textItalic.addClass('active') : $textItalic.removeClass('active'));
       canvas.renderAll();
     }
   });

   // Text Bold
   //

   var $textBold= $('#textBold');

   // Set Object to Italics and toggle button
   $textBold.on('click', function(e){
     var activeObject = canvas.getActiveObject();
     if (activeObject && activeObject.type === 'text') {
       activeObject.fontWeight = (activeObject.fontWeight == "normal" ? "bold" : "normal");
       (activeObject.fontWeight == "bold" ? $textBold.addClass('active') : $textBold.removeClass('active'));
       canvas.renderAll();
     }
   });

   // Move object forward and back
   //

   // Forward
   var $bringForward = $('#bringForward');

   $bringForward.on('click', function(e){
     var activeObject = canvas.getActiveObject();
     if (activeObject) {
       activeObject.bringForward();
       canvas.renderAll();
     }
   });

   // Back
   var $sendBackwards = $('#sendBackwards');

   $sendBackwards.on('click', function(e){
     var activeObject = canvas.getActiveObject();
     if (activeObject) {
       activeObject.sendBackwards();
       canvas.renderAll();
     }
   });

   // Center
   var $center = $('#center');

   $center.on('click', function(e){
     centerActiveObject();
   });

   function centerActiveObject() {
     var activeObject = canvas.getActiveObject();
     if (activeObject) {
       activeObject.center();
       activeObject.setCoords();
       canvas.renderAll();
       updateControls();
     }
   }

   // Delete
   //

   var $delete = $('#delete');

   $delete.on('click', function(e){
     var activeObject = canvas.getActiveObject();
     if (activeObject) {
       activeObject.remove();
       activeObject.setCoords();
       canvas.renderAll();
     }
   });

// *****************************************************//
   // Delete object on delete keypress but
   // it has unwanted behavior -- Won't do

   // window.onkeydown = onKeyDownHandler;
   //
   // function onKeyDownHandler(e) {
   //   console.log(e.keyCode);
   //    switch (e.keyCode) {
   //       case 8: // delete
   //          var activeObject = canvas.getActiveObject();
   //          if (activeObject) {
   //            canvas.remove(activeObject);
   //            canvas.remove(activeObject);
   //            canvas.renderAll();
   //            return false;
   //          }
   //     }
   //    return;
   // }
   //******************************************************//

   // Font Family

   $(".dropdown-menu li a").click(function(){
     $(this).parents(".dropdown").find('.selection').text($(this).text());
     $(this).parents(".dropdown").find('.selection').val($(this).text());

   });

   var fontControl = $('.selection');

   $('#font_drop').on('hidden.bs.dropdown', function (e) {
     var activeObject = canvas.getActiveObject();
     if (activeObject && activeObject.type === 'text') {
       activeObject.fontFamily = $('#fontFamily > span.selection').val();
       canvas.renderAll();
     }
   });

   //Text outline
   //

   $('#strokeSelect li a').on('click', function (e) {
     var stroke = parseFloat(e.target.dataset.stroke);
     var activeObject = canvas.getActiveObject();
     if (activeObject && activeObject.type === 'text') {
       activeObject.strokeWidth = stroke;
       canvas.renderAll();
     }
   });


   // Add File
   //

   $droparea = $('.drop-area');


   // Stop Defaults on the drop area to prevent page redirection

   $droparea.on({
     'dragover': stopEvent,
     'dragleave': stopEvent
   });

   // Listen to drop event
   $droparea.on('drop', function(e){
     stopEvent(e);
     addFileToCanvas(e);
   });

   // Grab file from event then add to canvas
   function addFileToCanvas(e){

     var file = "";

     if (e.originalEvent.dataTransfer != null){
       file = URL.createObjectURL(e.originalEvent.dataTransfer.files[0]);
     } else if (e.target.files != null){
       file = URL.createObjectURL(e.target.files[0]);
     }


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

   // File Picker Dialog
   var $uploadInput = $('#upload');

   $('#fileUpload').on('click', function(e){
     $uploadInput.click();
     $uploadInput.off().on('change', function(e){
       addFileToCanvas(e);
     });
     stopEvent(e);
   });

   // Spectrum color picker initializer
   $("#togglePaletteOnly, #strokePalette, #caseColor").spectrum({
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

   // Change color of text
   $('#togglePaletteOnly').on('move.spectrum', function (e, tinycolor) {
     var activeObject = canvas.getActiveObject();
     var color = tinycolor.toHexString();
     if (activeObject && activeObject.type === 'text') {
       activeObject.fill = color;
       canvas.renderAll();
     }
   });

   // Change color of text outline
   $('#strokePalette').on('move.spectrum', function (e, tinycolor) {
     var activeObject = canvas.getActiveObject();
     var color = tinycolor.toHexString();
     if (activeObject && activeObject.type === 'text') {
       activeObject.stroke = color;
       canvas.renderAll();
     }
   });

   //Change color of phone case
   $("#caseColor").on('move.spectrum', function (e, tinycolor) {
     var color = tinycolor.toHexString();
     canvas.backgroundColor = color;
     canvas.renderAll();
   });

   // Advanced Controls
   //

   // Angle
   var angleControl = $('#angle-control');
    angleControl.on('change', function () {
      var activeObject = canvas.getActiveObject();
      angleValue.value = Math.floor(parseFloat(this.value));
      activeObject.setAngle(parseInt(this.value, 10)).setCoords();
      canvas.renderAll();
      updateControls();

    }
  );

  // angle Input
  var angleValue = $('#angleValue');
  angleValue.on('change', function(){
    var activeObject = canvas.getActiveObject();
    angleControl.value = parseFloat(this.value);
    activeObject.setAngle(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  // Scale
  var scaleControl = $('#scale-control');
  scaleControl.on('change', function(){
    var activeObject = canvas.getActiveObject();
    scaleValue.value = parseFloat(this.value);
    activeObject.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  // Scale Input
  var scaleValue = $('#scaleValue');
  scaleValue.on('change', function(){
    var activeObject = canvas.getActiveObject();
    scaleControl.value = parseFloat(this.value);
    activeObject.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  // Top Control
  var topControl = $('#top-control');
  topControl.on('change', function(){
    var activeObject = canvas.getActiveObject();
    topValue.value = parseFloat(this.value);
    activeObject.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  // top Input
  var topValue = $('#topValue');
  topValue.on('change', function(){
    var activeObject = canvas.getActiveObject();
    topControl.value = parseFloat(this.value);
    activeObject.setTop(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  // Left Control
  var leftControl = $('#left-control');
  leftControl.on('change', function(){
    var activeObject = canvas.getActiveObject();
    leftValue.value = parseFloat(this.value);
    activeObject.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  // Left Input
  var leftValue = $('#leftValue');
  leftValue.on('change', function(){
    var activeObject = canvas.getActiveObject();
    leftControl.value = parseFloat(this.value);
    activeObject.setTop(parseFloat(this.value)).setCoords();
    canvas.renderAll();
    updateControls();
  });

  //
  // Utilities
  //

  // Mirror values to controls and inputs
  function updateControls() {
    var activeObject = canvas.getActiveObject();

    $textInput.val(activeObject.text);

    // Toggle Italics
    if (activeObject && activeObject.type == "text"){
      (activeObject.fontStyle == "italic" ? $textItalic.addClass('active') : $textItalic.removeClass('active'))
    }

    // Toggle Bold
    if (activeObject && activeObject.type == "text"){
      (activeObject.fontWeight == "bold" ? $textBold.addClass('active') : $textBold.removeClass('active'))
    }

    // Advanced Controls
    scaleControl.val(
        parseFloat(activeObject.getScaleX())
    );
    scaleValue.val(
        parseFloat(activeObject.getScaleX())
    );
    angleControl.val(
        parseFloat(activeObject.getAngle())
    );
    angleValue.val(
        parseFloat(activeObject.getAngle())
    );
    leftControl.val(
        parseFloat(activeObject.getLeft())
    );
    leftValue.val(
        parseFloat(activeObject.getLeft())
    );
    topControl.val(
        parseFloat(activeObject.getTop())
    );
    topValue.val(
        parseFloat(activeObject.getTop())
    );
  }

  // Pass values from canvas events
  canvas.on({
    'object:selected': updateControls,
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls
  });

  // log if debugging
  function debug (theArgs){
    if (window.debug === true) {
      console.log(theArgs);
    }
  }

  // Stops Event Propagation

  function stopEvent (e){
    e.preventDefault();
    e.stopPropagation();
  }



  $('#addCart').on('click', function(e){

    if (!fabric.Canvas.supports('toDataURL')) {
      alert("This browser doesn\'t provide means to serialize canvas to an image" );
    }
    else {
      // Deselect the objects os that the handles aren't present when exported.
      canvas.deactivateAll().renderAll();
      // Convert canvas to png
      localStorage.setItem("imgData",  canvas.toDataURL('png'));
    }
  });

  // $('.upload').on('click', function(e){
  //    alert( e.isDefaultPrevented() || e.isPropagationStopped());
  //   handleImage(e);
  // });
  //
  // function handleImage(e) {
  //   debug([e]);
  //   var file  = e.target.files[0];
  //   var reader = new FileReader();
  //     reader.onload = function (event){
  //       var imgObj = new Image();
  //       imgObj.src = event.target.result;
  //       imgObj.onload = function () {
  //         var image = new fabric.Image(imgObj);
  //         image.set({
  //               angle: 0,
  //               padding: 10,
  //               cornersize:10,
  //               height:110,
  //               width:110,
  //         });
  //         canvas.centerObject(image);
  //         canvas.add(image);
  //         canvas.renderAll();
  //       };
  //     };
  //     reader.readAsDataURL(file);
  //
  // }
  //})

  // Spectrum color picker
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

  $('#togglePaletteOnly').on('move.spectrum', function (e, tinycolor) {
    var activeObject = canvas.getActiveObject();
    var color = tinycolor.toHexString();
    if (activeObject && activeObject.type === 'text') {
      activeObject.fill = color;
      canvas.renderAll();
    }
  });


  $('#strokePalette').on('move.spectrum', function (e, tinycolor) {
    var activeObject = canvas.getActiveObject();
    var color = tinycolor.toHexString();
    if (activeObject && activeObject.type === 'text') {
      activeObject.stroke = color;
      canvas.renderAll();
    }
  });

   // Angle Input
   var angleValue = $('#angleValue');
   angleValue.on('change', function(){
     var activeObject = canvas.getActiveObject();
     angleControl.value = Math.floor(parseFloat(this.value));
     activeObject.setAngle(parseFloat(this.value)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   // Scale
   var scaleControl = $('#scale-control');
   scaleControl.on('change', function(){
     var activeObject = canvas.getActiveObject();
     scaleValue.value = Math.floor(parseFloat(this.value));
     activeObject.scale(parseFloat(this.value)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   // Scale Input
   var scaleValue = $('#scaleValue');
   scaleValue.on('change', function(){
     var activeObject = canvas.getActiveObject();
     scaleControl.value = Math.floor(parseFloat(this.value));
     activeObject.scale(parseFloat(this.value)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   // Top Control
   var topControl = $('#top-control');
   topControl.on('change', function(){
     var activeObject = canvas.getActiveObject();
     topValue.value = Math.floor(parseFloat(this.value));
     activeObject.setTop(parseInt(this.value, 10)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   // Top Input
   var topValue = $('#topValue');
   topValue.on('change', function(){
     var activeObject = canvas.getActiveObject();
     topControl.value = Math.floor(parseFloat(this.value));
     activeObject.setTop(parseFloat(this.value)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   // Left Control
   var leftControl = $('#left-control');
   leftControl.on('change', function(){
     var activeObject = canvas.getActiveObject();
     leftValue.value = Math.floor(parseFloat(this.value));
     activeObject.setLeft(parseInt(this.value, 10)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   // Left Input
   var leftValue = $('#leftValue');
   leftValue.on('change', function(){
     var activeObject = canvas.getActiveObject();
     leftControl.value = Math.floor(parseFloat(this.value));
     activeObject.setLeft(parseFloat(this.value)).setCoords();
     canvas.renderAll();
     updateControls();
   });

   //
   // Utilities
   //

   // Mirror values to controls and inputs
   function updateControls() {
     var activeObject = canvas.getActiveObject();

     $textInput.val(activeObject.text);

     // Toggle Italics
     if (activeObject && activeObject.type == "text"){
       (activeObject.fontStyle == "italic" ? $textItalic.addClass('active') : $textItalic.removeClass('active'))
     }

     // Toggle Bold
     if (activeObject && activeObject.type == "text"){
       (activeObject.fontWeight == "bold" ? $textBold.addClass('active') : $textBold.removeClass('active'))
     }

     // Advanced Controls
     scaleControl.val(
         parseFloat(activeObject.getScaleX())
     );
     scaleValue.val(
         parseFloat(activeObject.getScaleX())
     );
     angleControl.val(
         parseFloat(activeObject.getAngle())
     );
     angleValue.val(
         parseFloat(activeObject.getAngle())
     );
     leftControl.val(
         parseFloat(activeObject.getLeft())
     );
     leftValue.val(
         parseFloat(activeObject.getLeft())
     );
     topControl.val(
         parseFloat(activeObject.getTop())
     );
     topValue.val(
         parseFloat(activeObject.getTop())
     );
   }

   // Pass values from canvas events
   canvas.on({
     'object:selected': updateControls,
     'object:moving': updateControls,
     'object:scaling': updateControls,
     'object:resizing': updateControls,
     'object:rotating': updateControls
   });

   // log if debugging
   function debug (theArgs){
     if (window.debug === true) {

       console.log(theArgs);

     }
   }

   // Stops Event Propagation

   function stopEvent (e){
     e.preventDefault();
     e.stopPropagation();
   }


   $('#addCart').on('click', function(e){

     if (!fabric.Canvas.supports('toDataURL')) {
       alert("This browser doesn't provide means to serialize canvas to an image");
     }
     else {
       // Deselect the objects os that the handles aren't present when exported.
       canvas.deactivateAll().renderAll();
       // Convert canvas to png
       localStorage.setItem("imgData",  canvas.toDataURL('png'));
     }
   });
 }

});
