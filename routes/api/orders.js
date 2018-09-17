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
    cb(null, file.originalname);
  },
});
var upload = multer({storage: storage});

const Order = require('../../models/Order');
const Order_Status = require('../../models/Order_Status');
const Log = require('../../models/Log');
const VerifyOrder = require('../../models/VerifyOrder');

router.get('/', (req, res) => {
  Order.find()
    .sort({ insertDate: -1 })
    .then(items => res.json(items));
});

router.post('/getOrder', (req, res) => {
  Order.find({order_id: req.body.order_id})
    .then(items => res.json(items));
})

router.post('/filter', (req, res) => {
  console.log(req.body)
  if(req.body.authentication > 9) {
    Order.find()
      .sort({ insertDate: -1 })
      .then(items => res.json(items));
  } else if(req.body.authentication === 0) {
    Order.find({user_id: req.body.user_id})
      .sort({ insertDate: -1 })
      .then(items => res.json(items));
  } else if(req.body.authentication === 1) { 
    Order.find({department: req.body.department})
      .sort({ insertDate: -1 })
      .then(items => res.json(items));

  } else {
    Order.find({status: req.body.authentication })
      .sort({ insertDate: -1 })
      .then(items => res.json(items));
  }
  
});

router.post('/getVerify', (req, res) => {
  VerifyOrder.find({order_id: req.body.order_id})
    .sort({insertDate: -1})
    .then(items => res.json(items));
})

router.post('/changeStatus', (req, res) => {
  var od = {};
  var verify_text_input = {};
  od['status'] = req.body.authentication + 1;
  const updateValue = {$set: od}
  console.log(updateValue);
  if(od.status > 0)
    verify_text_input['status'] = 'Баталгаажуулсан'
  else
    verify_text_input['status'] = 'Цуцалсан'
  const verifyItem = new VerifyOrder({order_id: req.body.order_id, user_id:req.body.user_id, lastname: req.body.lastname, verify_id: od.status, verify_text: verify_text_input.status, commend: ''}); verifyItem.save();
  const logItem = new Log({user_id:req.body.user_id, lastname: req.body.lastname, modify:"VerifyOrCancelled", coll:"order", verify: verify_text_input.status, "inputItem":req.body});logItem.save();
  Order.updateOne({ "order_id":req.body.order_id}, updateValue)
    .then(item => res.json(item));
})

router.post('/getLog', (req, res) => {
  Log.find({"inputItem.id" : req.body.id})
    .sort({ insertDate: -1 })
    .then(items => res.json(items));
})

router.post('/upload', upload.single('selectedFile'), (req, res) => {
  var od = {};
  console.log(req.body);
  var file =  {src: req.body.src, title: "1234", description: '12324', name: req.body.image};
  od['image'] = file;
  const updateValue = {$push: od}
  console.log(req.body);
  console.log(req.body.image);
  console.log(file);
  console.log(updateValue);
  const logItem = new Log({user_id:req.body.user_id, lastname: req.body.lastname, modify:"UploadImage", coll:"order", verify: "Upload Image", "inputItem":req.body});logItem.save();
  Order.update({ "order_id":req.body.id }, updateValue,
    function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    });
})

router.post('/', (req, res) => {
  
  Order.find()
  .sort({ insertDate: -1 })
  .limit(1)
  .then(order=> {
    const newItem = new Order({
      order_id: order[0].order_id + 1,
      user_id: req.body.user_id,
      username : req.body.username,
      major : req.body.major,
      department: req.body.department,
      status: req.body.status,
      type: req.body.type,
      image: []
    });
    const logItem = new Log({user_id:req.body.user_id, lastname: req.body.username, modify:"InsertOrder", coll:"order", verify: "Insert Order", "inputItem":req.body});logItem.save();
    newItem
      .save()
      .then(order => {
          res.json(order)
      }); 
  });
});

router.post('/update', (req, res) => {
  console.log("Post boyd", req.body);
  var od = {};
  od[req.body.field] = req.body.value;
  const logItem = new Log({user_id:req.body.user_id, lastname: req.body.lastname, modify:"UploadImage", coll:"order", verify: "Upload Image", "inputItem":req.body});logItem.save();
  const updateValue = {$set: od}
  Order.updateOne({ "_id":req.body.id}, updateValue)
    .then(item => res.json(item));
})

module.exports = router;