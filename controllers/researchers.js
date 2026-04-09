const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    // #swagger.tags = ['researchers']
    try {
        const result = await mongodb.getDb().collection('researchers').find();
        result.toArray().then((researchers) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(researchers);
        });
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving researchers.' });
    }
};

const getSingle = async (req, res) => {
    // #swagger.tags = ['researchers']
    try {
        const researcherId = new ObjectId(req.params.id);
        const result = await mongodb.getDb().collection('researchers').findOne({ _id: researcherId });
        if (!result) {
            return res.status(404).json({ message: 'Researcher not found' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while retrieving the researcher.' });
    }
};

const createResearcher = async (req, res) => {
    // #swagger.tags = ['researchers']
    try {
        const newResearcher = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            institution: req.body.institution,
            specialty: req.body.specialty,
            yearsActive: req.body.yearsActive
        };
        const response = await mongodb.getDb().collection('researchers').insertOne(newResearcher);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while creating the researcher.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while creating the researcher.' });
    }
};

const updateResearcher = async (req, res) => {
    // #swagger.tags = ['researchers']
    try {
        const researcherId = new ObjectId(req.params.id);
        const updatedResearcher = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            institution: req.body.institution,
            specialty: req.body.specialty,
            yearsActive: req.body.yearsActive
        };
        const response = await mongodb.getDb().collection('researchers').replaceOne({ _id: researcherId }, updatedResearcher);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while updating the researcher.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while updating the researcher.' });
    }
};

const deleteResearcher = async (req, res) => {
    // #swagger.tags = ['researchers']
    try {
        const researcherId = new ObjectId(req.params.id);
        const response = await mongodb.getDb().collection('researchers').deleteOne({ _id: researcherId });
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json({ message: 'Some error occurred while deleting the researcher.' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message || 'Some error occurred while deleting the researcher.' });
    }
};

module.exports = { getAll, getSingle, createResearcher, updateResearcher, deleteResearcher };