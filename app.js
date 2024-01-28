const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config();
const db = require('./config/db')
const router = require('./router/router')
// connecet on express server and make him spurt Json
const app = express();
app.use(express.json())

//required the database from config to run moongoes
db()

// to see all status in tarmanl (console) useing morgan modules
app.use(morgan('dev'))

// use router but out sade this page in router folder
// and required the file here and use it
app.use('/', router)

// see if data are safe to go in database or thre are dangers useing core modules
app.use(cors())

// listen to env port to start the server
const port = 4000
app.listen(process.env.PORT || 4001,  () => {
    console.log(`Example app listening on port ${port}`)
});