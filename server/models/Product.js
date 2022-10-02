const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'This fild is required.'
    },
    price: {
        type: String,
        required: 'This flid is required.'
    },
    image1: {
        type: String,
        required: 'This flid is required.'
    },
    image2: {
        type: String,
        required: 'This flid is required.'
    },
    image3: {
        type: String,
        required: 'This flid is required.'
    },
    image4: {
        type: String,
        required: 'This flid is required.'
    },
    brand: {
        type: String,
        required: 'This flid is required.'
    },
    description: {
        type: String,
        required: 'This flid is required.'
    },
    pNumber: {
        type: Array,
        required: 'This flid is required.'
    },
    category: {
        type: String,
        required: 'This flid is required.'
    },
    
});


productSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });
// productSchema.index({ "$**": 'text' });

module.exports = mongoose.model('Product', productSchema);