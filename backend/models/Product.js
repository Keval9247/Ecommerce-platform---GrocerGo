const { default: mongoose } = require("mongoose");

const Product = new mongoose.Schema({
    category: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    description: {
        type: String,
        required: false
    },

    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    deleted_at: {
        type: Date,
        default: null
    }
})

module.exports = mongoose.model("products", Product)