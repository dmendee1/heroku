const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
	order_id: {type: String, required: true},
	budget_name: {type: String, required: true},
	user_id: {type: String, required: true},
	username: {type: String, required: true},
	major: {type: String, required: true},
	department: {type: String, required: true},
	status: {type: Number, required: true},
	image: [{src: String, title: String, description: String, name: String}],
	working: {type: String},
	during: {type: String},
	budget: {type: String},
	result: {type: String},
	insertDate: {type: Date, default: Date.now }
});

module.exports = Order = mongoose.model('orders', OrderSchema);