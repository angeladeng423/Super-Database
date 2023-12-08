const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    ownerToken: {
        type: String,
        required: true,
    },

    ownerUser: {
        type: String,
    },

    listID: {
        type: String,
        default: () => Math.floor(Math.random() * 10000) + 1,
    },

    listName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },

    listContents: {
        type: [String],
        validate: {
            validator: function(contents) {
                if (!contents || contents.length === 0) {
                    return false; // Reject empty arrays
                }

                const isValid = contents.every(item => /^\d+$/.test(item));

                return isValid;
            },
            message: "List contents must not be empty, and each ID must be a string containing only digits."
        }
    },

    listVisibility: {
        type: String,
        required: true,
        defaultValue: "private"
    },

    listDescription: {
        type: String
    },

    editedTime: {
        type: String,
    },

    listReviews: {
        type: [Number]
    }
});

module.exports = mongoose.model('List', listSchema);