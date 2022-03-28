const express = require('express');
const router = express.Router();
const todosController = require('../controllers/todos.controller');

router.get('/', todosController.getAllTodos);
router.post('/', todosController.addTodo);

module.exports = router;