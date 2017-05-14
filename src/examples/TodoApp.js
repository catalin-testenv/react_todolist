
import React from 'react';
import ReactDOM from 'react-dom';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'middleware';
import appReducers from 'reducers';
import * as actions from 'actions';
import {TodoService} from 'services';

import PropTypes from 'prop-types';

const store = createStore(appReducers, {todos: TodoService.todos}, applyMiddleware(thunk));

class TodoApp extends React.Component {

    constructor(props, context, ...args) {
        super(props, context, ...args);
        this._onInputChange = this._onInputChange.bind(this);
        this._onAddTodo = this._onAddTodo.bind(this);
        this.state = {
            inputValue: ''
        }
    }

    _onInputChange(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    _onAddTodo() {
        if(!!this.state.inputValue) {
            this.props.addTodo(this.state.inputValue);
            this.setState({
                inputValue: ''
            })
        }
    }

    render () {
        return (
            <div>
                <input type="text" value={this.state.inputValue} onChange={this._onInputChange} />
                <button onClick={this._onAddTodo}>add todo</button>
                <ul>
                    {this.props.todos.map((todo) => {
                        return (
                            <li key={todo.id}
                                onClick={this.props.toggleTodo.bind(this, todo.id)}>
                                <span style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: todo.completed ? '#ccc' : 'black'
                                }}>
                                    {todo.text}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }
}

TodoApp.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    toggleTodo: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    todos: state.todos
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    addTodo: (text) => {
        dispatch(actions.addTodo(text));
    },
    toggleTodo: (id) => {
        dispatch(actions.toggleTodo(id));
    }
});

TodoApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(TodoApp);

export default function () {
    ReactDOM.render((
        <Provider store={store}>
            <TodoApp />
        </Provider>
    ), document.querySelector('#main'));
};