const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    cart: [{
        productId: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        totalPrice:{
            type:Number
        }
    }],
    userId: {
        type: String,
        required: true
    },
    subTotal:{
        type: Number,
    }
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);