const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User API',
        description: 'API for managing users',
    },
    host: 'localhost:3000',
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js'); // Your project's root file
});