const express = require('express');
const router = express.Router();

const shopSchema = require('../models/shop');

router.put("/:id", async function (req, res, next) {
  try {
    let { username, password, firstName, lastName, email, role, token, status } = req.body;

    let approve = await shopSchema.findByIdAndUpdate(req.params.id, { username, password, firstName, lastName, email, role, token, status }, { new: true });
    return res.status(200).send({
      data: approve,
      message: "อนุมัติสำเร็จ",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "ไม่พบข้อมูล",
      success: false,
      error: error.toString()
    });
  }
});

module.exports = router;