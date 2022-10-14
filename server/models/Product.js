const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    ownerId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    name: {
        type: String,
        required: 'This fild is required.'
    },
    price: {
        type: String,
        required: 'This field is required.'
    },
    image1: {
        type: String,
        required: 'This field is required.'
    },
    image2: {
        type: String,
        required: 'This field is required.'
    },
    image3: {
        type: String,
        required: 'This field is required.'
    },
    image4: {
        type: String,
        required: 'This field is required.'
    },
    brand: {
        type: String,
        required: 'This field is required.'
    },
    description: {
        type: String,
        required: 'This field is required.'
    },
    pNumber: {
        type: Array,
        required: 'This field is required.'
    },
    category: {
        type: String,
        required: 'This field is required.'
    },
    location: {
        type: String,
        required: 'This field is required.'
    },
    createdAt: {
        type: Date,
        default: Date.now,
      }
    
});


productSchema.index({ name: 'text', description: 'text', brand: 'text', category: 'text' });
// productSchema.index({ "$**": 'text' });

module.exports = mongoose.model('Product', productSchema);