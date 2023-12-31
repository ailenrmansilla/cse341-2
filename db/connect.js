const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient; //require its functionality

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Db is already initialized!');
        return callback(null, _db);
    } // else {
    const uri = process.env.MONGODB_URI;
    MongoClient.connect(uri)
        .then((client) => {
            _db = client;
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Db not initialized');
    }
    return _db;
};

module.exports = { initDb, getDb };
