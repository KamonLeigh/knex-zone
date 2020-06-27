/* eslint-disable no-unused-vars */
const db = require('../data/db');

module.exports = {
  getTodos: async (req, res, next) => {
    const { id } = req.user;
    const todos = await db('todo').where('author', id);
    res.status(200).send(todos);
  },
  postTodo: async (req, res, next) => {
    const { task } = req.body;
    const { id } = req.user;
    await db('todo').insert({ task, author: id });

    res.status(200).send('done');
  },

  getTodo: async (req, res, next) => {
    const { id } = req.params;
    const author = req.user.id;
    const response = await db('todo').where({ id, author });

    res.status(200).send(response);
  },
  deleteTodo: async (req, res, next) => {
    const { id } = req.params;
    const author = req.user.id;

    await db('todo').where({ id, author }).del();

    res.status(200).send('done');
  },
  updateTodo: async (req, res, next) => {
    const { id } = req.params;
    const author = req.user.id;
    const { task } = req.body;

    const t = new Date(Date.now()).toISOString();

    await db('todo').where({ id, author }).update({ task, updated_at: t });

    res.status(200).send({ message: 'done' });
  },

};
