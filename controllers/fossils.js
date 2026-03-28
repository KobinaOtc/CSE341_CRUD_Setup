const mongodb =require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    const db = mongodb.getDb();
    console.log('Database connection: ', db.databaseName);
    const result = await db.collections('fossils').find();
    result.toArray().then((fossils) => {
        res.setHearder('Content-Type', 'application/json');
        res.status(200).json(fossils);
    })
}

module.exports = {
    getAll,
};