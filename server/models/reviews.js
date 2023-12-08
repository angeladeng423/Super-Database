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
    },
    username: {
        type: String,
    },
    creationDate: {
        type: String
    },
    
})

module.exports = mongoose.model('Reviews', reviewSchema);