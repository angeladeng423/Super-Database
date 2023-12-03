const express = require('express');
const router = express.Router();
const Users = require('../models/authentication.js')

const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")

// used on createAccount
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
 
router.post('/login', async (req, res) => {
    const user = await Users.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if (user){

        const token = jwt.sign({
            email: user.email,
            name: user.username,
        }, 'secret123')

        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
})

// api for viewing all users in database, test feature
router.get('/register/test', async(req, res) => {
    const users = await Users.find({})
    res.json(users)
})

// deleting users (test purposes)
router.delete(`/delete/:email`, async (req, res) => {
    try {
        const deleted = await Users.deleteOne({ email: req.params.email });

        if (deleted.deletedCount === 1) {
            res.json({ status: 'ok', message: 'User deleted successfully' });
        } else {
            res.status(404).json({ status: 'error', message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ status: 'error', message: 'Internal server error', error: err });
    }
});

module.exports = router