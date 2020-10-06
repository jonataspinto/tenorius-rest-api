const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json())
    .use(routes)
    .get('*', (request, response) => {
      response.json({message: "invalid route"})
    })

module.exports = app;