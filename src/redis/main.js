var redis = require('redis');

var Redis = function(cfg) {
    'use strict';
    var configuration = cfg,
        redisClient,

        logError = function(err) {
            if (err) {
                throw err;
            }
        },

        init = function() {
            redisClient = redis.createClient(
                configuration.PORT,
                configuration.HOSTNAME,
                {
                    no_ready_check: true
                }
            );
            redisClient.auth(configuration.PASSWORD, logError);
        },

        setKeyValue = function (key, value) {
            redisClient.set(key, value);
        },

        getKeyValue = function (key, callback) {
            redisClient.get(key, callback);
        },

        closeConnection = function() {
            redisClient.quit();
        };

    return {
        init: init,
        setKeyValue: setKeyValue,
        getKeyValue: getKeyValue,
        closeConnection: closeConnection
    }
};

module.exports = {
    Redis: Redis
};