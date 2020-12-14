"use strict";

const { TimeoutError } = require("./TimeoutError");

class Deferred {
  constructor() {
    this._timeout = null;
    this._promise = new Promise((resolve, reject) => {
      this._reject = reject;
      this._resolve = resolve;
    });
  }

  registerTimeout(timeoutInMillis, callback) {
    if (this._timeout) return;

    this._timeout = setTimeout(() => {
      callback();
      this.reject(new TimeoutError("Operation timeout"));
    }, timeoutInMillis);
  }

  _clearTimeout() {
    if (!this._timeout) return;

    clearTimeout(this._timeout);
    this._timeout = null;
  }

  resolve(value) {
    this._clearTimeout();
    this._resolve(value);
  }

  reject(error) {
    this._clearTimeout();
    this._reject(error);
  }

  promise() {
    return this._promise;
  }
}

module.exports = Deferred;
