const request = require('supertest');
const app = require('../app'); 
const mongodb = require('../data/database'); 

describe('Researchers API GET Routes', () => {
    
    beforeAll((done) => {
        mongodb.initDb((err, db) => {
            if (err) {
                console.log(err);
            }
            done(); 
        });
    });
    // Test 1: GET ALL - We want to ensure it returns a 200 status and an array of researchers
    it('should return a 200 status and an array of all researchers', async () => {
        const response = await request(app).get('/researchers');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test 2: GET SINGLE - Let's test if it returns a 404 for a randomly formatted, but valid-length Mongo ID
    it('should return a 404 status if the researcher ID is not found', async () => {
        const fakeId = '111111111111111111111111'; 
        const response = await request(app).get(`/researchers/${fakeId}`);
        
        expect(response.status).toBe(404);
    });

    // Test 3: GET SINGLE - Now let's test with a real ID from the database to ensure it returns 200
    it('should return a 200 status if the researcher ID is found', async () => {
        const realId = '69d8506eff4561b491269023'; 
        const response = await request(app).get(`/researchers/${realId}`);
        
        expect(response.status).toBe(200);
    });

    // Test 4: GET SINGLE - Let's also test with an invalid ID format to ensure it returns 500
    it('should return a 500 status if the researcher ID format is invalid', async () => {
        const invalidId = 'invalid-id';
        const response = await request(app).get(`/researchers/${invalidId}`);
        
        expect(response.status).toBe(500);
    });
});