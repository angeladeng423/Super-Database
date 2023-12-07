const express = require('express');
const router = express.Router();
const Users = require('../models/authentication.js')

const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const bcrypt = require('bcrypt')

// used on createAccount
router.post('/register', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    try {
        console.log(hashedPassword)

        const user = await Users.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
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

router.post('/resend', async (req, res) => {
    try {
        const user = await Users.findOne({
            email: req.body.email
        })

        if (user){
            sendVerificationEmail(user.email, user.verificationToken)
        }
    } catch (err) {

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
        email: req.body.email
    })

    if (user) {
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (passwordMatch) {
            return res.json({ status: user });
        } else {
            return res.json({ status: "not matching"})
        }
    } else {
        return res.json("error")
    }
})

router.get('/verify/:token', async (req, res) => {
    const token = req.params.token;

    try {
        const user = await Users.findOne({ verificationToken: token})
        
        if(!user){
            res.json("User not found.")
        } else {
            user.verified = "verified"
            await user.save()
        }
        
        res.json("User has been verified.")
    } catch (err) {
        console.log(err)
    }
})

// api for converting user to admin
router.post('/register/new-admin', async (req, res) =>{
    const user = await Users.findOne({email: req.body.email})

    if(user){
        user.verified = "admin"
        await user.save()

        console.log('User made into admin successfully.')
        res.json(user)
    } else {
        res.json(req.body.email)
    }
})

// api for converting user to deactivated
router.post('/register/deactivate', async (req, res) => {
    const user = await Users.findOne({ email: req.body.deactivateEmail });

    if (user) {
        user.verified = "deactivated";
        await user.save();

        console.log('User deactivated successfully:', user);
        res.json(user);
    } else {
        console.log('User not found:', req.body.email);
        res.json(req.body.email);
    }
});

// api for converting user to be reactivated
router.post('/register/reactivate', async (req, res) => {
    const user = await Users.findOne({ email: req.body.reactivateEmail });

    if (user) {
        user.verified = "verified";
        await user.save();

        console.log('User reactivated successfully:', user);
        res.json(user);
    } else {
        console.log('User not found:', req.body.email);
        res.json(req.body.email);
    }
});

// get user based on their token
router.post('/token/user', async (req, res) => {
    const user = await Users.findOne({verificationToken: req.body.token})

    if(user){
        res.json(user.verified)
    } else {
        res.json(req.body.token)
    }
})


// get user based on their token
router.post('/token/list/user', async (req, res) => {
    const user = await Users.findOne({verificationToken: req.body.token})

    if(user){
        res.json(user.username)
    } else {
        res.json(req.body.token)
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