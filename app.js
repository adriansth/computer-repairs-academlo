const express = require('express');
const cors = require('cors');

// Routers 
const { userRouter } = require('./routers/user.routes');
const { repairRouter } = require('./routers/repair.routes');

// Init express app
const app = express();

// Enable CORS
app.use(cors());

// Enable incoming JSON data 
app.use(express.json());

// Endpoints 
// http://localhost:4000/api/v1/users
app.use('api/v1/users', userRouter);
app.use('api/v1/repairs', repairRouter);

module.exports = { app };

