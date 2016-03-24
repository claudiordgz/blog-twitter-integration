
class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
}

export default class InvalidBearerToken extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

export default class InvalidToken extends ExtendableError {
  constructor(m) {
    super(m);
  }
}

export default class InvalidTwitterPayload extends ExtendableError {
  constructor(m) {
    super(m);
  }
}
