
var cfg = require('./config/config');

function main(environmentName) {
    var config = cfg.load(environmentName || 'development');
    return {
        message: "Your Serverless function ran successfully!"
    };
}

module.exports = {
    main: main
};