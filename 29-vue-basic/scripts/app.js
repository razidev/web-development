const TodosApp = {
    data() {
        return {
            newTodo: 'Learn vue js'
        };
    }
};

Vue.createApp(TodosApp).mount('#todos-app');