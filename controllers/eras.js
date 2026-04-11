const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // #swagger.tags = ['eras']
    try {
        const result = await mongodb.getDb().collection('eras').find();
        result.toArray().then((eras) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(eras);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving eras.' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['eras']
    try {
        const eraId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('eras').findOne({ _id: eraId });
        if (!result) {
            return res.status(404).json({ message: 'Era not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the era.' });
    }
};

const createEra = async (req, res) => {
    // #swagger.tags = ['eras']
    try {
        const newEra = {
            name: req.body.name,
            startAgeMillions: req.body.startAgeMillions,
            endAgeMillions: req.body.endAgeMillions,
            majorEvents: req.body.majorEvents,
            climate: req.body.climate
        };
        const response = await mongodb.getDb().collection('eras').insertOne(newEra);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the era.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the era.' });
    }
};

const updateEra = async (req, res) => {
    // #swagger.tags = ['eras']
    try {
        const eraId = new ObjectId(req.params.id);
        const updatedEra = {
            name: req.body.name,
            startAgeMillions: req.body.startAgeMillions,
            endAgeMillions: req.body.endAgeMillions,
            majorEvents: req.body.majorEvents,
            climate: req.body.climate
        };
        const response = await mongodb.getDb().collection('eras').replaceOne({ _id: eraId }, updatedEra);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the era.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the era.' });
    }
};

const deleteEra = async (req, res) => {
    // #swagger.tags = ['eras']
    try {
        const eraId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('eras').deleteOne({ _id: eraId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the era.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the era.' });
    }
};

module.exports = { getAll, getSingle, createEra, updateEra, deleteEra };