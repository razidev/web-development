const TodosApp = {
    data() {
        return {
            todos: [],
            enteredTodoText: '',
            editedTodoId: null,
        };
    },
    methods: {
        async saveTodo(event) {
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
                let response;
                try {
                    response = await fetch('http://localhost:3000/todos', {
                    method: 'POST',
                    body: JSON.stringify({
                        text: this.enteredTodoText,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    });
                } catch (error) {
                    alert('Something went wrong!');
                    return;
                }

                if (!response.ok) {
                    alert('Something went wrong!');
                    return;
                }

                const responseData = await response.json();
                const newTodo = {
                    text: this.enteredTodoText,
                    id: responseData.createdTodo.id
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