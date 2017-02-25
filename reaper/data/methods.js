var Item = require('./schema');

module.exports.findExpired = function(days) {
	var date = new Date();
	console.log(date);
	var expireDate = new Date(date.setTime( date.getTime() + days * 86400000 ));
	console.log(expireDate);

	return new Promise(function(resolve, reject) {
		Item.find({ expire_date: { $lt : expireDate }}, function(err, items) {
			if(err) {
				reject(err);
			}
			else
				resolve(items);
		});
	});
}


module.exports.findNotInstated = function(days) {
	var date = new Date();
	var checkDate = new Date(date.setTime( date.getTime() + days * 86400000 ));
	console.log('checkDate : ' checkDate);
	
	return new Promise(function(resolve, reject) {
		Item.find({ instated: false }, ) 
	});

}