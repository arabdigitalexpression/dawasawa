var Item = require('../models/methods');

module.exports.startReaper = function() {
	reaper();	
}

function reaper() {
	Item.findExpired(30).then(function(items){
		if(items.lenth != 0) {
			return Item.updateArchives(items);
		}
	}).then(function() {
		console.log('New Items Archived');
		return Item.findArchive();
	}).then(function(items){
		console.log(items);
	}).catch(function(err) {
		if(err)
			console.log(err);
	});

	setTimeout(reaper, 86400000);
}