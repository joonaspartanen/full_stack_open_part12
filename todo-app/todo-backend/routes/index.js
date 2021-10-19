const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

const configs = require('../util/config');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET statistics. */
router.get('/statistics', async (_, res) => {
  const currentCount = await getAsync(configs.REDIS_COUNTER_KEY) ?? 0
  const json = { addedTodos: parseInt(currentCount) }
  res.json(json);
});

module.exports = router;
