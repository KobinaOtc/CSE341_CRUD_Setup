const dotenv = require('dotenv');
dotenv.config();

const { MongoClient } = require('mongodb');

let _db;

const initDb = (callback) => {
    if (_db) {
        console.log('Trying to init DB again!');
        return callback(null, _db);
    }
    MongoClient.connect(process.env.MONGODBCONNECTIONSTRING)
        .then((client) => {
            _db = client.db();
            callback(null, _db);
        })
        .catch((err) => {
            callback(err);
        });
};

const getDb = () => {
    if (!_db) {
        throw Error('Database not initialized');
    }
    console.log('getting db')
    return _db;
};

module.exports = {
    initDb,
    getDb,
}