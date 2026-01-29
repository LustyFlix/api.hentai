require('dotenv').config();
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

/* ✅ TEST ROUTE — MUST BE FIRST */
app.get('/health', (req, res) => {
  res.json({ status: 'ok', source: 'netlify-function' });
});

/* routes */
const apiRoutes = require('../../src/routes/api');
app.use('/', apiRoutes);

/* ❌ 404 — MUST BE LAST */
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found. Check our docs. /docs'
  });
});

module.exports.handler = serverless(app);
