/**
 * Created by Zestug on 3/25/16.
 */

var fs          = require('fs');
var path        = require('path');
var mongoose    = require('mongoose');
var database    = require('../config/database');
var Questionary = require('./models/questionary');

var personalGrowthQuestionary;

mongoose.connect(database.url);

mongoose.connection.on('error', function (err) {
    console.log('Connection with DB error:', err.message);
});

mongoose.connection.once('open', function callback () {
    if (!personalGrowthQuestionary)
    {
        var folder_path = __dirname;
        var file_path = '../predefined/questionary.json';
        // if (process.env.OPENSHIFT_REPO_DIR) {
        //     folder_path = process.env.OPENSHIFT_REPO_DIR;
        //     file_path   =  '../predefined/questionary.json';
        // }

        var file = path.join(folder_path, file_path);
        personalGrowthQuestionary  = JSON.parse(fs.readFileSync(file, 'utf8'));
    }
    console.log("Connection with DB established !");
});

module.exports = function(app) {

    app.get('/api/pgq', function (req, res) {
        res.json(personalGrowthQuestionary);
    });

    app.get('/api/pgqAll', function (req, res) {

        Questionary.find({}, function (err, questionaries) {
            if (err)
                res.send(err);

            res.json(questionaries);
        });
    });

    app.post('/api/pgq', function (req, res) {

        console.log("Request data " + req.body);
        Questionary.update(req.body, {$set: req.body}, {upsert: true}, function (err, doc) {
            if (err)
                res.send(err);

            Questionary.find(function (err, questionaries) {
                if (err)
                    res.send(err);

                res.json(questionaries);
            })
        });
    });

    app.delete('/api/pgq/:pgq_id', function (req, res) {
        Questionary.remove({
            _id: req.params.pgq_id
        }, function (err) {

            if (err)
                res.send(err);

            Questionary.find(function (err, questionaries) {
                if (err)
                    res.send(err);

                res.json(questionaries);
            });
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../../public/index.html'));
    });
}