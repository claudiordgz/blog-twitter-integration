var cfg = require('../../config/config');
var t = require('../../twitter/main');
var redis = require('../../redis/main');

var disabledWebTestTwitter = function () {
    "use strict";
    var config = cfg.load('development');
    var twitter = new t.Twitter(config.twitter),
        redisAdmin = new redis.Redis(config.redis);
    twitter.getLatestTweets();
};

