const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routers/authRoutes.js');
const patientRoutes = require('./routers/patientRoutes.js');
require('dotenv').config()
console.log(process.env.MONGODB_URI)
const app = express();
const PORT = process.env.PORT || 5000;

// error middleware

const ErrorMiddleware = (err, req, res, next) => {
    if (err) {
        console.error(err.stack);
    }
    next()
}

app.use(ErrorMiddleware)
// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));
