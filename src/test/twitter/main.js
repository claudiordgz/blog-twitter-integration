var test = require('tape');
var cfg = require('../../config/config');
var t = require('../../twitter/main');

test('latest-tweets get test', function (assert) {
    var config = cfg.load('development');
    //var twitter = new t.Twitter(config.twitter);
    //twitter.getLatestTweets();
    assert.end();
});
