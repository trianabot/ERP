const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoos = require('mongoose');
const config = require('./src/config/config');

//Routers
const brandRouter = require('./src/routers/brands.router');


//db connection
mongoos.connect(config.db_connection_url, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(morgan('dev'));


//for getting the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// to prevent CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, auth");
    if (req.method === 'OPTIONS') {
        res.header('Access-Contol-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
        return res.status(200).json({});
    }
    next();
});


/**
 * Add Routers
 */
app.use('/brands', brandRouter);


//Error Handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
app.use((error, req, resp, next) => {
    resp.status(error.status || 500);
    resp.json({
        err: {
            message: error.message
        }
    });
});


module.exports = app;