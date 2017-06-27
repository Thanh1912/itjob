// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const fs = require('fs');
const bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
const app = express();
  var  crypto  = require("crypto");
  var formidable = require('formidable');
var cors = require('cors');
var multer  = require('multer');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('*', cors());
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});
app.get('/', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.writeHead(200, {'Content-Type': 'text/plain'});
 });
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'src')));
// Get our API routes

app.use('/uploads', express.static(__dirname + '/uploads'));
// Cross Origin middleware
//==================SET API =========
// Set our api routes
var setRoutes =require('./routes/routes')
app.use('/api', setRoutes);
var Routes_forgetPassword =require('./routes/forgetPassword')
app.use('/api', Routes_forgetPassword);


const api_upload = require('./routes/upload');
app.use('/api', api_upload);


//==================SET API =========

// Catch all other routes and return the index file
app.get('/api/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));
