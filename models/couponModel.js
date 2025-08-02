const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
    },
    discount: {
        type: Number,

    },
    expiry: {
        type: Date,

    },
    usageLimit: {
        type: Number,
    },
    usedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]

    
}, {timestamps: true})

 module.exports = mongoose.model("Coupon", couponSchema);