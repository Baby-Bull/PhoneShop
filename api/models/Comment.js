const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    productId:{
        type: String,
        required: true
    },
    content: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Comment", CommentSchema);