const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const orderSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contactNo: {
        type: Number,
        required: true
    },
    cart: {
        type: Array,
        required: true
    },
    subtotal: {
        type: Number,
        required: true
    },
    restaurantName: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('orders', orderSchema, 'orders')