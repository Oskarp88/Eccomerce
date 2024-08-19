const colors = require('colors');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes/routers.js');

dotenv.config();

const port = process.env.PORT || 5000;



const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

connectDB();

app.use('/api', router);

app.listen(port, () => console.log(console.log(`Servidor iniciado en http://localhost:${port}`.bgCyan.white)));