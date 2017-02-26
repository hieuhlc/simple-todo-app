import React, { Component } from 'react';
import TodoItem from './TodoItem';
import { listTodo, addTodo } from './apiClient';

class App extends Component {
  state = {
    todos: [],
    inputContent: ''
  };

  componentDidMount() {
    listTodo().then(({ todos }) => {
      this.setState({ todos });
    });
  }

  enterTodo = (content) => {
    addTodo(content).then(listTodo).then(({ todos }) => {
      this.setState({ inputContent: '', todos });
    });
  }

  handleKeyUp = (e) => {
    const val = this.state.inputContent.trim();
    const keyCode = e.keyCode;
    if (keyCode === 13 && val.length > 0) {
      this.enterTodo(val);
    }
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({ inputContent: value });
  }

  render() {
    const { todos, inputContent } = this.state;
    return (
      <div className='App'>
        <div className='ui container' style={{width: 500}}>
          <h3 className='ui header'>Simple Todo App</h3>
          <div className='ui input'>
            <input
              autoFocus
              type='text'
              placeholder='Add todo'
              onKeyUp={this.handleKeyUp}
              onChange={this.handleChange}
              value={inputContent}
            />
          </div>
          <div className='ui list'>
            {todos.map((todo, idx) => <TodoItem key={idx} tid={idx} todo={todo} />)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
