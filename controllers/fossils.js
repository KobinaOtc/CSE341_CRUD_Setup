const mongodb =require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // #swagger.tags = ['fossils']
    const db = mongodb.getDb();
    console.log('Database connection: ', db.databaseName);
    const result = await mongodb.getDb().collection('fossils').find();
    result.toArray().then((fossils) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(fossils);
    })
}

const getSingle = async (req, res) => {
    // #swagger.tags = ['fossils']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('fossils').findOne({ _id: userId });
    if(!result) {
        res.status(404).json({ error: 'User not found' });
        return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);
};

const createFossil = async (req, res) => {
    // #swagger.tags = ['fossils']
    const newFossil = {
        name: req.body.name,
        scientificName: req.body.scientificName,
        period: req.body.period,
        ageMillions: req.body.ageMillions,
        locationFound: req.body.locationFound,
        type: req.body.type,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }
    const response = await mongodb.getDb().collection('fossils').insertOne(newFossil);
    if (response.acknowledged && response.insertedId) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to create fossil' });
    }
};

const updateFossil = async (req, res) => {
    // #swagger.tags = ['fossils']
    const fossilId = new ObjectId(req.params.id);
    const newFossil = {
        name: req.body.name,
        scientificName: req.body.scientificName,
        period: req.body.period,
        ageMillions: req.body.ageMillions,
        locationFound: req.body.locationFound,
        type: req.body.type,
        description: req.body.description,
        imageUrl: req.body.imageUrl
    }
    const response = await mongodb.getDb().collection('fossils').replaceOne({ _id: fossilId }, newFossil);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to update fossil' });
    }
};

const deleteFossil = async (req, res) => {
    // #swagger.tags = ['fossils']
    const fossilId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().collection('fossils').deleteOne({ _id: fossilId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json({ error: 'Failed to delete fossil' })
    }
}

module.exports = {
    getAll,
    getSingle,
    createFossil,
    updateFossil,
    deleteFossil,
};