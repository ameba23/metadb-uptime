const sodium = require('sodium-native')
const assert = require('assert')

function genericHash (msg, key) {
  const hash = sodium.sodium_malloc(sodium.crypto_generichash_BYTES)
  sodium.crypto_generichash(hash, msg, key)
  return hash
}

function keyedHash (msg, key) {
  if (typeof key === 'string') {
    key = genericHash(key)
  }
  if (key) assert(Buffer.isBuffer(key), 'key must be a buffer or a string')
  if (typeof msg === 'string') msg = Buffer.from(msg)
  assert(Buffer.isBuffer(msg), 'msg must be a buffer or a string')
  return genericHash(msg, key)
}

module.exports = {
  keyedHash
}
