/**
 * Created by Zestug on 3/25/16.
 */

var db_name = 'projectz';
var mongodb_connection_string = (process.env.OPENSHIFT_MONGODB_DB_URL) ?
                                 process.env.OPENSHIFT_MONGODB_DB_URL : 'mongodb://127.0.0.1:27017/';

module.exports = {
    url : mongodb_connection_string + db_name
}