const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const VerifyOrderSchema = new Schema({
	order_id: {type: String, required: true},
	user_id: {type: String, required: true},
	lastname: {type:String, required: true},
	verify_id: {type: String, required: true},	
	verify_text: {type: String, required: true},
	insertDate: {type: Date, default: Date.now }
});

module.exports = VerifyOrder = mongoose.model('verify_order', VerifyOrderSchema);