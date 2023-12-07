const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    listId: {
        type: Number,
    }, 
    comment: {
        type: String
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Reviews', reviewSchema);