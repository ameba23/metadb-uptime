#!/usr/bin/env node
const Replicator = require('.')

const replicator = Replicator({ path: './test' })

const topics = ['harddrive-party']

topics.forEach((topic) => {
  replicator.swarm(topic)
})
