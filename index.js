const path = require('path')
const mkdirp = require('mkdirp')
const os = require('os')
const multifeed = require('multifeed')
const hypercore = require('hypercore')

const Swarm = require('./swarm')

module.exports = (opts) => new Hub(opts)

class Hub {
  constructor (opts = {}) {
    this.storagePath = opts.path || path.join(os.homedir(), '.metadb-replicator')
    mkdirp.sync(this.storagePath)

    this.connections = {}

    this.core = multifeed(hypercore, this.storagePath, {})
  }

  swarm (key, cb) { return Swarm(this)(key, cb) }
  unswarm (key, cb) { return Swarm.unswarm(this)(key, cb) }
}
