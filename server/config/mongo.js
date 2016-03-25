/**
 * Created by Zestug on 3/25/16.
 */

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/projectZdb');

var mongoSchema   = mongoose.Schema;
var qAnswerSchema = {
    "id": String,
    "date": Number,
    "question": String,
    "answer": String
};

// create model if not exists.
module.exports = mongoose.model('quizAnswer', qAnswerSchema);