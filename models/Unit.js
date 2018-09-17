const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UnitSchema = new Schema({
	unit_id: {type: String, required: true},
	detaiil: {type: String, required: true},
	insertDate: {type: Date, default: Date.now }
});
module.exports = Unit = mongoose.model('unit', UnitSchema);
