/*!
 * Scroll-lock by Qlaw Design (https://qlawdesign.com)
 * VERSION: 1.0
 * DATE: 2020-08-26
 * 
 * @license Copyright (c) 2020, . All rights reserved.
 * Indonesia - North Sulawesi - Kotamobagu City.
 **/

var $window = $(window),
	$html = $('html'),
	locked = $('<div id="locked" style="display:none;"></div>'),
	offsetTop,

	lock = {
		'position' : 'fixed',
		'left' : '0',
		'width' : '100%',
		'overflow-y' : 'scroll',
		'opacity' : ''
	},
	unlock = {
		'position' : '',
		'top' : '',
		'left' : '',
		'width' : '',
		'overflow-y' : ''
	};

$.scrollLock = function() {
	var scrollTop = window.pageYOffset;

	if($('#container').outerHeight() > $window.height()) {
		if(window.pageYOffset) {
			$html.css('top', - (scrollTop));
		}

		$html.css(lock);
	}

	$('body').append(locked);

	offsetTop = parseInt($html.css('top').replace('-', '').replace('px', ''));

	$(window).resize(function() {
		if($('#locked').attr('style') == 'display:none;') {
			var $contentHeight = $('#container').outerHeight(),
				top = $contentHeight - $window.height(),
				range = $contentHeight - offsetTop;
			
			if($('#container').outerHeight() > $window.height()) {
				if(offsetTop > 0) {
					if(range > $window.height()) {
						$html.css('top', - offsetTop + 'px');
						$html.css(lock);
					}else{
						$html.css('top', - top + 'px');
						$html.css(lock);
					}
				}else{
					$html.css(lock);
				}
			}else{			
				$html.css(unlock);
			}
		}
	});
}

$.scrollUnlock = function() {
	offsetTop = parseInt($html.css('top').replace('-', '').replace('px', ''));
	if($html.css('position') == 'fixed') {
		$html.css(unlock);

		window.scrollTo(0, offsetTop);
		window.setTimeout(function () {
			offsetTop = null;
		}, 0);
	}

	locked.remove();
}