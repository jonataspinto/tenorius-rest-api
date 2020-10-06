const functions = require('firebase-functions');
const server = require('./src/server');

const api = functions.https.onRequest(server);

module.exports = {api};