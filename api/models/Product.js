const mongoose = require("mongoose"); 

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    oldPrice: {
        type: Number
    },
    summary: {
        type: String
    },
    desc: {
        type: String
    },
    picture: {
        type: String,
        default: ""
    },
    category: {
        type: String
    },
    avgRate: {
        type: Number,
        default: 0,
    },
    sumRate: {
        type: Number,
        default: 0
    },
    rate: {
        oneRate: {
            type: Number,
            default: 0
        },
        twoRates: {
            type: Number,
            default: 0
        },
        threeRates: {
            type: Number,
            default: 0
        },
        fourRates: {
            type: Number,
            default: 0,
        },
        fiveRates: {
            type: Number,
            default: 0
        },
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);