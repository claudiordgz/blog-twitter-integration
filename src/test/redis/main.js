var cfg = require('../../config/config');
var redis = require('../../redis/main');

var config = cfg.load('development');
var redisAdmin = new redis.Redis(config.redis);
redisAdmin.init();
redisAdmin.setKeyValue('TWITTER_TOKEN', 'RANDOMTOKEN');
redisAdmin.getKeyValue('TWITTER_TOKEN', function (err, reply) {
    if (err) {
        throw err;
    }
    console.log(reply.toString());
    console.log('yes2');
    redisAdmin.closeConnection();
});


console.log('yes');

class Polygon {
    constructor(height, width) {
        this.height = height;
        this.width = width;
    }
}

let p = new Polygon(10, 20);
console.log(p.height);