$(document).ready(function() {
	$('select').material_select();
	if($('body').hasClass('full-page')) {
		$('.home-content').height(($(window).height() -  310));
	}
	
});

$(window).resize(function() {
	if($('body').hasClass('full-page')) {
		$('.home-content').height(($(window).height() -  310));
	}
});


$('#filter-trigger').click(function(e) {
	e.stopPropagation();
	console.log('clicked');
	if ($('#filter-list').hasClass('invisible')) {
		console.log('has');
		$('#filter-list').removeClass('invisible').removeClass('hide').addClass('visible').addClass('show');
		$('#filter-trigger').addClass('list-shown ');
	}
	else if ($('#filter-list').hasClass('visible')) {
		console.log('had');
		$('#filter-list').addClass('invisible').addClass('hide').removeClass('visible').removeClass('show');
		$('#filter-trigger').removeClass('list-shown');
	}
});

$(document).click(function() {
	if ($('#filter-list').hasClass('visible')) {
		console.log('had');
		$('#filter-list').addClass('invisible').addClass('hide').removeClass('visible').removeClass('show');
		$('#filter-trigger').removeClass('list-shown');
	}
	return;
})