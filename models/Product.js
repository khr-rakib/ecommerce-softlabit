const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const productSchema = new mongoose.Schema({
    product_title: {
        type: String,
        required: true,
        trim: true
    },
    product_slug: {
        type: String,
        required: true
    },
    product_price: {
        type: Number,
        required: true,
        trim: true
    },
    regular_price: Number,
    product_quantity: {
        type: Number,
        required: true
    },
    feature_image: String,
    product_code: {
        type: String,
        required: true
    },
    mpn_id: {
        type: String,
        required: true
    },
    category: ObjectId,
    brand: ObjectId,
    status: {
        type: Boolean,
        default: true
    },
    product_short_description: String,
    product_specification: String,
    product_description: String,
    product_faq: String

}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);