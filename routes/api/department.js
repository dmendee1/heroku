const express = require('express');
const router = express.Router();

// Item Model
const OrderDetail = require('../../models/OrderDetail');

router.post('/', (req, res) => {
  const newItem = new OrderDetail({
    order_id: req.body.order_id,
    product_code: req.body.product_code,
    spare_parts_code: req.body.spare_parts_code,
    product_name: req.body.product_name,
    unit: req.body.unit,
    residuals: req.body.residuals,
    quantity: req.body.quantity,
    technical_specifications: req.body.technical_specifications,
    purpose: req.body.purpose,
    useful_life: req.body.useful_life,
    resource: req.body.resource,
    start_date: req.body.start_date,
  });
  newItem.save().then(item => res.json(item));
});


router.get('/:id', (req, res) => {
  OrderDetail.find({order_id: req.params.id})
    .sort({ insertDate: -1 })
    .then(items => res.json(items));
});

router.post('update', (req, res) => {
  OrderDetail.updateOne({ "_id":req.body.row._id}, {$set: row.body.cellName= row.body.cellValue})
    .then(item => res.json(item));
});

router.delete('/:id', (req, res) => {
  OrderDetail.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;