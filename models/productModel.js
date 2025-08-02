const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },  
    category: {  
        type: String,
    },
    stock: {  
        type: Number,
        default: 0,
    },
    images: {
        type: String},
}, {timestamps: true})

module.exports = mongoose.model("Product", productSchema);