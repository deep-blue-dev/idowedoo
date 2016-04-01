var CaseCreator = (function (mod) {

  mod.setupVars = function () {
    mod.$createCampaignForm = $("form#new_campaign");
    mod.$editCaseForm = $("form.edit_case");
    mod.$fileUploadButton = $('#fileUpload');
    mod.$uploadInput = $('.uploadFileField');
    mod.$textAdd = $('#textAdd');
    mod.$textInput = $('#textInput');
    mod.$center = $('#center');
    mod.$sendBackwards = $('#sendBackwards');
    mod.$bringForward = $('#bringForward');
    mod.$textItalic = $('#textItalic');
    mod.$textBold= $('#textBold');
    mod.scaleControl = $('#scale-control');
    mod.scaleValue = $('#scaleValue');
    mod.topControl = $('#top-control');
    mod.topValue = $('#topValue');
    mod.leftControl = $('#left-control');
    mod.leftValue = $('#leftValue');
    mod.angleValue = $('#angleValue');
    mod.angleControl = $('#angle-control');
    mod.$caseColor = $("#caseColor");
    mod.$fontColor = $('#togglePaletteOnly');
    mod.$outlineColor = $('#strokePalette');
    mod.$textOutline = $('#strokeSelect li a');
    mod.$fontDrop = $('#font_drop');
    mod.$fontControl = $('.selection');
    mod.$dropdownMenuLiA = $(".dropdown-menu li a");
    mod.$delete = $('#delete');
  }

  return mod;
}(CaseCreator || {}));