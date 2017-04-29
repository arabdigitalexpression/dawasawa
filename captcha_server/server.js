const http = require('http'),
	  path = require('path'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  cookieParser = require('cookie-parser'),
	  mongoose = require('mongoose'),
	  svgCaptcha = require('svg-captcha'),
	  CaptchaCtrl = require('./controllers/captcha'),
	  config = require('./config/config'),
	  Encrypter = require('./controllers/encrypter')

// start the app
var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(cookieParser())

app.use((req, res, next) => {
	let cookie = req.cookies.session_id
	if(cookie === undefined) {
		return res.sendStatus(401)
	}
	next()
})

// health check
app.get('/', (req, res)=> {
	res.sendStatus(200)
})

// get new captcha
app.get('/captcha', (req, res) => {
	let captcha = svgCaptcha.create({
		size: config.CAPTCHA_SIZE,
		noise: config.CAPTCHA_NOISE,
		color: true,
		background: '#FFF'
	})

	CaptchaCtrl.removeCaptcha(req.cookies.session_id).then(() => {
		return CaptchaCtrl.addCaptcha(req.cookies.session_id, captcha.text)
	}).then(() => {
		//res.set('Content-Type', 'image/svg+xml')
    	res.send(captcha.data)
	}, (err) => {
		console.log(err)
		res.status(500).send('error getting captcha')
	})
})


// post captcha answer
app.post('/captcha', (req, res) => {
	console.log(req.cookies.session_id);
	CaptchaCtrl.findCaptcha(req.body.value, req.cookies.session_id).then((cap) => {
		let auth = {
			"auth": true,
			"date": Date()
		}
		return Encrypter.encrypt( JSON.stringify(auth) )
	}).then((encryptedAuth) => {
		res.cookie('authenticated_human', encryptedAuth , { httpOnly: true })
		res.sendStatus(200)
	}).catch((err) => {
		console.log(err)
		if(err === 'cap not found'){
			res.sendStatus(404)
		} else {
			res.sendStatus(500)
		}
	})
})

// start the server
var server = http.createServer(app)
server.listen(config.PORT, () => {
	console.log('%s is running on port: %s',config.NAME, config.PORT)
	// Connect to mongodb
	mongoose.connect(config.DB_HOST + ":" + config.DB_PORT + "/" + config.DB_NAME)
	mongoose.connection.on('error', function(err) {
        console.log('error', err);
        process.exit(1);
    });
    mongoose.connection.once('open', function(callback) {
        console.log('Connected to Database!');
    })
})