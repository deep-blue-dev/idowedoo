// $('#writesomething').on('keyup', function(e) {
//     $('#appear').html($(this).val().draggable());
//  });

$(document).on('ready page:load', function() {

  window.debug = true;

  // Tabs

  $('.tab-content div').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });

  // Builder

  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  //
  //var rect = new fabric.Rect({
  //  width: 100,
  //  height: 100,
  //  top: 100,
  //  left: 100,
  //  fill: 'rgba(255,0,0,0.5)'
  //});

  //canvas.add(rect).setActiveObject(rect);
  //var text = new fabric.Text('Hello.. Nurse!', { left: 100, top: 100 });

  //canvas.add(text);
  //fabric.Image.fromURL('data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7', function(oImg) {
  //  canvas.add(oImg);
  //},{top: 100, left: 100});

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
          hasRotatingPoint: true
        });

        // Add Fabric Text Object to Canvas
        canvas.add(fabricText);

      }
  );

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



  //
  // File Drop
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
    dropFile(e)
  });

  // Grab file from drop event then add to canvas
  function dropFile(e){

    var file = "";

    if (e.originalEvent.dataTransfer != null){
      file = URL.createObjectURL(e.originalEvent.dataTransfer.files[0]);
      if (e.target.files != null){
        file = URL.createObjectURL(e.target.files[0]);
      }
    }

    fabric.Image.fromURL(file,
        function(oImg){canvas.add(oImg)},
        {
          left: fabric.util.getRandomInt(0, 200),
          top: fabric.util.getRandomInt(0, 400),
          angle: 0,
          hasRotatingPoint: true
        }
    );

  }






  //
  // Advanced Controls
  //

  // TODO: Convert the advanced controls to jQuery

  // Angle
  var angleControl = $('#angle-control');

  angleControl.on('change', function () {

        var activeObject = canvas.getActiveObject();
        activeObject.setAngle(parseInt(this.value, 10)).setCoords();
        canvas.renderAll();
    }
  );

  // Scale
  var scaleControl = $('scale-control');
  scaleControl.onchange = function() {
    scaleValue.value = parseFloat(this.value); rect.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  };

  // Scale Input
  var scaleValue = $('scaleValue');
  scaleValue.onchange = function(){
    scaleControl.value = parseFloat(this.value);
    rect.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  };

  // Top Control
  var topControl = $('top-control');
  topControl.onchange = function() {
    rect.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  // Left Control
  var leftControl = $('left-control');
  leftControl.onchange = function() {
    rect.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

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
    scaleControl.value = activeObject.getScaleX();
    scaleValue.value = parseFloat(activeObject.getScaleX());
    angleControl.val(
        activeObject.getAngle());
    leftControl.value = rect.getLeft();
    topControl.value = rect.getTop();

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
    debug([e])
  }

});