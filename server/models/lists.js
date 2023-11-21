const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model('List', listSchema);