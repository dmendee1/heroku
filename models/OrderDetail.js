const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderDetailSchema = new Schema({
	order_id: {type: String, required: true},
	product_code: {type: String},
	spare_parts_code: {type: String},
	product_name: {type: String, required: true},
	unit: {type: String, required: true},
	residuals: {type: String},
	quantity: {type: String, required: true},
	technical_specifications: {type: String, required: true},
	purpose: {type: String, required: true},
	image: {type: String},
	insertDate: {type: Date, default: Date.now }
});

module.exports = OrderDetail = mongoose.model('orderDetail', OrderDetailSchema);
