const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const LogSchema = new Schema({
	user_id: {type: String, required: true},
	modify: {type: String, required: true},
	lastname: {type: String, required: true},
	coll: {type: String, required: true},	
	verify: {type: String, required: true},
	inputItem: {type: Array, required: true},
	insertDate: {type: Date, default: Date.now }
});

module.exports = Log = mongoose.model('logs', LogSchema);