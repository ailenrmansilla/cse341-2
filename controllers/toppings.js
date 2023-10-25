const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
//express validator
const { validationResult } = require("express-validator");
//validator
const { ToppingValidationRules, validate } = require('../validation/validate');



// check the structure of the error handling. With the structure I had,
// is it necessary to use try catch?

// GET all TOPPINGS
const getAllToppings = (req, res) => {
    mongodb
        .getDb()
        .db('iceCreamShop')
        .collection('toppings')
        .find()
        .toArray((err, lists) => {
            if (err){
                res.status(404).send({ message: err});
            }
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists);
        });
};

//GET one TOPPING
const getSingleTopping = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid Topping Id to find a topping.');
      }
   const toppingId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('iceCreamShop').collection('toppings').find({ _id: toppingId });
    result.toArray().then((lists) => {
        if (!lists){
            res.status(404).send({ message: 'Topping not found'});}
        else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(lists[0]);}
    });
};

//CREATE one Topping
// Validation function added here
// Does it has to be "/toppings" ?
const createTopping =('/toppings', ToppingValidationRules, validate, async (req, res, next) => {
    // Do I need try and catch anyway?
    try{
        const errors = validationResult(req);
        // if there is error then return Error
        if (!errors.isEmpty()) {
            return res.status(400).json({
            success: false,
            errors: errors.array(),
            });
            }
        
        // save data in DB
        const topping = {
            name: req.body.name,
            type : req.body.type
        };
        const response = await mongodb.getDb().db('iceCreamShop').collection('toppings').insertOne(topping);
        if (response.acknowledged) {
            res.status(201).json(response);
        } else {
            res.status(500).json(response.error || 'Some error occurred while creating the contact.');
        }
    } catch(err){
        next(err);
        //res.status(500).json(err);
        
    }
});

// UPDATE one TOPPING
const updateTopping = async (req, res) => {
    try{
        const toppingId = new ObjectId(req.params.id);
        if (!toppingId){
            res.status(400).send({ message: 'Invalid Topping Id Supplied'});
            return;
        }

        const topping = {
            name: req.body.name,
            type: req.body.type
        };
        const response = await mongodb
            .getDb()
            .db('iceCreamShop')
            .collection('toppings')
            .replaceOne({ _id: toppingId }, topping);
        console.log(response);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while updating the contact.');
        }
    } catch(err) {
        res.status(500).json(err);
        }
};

// DELETE one TOPPING
const deleteTopping = async (req, res) => {
    try{
        const toppingId = new ObjectId(req.params.id);
        const response = await mongodb
            .getDb()
            .db('iceCreamShop')
            .collection('toppings')
            .remove({ _id: toppingId }, true);
        console.log(response);
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
        }
    } catch(err) {
        res.status(500).json(err);
        }
};

module.exports = {
    getAllToppings,
    getSingleTopping,
    createTopping,
    updateTopping,
    deleteTopping
};
