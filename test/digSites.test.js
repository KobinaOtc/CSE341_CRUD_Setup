const request = require('supertest');
const app = require('../app'); 
const mongodb = require('../data/database'); 

describe('Dig Sites API GET Routes', () => {
    
    beforeAll((done) => {
        mongodb.initDb((err, db) => {
            if (err) {
                console.log(err);
            }
            done(); 
        });
    });
    // Test 1: GET ALL - We want to ensure it returns a 200 status and an array of dig sites
    it('should return a 200 status and an array of all dig sites', async () => {
        const response = await request(app).get('/digSites');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test 2: GET SINGLE - Let's test if it returns a 404 for a randomly formatted, but valid-length Mongo ID
    it('should return a 404 status if the dig site ID is not found', async () => {
        const fakeId = '111111111111111111111111'; 
        const response = await request(app).get(`/digSites/${fakeId}`);
        
        expect(response.status).toBe(404);
    });

    // Test 3: GET SINGLE - Now let's test with a real ID from the database to ensure it returns 200
    it('should return a 200 status if the dig site ID is found', async () => {
        const realId = '69da413a74a7bc07bb460e30'; 
        const response = await request(app).get(`/digSites/${realId}`);
        
        expect(response.status).toBe(200);
    });

    // Test 4: GET SINGLE - Let's also test with an invalid ID format to ensure it returns 500
    it('should return a 500 status if the dig site ID format is invalid', async () => {
        const invalidId = 'invalid-id';
        const response = await request(app).get(`/digSites/${invalidId}`);
        
        expect(response.status).toBe(500);
    });
});