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
            message: "Username must not be empty."
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
            message: "Password must not be empty."
        }
    },
    email: {
        required: true,
        unique: true,
        type: String,
        validate: [
            {
              validator: function (contents) {
                return contents && contents.length > 0;
              },
              message: "Email must not be empty."
            },
            {
              validator: function (contents) {
                return contents && contents.includes('@');
              },
              message: "Email must contain @ symbol."
            }
          ]
        },
    verified: {
        type: String,
        defaultValue: "unverified"
    },
    verificationToken: {
        type: String
    }
})

module.exports = mongoose.model('Authy', authySchema);