'use strict';
let Rx = require('rx');
let request = require('request');
import InvalidTwitterPayload from './errors.js';

export function userTimelineObservable(user, bearerToken) {
  let count = 10;
  let url = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=' + user + '&count=' + count;
  let settings = {
    url: url,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + bearerToken
    }
  };
  let observable = Rx.Observable.fromCallback(request);
  return Rx.Observable.defer(() => observable(settings))
    .map(x => {
      try {
        return JSON.parse(x[2]);
      } catch (error) {
        throw new InvalidTwitterPayload(JSON.stringify({
          user: user,
          bearerToken: bearerToken
        }));
      }
    });
}

export function retrieveBearerTokenObservable(consumerData) {
  let key = encodeURIComponent(consumerData.CONSUMER_KEY);
  let secret = encodeURIComponent(consumerData.CONSUMER_SECRET);
  let credentials = new Buffer(String(key + ':' + secret)).toString('base64');
  let settings = {
    url: 'https://api.twitter.com/oauth2/token',
    method: 'POST',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: 'Basic ' + credentials
    },
    body: 'grant_type=client_credentials'
  };
  return Rx.Observable.fromCallback(request)(settings)
    // [null, response, body]
    .map(x => {
      return JSON.parse(x[2]);
    });
}
