const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const mealtypeSchema = new Schema({
    _id: {
        type: 'number',
        required: true
    },
    name: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    image: {
        type: 'string',
        required: true
    },
})

module.exports = mongoose.model('mealtypes', mealtypeSchema, 'mealtypes')