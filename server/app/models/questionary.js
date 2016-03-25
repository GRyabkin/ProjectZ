/**
 * Created by Zestug on 3/25/16.
 */

var mongoose = require('mongoose');

var questionarySchema = {
    "name": String,
    "questions": [
        {
            "id": String,
            "question": String,
            "answer": String
        }]
};

module.exports = mongoose.model('Questionary', questionarySchema);