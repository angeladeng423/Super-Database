const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    ownerToken: {
        type: String,
        required: true,
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

    listRatings: {
        type: Object,
        defaultValue: {}
    },

    listComments: {
        type: Object,
        defaultValue: {}
    },

    editedTime: {
        type: String,
    }
});

module.exports = mongoose.model('List', listSchema);