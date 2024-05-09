var express = require('express');
const { Model, default: mongoose } = require('mongoose');
var router = express.Router();

const orderSchema = require('../models/order');
const verfyToken = require('../middleware/auth.sh.middleware');

router.get('/', verfyToken, async function (req, res, next) {
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