
 function initialize(){

   // Stuff for right bar case selection

   const $caseSelection = $('.phone-case');

   $caseSelection.on('click', function(e){

     // Get casePath from the link
     const casePath = this.dataset.casePath;

     // Get caseColors Array from the link
     const caseColors = JSON.parse(this.dataset.caseColors);

     // Stop the event bubble
     stopEvent(e);

     // Call loadPhoneCase with the casePath
     loadPhoneCase(casePath);

     // Change the case color selectors to the cases colors
     setSpectrumPalette(caseColors);

   });

   // Set Spectrum Case Color Palette
   function setSpectrumPalette(caseColors){

     // Transform color values to hex by adding hash to start
     hexColorPalette = caseColors.map(
                        function(str){
                          return "#" + str });

     defaultColor = hexColorPalette[0];

     $("#caseColor").spectrum({
       showPaletteOnly: true,
       color: defaultColor,
       palette: [ hexColorPalette ]
     });

     // Change Current color to first in palette
     canvas.backgroundColor = defaultColor;
     canvas.renderAll();

   }





   




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
     stopEvent(e);
     $uploadInput.click();
     $uploadInput.off().on('change', function(e){
       addFileToCanvas(e);
     });
     stopEvent(e);
   });


}


$(document).on('ready page:load', function() {

  // if ( currentView('pages', 'create') ) {
    // initialize(canvas);
  // }
});
