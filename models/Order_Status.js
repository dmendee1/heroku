const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const Order_StatusSchema = new Schema({
	status_number: {type: Number, required: true},
	value: {type: String, required: true}
});

module.exports = Order_Status = mongoose.model('order_status', Order_StatusSchema);