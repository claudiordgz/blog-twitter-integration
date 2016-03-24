'use strict';
let redis = require('redis');

export default class Redis {
  constructor(config) {
    this.settings = config;
    this.init();
  }

  init() {
    this.redisClient = redis.createClient(this.settings.PORT, this.settings.HOSTNAME, {
      no_ready_check: true
    });
    this.redisClient.auth(this.settings.PASSWORD, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  get print() {
    return redis.print;
  }

  get client() {
    return this.redisClient;
  }
}
