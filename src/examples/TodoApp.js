
import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import {TodoService} from 'services';

class TodoApp extends React.Component {

    render () {
        return (
            <div>
                {this.props.message} {TodoService.name}
            </div>
        )
    }
}

TodoApp.propTypes = {
    message: PropTypes.string.isRequired
};

export default function () {
    const params = {
        message: 'hello'
    };

    ReactDOM.render((
        <TodoApp {...params} />
    ), document.querySelector('#main'));
};