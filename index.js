const path = require('path')
const mkdirp = require('mkdirp')
const os = require('os')
const multifeed = require('multifeed')
const hypercore = require('hypercore')
// const thunky = require('thunky')

const Swarm = require('./swarm')
// const config = require('./config')

module.exports = (opts) => new Hub(opts)

class Hub {
  constructor (opts = {}) {
    this.storagePath = opts.path || path.join(os.homedir(), '.metadb-replicator')
    mkdirp.sync(this.storagePath)

    this.connections = {}

    this.feeds = multifeed(hypercore, this.storagePath, {})
  }

  // ready (cb) {
  // }

  swarm (key, cb) { return Swarm(this)(key, cb) }
  unswarm (key, cb) { return Swarm.unswarm(this)(key, cb) }
}
