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

async function addTodo(req, res, next) {
    const todoText = req.body.text;
    const todo = new Todo(todoText);
    let insertedId;

    try {
        const result = await todo.save();
        insertedId = result.insertedId;
    } catch (error) {
        return next(error);
    }

    todo.id = insertedId.toString();

    res.json({ message: 'Todo added', createdTodo: todo });
}

async function updateTodo(req, res, next) {
    const todoid = req.params.id;
    const newTodoText = req.body.text;
    const todo = new Todo(newTodoText, todoid);

    try {
        await todo.save();
    } catch (err) {
        return next(error);
    }

    res.json({ message: 'Todo updated', updatedTodo: todo });
}

async function deleteTodo(req, res, next) {
    const todoid = req.params.id;
    const todo = new Todo(null, todoid);

    try {
        await todo.delete();
    } catch (err) {
        return next(error);
    }

    res.json({ message: 'Todo deleted' });
}

module.exports = {
    getAllTodos, addTodo, updateTodo, deleteTodo
};