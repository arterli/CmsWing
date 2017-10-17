module.exports = class extends think.Service {
  constructor(key, secret) {
    super();
    this.key = key;
    this.secret = secret;
  }
  aaa() {
    return `key:${this.key},secret:${this.secret}`;
  }
  bbb(bbb) {
    return bbb;
  }
};
