/**
 * Created by Zestug on 3/25/16.
 */

// set up ========================
var express  = require('express');               // create our app w/ express
var app      = express();
var morgan   = require('morgan');                // log requests to the console (express4)
var bodyParser     = require('body-parser');     // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
// var mongo          = require("./config/mongo");  // mongoose for mongodb

var PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('/api', function(req, res) {
    res.json({"error" : false, "message" : "Server Test"});
});

app.get('/api/answers', function(req, res) {
        var response = {};
        mongo.find({},function(err, data) {
            // Mongo command to fetch all data from collection.
            if (err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    });

app.get('*', function (req, res) {
    res.sendFile('/../public/index.html');
});

app.listen(PORT);
console.log("Node server listening on port " + PORT);