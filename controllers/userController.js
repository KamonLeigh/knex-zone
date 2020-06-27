/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../data/db');

module.exports = {
  signup: async (req, res, next) => {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);
    const token = jwt.sign({ _id: email }, process.env.SALT);

    const user = await db('user')
      .where('email', email)
      .orWhere('username', username);

    if (user.length) {
      res.status(404).send({ message: 'please use another email or username' });
    } else {
      await db('user').insert({
        username, email, password: hashedPassword, token,
      });
      res.status(200).send({ message: 'done' });
    }
  },
  getUsers: async (req, res, next) => {
    const users = await db('user');

    res.status(200).send(users);
  },
};
