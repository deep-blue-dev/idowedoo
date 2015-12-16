(function($) {

	"use strict";
	/* ================ Choose your template theme color, skin and layout. ================ */
	
	var $theme				= 'light',		// available values: 'light','dark'.
		$skin				= 'default',	// available values: 'default','1','2','3','4','5','6','7','8','9','10','11','12'.
		$layout				= 'wide',		// available values: 'wide','boxed'.
		$shape				= 'new-angle',	// available values: 'new-angle','round','border5px','square','right-angle','left-angle','top-angle','bottom-angle'.
		$bodyclass			= 'bg1',		// for boxed layout only, available values: patterns : 'bg1','bg2','bg3','bg4','bg5','bg6','bg7','bg8','bg9','bg10' & background images: 'bg11','bg12','bg13'.
		$rtl				= '0',			// 0 is false and 1 is true.
		$page_transition	= '1';			// 0 to disable page transitions.
		
	var theme_css	= $('#theme_css').attr('href'),
		theme_name	= theme_css.substring(theme_css.lastIndexOf("/") + 1, theme_css.length),
		th_nam		= theme_name.replace('.css',''),
		skin_css	= $('#skin_css').attr('href'),
		skin_name	= skin_css.substring(skin_css.lastIndexOf("/") + 1, skin_css.length),
		sk_nam		= skin_name.replace('.css',''),
		theme_url 	= theme_css.replace(theme_name,''),
		skin_url 	= skin_css.replace(skin_name,'');
	
	if($theme == th_nam || th_nam == 'light'){
		$('#theme_css').attr('href',theme_url+$theme+'.css');
	}else{
		$('#theme_css').attr('href',theme_url+th_nam+'.css');
	}
		
	if($skin == sk_nam || sk_nam == 'default'){
		$('#skin_css').attr('href',skin_url+$skin+'.css');
	}else{
		$('#skin_css').attr('href',skin_url+sk_nam+'.css');
	}
	
	if($layout != 'wide'){
		$('.pageWrapper').addClass('boxed');
		$('body').addClass($bodyclass)
	}
	
	// add shapes styles.
	$('html,.shape').addClass($shape);
	
	if($rtl == '1'){
		$('head').append('<link rel="stylesheet" href="assets/css/rtl.css">');
		var $rt = true;
	}else{
		var $rt = false;
	}

	/* ================ Coming Soon CountDown. ================ */
	if($(".digits").length > 0){
		$('.digits').countdown('2016/01/08').on('update.countdown', function(event) {
			var $this = $(this).html(event.strftime('<ul>'
			+ '<li><span>%-w</span><p> week%!w </p> </li>'
			+ '<li><span>%-d</span><p> day%!d </p></li>'
			+ '<li><span>%H</span><p>Hours </p></li>'
			+ '<li><span>%M</span><p> Minutes </p></li>'
			+ '<li><span>%S</span><p> Seconds </p></li>'
			+'</ul>'));
		});
	}


})(jQuery);


// Latest tweets sliders.
var animatetweets = function (){

	$('.slick-s').slick({
		dots: false,
		arrows: true,
		vertical: true
	});
	$('.fade-slider').slick({
		dots: false,
		arrows: true,
		fade: true
	});
};

