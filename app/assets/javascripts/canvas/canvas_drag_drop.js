// Some code taken from this tutorial
// https://css-tricks.com/drag-and-drop-file-uploading/

var CaseCreator = (function (mod) {
  var $droparea;
  var $form;
  // Checks if browser allows drag/drop functionality
  var isDraggableBrowser;

  mod.DragDrop = (function () {
    return {
      init: init
    }

    function init() {

      return true;
      setupVars();

      if (isDraggableBrowser) {
        // add class to change styling
        $droparea.addClass("can_dragdrop");

        var droppedFile = false;

        // Form Drag/Drop listeners
        $form.on('drag dragstart dragend dragover dragenter dragleave drop', function(e) {
          e.preventDefault();
          e.stopPropagation();
        })
        .on('dragover dragenter', function() {
          $form.addClass('is-dragover');
        })
        .on('dragleave dragend drop', function() {
          $form.removeClass('is-dragover');
        })
        .on('drop', function(e) {
          console.log('dropped');
          droppedFile = e.originalEvent.dataTransfer.files[0];
          $(this).submit();
        });

        //
        $form.on('submit', function(e) {
          console.log('submitted');
          if (droppedFile == false) {
            console.log('no drop');
            // proceed with normal submit
            return true;
          } else {
            console.log('dropped submit');
          }

          // if ($form.hasClass('is-uploading')) return false;

          // $form.addClass('is-uploading').removeClass('is-error');

          // if (isAdvancedUpload) {
          //   console.log('adv upload');
          //   // ajax for modern browsers
          // } else {
          //   // ajax for legacy browsers
          // }
        });
      }

      // // Stop Defaults on the drop area to prevent page redirection
      // $droparea.on({
      //   'dragover': CaseCreator.stopEvent,
      //   'dragleave': CaseCreator.stopEvent
      // });

      // // Listen to drop event
      // $droparea.on('drop', function(e){
      //   CaseCreator.stopEvent(e);
      //   // addFileToCanvas(e);
      // });
    }

    function setupVars() {
      $droparea = $('.drop-area');
      $form = $('#image_upload_form');

      isDraggableBrowser = (function() {
        var div = document.createElement('div');
        var draggableDiv = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div));
        var formData = ('FormData' in window);
        var fileReader = ('FileReader' in window);
        return draggableDiv && formData && fileReader;
      }());
    }
  }())

  return mod;
}(CaseCreator || {}));
