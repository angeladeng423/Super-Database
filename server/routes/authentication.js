const express = require('express');
const router = express.Router();
const Users = require('../models/authentication.js')

const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    try {
        const user = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        res.json({status: 'ok'})
    } catch (err) {
        res.json({status: err})
    }
})

router.post('/register', async (req, res) => {
    const user = await Users.findOne({
        username: req.body.username,
        password: req.body.password,
    })
    if (user){
        return res.json({status: 'ok', user: true})
    } else {
        return res.json({status: 'error', user: false})
    }
})

module.exports = router