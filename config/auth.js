const crypto = require('crypto');

const hash = crypto.randomBytes(16).toString('hex');

module.exports = hash;
