const express = require('express');
require('dotenv').config();

// Imports
const DB = require('./handlers/mongodb');

const app = express();

app.listen(process.env.PORT, DB)

// Middelware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

