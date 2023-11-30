const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken')

const posts = [
    {
        username: 'jim',
        title: 'post'
    }, 
    {
        username: 'timmy',
        title: 'post2'
    }
]

router.get('/posts', (req, res) => {
    res.json(posts)
})

router.post('login', (req, res) => {
    // later

    const username = req.body.username

})

module.exports = router