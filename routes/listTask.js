const express = require('express');
const router = express.Router();
const ListTaskController = require('../controllers/listTaskController');
const auth = require('../middlewares/auth')

router.get('/list-task/:id', auth, ListTaskController.findList)
router.get('/list', auth, ListTaskController.findAllList)

router.post('/list-task', auth, ListTaskController.createList)
router.put('/list-task/:listId', auth, ListTaskController.updateList)


module.exports = router;