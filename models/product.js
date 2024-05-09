const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    products_name: { type: String, unique: true, required: true },
    price: { type: Number },
    amount: { type: Number },
    orders: [{ type: Schema.Types.ObjectId, ref: 'order' }],
    loggedInUser: { type: Object, ref: 'shop' }
}, {
    timestamps: true
});

module.exports = mongoose.model("product", productSchema);
