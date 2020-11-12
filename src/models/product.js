const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    // slug: {
    //     type: String,
    //     required: [true, 'O slug é obrigatório'],
    //     trim: true,
    //     index: true,
    //     unique: true
    // },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    // tags: [{
    //     type: String,
    //     required: true
    // }],

    // image: {
    //     type: String,
    //     required: true,
    //     trim: true
    // },
});

module.exports = mongoose.model('Product', schema);