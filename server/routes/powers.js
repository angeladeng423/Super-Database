const express = require('express');
const router = express.Router();
const fs = require('fs');
const Powers = require('../models/powers.js')
const Heroes = require('../models/heroes.js')

// inserting heroes info into database
async function insertData(){
    try{
        const jsonData = JSON.parse(fs.readFileSync('../superhero_powers.json'));
        const result = await Powers.insertMany(jsonData);
        console.log("Data inserted");
    } catch (err) {
        console.log(err)
    }
}

router.get('/', async (req, res) => {
        try{
        const powers = await Powers.find({});
        res.json(powers)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// returning the powers based on the heroID
// used
router.get('/:heroID', async (req, res) =>{
    try{
        const heroID = await Heroes.find({id: req.params.heroID})
        const powers = await Powers.find({hero_names: heroID[0].name})
        res.json(powers)
    } catch {

    }
})

module.exports = router