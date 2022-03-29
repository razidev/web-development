const TodosApp = {
    data() {
        return {
            newTodo: 'Learn vue js'
        };
    },
    methods: {
        saveTodo(event) {
            event.preventDefault();
            this.newTodo = 'Updated!';
        }
    }
};

Vue.createApp(TodosApp).mount('#todos-app');