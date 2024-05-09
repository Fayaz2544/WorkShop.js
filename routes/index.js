var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

const shopModel = require('../models/shop');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verfyToken = require('../middleware/auth.sh.middleware');

router.post("/login", async function (req, res, next) {
  try {
    let { password, username } = req.body;
    let shop = await shopModel.findOne({
      username: username,
    });
    if (!shop) {
      return res.status(500).send({
        message: "ไม่สามารถเข้าสู่ระบบได้",
        success: false,
      })
    }
    const checkPassword = await bcrypt.compare(password, shop.password);
    if (!checkPassword) {
      return res.status(500).send({
        message: "ไม่สามารถเข้าสู่ระบบได้",
        success: false,
      })
    }

    // ตรวจสอบบทบาทของผู้ใช้
    let role = shop.role;

    // เงื่อนไขสำหรับบทบาท "admin"
    if (role === "admin") {
      // สร้าง token สำหรับ admin โดยมีสิทธิ์ "approve"
      const { _id, firstName, lastName, email } = shop;
      const token = jwt.sign({ _id, firstName, lastName, email, role, approve: true }, process.env.JWT_KEY);
      return res.status(201).send({
        data: { _id, firstName, lastName, email, role, approve: true, token },
        message: "เข้าสู่ระบบสำเร็จ",
        success: true,
      });
    }

    // เงื่อนไขสำหรับบทบาท "customer"
    if (role === "customer") {
      // ตรวจสอบสถานะของลูกค้า
      if (shop.status !== "approve") {
        return res.status(403).send({
          message: "รอการอนุมัติ",
          success: false,
        });
      }

      // สร้าง token สำหรับ customer
      const { _id, firstName, lastName, email, status } = shop;
      const token = jwt.sign({ _id, firstName, lastName, email, role, status }, process.env.JWT_KEY);
      return res.status(201).send({
        data: { _id, firstName, lastName, email, role, token, status },
        message: "เข้าสู่ระบบสำเร็จ",
        success: true,
      });
    }

    // ถ้าไม่ใช่ admin หรือ customer ให้ส่งคำตอบ login fail
    return res.status(500).send({
      message: "ไม่สามารถเข้าสู่ระบบได้",
      success: false,
    });

  } catch (error) {
    return res.status(500).send({
      message: "ไม่สามารถเข้าสู่ระบบได้",
      success: false,
    })
  }
})

module.exports = router;