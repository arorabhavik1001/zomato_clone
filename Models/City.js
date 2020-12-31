const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const citySchema = new Schema({
    name: {
        type: 'string',
        required: true
    },
    city_id: {
        type: 'number',
        required: true
    },
    location_id: {
        type: 'number',
        required: true
    },
    county_name: {
        type: 'string',
        required: true
    },
})

module.exports = mongoose.model('City', citySchema, 'City')