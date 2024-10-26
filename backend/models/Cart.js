const mongoose = require('mongoose')

const Cart = new mongoose.Schema({
    id: {
        type: Number,
        // required: true,
        unique: true,
    },
    userId: {
        type: String,
        ref: 'User',
        required: true
    },
    items: [{
        category: {
            type: String,
            required: false
        },
        productId: {
            type: String,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: false
        },
        price: {
            type: Number,
            required: false
        }
    }],
    totalPrice: {
        type: Number,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Cart', Cart)