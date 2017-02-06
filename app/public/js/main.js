$(document).foundation();


// ###################################
// #### Create Random Session Id #####
// ###################################
$(document).ready(function() {
	var s_id = sessionStorage.getItem('s_id');
	if(s_id == undefined) {
		var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		var rString = randomString(32, chars, function(result) {
			sessionStorage.setItem('s_id', result);
		});
	}
});

function randomString(length, chars, callback) {
    var result = '';
    for (var i = length; i > 0; --i) {
    	result += chars[Math.floor(Math.random() * chars.length)];
    }
    callback(result);
}


// ###################################
// ######### style Elements ##########
// ###################################
$(document).ready(function() {
	$('.modal').height($(document).height() + 58);
});

$('#modal_close').click(function() {
	$('.modal').hide();
	$('#status_message').empty();
});


// ###################################
// ######### remove button ###########
// ###################################

$('.remove-btn').click(function() {
	$('#loading').addClass('bubblingG');
	axios.post('/mylist/delete', {
		id: $('.result_id').html()
	}).then(function(res) {
		location.reload(true);
	}).catch(function(err) {
		$('#loading').removeClass('bubblingG');
				renderMessage({
					status: 'fail',
					content: 'عفواً حدث خطأ فى المسح'
				});
	});
})







