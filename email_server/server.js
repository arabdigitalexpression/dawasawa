const http = require('http'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  EmailSender = require('./controllers/emailsender'),
	  Config = require('./config/config')



// start the app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Sends token ladden email messages to confrm actions
app.get('/submit_email', (req, res) => {
	let site_url = Config.site_url
	let insertion_challenge_grace = config.insertion_challenge_grace
	let encrypted = req.body.encrypted

	let email_data = {
			html : '<div align="right">'
					+ '<p align="right">أهلاً ' + req.body.user_name + '</p>'
					+ '<p align="right">شكرًا لوضعك طلب إدراج في دواسوا </p>'
					+ '<p align="right">بيانات الإدراج الذي وضعته هي</p>'
					+ '<p align="right"><span style="float: right">اسم الدواء </span>'+ req.body.latin_name +'</p>'
					+ '<p align="right"><span style="float: right">نهاية الصلاحية </span>'+ req.body.expiry_month + ' - ' + req.body.expiry_year +'</p>'
					+ '<p align="right"><span style="float: right"> المحافظة </span>'+ req.body.governorate +'</p>'
					+ '<p align="right">لمنع إساءة الاستخدام فلن يظهر الإدراج في نتائج البحث للطالبين إلا بعد اتّباعك الرابط التالي لإتمام إجراء توكيد الإدراج</p>'
					+ '<a href="' + site_url + '/verify/' + encrypted + '">' + site_url + '/verify/' + encrypted + '</a>'
					+ '<p align="right">يجب إتمام هذا الإجراء في غضون ' + insertion_challenge_grace + ' ساعة، و إلا فسيُحذف الطّلب</p>'
					+ '<p align="right">إذا لم تكن قد وضعت هذا الطّلب فتجاهل هذه الرسالة و&nbsp;لن تسمع منّا بعد الآن</p>'
					+ '<span align="right" style="float: right">المزيد عن خدمة تبادل الأدوية في </span><a href="' + site_url + '">' + site_url + '</a>'
					+ '</div>'
		}
	EmailSender.sendmail(config.email_address_from, req.body.contact.user_email, 'دواسوا: توكيد طلب إدراج', email_data).then((reply) => {
		console.log(reply)
	}).catch((err)=> {
		console.log(err)
	})
})

// Sends token ladden email messages to confrm actions
app.get('/listing_email', (req, res) => {
	let site_url = Config.site_url
	let listings_challenge_grace = config.listings_challenge_grace
	let encrypted = req.body.encrypted

	let email_data = {
		html :  '<div align="right">'
				+'أهلا!'
				+ '<p align="right"><span style="float: right"> شخص ما قد طلب معاينة قائمة الإدراجات المرتبطة بعنوان البريد هذا في </span><span> dawasawa.online</span></p>'
				+ '<p align="right">تمكنك معاينة إدراجاتك باتّباع الرابط التالي في غضون ' + listings_challenge_grace + ' ساعة، وإلا فتجاهل هذه الرّسالة.</p>'
				+ '<a href="' + site_url + '/mylist/' + encrypted + '">' + site_url + '/mylist/' + encrypted + '</a>'
				+ '</div>'
		}
	Emailsender.sendEmail(config.email_address_from, req.body.user_email, 'دواسوا: قائمة إدراجات', email_data).then((reply) => {
		console.log(reply)
	}).catch((err)=> {
		console.log(err)
	})
})


// Sends email through /emailus form to a specified address
app.get('/contact_email', (req, res) => {
	let email_data = {
		html :  '<div align="right">'
					+ '<p align="right">بيانات المرسل</p>'
					+ '<p align="right">' + req.body.user_name + '&lt;' + req.body.user_email + '&gt;' + '</p>'
					+ '<br>'
					+ '<p align="right">الرسالة</p>'
					+ '<p align="right">' + req.body.user_message + '</p>'
					+ '</div>'
		}
	Emailsender.sendEmail(config.email_address_writeus, config.email_address_writeus, 'استمارة الاتّصال', email_data).then((reply) => {
		console.log(reply)
	}).catch((err)=> {
		console.log(err)
	})
})

// start the server
var server = http.createServer(app);
server.listen(Config.app_port, function() {
	console.log('Email Server is running on port: %s in %s mode', Config.app_port, process.env.NODE_ENV);
});