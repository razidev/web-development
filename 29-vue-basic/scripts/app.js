const TodosApp = {
    data() {
        return {
            newTodo: 'Learn vue js',
            enteredTodoText: '',
        };
    },
    methods: {
        saveTodo(event) {
            event.preventDefault();
            this.newTodo = this.enteredTodoText;
            this.enteredTodoText = '';
        }
    }
};

Vue.createApp(TodosApp).mount('#todos-app');