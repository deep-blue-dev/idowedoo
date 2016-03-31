var Idowedo = Idowedo || {};

Idowedo.Flash = (function() {
  var DISPLAY_LENGTH = 2000;
  var TYPE_OPTIONS = ["success", "info", "error"];
  var CONTAINER_ELEM = "#flash_messages";

  return {
    display: display,
    elem: elem
  }

  function display(message, type, time) {
    // - Message: text to be displayed
    // - Type: "success"(green), "error"(red), or "info"(blue). Default: "info"
    // - Time: ms before the flash message disappears. Default: DISPLAY_LENGTH
    if (TYPE_OPTIONS.indexOf(type) == -1) {
      type = "info";
    }
    if (typeof time != 'number') {
      time = DISPLAY_LENGTH;
    }
    elem().append("ok")
  }

  function elem () {
    return $(CONTAINER_ELEM);
  }
}());