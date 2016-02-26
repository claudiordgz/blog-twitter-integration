
var bundle = require('./bundle.js');

module.exports.respond = function(event, cb) {
    var response = bundle.main(process.env.NODE_ENV);
    return cb(null, response);
};