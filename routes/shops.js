var express = require('express');
var router = express.Router();

const verfyToken = require('../middleware/auth.sh.middleware')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const shopModel = require('../models/shop');
const { token } = require('morgan');

/*----- register -----*/
router.post("/", async function (req, res, next) {
    try {
        const token = req.headers.authorization.split("Bearer ")[1]
        const { username, password, firstName, lastName, email, role, status } = req.body;
        let hashPassword = await bcrypt.hash(password, 10);
        let newShop = new shopModel({
            username: username,
            password: hashPassword,
            firstName: firstName,
            lastName: lastName,
            email: email,
            role: role,
            status: status,
            token: token
        });
        let shop = await newShop.save();
        return res.status(201).send({
            data: shop,
            message: "creat success",
            success: true,
        });
    } catch (error) {
        return res.status(500).send({
            message: "create fail",
            success: false,
        })
    }
})

router.get("/", verfyToken, async function (req, res, next) {
    try {
        const shop = await shopModel.find();
        return res.status(200).send({
            data: shop,
            message: "success",
            success: true,
        });
    } catch (error) {
        return res.status(500).send({
            message: "fail",
            success: false,
        })
    }
})

module.exports = router;