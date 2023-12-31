const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//express validator
const { validationResult } = require("express-validator");
//validator
const { FlavorValidationRules, validate } = require('../validation/validate');

// GET all FLAVORS
const getAllFlavors = async (req, res) => {
    // Check for the presence of the user in the request
    if (req.user) {
        const user = req.user; // This is the JWT payload
        const userId = user.sub; // Accessing a specific claim (e.g., 'sub' claim for the user ID)
        console.log(`Authenticated user with ID ${userId}`);
    } else {
        // If no user is found, send an unauthorized response and return
        return res.status(401).json({ message: 'Unauthorized. Token is missing or invalid.' });
    }

    // If the code reaches this point, it means the user is authenticated
    // Continue with the MongoDB query
    const result = await mongodb.getDb().db('iceCreamShop').collection('flavors').find();

    if (!result) {
        // Send a 404 response if the collection is not found
        return res.status(404).send({ message: 'Collection not found' });
    } else {
        // Send the result as JSON if the collection is found
        result.toArray().then((lists) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
    }
};
    // if (req.user) {
    //     const user = req.user; // This is the JWT payload
    //     const userId = user.sub; // Accessing a specific claim (e.g., 'sub' claim for the user ID)
    //     res.json({ message: `Authenticated user with ID ${userId}` });
    // } else {
    //     res.status(401).json({ message: 'Unauthorized. Token is missing or invalid.' });
    // }
    // const result = await mongodb.getDb().db('iceCreamShop').collection('flavors').find();
    // if (!result) {
    //     res.status(404).send({ message: 'Collection not found'});
    //     return;
    // } else {
    //     result.toArray().then((lists) => {
    //         res.setHeader('Content-Type', 'application/json');
    //         res.status(200).json(lists);
    // }); }

//GET one FLAVOR
const getSingleFlavor = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Flavor Id to find a flavor.');
    }
    const flavorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('iceCreamShop').collection('flavors').find({ _id: flavorId });
    result.toArray().then((lists) => {
        if (!lists){
            res.status(404).send({ message: 'Flavor not found'});}
        else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
        }
    });
};

//CREATE one Flavor
const createFlavor = (FlavorValidationRules, validate, async (req, res, next) => {
    try{
        const errors = validationResult(req);
        // if there is an error then return Error
        if (!errors.isEmpty()) {
            return res.status(400).json({
            success: false,
            errors: errors.array(),
            });
        }
        const flavor = {
            flavor: req.body.flavor,
            brand: req.body.brand,
            type : req.body.type,
            quantity: req.body.quantity,
            price: req.body.price
        };
        const response = await mongodb.getDb().db('iceCreamShop').collection('flavors').insertOne(flavor);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch(err){
            next(err);
        }
});

// UPDATE one FLAVOR
const updateFlavor =  (FlavorValidationRules, validate, async (req, res)  => {
    try{
        const flavorId = new ObjectId(req.params.id);
        // be aware of updateOne if you only want to update specific fields
        const flavor = {
            flavor: req.body.flavor,
            brand: req.body.brand,
            type: req.body.type,
            quantity: req.body.quantity,
            price: req.body.price
        };
        const response = await mongodb
            .getDb()
            .db('iceCreamShop')
            .collection('flavors')
            .replaceOne({ _id: flavorId }, flavor);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the contact.');
        }
    } catch(err){
        res.status(500).json(err);
    }
});

// DELETE one FLAVOR
const deleteFlavor = async (req, res) => {
    try{
        const flavorId = new ObjectId(req.params.id);
        // error:  'remove' is not function
        const response = await mongodb
            .getDb()
            .db('iceCreamShop')
            .collection('flavors')
            .deleteOne({ _id: flavorId });
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
        }
    } catch(err){
        res.status(500).json(err);
    }
};

module.exports = {
    getAllFlavors,
    getSingleFlavor,
    createFlavor,
    updateFlavor,
    deleteFlavor
};
