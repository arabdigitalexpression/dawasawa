const express = require('express');
const static_data = require('../data/static_data');
const Methods =  require('../data/methods');
const Emailsender = require('../controllers/emailsender');
const app_config = require('../config/config');

var site_url = app_config.site_url;

/* debugging control moved to ../config/config.js for better modularity
now setting DAWASAWA_DEBUG to TRUE will set the server properly.
	BURN AFTER READING
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == 'development') {
	app_url = app_config.development.url;
} else if (process.env.NODE_ENV == 'production') {
	app_url = app_config.production.url;
}
*/
var governorates = static_data.governorates;
var package_state = static_data.package_state;
var months = static_data.months;
var years = static_data.years;
var insertion_confirmation_grace = static_data.insertion_confirmation_grace;
var domain_name = static_data.domain_name;


var router = express.Router();

function ensureCaptcha(req, res, next) {
	Methods.findCaptcha(req.body.captcha_data).then(function(cap) {

		if(cap != null) {
			if(req.body.session_id == cap.session_id) {
				next();
			} else {
				res.send('renew captcha').status(404);
			}
		} else {
			res.send('renew captcha').status(404);
		}
	}, function(err) {
		res.sendStatus(500);
	});
}
// render the home page
router.get('/', function(req, res) {
	res.render('submit', {
		governorates: governorates,
		packageState: package_state,
		months: months,
		years: years
	});
});

router.post('/', ensureCaptcha, function(req, res) {
	var body = {};
	var expire_date = req.body.expire_year + '-' + req.body.expire_month;
	body.latin_name = req.body.latin_name;
	body.arabic_name = req.body.arabic_name;
	body.governorate = req.body.governorate;
	body.expire_date = ( Date.parse(expire_date) + 1 * 86400000 );
	body.package_state = req.body.package_state;
	body.notes = req.body.notes;
	body.contact = {};
	body.contact.name = req.body.user_name;
	body.contact.email_address = req.body.user_email;
	if(req.body.email_private == 'on') {
		body.contact.email_invisible = true;
	}
	body.contact.phone = req.body.user_phone;

	Methods.addItem(body).then(function(id) {
		var email_data = {
			html : '<div align="right">'
					+ '<p align="right">أهلاً ' + req.body.user_name + '</p>'
					+ '<p align="right"> <span style="float: right"> شكرًا لوضعك طلب إدراج في دواسوا </p>'
					+ '<p align="right">بيانات الإدراج الذي وضعته هي:</p>'
					+ '<p align="right"><span style="float: right">اسم الدواء: </span>'+ req.body.latin_name +'</p>'
					+ '<p align="right"><span style="float: right">انتهاء الصلاحية: </span>'+ req.body.expire_month + ' - ' + req.body.expire_year +'</p>'
					+ '<p align="right"><span style="float: right"> المحافظة: </span>'+ req.body.governorate +'</p>'
					+ '<p align="right">لمنع إساءة الاستخدام فلن يظهر الإدراج في نتائج البحث للطالبين إلا بعد اتّباعك الرابط التالي لإتمام إجراء توكيد الإدراج</p>'
					+ site_url+'/verify/' + id
					+ '<p align="right">يجب إتمام هذا الإجراء في غضون ' + insertion_confirmation_grace + ' ساعة، و إلا فسيُحذف الطّلب</p>'
					+ '<p align="right">إذا لم تكن قد وضعت هذا الطّلب فتجاهل هذه الرسالة و لن تسمع منّا بعد الآن</p>'
					+ '<span align="right" style="float: right">المزيد عن خدمة تبادل الأدوية في </span> ' + site_url
					+ '</div>'
		}
		return Emailsender.sendEmail(req.body.user_email, 'verify entry', email_data);
	}).then(function() {
		res.sendStatus(200);
	}).catch(function(err) {
		console.log(err);
		res.sendStatus(500);
	});
});

module.exports = router;
