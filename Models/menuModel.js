const mongoose = require('mongoose')
const Schema = mongoose.Schema
const menuSchema = new Schema({
    // _id: {
    //     type: String,
    //     required: true
    // },
    dish: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    restaurantId: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('orderMenu', menuSchema, 'orderMenu')