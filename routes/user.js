const express = require('express');
const { signup, getUsers } = require('../controllers/userController');
const { asyncErrorHandler } = require('../middleware');

const router = new express.Router();

router.post('/signup', asyncErrorHandler(signup));

router.get('/users', asyncErrorHandler(getUsers));

module.exports = router;
