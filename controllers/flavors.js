const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET all FLAVORS
const getAllFlavors = async (req, res) => {
    const result = await mongodb.getDb().db('iceCreamShop').collection('flavors').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};

//GET one FLAVOR
const getSingleFlavor = async (req, res) => {
    const flavorId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('iceCreamShop').collection('flavors').find({ _id: flavorId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

//CREATE one Flavor
const createFlavor = async (req, res) => {
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
};

// UPDATE one FLAVOR
const updateFlavor = async (req, res) => {
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
};

// DELETE one FLAVOR
const deleteFlavor = async (req, res) => {
    const flavorId = new ObjectId(req.params.id);
    const response = await mongodb
        .getDb()
        .db('iceCreamShop')
        .collection('flavors')
        .remove({ _id: flavorId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
    }
};

module.exports = {
    getAllFlavors,
    getSingleFlavor,
    createFlavor,
    updateFlavor,
    deleteFlavor
};
