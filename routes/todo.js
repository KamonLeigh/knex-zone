const express = require('express');

const router = new express.Router();
const { auth, asyncErrorHandler } = require('../middleware');
const {
  getTodos, postTodo, getTodo, deleteTodo, updateTodo,
} = require('../controllers/todoController');

router.get('/todo', auth, asyncErrorHandler(getTodos));
router.post('/todo', auth, asyncErrorHandler(postTodo));
router.get('/todo/:id', auth, asyncErrorHandler(getTodo));
router.delete('/todo/:id', auth, asyncErrorHandler(deleteTodo));
router.put('/todo/:id', auth, asyncErrorHandler(updateTodo));

module.exports = router;
