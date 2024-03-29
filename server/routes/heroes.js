const express = require('express');
const router = express.Router();
const fs = require('fs');
const Heroes = require('../models/heroes.js')
const List = require('../models/lists.js')
const Power = require('../models/powers.js')
const Reviews = require('../models/reviews.js')
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
router.post('/listOfLists', async (req, res) => {
    const newList = new List({
        ownerToken: req.body.token,
        ownerUser: req.body.ownerUser,
        listName: req.body.listName,
        listContents: req.body.listContents, 
        listDescription: req.body.description,
        listVisibility: req.body.visibleStatus,
        editedTime: req.body.editedTime
    })

    try{
        const search = await List.find({listName: req.body.listName})
        if(search.ownerToken === req.body.token){
            return res.status(400).json({ message: 'List with the same name already exists' }); // Return an error if a document is found
        }

        const createList = await newList.save()
        res.status(201).json({message: "success"})
    } catch (err) {
        res.status(400).json({message: err.message})
    }
})

// shows list of all Lists for user token
router.post('/user-lists', async (req, res) => {
    try{
        const lists = await List.find({ownerToken: req.body.token});
        res.json(lists)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// edit a list based on token & list name
router.post('/edit-list', async (req, res) => {
    try {
        const list = await List.find({
            ownerToken: req.body.token,
            listName: req.body.originalListName,
        });

        console.log(list[0].listVisibility)
        console.log(req.body.visibleStatus)

        if (list.length > 0) {
            if (req.body.newListName !== list[0].listName) {
                list[0].listName = req.body.newListName;
            }

            if (req.body.listContents !== list[0].listContents) {
                list[0].listContents = req.body.listContents;
            }

            if (req.body.visibleStatus !== list[0].listVisibility) {
                list[0].listVisibility = req.body.visibleStatus;
            }

            if (req.body.description !== list[0].listDescription) {
                list[0].listDescription = req.body.description;
            }

            list[0].editedTime = req.body.editedTime;

            await list[0].save(); // Save the first document in the array

            res.json(list[0]);
        } else {
            res.json("Could not find list");
        }
    } catch (err) {
        res.json(err);
    }
});

// delete a list of superheroes with a given list name
router.post('/delete-list', async (req, res) =>{
    console.log(req.body.selected)
    console.log(req.body.token)
    try {
        const deletionResult = await List.deleteOne({
            listName: req.body.selected,
            ownerToken: req.body.token,
        });

        if (deletionResult.deletedCount === 0) {
            return res.status(404).json({ message: 'Cannot find list to delete' });
        }

        res.json({ message: 'Deleted' });
    } catch (err){
        res.status(400).json({message: err.message})
    }
})

// get all lists
router.get('/user-lists', async (req, res) => {
    try{
        const lists = await List.find({});
        res.json(lists)
    } catch (err){
        res.status(500).json({message: err.message})
    }
})

// return a specific list
router.post('/return-list', async (req, res) => {
    try {
        const list = await List.find({listName: req.body.selected, ownerToken: req.body.token})
        res.json(list)
    } catch (err) {
        res.json("status: Error")
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

// get a list of names, info, powers of all superheroes in a given list
router.post('/list/hero-info', async (req, res) => {
    try{
        const listOfIDs = await List.find({listName: req.body.selected, ownerToken: req.body.token});

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

    // retrieves most recent lists that are also public
    router.get('/list/recent', async (req, res) => {
        try {
            const recentLists = await List.find({});
    
            // Sorting with error handling for invalid dates
            recentLists.sort((a, b) => {
                const dateA = new Date(a.editedTime);
                const dateB = new Date(b.editedTime);
    
                if (isNaN(dateA) || isNaN(dateB)) {
                    // Handle invalid dates here, for example, move them to the end
                    return isNaN(dateA) ? 1 : -1;
                }
    
                return dateB - dateA;
            });
    
            console.log(recentLists)
            const publicLists = recentLists.filter((list) => list.listVisibility === 'Public');

            res.json(publicLists);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    // create a review for a list

    router.post('/create-review', async (req, res) => {
        try {
            const review = await Reviews.create({
                listId: req.body.listID,
                comment: req.body.comment,
                rating: req.body.rating,
                username: req.body.username,
                creationDate: req.body.creation
            })

            res.json("Successfully created!")
        } catch (err) {
            console.log(err)
        }
    })

    // retrieve all reviews for a specific list
    router.get('/retrieve/:listID', async (req, res) => {
        try {
            const listReviews = await Reviews.find({listId: req.params.listID});
            
            res.json(listReviews)
        } catch (err) {

        }
    })

    // add review to specific list
    router.get('/add-review-list/:listID/:rating', async (req, res) => {
        try {
            const list = await List.findOne({listID: req.params.listID})
            console.log(list)

            if(list){
                const rating = parseInt(req.params.rating, 10)
                console.log(rating)
                
                list.listReviews.push(rating)
                await list.save()
                res.json("Success")
            } else {
                res.json("Error")
            }
        } catch (err) {
            res.json("Error")
        }
    })

module.exports = router