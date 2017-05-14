import {TodoService} from 'services';


// normally we should return an object but
// because we have thunk middleware
// we can return a function
// and thunk middleware takes care of it
export const addTodo = (text) => {
    return function(dispatch, getState) {
        TodoService.addTodo(text).then((todo) => {
            dispatch({
                type: 'ADD_TODO',
                ...todo
            });
        });

    }

};

export const toggleTodo = (id) => {
    return function(dispatch, getState) {
        TodoService.toggleTodo(id).then((todo) => {
            dispatch({
                type: 'TOGGLE_TODO',
                ...todo
            });
        }).catch((err) => {
            console.error(err);
        });
    }
};