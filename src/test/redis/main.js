let cfg = require('../../config/config');
let redis = require('../../redis/main');

let disabledWebTestRedis = function() {
  'use strict';
  const config = cfg.load('development'),
    redisAdmin = new redis.Redis(config.redis);
  redisAdmin.init();
  redisAdmin.setKeyValue('TWITTER_TOKEN', 'RANDOMTOKEN');
  redisAdmin.getKeyValue('TWITTER_TOKEN', function (err, reply) {
    if (err) {
      throw err;
    }
    console.log(reply.toString());
    redisAdmin.closeConnection();
  });
};
