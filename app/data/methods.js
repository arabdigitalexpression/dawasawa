var randomstring = require('randomstring');
var Item = require('./schema').Item;
var Token = require('./schema').Token;
var Captcha = require('./schema').Captcha;

/********************************************************************************************/
/************************************* CRUD METHODS **************************************/
/*******************************************************************************************/

/****** 1- find functions *****/

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

module.exports.findMedicine = function(name, gov) {
	return new Promise(function(resolve, reject) {
		if (gov === "كلّ المحافظات") {
			Item.find({ "latin_name": name, "instated": true }, function(err, items) {
				if(err)
					reject(err);
				else {
					resolve(items);
				}
			});
		} else {
			Item.find({ "latin_name": name, "governorate": gov, "instated": true }, function(err, items) {
				if(err)
					reject(err);
				else {
					resolve(items);
				}
			});
		}
	});
}

module.exports.findWithId = function(id) {
	return new Promise(function(resolve, reject) {
		Item.findOne({ "_id": id }, function(err, item) {
			if(err)
				reject(err);
			else {
				resolve(item);
			}
		});
	});
}

module.exports.findWithEmail = function(email) {
	return new Promise(function(resolve, reject) {
		var query = Item.find({
		    'contact.email_address': email,
		    instated: true
		});

		query.exec(function(err, items) {
			if(err)
				reject(err);
			else
				resolve(items);
		});
	});
}

module.exports.findEmailWithToken = function(value) {
	return new Promise(function(resolve, reject) {
		Token.find({ value: value }, function(err, token) {
			if(err)
				reject(err)
			resolve(token);
		})
	});
}

module.exports.findExpired = function(days) {
	console.log(days);
	var date = new Date();
	console.log(date);
	var expireDate = new Date(date.setTime( date.getTime() + days * 86400000 ));
	console.log(expireDate);

	return new Promise(function(resolve, reject) {
		Item.find({ expire_date: { $lt : expireDate }}, function(err, items) {
			if(err) {
				reject(err);
				console.log(err);
			}
			else
				resolve(items);
		});
	});
}

module.exports.findCaptcha = function(value) {
	return new Promise(function(resolve, reject) {
		Captcha.findOne({ value : value }, function(err, cap) {
			if(err) {
				reject(err);
			} else 
				resolve(cap);
		});
	});
}
module.exports.findSession = function(session_id) {
	return new Promise(function(resolve, reject) {
		Captcha.findOne({ session_id : session_id }, function(err, cap) {
			if(err) {
				reject(err);
			} else 
				resolve(cap);
		});
	});
}


/****** 2- create functions *****/
// 2.1- create new item
module.exports.addItem = function(body) {

	var now = Date();
	var id = randomstring.generate({
		length: 32,
		charset: 'alphanumeric'
	});
	return new Promise(function(resolve, reject) {	
		var item = new Item(body);
		item.submission_date = now;
		item._id = id;
		item.save(function(err) {
			if(err) {
				reject(err);
			}
			else
				resolve(id);
		});
	});
}

// 2.2- create new tokens for existing items
module.exports.saveToken = function(user_email, value) {
	return new Promise(function(resolve, reject) {
		var token = new Token();
		var str = value.replace(/[^\w\s]/gi, '');
		token.value = str;
		token.user_email = user_email;
		token.save(function(err) {
			if(err)
				reject(err);
			resolve(token);
		});
	});
}

module.exports.addCaptcha = function(session_id, value) {
	return new Promise(function(resolve, reject) {
		var cap = new Captcha();
		cap.value = value;
		cap.session_id = session_id;
		cap.save(function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}


/****** 3- update functions *****/
// 3.1- update an item
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

module.exports.verifyEntry = function(id) {
	return new Promise(function(resolve, reject) {
		Item.findOne({ "_id": id }, function(err, item) {
			if(err)
				reject(err);
			else {
				item.instated = true;
				resolve(item);
			}
		});
	});
}

// 3.2- update archive with expired items
module.exports.updateArchives = function(items) {
	return new Promise(function(resolve, reject) {
		for(item of items) {
			item.archive = true;
			item.save(function(err) {
				if(err)
					reject(err);
			});
		}
		resolve();
	});
}

// 3.3- save an updated item
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

// 3.4- save updated items
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
module.exports.removeItem = function(id) {
	return new Promise(function(resolve, reject) {
		Item.remove({ _id: id }, function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}

module.exports.removeCaptcha = function(cap) {
	return new Promise(function(resolve, reject) {
		Captcha.remove({ _id: cap._id }, function(err) {
			if(err)
				reject(err);
			else
				resolve();
		});
	});
}
