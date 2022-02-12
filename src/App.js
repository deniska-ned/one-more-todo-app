import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

class TodoItemData {
  constructor(body, isDone = false) {
    this.body = body;
    this.isDone = isDone;
    this.uuidv4 = uuidv4();
  }
}

class TodoHead extends Component {
  render() {
    return <h1>One more todo app</h1>;
  }
}

class TodoAdder extends Component {
  constructor() {
    super();

    this.state = { value: "" };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleAppendClick = () => {
    console.log(this.state.value);
    this.props.onItemAddPressed({ body: this.state.value });
    this.setState({ value: "" });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.value}
          placeholder="Type your todo"
          onChange={this.handleChange}
        ></input>
        <button
          onClick={this.handleAppendClick}
          disabled={this.state.value === ""}
        >
          Append
        </button>
      </div>
    );
  }
}

class TodoItem extends Component {
  handleDeleteClick = () => {
    console.log("Delete this is ", this.props.data.uuidv4);
    this.props.onItemDeletePressed(this.props.data.uuidv4);
  };

  handleDoneClick = () => {
    console.log("Is done changed", this.props.data.uuidv4);
    this.props.onItemDonePressed(this.props.data.uuidv4);
  };

  render() {
    return (
      <div>
        <p>{this.props.data.body}</p>
        <button onClick={this.handleDoneClick}>
          {this.props.data.isDone ? "Not Done" : "Done"}
        </button>
        <button onClick={this.handleDeleteClick}>Remove</button>
      </div>
    );
  }
}

class TodoItems extends Component {
  render() {
    return (
      <div>
        {this.props.todosData.map((todoData) => (
          <TodoItem
            key={todoData.uuidv4}
            data={todoData}
            onItemDeletePressed={this.props.onItemDeletePressed}
            onItemDonePressed={this.props.onItemDonePressed}
          />
        ))}
      </div>
    );
  }
}

class TodoBody extends Component {
  render() {
    return (
      <div>
        <TodoAdder onItemAddPressed={this.props.onItemAddPressed} />
        <TodoItems
          todosData={this.props.todosData}
          onItemDeletePressed={this.props.onItemDeletePressed}
          onItemDonePressed={this.props.onItemDonePressed}
        />
      </div>
    );
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
      ],
    };

    this.handleDeleteItem = this.handleDeleteItem.bind(this);
    this.handleDoneItem = this.handleDoneItem.bind(this);
  }

  handleDeleteItem(id) {
    this.setState((state, props) => ({
      todosData: state.todosData.filter((item) => item.uuidv4 !== id),
    }));
  }

  handleDoneItem(id) {
    console.log("Id: ", id);
    const todosDataCopy = [...this.state.todosData];

    todosDataCopy.forEach(function (part, index, arr) {
      if (arr[index].uuidv4 === id) {
        arr[index] = { ...arr[index], isDone: !arr[index].isDone };
      }
    });

    this.setState({ todosData: todosDataCopy });
  }

  handleAddNewItem = (data) => {
    console.log("New item, data:", data.body);

    const todosDataCopy = [...this.state.todosData];
    todosDataCopy.unshift(new TodoItemData(data.body));

    this.setState({ todosData: todosDataCopy });
  };

  render() {
    return (
      <div>
        <TodoHead />
        <TodoBody
          todosData={this.state.todosData}
          onItemDeletePressed={this.handleDeleteItem}
          onItemDonePressed={this.handleDoneItem}
          onItemAddPressed={this.handleAddNewItem}
        />
      </div>
    );
  }
}

export default App;
