const MONGO_URL = process.env.MONGO_URL || 'mongodb://root:example@localhost:3456/the_database'
const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379'
const REDIS_COUNTER_KEY = 'counter'

module.exports = {
  MONGO_URL,
  REDIS_URL,
  REDIS_COUNTER_KEY,
}