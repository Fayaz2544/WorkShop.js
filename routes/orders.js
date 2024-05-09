var express = require('express');
const { Model, default: mongoose } = require('mongoose');
var router = express.Router();

// const productModel = require('../models/product');
const orderSchema = require('../models/order');

router.get('/', async function (req, res, next) {
  try {
    let order = await orderSchema.find();
    return res.status(200).send({
      data: order,
      message: "สำเร็จ",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "server error",
      success: false,
    })
  }
})

module.exports = router;