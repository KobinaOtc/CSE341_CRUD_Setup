const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // #swagger.tags = ['digSites']
    try {
        const result = await mongodb.getDb().collection('digSites').find();
        result.toArray().then((sites) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(sites);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving dig sites.' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['digSites']
    try {
        const siteId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('digSites').findOne({ _id: siteId });
        if (!result) {
            return res.status(404).json({ message: 'Dig site not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the dig site.' });
    }
};

const createDigSite = async (req, res) => {
    // #swagger.tags = ['digSites']
    try {
        const newSite = {
            siteName: req.body.siteName,
            country: req.body.country,
            region: req.body.region,
            geologicalFormation: req.body.geologicalFormation,
            yearDiscovered: req.body.yearDiscovered
        };
        const response = await mongodb.getDb().collection('digSites').insertOne(newSite);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the dig site.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the dig site.' });
    }
};

const updateDigSite = async (req, res) => {
    // #swagger.tags = ['digSites']
    try {
        const siteId = new ObjectId(req.params.id);
        const updatedSite = {
            siteName: req.body.siteName,
            country: req.body.country,
            region: req.body.region,
            geologicalFormation: req.body.geologicalFormation,
            yearDiscovered: req.body.yearDiscovered
        };
        const response = await mongodb.getDb().collection('digSites').replaceOne({ _id: siteId }, updatedSite);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the dig site.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the dig site.' });
    }
};

const deleteDigSite = async (req, res) => {
    // #swagger.tags = ['digSites']
    try {
        const siteId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('digSites').deleteOne({ _id: siteId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the dig site.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the dig site.' });
    }
};

module.exports = { getAll, getSingle, createDigSite, updateDigSite, deleteDigSite };