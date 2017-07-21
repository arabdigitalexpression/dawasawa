const http = require('http'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  config = require('./config/config')

if( process.env.NODE_ENV === "dev" ) EmailSender = require('./controllers/nodemailer_sender')
else EmailSender = require('./controllers/emailsender')

// start the app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// health check
app.get('/heartbeat', (req, res) => {
	res.sendStatus(200);
})

// Sends token ladden email messages to confrm actions
app.post('/submit_email', (req, res) => {
	// validate request
	if(req.body.contact.name === undefined || req.body.email_address === undefined || req.body.encrypted === undefined ) {
		return res.sendStatus(406)
	}

	let site_url = config.SITE_URL
	let insertion_challenge_grace = config.INSERTION_CHALLENGE_GRACE
	let encrypted = req.body.encrypted

	let email_data = {
			html : '<div align="right">'
					+ '<p align="right"><span style="float: right; padding: 0 0 0 5px;"> أهلاً </span>' + req.body.contact.name + '</p>'
					+ '<p align="right">شكرًا لوضعك طلب إدراج في دواسوا </p>'
					+ '<p align="right">بيانات الإدراج الذي وضعته:</p>'
					+ '<p align="right"><span style="float: right; padding: 0 0 0 5px;">اسم الدواء:  </span>'+ req.body.latin_name + '</p>'
					+ '<p align="right"><span style="float: right; padding: 0 0 0 5px;">نهاية الصلاحية: </span>'+ req.body.expiry_date + '</p>'
					+ '<p align="right"><span style="float: right; padding: 0 0 0 5px;"> :المحافظة </span>'+ req.body.governorate +'</p>'
					+ '<p align="right">لمنع إساءة الاستخدام فلن يظهر الإدراج في نتائج البحث للطالبين إلا بعد اتّباعك الرابط التالي لإتمام إجراء توكيد الإدراج</p>'
					+ '<a href="' + site_url + '/instate/' + encrypted + '">' + site_url + '/instate/' + encrypted + '</a>'
					+ '<p align="right">يجب إتمام هذا الإجراء في غضون ' + insertion_challenge_grace + ' ساعة، و إلا فسيُحذف الطّلب</p>'
					+ '<p align="right">إذا لم تكن قد وضعت هذا الطّلب فتجاهل هذه الرسالة و&nbsp;لن تسمع منّا بعد الآن</p>'
					+ '<span align="right" style="float: right; padding: 0 0 0 5px;">المزيد عن خدمة تبادل الأدوية في </span><a href="' + site_url + '">' + site_url + '</a>'
					+ '</div>'
		}
	EmailSender.sendmail(config.EMAIL_FROM, req.body.email_address, 'دواسوا: توكيد طلب إدراج', email_data).then((reply) => {
		res.send(reply)
	}).catch((err)=> {
		//console.log(err)
		res.sendStatus(500)
	})
})

// Sends token ladden email messages to confrm actions
app.post('/listing_email', (req, res) => {
	// validate request
	if(req.body.email_address === undefined || req.body.encrypted === undefined ) {
		return res.sendStatus(406)
	}

	let site_url = config.SITE_URL
	let listings_challenge_grace = config.LISTING_CHALLENGE_GRACE
	let encrypted = req.body.encrypted

	let email_data = {
		html :  '<div align="right">'
				+'أهلا!'
				+ '<p align="right"><span style="float: right"> شخص ما قد طلب معاينة قائمة الإدراجات المرتبطة بعنوان البريد هذا في </span><span> dawasawa.online</span></p>'
				+ '<p align="right">تمكنك معاينة إدراجاتك باتّباع الرابط التالي في غضون ' + listings_challenge_grace + ' ساعة، و&nbsp;إلا فتجاهل هذه الرّسالة.</p>'
				+ '<a href="' + site_url + '/mylist?accesstoken=' + encrypted + '">' + site_url + '/mylist?accesstoken=' + encrypted + '</a>'
				+ '</div>'
		}
	EmailSender.sendmail(config.EMAIL_FROM, req.body.email_address, 'دواسوا: قائمة إدراجات', email_data).then((reply) => {
		res.send(reply)
	}).catch((err)=> {
		console.log(err)
		res.send(err)
	})
})

// Sends email through /emailus form to a specified address
app.post('/contact_email', (req, res) => {
	// validate request
	if(req.body.email === undefined || req.body.username === undefined || req.body.message === undefined ) {
		return res.sendStatus(406)
	}
	
	let email_data = {
		html :  '<div align="right">'
					+ '<p align="right">بيانات المرسل</p>'
					+ '<p align="right">' + req.body.username + '&lt;' + req.body.email + '&gt;' + '</p>'
					+ '<br>'
					+ '<p align="right">الرسالة</p>'
					+ '<p align="right">' + req.body.message + '</p>'
					+ '</div>'
		}
	EmailSender.sendmail(config.EMAIL_FROM, config.EMAIL_TO, 'استمارة الاتّصال', email_data).then((reply) => {
		res.send(reply)
	}).catch((err)=> {
		console.log(err)
		res.send(err)
	})
})

// start the server
var server = http.createServer(app)

server.listen(config.PORT, ()=> {
	console.log('%s is running on port: %s', config.NAME , config.PORT);
});
