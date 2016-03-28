/**
 * Created by Zestug on 3/25/16.
 */

// set up ========================
var express  = require('express');               // create our app w/ express
var app      = express();
//var http     = require('http');
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var server_port       = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var path           = require('path');
var morgan         = require('morgan');          // log requests to the console (express4)
var bodyParser     = require('body-parser');     // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

app.use(express.static(path.join(__dirname, '../public')));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

require('./app/routes')(app);

//var server = http.createServer(app);
app.listen(server_port, server_ip_address, function () {
    console.log( "Listening on " + server_ip_address + ", server_port " + server_port)
});