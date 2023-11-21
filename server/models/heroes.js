const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }, 
    Gender: {
        type: String,
        required: true
    }, 
    eyeColor: {
        type: String,
        required: true,
        alias: "Eye color"
    }, 
    Race: {
        type: String,
        required: true
    }, 
    hairColor: {
        type: String,
        required: true,
        alias: "Hair color"
    }, 
    Height: {
        type: Number,
        required: true
    }, 
    Publisher: {
        type: String
    }, 
    skinColor: {
        type: String,
        required: true,
        alias: "Skin color"
    }, 
    Alignment: {
        type: String,
        required: true
    }, 
    Weight: {
        type: Number
    }
});

module.exports = mongoose.model('Hero', heroSchema);