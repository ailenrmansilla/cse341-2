const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all TOPPINGS
const getAllToppings = async (req, res) => {
    const result = await mongodb.getDb().db('iceCreamShop').collection('toppings').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//GET one TOPPING
const getSingleTopping = async (req, res) => {
    const toppingId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('iceCreamShop').collection('toppings').find({ _id: toppingId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

//CREATE one Topping
const createTopping = async (req, res) => {
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
};

// UPDATE one TOPPING
const updateTopping = async (req, res) => {
    const toppingId = new ObjectId(req.params.id);
    // be aware of updateOne if you only want to update specific fields
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
};

// DELETE one TOPPING
const deleteTopping = async (req, res) => {
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
};

module.exports = {
    getAllToppings,
    getSingleTopping,
    createTopping,
    updateTopping,
    deleteTopping
};
