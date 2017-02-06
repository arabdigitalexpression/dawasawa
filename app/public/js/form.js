// Handling all the forms validation tasks
var latin_name_error = false;
var expire_error = false;
var package_state_error  = false;
var gov_error = false;
var user_name_error = false;
var email_error = false;
var email_value_error = false;
var phone_error = false;
var number_error = false;
var message_error = false;

function validateForm() {
	
	$('#latin_name').focusout(function() {
		checkLatinName();
	});

	$('#expire_month').focusout(function() {
		checkExpireDate();
	});

	$('#expire_year').focusout(function() {
		checkExpireDate();
	});

	$('#package_state').focusout(function() {
		checkPackageState();
	});
	$('#governorate').focusout(function() {
		checkGovernorate();
	});
	$('#user_name').focusout(function() {
		checkUsername();
	});
	$('#user_email').focusout(function() {
		checkEmail();
	});

	$('#user_phone').focusout(function() {
		if( $('#email_private:checkbox').is(':checked') ) {
			checkPhone();
		} else {
			$('#phone_error').hide();
			checkNumber($('#user_phone').val());
		}
	});
	
	$('#email_message').focusout(function() {
		checkMessage();
	}); 
		
	

}


// check latin name function
function checkLatinName() {
	var latin_name_length = $('#latin_name').val().length;

	if(latin_name_length == 0) {
		$('#latin_name_error').show();
		$('#latin_name').addClass('error-field');
		latin_name_error = true;
	} else {
		$('#latin_name_error').hide();
		$('#latin_name').removeClass('error-field');
		latin_name_error = false;
	}
}
function checkExpireDate() {
	var month = $('#expire_month').val();
	var year = $('#expire_year').val();
	if(month == null || year == null) {
		$('#expire_date_error').show();
		expire_error = true;
	} else {
		$('#expire_date_error').hide();
		expire_error = false;
	}
}

function checkPackageState() {
	var state = $('#package_state').val();

	if(state == null ) {
		$('#package_state_error').show();
		package_state_error = true;
	} else {
		$('#package_state_error').hide();
		package_state_error = false;
	}
}

function checkGovernorate() {
	var gov = $('#governorate').val();

	if(gov == null ) {
		$('#gov_error').show();
		gov_error = true;
	} else {
		$('#gov_error').hide();
		gov_error = false;
	}
}

function checkUsername() {
	var username_length = $('#user_name').val().length;
	if(username_length == 0 ) {
		$('#user_name_error').show();
		$('#user_name').addClass('error-field');
		user_name_error = true;
	} else {
		$('#user_name_error').hide();
		$('#user_name').removeClass('error-field');
		user_name_error = false;
	}
}

function checkEmail() {
	var email_length = $('#user_email').val().length;
	if(email_length == 0) {
		$('#email_error').show();
		$('#email_value_error').hide();
		$('#user_email').addClass('error-field');
		email_error = true;
		email_value_error = false;
	} else {
		$('#email_error').hide();
		email_error = false;
		var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		var isValid = re.test($('#user_email').val());
		if(isValid == false) {
			$('#email_value_error').show();
			$('#user_email').addClass('error-field');
			email_value_error = true;
		} else {
			$('#email_value_error').hide();
			$('#user_email').removeClass('error-field');			
			email_value_error = false;
		}
	}
}


function checkPhone() {
	var phone_length = $('#user_phone').val().length;
	if(phone_length == 0) {
		$('#phone_error').show();
		$('#number_error').hide();
		$('#user_phone').addClass('error-field');
		phone_error = true;
		number_error = false
	} else {
		$('#phone_error').hide();
		$('#user_phone').removeClass('error-field');
		phone_error = false;
		checkNumber($('#user_phone').val());
	}
}


function checkNumber(n) {
	phone_error = false;
	var isNumber = !isNaN(parseFloat(n)) && isFinite(n);
	if(n.length != 0) {
		if(isNumber == false) {
			$('#number_error').show();
			
			number_error = true;
		} else {
			$('#number_error').hide();
			number_error = false;
		}
	}
}

function checkMessage() {
	var message_length = $('#email_message').val().length;
	if(message_length == 0) {
		message_error = true;
		$('#email_message').addClass('error-field');
	} else {
		message_error = false;
		$('#email_message').removeClass('error-field');
	}
}

$('input').focus(function() {
	if($(this).hasClass('error-field')) {
		$(this).removeClass('error-field');
	}
});
$('textarea').focus(function() {
	if($(this).hasClass('error-field')) {
		$(this).removeClass('error-field');
	}
});


// ##################################################################
// ################ Form submit #####################################
// ##################################################################

// 1- submit page form
$('#submit-form').submit(function() {
	
	$('#loading').addClass('bubblingG');

	latin_name_error = false;
	expire_error = false;
	package_state_error  = false;
	gov_error = false;
	user_name_error = false;
	email_error = false;
	email_value_error = false;
	phone_error = false;
	number_error = false;

	checkLatinName();
	checkExpireDate();
	checkPackageState();
	checkGovernorate();
	checkUsername();
	checkEmail();
	checkNumber($('#user_phone').val());
	if( $('#email_private:checkbox').is(':checked') ) {
		checkPhone();
	}

	if( latin_name_error == false && expire_error == false 
		&& package_state_error == false && gov_error == false 
		&& user_name_error == false && email_error == false 
		&& email_value_error == false && phone_error == false 
		&& number_error == false ) {

		axios.post('/submit', {
			latin_name: $('#latin_name').val(),
			arabic_name: $('#arabic_name').val(),
			governorate: $('#governorate').val(),
			submission_date: $('#submission_date').val(),
			expire_month: $('#expire_month').val(),
			expire_year: $('#expire_year').val(),
			package_state: $('#package_state').val(),
			notes: $('#notes').val(),
			user_name: $('#user_name').val(),
			user_email: $('#user_email').val(),
			user_phone: $('#user_phone').val(),
			email_private: $('#email_private').val(),
			captcha_data: $('#captcha_data').val(),
			terms_agreed: $('#terms_agreed').val(),
			session_id: sessionStorage.getItem('s_id')
		}).then(function(res) {
			if(res.status == 200) {
				$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'success',
					content: '<p>تم الإدراج بنجاح</p> <p>سوف تصلك رسالة لتأكيد الإدراج على بريدك الإلكترونى</p>'
				});
			} else if(res.status == 500 || res.status == 404) {
				$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإدراج'
				});
			}
		}).catch(function(err) {
			$('#loading').removeClass('bubblingG');
			renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإدراج'
				});
		});
	}
	return false;
});



// 2- list_entries page form

$('#entries-form').submit(function() {

	$('#loading').addClass('bubblingG');

	email_error = false;
	email_value_error = false;

	checkEmail();

	if(email_error == false && email_value_error == false) {
		axios.post('/list_entries', {
			user_email: $('#user_email').val(),
			captcha_data: $('#captcha_data').val(),
			session_id: sessionStorage.getItem('s_id')
		}).then(function(res) {
			if(res.status == 200) {
				$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'success',
					content: 'تم إرسال الرسالة لبريدك الإلكترونى بنجاح'
				});
			} else {
				$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإدراج'
				});
			}
		}).catch(function(err) {
			$('#loading').removeClass('bubblingG');
			renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإدراج'
				});
		});
	}
	return false;
});

$('#emailus-form').submit(function() {

	$('#loading').addClass('bubblingG');

	user_name_error = false;
	email_error = false;
	email_value_error = false;
	message_error = false;

	checkUsername();
	checkEmail();
	checkMessage();

	if( user_name_error == false && email_error == false 
		&& email_value_error == false && message_error == false ) {

		axios.post('/emailus', {
			user_name: $('#user_name').val(),
			user_email: $('#user_email').val(),
			user_message: $('#email_message').val(),
			captcha_data: $('#captcha_data').val(),
			session_id: sessionStorage.getItem('s_id')
		}).then(function(res) {
			$('#loading').removeClass('bubblingG');
			if(res.status == 200) {
				renderMessage({
					status: 'success',
					content: 'تم إرسال الرسالة بنجاح'
				});
			} else {
				$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإرسال'
				});
			}
		}).catch(function(err) {
			$('#loading').removeClass('bubblingG');
			renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإرسال'
				});
		});

	}

	return false;
})

$('#view_contact').submit(function() {

	$('#loading').addClass('bubblingG');
	axios.post('/medicine/contact', {
		captcha_data: $('#captcha_data').val(),
		session_id: sessionStorage.getItem('s_id'),
		medicine_id: $('#result_id').html()
	}).then(function(res) {
		$('#loading').removeClass('bubblingG');
			if(res.status == 200) {
				$('#contact_info').removeClass('hide');
				$('.contact-name').html('الإسم: ' + res.data.contact.name);
				if(res.data.contact.email_invisible == false) {
					$('.contact-email').html('البريد الإلكترونى: ' + res.data.contact.email_address);
				}
				$('.contact-number').html('رقم الهاتف: ' + res.data.contact.phone);
			} else {
				$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الإرسال'
				});
			}
	}).catch(function(err) {
		$('#loading').removeClass('bubblingG');
			renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى الطلب'
				});
	})
	return false;
});

$(document).ready(function() {

	$('#latin_name_error').hide();
	$('#expire_date_error').hide();
	$('#package_state_error').hide();
	$('#gov_error').hide();
	$('#user_name_error').hide();
	$('#email_error').hide();
	$('#email_value_error').hide();
	$('#phone_error').hide();
	$('#number_error').hide();
	$('#required-indicator').hide();

	validateForm();

	if( $('#terms_agreed:checkbox').is(':checked') ) {
		$('#submit-button').prop("disabled", false);
	} else {
		if($(this).filter(':checked').length < 1) {
			$('#submit-button').attr('disabled', true);
		}
	}
});


// form  activity
$('#terms_agreed:checkbox').click(function() {
	if($(this).is(':checked')) {
		$('#submit-button').prop("disabled", false);
	} else {
		if($(this).filter(':checked').length < 1) {
			$('#submit-button').attr('disabled', true);
		}
	}
});

$('#email_private:checkbox').click(function() {
	if($(this).is(':checked')) {
		$('#required-indicator').show();
	} else {
		if($(this).filter(':checked').length < 1) {
			$('#required-indicator').hide();
			$('#phone_error').hide();

		}
	}
});
// #################################
// ####### Render Messages #########
// #################################
function renderMessage(msg) {
	$('.message-modal').show();
	$('#status_message').html(msg.content);
	if(msg.status == 'success'){
		$('#status_message').addClass('success-msg').removeClass('fail-msg');
	} else {
		$('#status_message').addClass('fail-msg').removeClass('success-msg');
	}
	
}






