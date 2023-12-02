const express = require('express');
const router = express.Router();
const fs = require('fs');
const Heroes = require('../models/heroes.js')
const List = require('../models/lists.js')
const Power = require('../models/powers.js')
const mongoSanitize = require('express-mongo-sanitize');

router.use(mongoSanitize());

// inserting heroes info into database
async function insertData(){
    try{
        const jsonData = JSON.parse(fs.readFileSync('../superhero_info.json'));
        const result = await Heroes.insertMany(jsonData);
        console.log("Data inserted");
    } catch (err) {
        console.log(err)
    }
}

// list all heroes
router.get('/', async (req, res) => {
    try{
        const heroes = await Heroes.find({});
        res.json(heroes)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// search mechanisms for heroes
// should be able to retrieve heroes w/ any combo of name, race, power, or publisher
router.get('/heroSearch/:race/:name/:power/:publisher', async (req, res) => {
    try {
        const { race, name, power, publisher } = req.params;
        const uppercasePower = power.charAt(0).toUpperCase() + power.slice(1);

        const query = {};

        if (race !== "null") {
            query.Race = new RegExp(race, 'i');
        }
        if (name !== "null") {
            query.name = new RegExp(name, 'i');
        }
        if (publisher !== "null") {
            query.Publisher = new RegExp(publisher, 'i');
        }

        // logic -> find a list of heroNames w/ the power from the api
        
        const result = await Heroes.find(query).lean();
        const powerResult = await Power.find({})

        let heroNamesWPowers = []
        checkPower(powerResult)
        
        function checkPower(powerResult){
            for(let i = 0; i < powerResult.length; i++){
                if (powerResult[i][uppercasePower] === 'True'){
                    heroNamesWPowers = [...heroNamesWPowers, powerResult[i].hero_names]
                }
            }
        }

        console.log(heroNamesWPowers)
        let filteredHeroes = []
        
        if(heroNamesWPowers.length != 0){
            filterByPower(result, heroNamesWPowers)
        } else {
            filteredHeroes = [...result]
        }

        function filterByPower(result, heroNames){
            for(let i = 0; i < result.length; i++){
                if(heroNames.includes((result[i].name))){
                    filteredHeroes = [...filteredHeroes, result[i]]
                }
            }
        }

        res.json(filteredHeroes);

    } catch (err) {
        console.error('Error searching heroes:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// LAB 3 API BELOW:

// list specific hero
router.get('/heroID/:id', async (req, res) => {
    try{
        const hero = await Heroes.find({id: req.params.id})
        res.json(hero)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// lists all the available publishers
router.get('/publisher', async(req, res) => {
    try{
        const heroes = await Heroes.find({});
        const list = [];

        for(let i = 0; i < Object.keys(heroes).length; i++){
            if(list.includes(heroes[i].Publisher)){
                
            } else{
                list.push(heroes[i].Publisher)
            }
        }

        res.json(list)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// lists all the matches for a given property
router.get('/heroList/:field/:pattern', async (req, res) => {
    try{
        const field = req.params.field;
        const pattern = req.params.pattern;

        const heroes = await Heroes.find({[req.params.field]: req.params.pattern});

        res.json(heroes)
    } catch {
        res.status(500).json({message: err.message})
    }
})

// create new list to save list of superheroes w/ given list name
// used
router.post('/listOfLists', async (req, res) => {
    const newList = new List({
        listName: req.body.listName,
        listContents: req.body.listContents
    })

    try{
        const search = await List.find({listName: req.body.listName})
        if(search.length > 0){
            return res.status(400).json({ message: 'List with the same name already exists' }); // Return an error if a document is found
        }

        const createList = await newList.save()
        res.status(201).json(createList)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// for testing purposes, shows list of all Lists
router.get('/listOfLists', async (req, res) => {
    try{
        const lists = await List.find({});
        res.json(lists)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// save list of superhero IDs to given list name, replace superhero IDs w/ new value if list exists
router.put('/listOfLists/:listName', async (req, res) => {
    try{
        let listExists = await List.find({listName: req.params.listName})
        if (!listExists) {
            res.status(404).send('The list does not exist.')
        }

        listExists[0].listContents = req.body.listContents;
        const updatedList = await listExists[0].save();

        res.json(updatedList)
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// get a list of superhero IDs for a given list
router.get('/listOfIDs/:listName', async (req, res) => {
    try{
        const listOfIDs = await List.find({listName: req.params.listName});
        res.json(listOfIDs[0].listContents)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// delete a list of superheroes with a given list name
router.delete('/listOfIDs/delete/:listName', async (req, res) =>{
    try {
        const listOfIDs = await List.findOneAndRemove({listName: req.params.listName});

        if (!listOfIDs){
            return res.status(404).json({message: 'Cannot find list'})
        }

        res.json({message: 'Deleted'})
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// get a list of names, info, powers of all superheroes in a given list
router.get('/listOfIDs/info/:listName', async (req, res) => {
    try{
        const listOfIDs = await List.find({listName: req.params.listName});

        let heroes = []

        for(let i = 0; i < listOfIDs[0].listContents.length; i++){
            const heroInfo = await Heroes.find({id: listOfIDs[0].listContents[i]})
            const powerInfo = await Power.find({hero_names: `${heroInfo[0].name}`})
            
            const heroWithPowers = { ...heroInfo[0], powers: {} };

            for (const power in powerInfo[0]) {
                if (power !== "hero_names" && powerInfo[0][power] === "True") {
                    if (!heroWithPowers.powers[power]) {
                        heroWithPowers.powers[power] = true;
                    }
                }
            }

            heroes.push(heroWithPowers);
        }

        res.json(heroes)
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

module.exports = router