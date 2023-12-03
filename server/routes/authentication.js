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

        const token = jwt.sign({
            email: user.email,
            name: user.username,
        }, 'secret123')

        user.verificationToken = token;
        await user.save();

        sendVerificationEmail(user.email, user.verificationToken)

        res.json({status: 'ok'})
    } catch (err) {
        res.json({status: err})
    }
})

const sendVerificationEmail = (userEmail, verificationToken) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'se3316adeng32@gmail.com',
            pass: "wjsr qgek gbfy kjjf"
        },
    })

    const mailOptions = {
        from: 'se3316adeng32@gmail.com',
        to: userEmail,
        subject: 'verify your email',
        html: `<p>Click the following link to verify your email: <a href="http://localhost:3000/verify/${verificationToken}">Verify Email</a></p>`, 
    }

    transporter.sendMail(mailOptions, (err, info) =>{
        if(err){
            console.error('error sending', err)
        } else {
            console.log('sent', info.response)
        }
    })
}
 
router.post('/login', async (req, res) => {
    const user = await Users.findOne({
        email: req.body.email,
        password: req.body.password,
    })

    if (user){
        return res.json({status: user})
    } else {
        return res.json({status: user})
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