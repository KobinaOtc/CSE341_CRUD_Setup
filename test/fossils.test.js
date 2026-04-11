const request = require('supertest');
const app = require('../app'); 
const mongodb = require('../data/database');

describe('Fossils API GET Routes', () => {

    beforeAll((done) => {
        mongodb.initDb((err, db) => {
            if (err) {
                console.log(err);
            }
            done();
        });
    });

    // Test 1: GET ALL
    it('should return a 200 status and an array of all fossils', async () => {
        const response = await request(app).get('/fossils');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test 2: GET SINGLE - Let's test if it returns a 404 for a randomly formatted, but valid-length Mongo ID
    it('should return a 404 status if the fossil ID is not found', async () => {
        const fakeId = '111111111111111111111111'; 
        const response = await request(app).get(`/fossils/${fakeId}`);
        
        expect(response.status).toBe(404);
    });

    // Test 3: GET SINGLE - Now let's test with a real ID from the database to ensure it returns 200
    it('should return a 200 status if the fossil ID is found', async () => {
        const realId = '69cc7457dbb4723790d27934'; 
        const response = await request(app).get(`/fossils/${realId}`);
        
        expect(response.status).toBe(200);
    });
});