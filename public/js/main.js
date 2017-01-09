$(document).ready(function() {
	$('.content').height(($(window).height() -  310));
	console.log($('.content').height());
});

$(window).resize(function() {
	$('.content').height(($(window).height() -  310));
	console.log($('.content').height());
});