const mongoose = require("mongoose")
const { Schema } = mongoose;

const shopSchema = new Schema({
    username: { type: String, unique:true },
    password: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    role: { type: String },
    status: {
        type: String,
        default: function() {
            if (this.role === 'customer') {
                return 'not approve';
            } else if (this.role === 'admin') {
                return 'approve';
            } else {
                return 'default value for other roles';
            }
        }
    },
    token: { type: String }
}, {
    timestamps: true
});

module.exports = mongoose.model("shops", shopSchema)
