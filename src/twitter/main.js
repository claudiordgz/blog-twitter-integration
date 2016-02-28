var oauth = require('oauth');

var Twitter = function(cfg) {
    'use strict';
    var configuration = cfg,
        token,
        oauth2Params = {
            'grant_type': 'client_credentials'
        },
        oauth2 = new oauth.OAuth2(
            configuration.CONSUMER_KEY,
            configuration.CONSUMER_SECRET,
            'https://api.twitter.com/',
            null,
            'oauth2/token',
            null
        ),

    saveToken = function (e, access_token, refresh_token, results) {
        token = access_token;
        oauth2.useAuthorizationHeaderforGET(true);
        oauth2.get('https://api.twitter.com/1.1/statuses/user_timeline.json?count=5&screen_name=claudiordgz', results,
            function(e, data, res) {
                if (e) console.log(e);
                if (res.statusCode != 200) {
                    var error = new Error(
                        'OAuth2 request failed: '+
                        res.statusCode);
                    console.log(error);
                }
                try {
                    data = JSON.parse(data);

                }
                catch (e){
                    console.log(e);
                }
                console.log(data);
            });
    },

    authenticate = function(authenticationCallback) {
        oauth2.getOAuthAccessToken('', oauth2Params, authenticationCallback)
    },

    getLatestTweets = function() {
        authenticate(saveToken);
    };

    return {
        getLatestTweets: getLatestTweets
    }
};

module.exports = {
    Twitter: Twitter
};