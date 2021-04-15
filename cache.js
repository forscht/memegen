const cacheManager = require('cache-manager')
const request = require('request-promise-native')

const cache = cacheManager.caching({ store: 'memory', ttl: 120 })

module.exports = async url => cache.wrap(url, async () => request.get(url, { encoding: null }))
