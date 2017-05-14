import { combineReducers } from 'redux';

const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state, {
                    id: action.id,
                    text: action.text,
                    completed: action.completed
                }
            ];
        case 'TOGGLE_TODO':
            return state.map((todo) =>
                todo.id === action.id ? Object.assign({}, todo, {
                    completed: action.completed
                }) : todo
            );
        default:
            return state;
    }
};

const appReducers = combineReducers({
    todos
});

export default appReducers
