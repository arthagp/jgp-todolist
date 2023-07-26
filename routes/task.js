const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const auth = require('../middlewares/auth');

router.get('/task/:id', auth, TaskController.findOneTask);
router.get('/all-task/:id', auth, TaskController.findAllTask);
router.post('/task/:id', auth, TaskController.createTask);
router.put('/task/:id', auth, TaskController.updateTask);
router.delete('/task/:id', auth, TaskController.destroyTask);

module.exports = router
