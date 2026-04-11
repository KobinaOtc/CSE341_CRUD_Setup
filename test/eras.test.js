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
});