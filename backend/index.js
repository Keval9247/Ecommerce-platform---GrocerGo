const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser')
const connectionMongodb = require('./db');
const logincontroller = require('./controller/logincontroller');
const bodyParser = require('body-parser');
const authMiddleware = require('./miidleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// app.use(express.());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectionMongodb()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    })
    .catch(() => {
        console.log('Error connecting to MongoDB');
    });
const corsOrigin = {
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['POST,GET,PUT,DELETE']
}
app.use(cors(corsOrigin));

// routes
app.use('/api', authRoutes)
app.use('/images', express.static('/home/swati/keval/newtut/MERN/backend/uploadedimages'));

module.exports = app