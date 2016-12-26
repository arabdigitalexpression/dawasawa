var Item =  require('../models/methods');
var Tasks = require('../controllers/controller');

module.exports = function(app) {

	app.get('/', function(req, res) {
		res.send('Welcome to DawaSawa API');
	});

	// find test
	app.get('/all', function(req, res) {
		Item.findAll().then(function(items) {
			res.send(items);
		}, function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});

	app.get('/archive', function(req, res) {
		Item.findArchive().then(function(items) {
			res.send(items);
		}, function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});

	app.post('/search', function(req, res) {
		Item.findWithName(req.body.name).then(function(items) {
			res.send(items);
		}, function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});

	app.post('/email', function(req, res) {
		Item.findWithEmail(req.body.email).then(function(items) {
			return Item.generateTokens(items);
		}).then(function(items) {
			return Item.saveItems(items);
		}).then(function(items) {
			res.send(items);
		}).catch(function(err) {
			res.send(500);
			console.log(err);
		});
	});

	app.get('/item', function(req, res) {
		Item.findWithToken(req.query.token).then(function(item) {
			if (item == null) 
				res.sendStatus(404);
			else
				res.send(item);
		}, function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});


	// create test
	app.post('/add', function(req, res) {
		Item.addItem(req.body).then(function() {
			res.sendStatus(200);
		}, function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});

	//update test
	app.post('/update', function(req, res) {
		Item.updateItem(req.body).then(function(item) {
			return Item.saveItem(item);
		}).then(function() {
			res.sendStatus(200);
		}).catch(function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});

	// remove test
	app.post('/remove', function(req, res) {
		Item.findWithToken(req.query.token).then(function(item) {
			return Item.removeItem(item);
		}).then(function() {
			res.sendStatus(200);
		}).catch(function(err) {
			res.sendStatus(500);
			console.log(err);
		});
	});

	// test node mailer
	app.get('/mail', function(req, res) {
		Tasks.sendEmail('mohamedgundour@gmail.com', 'hoorrrrrrrooooo').then(function(info) {
			res.send(info);
		}, function(err) {
			res.send(err)
		});
	});	
}