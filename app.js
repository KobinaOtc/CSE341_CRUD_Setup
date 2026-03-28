const express = require('express');
const router = require('./routes');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 8080;

const mongodb = require('./data/database');
const app = express();

app.use(bodyParser.json());
// app.use((req,res, next) => {
//     res.setheader('Access-Control-Allow-Origin', '*');
//     res.setheader()
// })

mongodb.initDb((err) => {
    if (err) {
        console.log('Unable to connect to MongoDB. Error: ', err);
    } else {
        app.listen(PORT, () => {
            console.log(`Database is running and node is listening on port ${PORT}`);
        });
        console.log('Connected to MongoDB.')
    }
})

app.use('/', router);

app.listen(PORT, () => {console.log(`Running on port: ${PORT}`)});
