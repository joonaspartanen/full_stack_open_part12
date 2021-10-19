const express = require('express');
const { Todo } = require('../mongo');
const { getAsync, setAsync } = require('../redis');
const { REDIS_COUNTER_KEY } = require('../util/config')
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  incrementTodoCounter();

  res.send(todo);
});

const incrementTodoCounter = async () => {
  const currentCount = await getAsync(REDIS_COUNTER_KEY)

  const nextCount = currentCount ? parseInt(currentCount) + 1 : 1

  await setAsync(REDIS_COUNTER_KEY, nextCount)
}

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.json(req.todo);
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await req.todo.updateOne(
    {
      $set: {
          text: req.body.text,
          done: req.body.done
      }
    }
  )

  const updatedTodo = await Todo.findById(req.todo._id)
  res.json(updatedTodo);
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
