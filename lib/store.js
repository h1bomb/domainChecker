var Datastore = require('nedb');

module.exports = Store;

function Store() {
	this.db = new Datastore({
		filename: './domain.db',
		autoload: true
	});
}

Store.prototype.insert = function(obj, callback) {
	this.db.insert(obj, function(err, newDoc) {
		if (!err && callback) {
			callback(newDoc);
		}
	});
}