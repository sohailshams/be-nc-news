const express = require('express');
const app = express();
const { fetchTopics } = require('./controllers/topics.controllers');

app.get('/api', (request, response) => response.send({msg: 'all ok'}));
app.get('/api/topics', fetchTopics);

app.use('/*', (request, response) => {
   response.status(404).send({msg: 'Endpoint not found!'})
  });
  
  
module.exports = app;