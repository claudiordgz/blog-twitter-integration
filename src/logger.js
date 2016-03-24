let singleton = Symbol();
let singletonEnforcer = Symbol();

function logTimeStamp() {
  let currentdate = new Date();
  return currentdate.getMonth() + '/'
    + (currentdate.getDate() + 1) + '/'
    + currentdate.getFullYear() + ' @ '
    + currentdate.getHours() + ':'
    + currentdate.getMinutes() + ':'
    + currentdate.getSeconds();
}

/**
 0 EMERGENCY system is unusable
 1 ALERT action must be taken immediately
 2 CRITICAL the system is in critical condition
 3 ERROR error condition
 4 WARNING warning condition
 5 NOTICE a normal but significant condition
 6 INFO a purely informational message
 7 DEBUG messages to debug an application
 */
class Logger {

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error('Cannot construct singleton');
    }
  }

  static get instance() {
    if (!this[singleton]) {
      this[singleton] = new Logger(singletonEnforcer);
    }
    return this[singleton];
  }

  emergency(message) {
    this.log('emergency', message);
  }
  critical(message) {
    this.log('critical', message);
  }
  error(message) {
    this.log('error', message);
  }
  warning(message) {
    this.log('warning', message);
  }
  notice(message) {
    this.log('notice', message);
  }
  info(message) {
    this.log('info', message);
  }
  debug(message) {
    this.log('debug', message);
  }
  log(type, message) {
    let logMessage = {
      level: type,
      timestamp: logTimeStamp(),
      message: message
    };
    console.log(JSON.stringify(logMessage));
  }
}

export default Logger;
