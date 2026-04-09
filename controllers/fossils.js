const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // #swagger.tags = ['fossils']
    try {
        const result = await mongodb.getDb().collection('fossils').find();
        result.toArray().then((fossils) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(fossils);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving fossils.' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['fossils']
    try {
        const fossilId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('fossils').findOne({ _id: fossilId });
        if (!result) {
            return res.status(404).json({ message: 'Fossil not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the fossil.' });
    }
};

const createFossil = async (req, res) => {
    // #swagger.tags = ['fossils']
    try {
        const newFossil = {
            name: req.body.name,
            scientificName: req.body.scientificName,
            period: req.body.period,
            ageMillions: req.body.ageMillions,
            locationFound: req.body.locationFound,
            type: req.body.type,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };
        const response = await mongodb.getDb().collection('fossils').insertOne(newFossil);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the fossil.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the fossil.' });
    }
};

const updateFossil = async (req, res) => {
    // #swagger.tags = ['fossils']
    try {
        const fossilId = new ObjectId(req.params.id);
        const updatedFossil = {
            name: req.body.name,
            scientificName: req.body.scientificName,
            period: req.body.period,
            ageMillions: req.body.ageMillions,
            locationFound: req.body.locationFound,
            type: req.body.type,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        };
        const response = await mongodb.getDb().collection('fossils').replaceOne({ _id: fossilId }, updatedFossil);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the fossil.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the fossil.' });
    }
};

const deleteFossil = async (req, res) => {
    // #swagger.tags = ['fossils']
    try {
        const fossilId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('fossils').deleteOne({ _id: fossilId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the fossil.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the fossil.' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createFossil,
    updateFossil,
    deleteFossil,
};