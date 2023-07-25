const express = require('express');
const router = express.Router();

const userRouter = require('./user');
const listTaskRouter = require('./listTask');
const task = require('./task');

router.use(userRouter);
router.use(listTaskRouter);
// router.use(task);

module.exports = router