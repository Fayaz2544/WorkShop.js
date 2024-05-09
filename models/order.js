const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    loginId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
});

module.exports = mongoose.model("order", orderSchema);