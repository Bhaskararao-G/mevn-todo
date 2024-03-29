const express = require('express');
const router = express.Router();

const TodoController = require('./controllers/TodoController')

router.post('/save_todo', TodoController.save);
router.get('/get_todos', TodoController.fetch);
router.post('/delete_todo', TodoController.delete);

module.exports = router; 