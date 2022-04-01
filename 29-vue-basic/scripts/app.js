const TodosApp = {
    data() {
        return {
            todos: [],
            enteredTodoText: '',
            editedTodoId: null,
        };
    },
    methods: {
        saveTodo(event) {
            event.preventDefault();

            if (this.editedTodoId) {
                const todoId = this.editedTodoId;
                const todoIndex = this.todos.findIndex(todo => todo.id === todoId);
                const updateTodoItem = {
                    id: this.todos[todoIndex].id,
                    text: this.enteredTodoText
                };
                this.todos[todoIndex] = updateTodoItem;
                this.editedTodoId = null;
            } else {
                const newTodo = {
                    text: this.enteredTodoText,
                    id: new Date().toISOString()
                };
                this.todos.push(newTodo);
            }
            this.enteredTodoText = '';
        },
        startEditTodo(todoId) {
            this.editedTodoId = todoId;
            const todo = this.todos.find(todo => todo.id === todoId);
            this.enteredTodoText = todo.text;
        },
        deleteTodo(todoId) {
            this.todos = this.todos.filter(todo => todo.id !== todoId);
        }
    }
};

Vue.createApp(TodosApp).mount('#todos-app');