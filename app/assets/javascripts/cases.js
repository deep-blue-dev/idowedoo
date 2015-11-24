// $('#writesomething').on('keyup', function(e) {
//     $('#appear').html($(this).val().draggable());
//  });

$(document).on('ready page:load', function() {

  // Tabs

  $('.tab-content div').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

  // Builder

  var canvas = this.__canvas = new fabric.Canvas('c');
  fabric.Object.prototype.transparentCorners = false;

  //var $ = function(id){return document.getElementById(id);};

  var rect = new fabric.Rect({
    width: 100,
    height: 100,
    top: 100,
    left: 100,
    fill: 'rgba(255,0,0,0.5)'
  });

  canvas.add(rect).setActiveObject(rect);
  var text = new fabric.Text('Hello.. nurse', { left: 100, top: 100 });

  canvas.add(text);
  fabric.Image.fromURL('data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7', function(oImg) {
    canvas.add(oImg);
  },{top: 100, left: 100});

  var angleControl = $('angle-control');
  angleControl.onchange = function() {
    rect.setAngle(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  var scaleControl = $('scale-control');
  scaleControl.onchange = function() {
    scaleValue.value = parseFloat(this.value); rect.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  };

  var scaleValue = $('scaleValue');
  scaleValue.onchange = function(){
    scaleControl.value = parseFloat(this.value);
    rect.scale(parseFloat(this.value)).setCoords();
    canvas.renderAll();
  };

  var topControl = $('top-control');
  topControl.onchange = function() {
    rect.setTop(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  var leftControl = $('left-control');
  leftControl.onchange = function() {
    rect.setLeft(parseInt(this.value, 10)).setCoords();
    canvas.renderAll();
  };

  function updateControls() {
    scaleControl.value = rect.getScaleX();
    scaleValue.value = parseFloat(rect.getScaleX());
    angleControl.value = rect.getAngle();
    leftControl.value = rect.getLeft();
    topControl.value = rect.getTop();
  }
  canvas.on({
    'object:moving': updateControls,
    'object:scaling': updateControls,
    'object:resizing': updateControls,
    'object:rotating': updateControls
  });
});