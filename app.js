const express = require('express');

const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const morgan = require('morgan');
const {
  createError,
  notFound,
} = require('./middleware');
const todoRouter = require('./routes/todo');
const userRouter = require('./routes/user');

app.use(express.json());
app.use(morgan('common'));
app.use(xss());
app.use(helmet());

app.use(todoRouter);
app.use(userRouter);

app.use(createError);
app.use(notFound);

module.exports = app;
