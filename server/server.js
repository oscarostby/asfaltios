const express = require('express');
<<<<<<< Updated upstream
require('dotenv').config();

// Imports
const DB = require('./handlers/mongodb');
=======
const cors = require('cors');
require('dotenv').config();

//imports
const Mongodb = './handlers/mongodb.js';
const userRoutes = './routes/userRoutes.js';
const itemRoutes = './routes/itemRoutes.js';
>>>>>>> Stashed changes

const app = express();

<<<<<<< Updated upstream
app.listen(process.env.PORT, DB)

// Middelware
=======

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  Mongodb();
});



>>>>>>> Stashed changes
app.use(express.json());

<<<<<<< Updated upstream
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next();
});

=======

// Routes
app.use('/api/users', userRoutes);
app.use('/api/items', itemRoutes);













>>>>>>> Stashed changes
