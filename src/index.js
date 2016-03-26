'use strict';
let Rx = require('rx');
import {loadConfiguration} from './config/config';
import Resources from './resources.js';
import {retrieveBearerTokenObservable, userTimelineObservable} from './twitter.js';
import Redis from './redis.js';
import {InvalidBearerToken, InvalidToken} from './errors.js';
import {mergeDicts, parseJSON, skeletonConfig, getTimeInSeconds, isEmpty} from './util.js';
import Logger from './logger.js';
let logger = Logger.instance;


function redisGetObservable(func, ctx, data, userName) {
  return Rx.Observable.defer(() => Rx.Observable.fromNodeCallback(func, ctx)(data))
    .map(x => {
      try {
        let payload = parseJSON(x);
        mergeDicts(skeletonConfig(payload.user), payload);
        if (isEmpty(payload.bearerToken)) {
          throw new InvalidBearerToken(JSON.stringify(payload));
        }
        return payload;
      } catch (error) {
        if (error.name === 'InvalidBearerToken') {
          throw error;
        } else {
          throw new InvalidToken(JSON.stringify(skeletonConfig(userName)));
        }
      }
    });
}

function resourcesObservable(configurationTwitter, configurationRedis, userName) {
  return Rx.Observable.using(
    () => new Resources(configurationTwitter, configurationRedis, userName),
    (x) => {
      let subject = new Rx.AsyncSubject();
      subject.onNext(x.resources);
      subject.onCompleted();
      return subject;
    }
  );
}

function handleRedisErrorObservable(bearerToken$, defaultConfiguration$, refreshTime) {
  return Rx.Observable.combineLatest(bearerToken$, defaultConfiguration$, (tokenData, skeletonData) => {
    skeletonData.bearerToken = tokenData.access_token;
    skeletonData.timeStamp = getTimeInSeconds();
    skeletonData.refreshTime = refreshTime;
    return skeletonData;
  });
}

function cacheIsExpired(previousTimeInSeconds, offsetInMinutes) {
  return ((getTimeInSeconds() - previousTimeInSeconds) / 60) >= offsetInMinutes;
}

function refreshTimeline(timeline, cache) {
  cache.userTimeline = timeline;
  return cache;
}

function returnCachedOrNewTimeline(cachedData, refreshTime) {
  cachedData.refreshTime = cachedData.refreshTime === 999 ? refreshTime : cachedData.refreshTime;
  let cachedData$ = Rx.Observable.just(cachedData);
  let userTimeline$;
  if (cacheIsExpired(cachedData.timeStamp, cachedData.refreshTime)) {
    userTimeline$ = userTimelineObservable(cachedData.user, cachedData.bearerToken);
  } else {
    userTimeline$ = Rx.Observable.just(cachedData.userTimeline);
  }
  return Rx.Observable.combineLatest(userTimeline$, cachedData$, refreshTimeline);
}

function getUserTimelineFromCacheOrTwitter(resource$) {
  return resource$
    .switchMap((resources) => {
      let redis$ = redisGetObservable(resources.redisClient.get, resources.redisClient, resources.redisKey, resources.userName);
      let bearerToken$ = retrieveBearerTokenObservable(resources.twitterConfiguration);
      let refreshTime = resources.refreshTime;
      return redis$
        .catch((error) => handleRedisErrorObservable(bearerToken$, Rx.Observable.just(JSON.parse(error.message)), refreshTime))
        .switchMap(cachedData => returnCachedOrNewTimeline(cachedData, refreshTime));
    });
}

function updateCache(redisConfig, redisKey, payload, updateCallback) {
  let redisClient = new Redis(redisConfig);
  let updatedPayload = updateCallback(payload);
  redisClient.client.set(redisKey, updatedPayload, Redis.print);
  redisClient.client.quit();
}

function invalidTwitterPayloadError(error, configurationRedis) {
  let payload = JSON.parse(error.message);
  updateCache(configurationRedis, configurationRedis.KEY + payload.user, payload, (data) => {
    let updatedPayload = skeletonConfig(data.user);
    updatedPayload.bearerToken = data.bearerToken;
    updatedPayload.timeStamp = getTimeInSeconds();
    return JSON.stringify(updatedPayload);
  });
}

function handleTimelineRetrievalSubscriptionError(error, configurationRedis) {
  if (error.name === 'InvalidTwitterPayload') {
    logger.warning('Error InvalidTwitterPayload');
    return invalidTwitterPayloadError(error, configurationRedis);
  }
  return '';
}

function handleSuccesfulTimelineRetrievalSubscription(payload, configurationRedis) {
  updateCache(configurationRedis, configurationRedis.KEY + payload.user, payload, (data) => {
    let updatedPayload = data;
    updatedPayload.timeStamp = getTimeInSeconds();
    return JSON.stringify(updatedPayload);
  });
}

function main(environmentName, userName) {
  'use strict';
  logger.info('Starting twitter user timeline retrieval process');
  let configuration = loadConfiguration(environmentName || 'development');
  let resource$ = resourcesObservable(configuration.twitter, configuration.redis, userName || 'claudiordgz');
  let getTimeline$ = getUserTimelineFromCacheOrTwitter(resource$);
  getTimeline$.subscribe(
    (payload) => {
      logger.info('Processing Payload');
      handleSuccesfulTimelineRetrievalSubscription(payload, configuration.redis);
    },
    error => {
      logger.warning('Processing Error');
      handleTimelineRetrievalSubscriptionError(error, configuration.redis);
    },
    () => {
      logger.info('Completed Twitter Integration');
    }
  );
  return {
    message: 'Your Serverless function ran successfully!'
  };
}

main('development');

module.exports = {
  main: main
};

