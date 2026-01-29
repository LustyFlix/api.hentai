require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});


const apiRoutes = require('../../src/routes/api');

app.use('/', apiRoutes);

app.get('/docs', (req, res) => {
  res.json(require('../../public/docs/docs.json'));
});

app.get('/docs/genre', (req, res) => {
  res.json(require('../../public/docs/genre.json'));
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found. Check our docs. /docs'
  });
});

module.exports.handler = serverless(app);
