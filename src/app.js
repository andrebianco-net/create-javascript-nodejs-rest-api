const express = require('express');
const app = express();
const movieRoutes = require('./routes/movie.routes');

app.use(express.json());
app.use('/api/movies', movieRoutes);

module.exports = app;