

// https://github.com/gaearon/redux-thunk/blob/master/src/index.js

function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => next => action => {
        if (typeof action === 'function') {
            let newAction = action(dispatch, getState, extraArgument);
            return newAction;
        }

        return next(action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export {
    thunk
}

