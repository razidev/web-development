const Todo = require('../models/todo.model');

async function getAllTodos(req, res, next) {
    let todos;
    try {
        todos = await Todo.getAll();
        res.json({ todos });
    } catch (error) {
        return next(error);
    }
};

function addTodo(req, res, next) {
    const todoText = req.body.text;
    const todo = new Todo(todoText);
    let insertedId;

    try {
        const result = await todo.save();
        insertedId = result.insertedId;
    } catch (error) {
        return next(error);
    }
}

function updateTodo(req, res, next) {}

function deleteTodo(req, res, next) {}

module.exports = {
    getAllTodos, addTodo, updateTodo, deleteTodo
};