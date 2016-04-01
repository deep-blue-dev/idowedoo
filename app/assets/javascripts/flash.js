var Idowedo = Idowedo || {};

Idowedo.Flash = (function() {
  var DISPLAY_LENGTH = 2000;
  var TYPE_OPTIONS = ["success", "info", "danger"];
  var CONTAINER_ELEM = "#flash_messages";
  var FLASH_QUEUE;
  var CURRENT_ID;

  return {
    display: display,
    elem: elem
  }

  function display(message, type, time) {
    FLASH_QUEUE = FLASH_QUEUE || [];
    if (typeof QUEUE_ACTIVE == 'undefined') {
      QUEUE_ACTIVE = false;  
    }
    // - Message: text to be displayed
    // - Type: "success"(green), "danger"(red), or "info"(blue). Default: "info"
    // - Time: ms before the flash message disappears. Default: DISPLAY_LENGTH
    if (TYPE_OPTIONS.indexOf(type) == -1) {
      type = "info";
    }
    if (typeof time != 'number') {
      time = DISPLAY_LENGTH;
    }

    FLASH_QUEUE.push({message: message, type: type, time: time});
    if (!QUEUE_ACTIVE) {
      handleQueue();
    }
  }

  function handleQueue() {
    clearCurrent();
    QUEUE_ACTIVE = true;
    if (FLASH_QUEUE.length > 0) {
      var current = FLASH_QUEUE.shift();
      // generate random, unique ID for flash
      genNewID();
      elem().append(template(current))
      setTimeout(function() {
        handleQueue();
      }, current.time)
    } else {
      QUEUE_ACTIVE = false;
      return;
    }
  }

  function clearCurrent() {
    $("#" + CURRENT_ID).remove();
  }

  function elem () {
    return $(CONTAINER_ELEM);
  }

  function template(current) {
    return "<div id='"+ CURRENT_ID +"' class='alert alert-dismissible alert-" + current.type + "'>" +
              "<button class='close' data-dismiss='alert'>&times;</button>" + 
              "<strong>" + 
                "<div class='text-center'>" + 
                  current.message + 
                "</div>" + 
              "</strong>" +
            "</div>"
  }

  function genNewID() {
    CURRENT_ID = Math.floor(Math.random() * 100000000);
  }
}());