// require dependencies
const dotenv = require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// connect to database
mongoose.connect(process.env.DATABASE_URL_HEROINFO, {useNewUrlParser: true, useUnifiedTopology: true});
const db1 = mongoose.connection;

mongoose.createConnection(process.env.DATABASE_URL_POW, { useNewUrlParser: true, useUnifiedTopology: true });
const db2 = mongoose.connection;

mongoose.createConnection(process.env.DATABASE_URL_LIST, { useNewUrlParser: true, useUnifiedTopology: true });
const db3 = mongoose.connection;

mongoose.createConnection(process.env.DATABASE_URL_AUTHY, { useNewUrlParser: true, useUnifiedTopology: true });
const db4 = mongoose.connection;

mongoose.createConnection(process.env.DATABASE_URL_REVIEWS, { useNewUrlParser: true, useUnifiedTopology: true });
const db5 = mongoose.connection;

// added error & connected messages
db1.on('error', (error) => console.error(error))
db1.on('connected', () => console.log("Connected to firstDB."))

db2.on('error', (error) => console.error(error));
db2.on('connected', () => console.log("Connected to secondDB."));

db3.on('error', (error) => console.error(error));
db3.on('connected', () => console.log("Connected to thirdDB."));

db4.on('error', (error) => console.error(error));
db4.on('connected', () => console.log("Connected to fourthDB."));

db5.on('error', (error) => console.error(error));
db5.on('connected', () => console.log("Connected to fifthDB."));

// allows server to accept json
app.use(express.json())

const heroesRouter = require('./routes/heroes.js')
app.use('/heroes', heroesRouter)

const powersRouter = require('./routes/powers.js')
app.use('/powers', powersRouter)

const authyRouter = require('./routes/authentication.js')
app.use('/authy', authyRouter)

// define a route for the root URL
app.use('/', express.static('../client'))

app.listen(5000, () => console.log("Server started"));
