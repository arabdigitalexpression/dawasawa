var Item = require('./schema').Item;
var Token = require('./schema').Token;
var randToken = require('rand-token');

/********************************************************************************************/
/************************************* CRUD METHODS **************************************/
/*******************************************************************************************/

/****** 1- find functions *****/
module.exports.findAll = function(){
	return new Promise(function(resolve, reject) {
		Item.find(function(err, items) {
			if(err)
				reject(err);
			else
				resolve(items);
		});
	});
}

module.exports.findArchive = function(){
	return new Promise(function(resolve, reject) {
		Item.find({ archive: true },function(err, items) {
			if(err)
				reject(err);
			else
				resolve(items);
		});
	});
}

module.exports.findWithName = function(name) {
	return new Promise(function(resolve, reject) {
		Item.find({ "latin_name": name }, function(err, items) {
			if(err)
				reject(err);
			else {
				resolve(items);
			}
		});
	});
}

module.exports.findWithEmail = function(email) {
	return new Promise(function(resolve, reject) {
		var query = Item.find({
		    'owner.email': email,
		    archive: false
		}).populate('token');

		query.exec(function(err, items) {
			if(err)
				reject(err);
			else
				resolve(items);
		});
	});
}

module.exports.findWithToken = function(token) {
	return new Promise(function(resolve, reject) {
		var query = Token.findOne({ value: token }).populate('Item');

		query.exec(function(err, item) {
			if(err)
				reject(err);
			else
				resolve(item);
		});
	});
}


/****** 2- create functions *****/
module.exports.addItem = function(body) {
	return new Promise(function(resolve, reject) {
		var item = new Item(body);
		item.save(function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}

module.exports.generateTokens = function(items) {
	return new Promise(function(resolve, reject) {
		for (item of items) {
		      var token = new Token();
		      token.value = randToken.generate(32);
		      token.item = item._id;
		      item.token = token._id;
		      token.save(function(err) {
		          if (err)
		             	reject(err);
		      });
		}
		resolve(items);
	});	
}

/****** 3- update functions *****/
module.exports.updateItem = function(body) {
	return new Promise(function(resolve, reject) {
		Item.findOne({ _id: body.id }, function(err, item) {
			if(err)
				reject(err);
			else {
				item.latin_name = body.latin_name;
				item.arabic_name = body.arabic_name;
				item.city = body.city;
				item.expire_date = body.expire_date;
				item.state = body.state;
				item.info = body.info;
				item.pic_link = body.pic_link;
				item.owner.name = body.owner.name;
				item.owner.contact = body.owner.contact;
				resolve(item);
			}
		});
	});
}

module.exports.saveItem = function(item) {
	return new Promise(function(resolve, reject) {
		item.save(function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}

module.exports.saveItems = function(items) {
	return new Promise(function(resolve, reject) {
		for(item of items) {
			item.save(function(err) {
				if (err)
					reject(err);
			});	
		}
		resolve(items);
	});
}


/****** 4- delete functions *****/
module.exports.removeItem = function(item) {
	return new Promise(function(resolve, reject) {
		Item.remove({ _id: item._id }, function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}