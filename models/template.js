const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const templateSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ctaTitle: {
        type: String,
        required: true
    },
    ctaRedirect: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    backlink: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('Template', templateSchema);