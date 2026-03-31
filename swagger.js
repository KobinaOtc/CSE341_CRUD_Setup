const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'User API',
        description: 'API for managing users',
    },
    host: 'localhost:8080',
    schemes: ['http', 'https'],

    // Add security definistions below
    securityDefinitions: {
        oAuthSamaple: {
            type: 'oauth2',
            authorizationUrl: 'https://github.com/login/oauth/authorize',
            flow: 'implicit',
            scopes: {
                'read_pets': 'read your pets',
                'write_pets': 'modify pets in your account'
            }
        }
    }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./app.js'); // Your project's root file
});