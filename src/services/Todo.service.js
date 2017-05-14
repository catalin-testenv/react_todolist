

let nextTodoId = 1;

const todos = [
    {
        id: nextTodoId,
        text: 'some todo',
        completed: true
    }
];

export default {
    addTodo(text) {
        return new Promise((resolve, reject) => {
            const todo = {
                id: ++nextTodoId,
                text,
                completed: false
            };
            todos.push(todo);
            setTimeout(() => {
                resolve(todo);
            }, 500);

        });
    },

    toggleTodo(id) {
        return new Promise((resolve, reject) => {
            const todo = todos.find((todo) => todo.id === id);
            if (todo === undefined) {
                reject(`todo ${id} was not found`);
                return;
            }
            todo.completed = !todo.completed;
            setTimeout(() => {
                resolve(todo);
            }, 500);
        });
    },

    get todos() {
        return [...todos];
    }
}