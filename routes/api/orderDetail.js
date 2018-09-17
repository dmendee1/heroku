const express = require('express');
const router = express.Router();
const path = require('path');
var fs = require('fs');
var multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(!fs.existsSync('./client/src/uploads/' + req.body.id)) {
      fs.mkdirSync('./client/src/uploads/' + req.body.id);
    }
    cb(null, './client/src/uploads/' + req.body.id);
  },
  filename: (req, file, cb) => {
    const newFilename = '${path.extname(file.originalname)}';
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});
var upload = multer({storage: storage});
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
    image: req.body.image
  });
  newItem.save().then(item => res.json(item));
});

router.get('/:id', (req, res) => {
  OrderDetail.find({order_id: req.params.id})
    .sort({ insertDate: -1 })
    .then(items => res.json(items));
});

router.post('/update', (req, res) => {
  console.log("Post boyd", req.body);
  var od = {};
  od[req.body.field] = req.body.value;
  const updateValue = {$set: od}
  OrderDetail.updateOne({ "_id":req.body.id}, updateValue)
    .then(item => res.json(item));
});

router.delete('/:id', (req, res) => {
  OrderDetail.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
})

module.exports = router;