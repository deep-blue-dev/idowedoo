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

  // Font Family
  $(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.selection').text($(this).text());
    $(this).parents(".dropdown").find('.selection').val($(this).text());
  });

  var fontControl = $('.selection');
  $('#font_drop').on('hidden.bs.dropdown', function (e) {
    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject.type === 'text') {
      console.log(activeObject);
      console.log($('#fontFamily > span.selection').text());
      activeObject.fontFamily = $('#fontFamily > span.selection').val();
      console.log(activeObject);
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
  var scaleControl = $('#scale-control');
  scaleControl.on('change', function(){
    var activeObject = canvas.getActiveObject();
    scaleValue.value = parseFloat(this.value);
    activeObject.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  });

  // Scale Input
  var scaleValue = $('#scaleValue');
  scaleValue.on('change', function(){
    var activeObject = canvas.getActiveObject();
    scaleControl.value = parseFloat(this.value);
    activeObject.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  });

  // Top Control
  var topControl = $('#top-control');
  topControl.on('change', function(){
    var activeObject = canvas.getActiveObject();
    activeObject.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  });

  // Left Control
  var leftControl = $('#left-control');
  leftControl.on('change', function(){
    var activeObject = canvas.getActiveObject();
    activeObject.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
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
    leftControl.val(
        parseFloat(activeObject.getLeft())
    );
    topControl.val(
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
    debug([e]);
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
// ************************************************************** //
// For uploading pictures TODO: Make it work
// ************************************************************8* //

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
  })

  // Spectrum color picker
  $("#togglePaletteOnly").spectrum({
    showPaletteOnly: true,
    togglePaletteOnly: true,
    togglePaletteMoreText: 'more',
    togglePaletteLessText: 'less',
    color: 'blanchedalmond',
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

    console.log($("#togglePaletteOnly").spectrum("get"));
    var color = $("#togglePaletteOnly").spectrum("get");

  $('#togglePaletteOnly').on('hide.spectrum', function (e, tinycolor) {
  //   console.log(e);
  //   console.log(tinycolor.toHexString());
  //   var activeObject = canvas.getActiveObject();
  //   if (activeObject && activeObject.type === 'text') {
  //     console.log(activeObject);
  //     console.log($('#fontFamily > span.selection').text());
  //     activeObject.fontFamily = $('#fontFamily > span.selection').val();
  //     console.log(activeObject);
  //     canvas.renderAll();
  //   }
  });



});
