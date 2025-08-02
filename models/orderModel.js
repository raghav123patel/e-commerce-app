const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                
            },
            quantity: {
                type: Number,
            }
        }
    ],
    status: {
        type: String,
        enum: ["placed", "shipped", "delivered", "canceled"],
        default: "placed",
    },
    totalAmount: {
        type: Number,
    },
    paymentMode: {
        type: String,
    },

},{timestamps: true})

module.exports = mongoose.model("Order", orderSchema);