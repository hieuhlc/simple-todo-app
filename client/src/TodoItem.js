import React, { Component, PropTypes } from 'react';
import { toggleDoneTodo } from './apiClient';

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    tid: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { isDone: props.todo.isDone };
  }

  toggleDone = () => {
    const { id } = this.props.todo;
    toggleDoneTodo(id).then(() => {
      this.setState((state) => {
        return { isDone: !state.isDone };
      });
    });
  }

  render() {
    const { todo, tid } = this.props;
    const { isDone } = this.state;
    const id = 'todo-' + tid;
    const style = {
      cursor: 'pointer',
      textDecoration: isDone ? 'line-through' : 'none'
    };
    return (
      <div className='item'>
        <div className='ui checkbox'>
          <input type='checkbox' id={id} checked={isDone} onChange={this.toggleDone} />
          <label htmlFor={id} style={style}>
            {todo.content}
          </label>
        </div>
      </div>
    );
  }
}
