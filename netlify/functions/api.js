require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());


const apiRoutes = require('../../src/routes/api');

app.use('/', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.get('/docs', (req, res) => {
    const docs = require('../../public/docs/docs.json');
    res.json(docs);
});

app.get('/docs/genre', (req, res) => {
    const docs = require('../../public/docs/genre.json');
    res.json(docs);
});



app.use((req, res) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found. Check our docs. /docs'
    });
});

module.exports.handler = serverless(app);
