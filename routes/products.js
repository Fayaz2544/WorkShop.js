var express = require('express');
const { Model, default: mongoose } = require('mongoose');
var router = express.Router();

const productModel = require('../models/product');
const productSchema = require('../models/product');
const orderSchema = require('../models/order');
const shopSchema = require('../models/shop');
const verfyToken = require('../middleware/auth.sh.middleware');
const { decode } = require('jsonwebtoken');


router.get('/', async function (req, res, next) {
  try {
    let products = await productModel.find();
    return res.status(200).send({
      data: products,
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

router.post('/', async function (req, res, next) {
  try {
    const { products_name, price, amount} = req.body;
    let newProduct = new productModel({
      products_name: products_name,
      price: price,
      amount: amount,
    });
    let product = await newProduct.save();
    return res.status(201).send({
      data: product,
      message: "เพิ่มข้อมูลสำเร็จ",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "เพิ่มข้อมูลไม่สำเร็จ",
      success: false,
    })
  }
})

router.put("/:id", async function (req, res, next) {
  try {

    let { products_name, price, amount, order } = req.body;

    let update = await productSchema.findByIdAndUpdate(req.params.id, { products_name, price, amount, order }, { new: true });
    return res.status(200).send({
      data: update,
      message: "อัพเดตสำเร็จ",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: "delete fail",
      success: false,
      error: error.toString()
    });
  }  
});

router.delete("/:id", async function (req, res, next) {
  try {
    let delete_user = await productSchema.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      data: delete_user,
      message: "ลบข้อมูลสำเร็จ",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "delete fail",
      success: false
    })
  }
})

router.get('/:id', async function (req, res, next) {
  try {
    const productId = req.params.id;
    const product = await productSchema.findById(productId);
    if (!product) {
      return res.status(404).send({
        message: "ไม่พบสินค้า",
        success: false
      });
    }
    return res.status(200).send({
      data: product,
      message: "สำเร็จ",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: "Server error",
      success: false,
    });
  }
});

router.get('/:id/orders', async function (req, res, next) {
  try {
    const productId = req.params.id; // รับ Product ID จากพารามิเตอร์ของคำขอ
    const foundProduct = await productSchema.findById(productId); // ค้นหาสินค้าโดยใช้ ID
    if (!foundProduct) { // ถ้าไม่พบสินค้า ให้ส่งข้อความผิดพลาด 404 กลับไป
      return res.status(404).send({
        message: "ไม่พบสินค้า",
        success: false
      });
    }

    // ค้นหาคำสั่งซื้อที่เกี่ยวข้องกับสินค้าโดยการค้นหาในคอลเลคชัน orders
    const orders = await orderSchema.find({ productId: productId });

    // ส่งข้อมูลคำสั่งซื้อพร้อมกับข้อความสำเร็จกลับไป
    return res.status(200).send({
      productName: foundProduct.name, // เพิ่มชื่อสินค้าในการตอบกลับ
      orders: orders, // ส่งข้อมูลคำสั่งซื้อ
      message: "สำเร็จ",
      success: true,
    });
  } catch (error) {
    // ถ้าเกิดข้อผิดพลาดขณะประมวลผล ให้ส่งข้อความข้อผิดพลาด 500 กลับไป
    return res.status(500).send({
      message: "ข้อผิดพลาดของเซิร์ฟเวอร์",
      success: false,
    });
  }
});

router.post('/:id/orders', verfyToken, async function (req, res, next) {
  try {
    const productId = req.params.id; // Extract the product ID from the request parameters
    const product = await productSchema.findById(productId); // Find the product by its ID
    const loginId = req.auth;

    if (!product) { // If the product is not found, return a 404 error
      return res.status(404).send({
        message: "ไม่พบสินค้า",
        success: false
      });
    }

    // Check if adding this order exceeds the product's amount
    if (product.orders.length >= product.amount) {
      return res.status(400).send({
        message: "สินค้าเกินจำนวน ไม่สามารถสั่งเพิ่มได้",
        success: false
      });
    }

    console.log(req.auth)
    
    // Create a new order document
    const order = new orderSchema({
      productId: productId,
      loginId: loginId
    });
    

    // Save the order document to the database
    await order.save();

    // Add the order ID to the product's orders array
    product.orders.push(order._id);
    await product.save();

    // Return a success message
    return res.status(200).send({
      data: order,
      message: "เพิ่มคำสั่งซื้อลงในผลิตภัณฑ์เรียบร้อยแล้ว",
      success: true,
    });
  } catch (error) {
    // If an error occurs during the process, return a 500 server error
    return res.status(500).send({
      message: "Server error",
      success: false,
      error: error.toString()
    });
  }
});


module.exports = router;