'use strict';
let cfg = require('../../config/config');
let t = require('../../twitter.js');
let redis = require('../../redis.js');

let disabledWebTestTwitter = function () {
  'use strict';
  let config = cfg.load('development');
  let twitter = new t.Twitter(config.twitter),
    redisAdmin = new redis.Redis(config.redis);
  twitter.getLatestTweets();
};

