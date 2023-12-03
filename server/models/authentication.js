const mongoose = require('mongoose');

const authySchema = new mongoose.Schema({
    username: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: function(contents) {
                if (!contents || contents.length === 0) {
                    return false; // Reject empty arrays
                }
            },
            message: "List contents must not be empty."
        }
    },
    password: {
        required: true,
        type: String,
        validate: {
            validator: function(contents){
                if(!contents || contents.length === 0 || contents.length > 20){
                    return false;
                }
            },
            message: "Choose a better password nerd."
        }
    },
    email: {
        required: true,
        unique: true,
        type: String,
        validate: {
            validator: function(contents){
                if(!contents || contents.length === 0){
                    return false;
                } else if (!contents.includes('@')){
                    return false;
                }
            },
            message: "Choose a better email nerd."
        }
    }
})

module.exports = mongoose.model('Authy', authySchema);