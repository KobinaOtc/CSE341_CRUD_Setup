const request = require('supertest');
const app = require('../app'); 
const mongodb = require('../data/database'); 

describe('Eras API GET Routes', () => {
    
    beforeAll((done) => {
        mongodb.initDb((err, db) => {
            if (err) {
                console.log(err);
            }
            done(); 
        });
    });

    it('should return a 200 status and an array of all eras', async () => {
        const response = await request(app).get('/eras');
        
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('should return a 404 status if the era ID is not found', async () => {
        const fakeId = '111111111111111111111111'; 
        const response = await request(app).get(`/eras/${fakeId}`);
        
        expect(response.status).toBe(404);
    });

    // Test 3: GET SINGLE - Now let's test with a real ID from the database to ensure it returns 200
    it('should return a 200 status if the era ID is found', async () => {
        const realId = '69da483474a7bc07bb460e36'; 
        const response = await request(app).get(`/eras/${realId}`);
        
        expect(response.status).toBe(200);
    });

    // Test 4: GET SINGLE - Let's also test with an invalid ID format to ensure it returns 500
    it('should return a 500 status if the era ID format is invalid', async () => {
        const invalidId = 'invalid-id';
        const response = await request(app).get(`/eras/${invalidId}`);
        
        expect(response.status).toBe(500);
    });
});