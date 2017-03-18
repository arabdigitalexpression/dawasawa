const http = require('http'),
	  path = require('path'),
	  express = require('express'),
	  bodyParser = require('body-parser'),
	  cookieParser = require('cookie-parser'),
	  mongoose = require('mongoose'),
	  svgCaptcha = require('svg-captcha'),
	  CaptchaCtrl = require('./controllers/captcha'),
	  Config = require('./config/config')
	  Encrypter = require('./controllers/encrypter')

// define the environment
process.env.NODE_ENV = 'Development'

// Connect to mongodb
var db = mongoose.connect(Config.database_uri)

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

app.get('/captcha', (req, res) => {
	let captcha = svgCaptcha.create({
		size: 4,
		noise: 2,
		color: true,
		background: '#FFF'
	})
	CaptchaCtrl.addCaptcha(req.cookies.session_id, captcha.text).then(function() {
		//res.set('Content-Type', 'image/svg+xml')
		console.log(captcha.text)
    	res.send(captcha.data)
	}, function(err) {
		console.log(err)
		res.status(500).send('error getting captcha')
	})
})

app.post('/captcha', (req, res) => {
	CaptchaCtrl.findCaptcha(req.body.value, req.cookies.session_id).then((cap) => {
		let auth = {
			"auth": true,
			"date": Date()
		}
		return Encrypter.encrypt( JSON.stringify(auth) )
	}).then((encryptedAuth) => {
		console.log('token encrypted')
		res.cookie('authenticated_human', encryptedAuth.base62Data , { httpOnly: true })
		res.cookie('auth_tag', encryptedAuth.encodedAuthTag , { httpOnly: true })
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
server.listen(Config.app_port, function() {
	console.log('%s is running on port: %s in %s mode',Config.app_name, Config.app_port, process.env.NODE_ENV)
})