import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

class TodoItemData {
  constructor(body, isDone) {
    this.body = body;
    this.isDone = isDone;
    this.uuidv4 = uuidv4();
  }
}

class TodoHead extends Component {
  render() {
    return (<h1>One more todo app</h1>)
  }
}

class TodoAdder extends Component {
  render() {
    return (
      <div>
        <input></input>
        <button>Append</button>
      </div>
    )
  }
}

class TodoItem extends Component {
  render() {
    return (
      <div>
        <p>{this.props.data.body}</p>
        <button>{this.props.data.isDone? "Not Done" : "Done"}</button>
        <button>Remove</button>
      </div>)
  }
}

class TodoItems extends Component {
  render() {
    return (
      <div>
        {this.props.todosData.map((todoData) => <TodoItem key={todoData.uuidv4} data={todoData}/> )}
      </div>
    )
  }
}

class TodoBody extends Component {
  render() {
    return (
      <div>
        <TodoAdder/>
        <TodoItems todosData={this.props.todosData}/>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      todosData: [
        new TodoItemData("Don't look at me", false),
        new TodoItemData("Remove me, please", true),
        new TodoItemData("Would you some some C++", false),
      ]
    }
  }

  render() {

    return (
      <div>
        <TodoHead/>
        <TodoBody todosData={this.state.todosData}/>
      </div>
    );
  }
}

export default App;
