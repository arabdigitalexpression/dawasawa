$(document).ready(function() {
	if( $('form').hasClass('has-captcha') ) {
		requestCaptcha();
	}
});

$('#renew-captcha').click(function() {
	requestCaptcha();
});

function requestCaptcha() {
	var s_id = sessionStorage.getItem('s_id');
	axios.get('/captcha?session_id=' + s_id)
		.then(function(res) {
			renderCaptcha(res.data);
		}).catch(function(err) {
			renderCaptcha('error getting captcha');
		});
}

function renderCaptcha(captchaData) {
	$('.captcha-img').html(captchaData);
}
