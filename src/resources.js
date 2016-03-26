import Redis from './redis.js';
import Logger from './logger.js';
let logger = Logger.instance;

export default class Resources {
  constructor(twitterConfiguration, redisConfiguration, userName) {
    this.configuration = {
      twitterConfiguration: twitterConfiguration,
      redisClient: new Redis(redisConfiguration).client,
      redisKey: redisConfiguration.KEY + userName,
      refreshTime: twitterConfiguration.REFRESH_TIME_MINUTES,
      userName: userName
    };
    this.disposed = false;
    logger.info('Resources created');
  }

  get resources() {
    if (this.disposed) {
      throw new Error('Object is disposed');
    }
    return this.configuration;
  }

  dispose() {
    if (!this.disposed) {
      this.configuration.twitterClient = null;
      this.configuration.redisClient.quit();
      this.configuration.redisKey = null;
      this.configuration.userName = null;
      this.disposed = true;
    }
    logger.info('Disposal of resources');
  }
}
