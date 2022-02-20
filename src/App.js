import React, { Component } from "react";
import UUID from "uuid-js";
import "./App.css";

class TodoItemData {
  constructor(body, isDone = false) {
    this.body = body;
    this.isDone = isDone;
    this.uuidv4 = UUID.create();
  }
}

class TodoHead extends Component {
  render() {
    return <h1 className="title">One more todo app</h1>;
  }
}

class TodoAdder extends Component {
  state = { value: "" };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleAppendClick = () => {
    console.log(this.state.value);
    this.props.onItemAddPressed({ body: this.state.value });
    this.setState({ value: "" });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleAppendClick();
    }
  };

  render() {
    return (
      <div className="columns">
        <div className="column">
          <input
            className="input"
            type="text"
            value={this.state.value}
            placeholder="Type your todo"
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
          />
        </div>
        <div className="column is-narrow">
          <button
            className="button is-primary"
            onClick={this.handleAppendClick}
            disabled={this.state.value === ""}
          >
            Add
          </button>
        </div>
      </div>
    );
  }
}

class TodoItem extends Component {
  handleDeleteClick = (event) => {
    event.stopPropagation();
    console.log("Delete this is ", this.props.data.uuidv4);
    this.props.onItemDeletePressed(this.props.data.uuidv4);
  };

  handleDoneClick = () => {
    console.log("Is done changed", this.props.data.uuidv4);
    this.props.onItemDonePressed(this.props.data.uuidv4);
  };

  render() {
    return (
      <div className="column is-one-third">
        <div className="notification" onClick={this.handleDoneClick}>
          <button className="delete" onClick={this.handleDeleteClick} />
          <label className="checkbox">
            <input
              type="checkbox"
              // onChange={this.handleDoneClick}
              checked={this.props.data.isDone}
            />
            <span className="pl-2">{this.props.data.body}</span>
          </label>
        </div>
      </div>
    );
  }
}

class TodoItems extends Component {
  render() {
    return (
      <div>
        <h3 className="title is-4">Active</h3>
        <div className="columns is-multiline">
          {this.props.todosData
            .filter((value) => !value.isDone)
            .map((todoData) => (
              <TodoItem
                key={todoData.uuidv4}
                data={todoData}
                onItemDeletePressed={this.props.onItemDeletePressed}
                onItemDonePressed={this.props.onItemDonePressed}
              />
            ))}
        </div>
        <h3 className="title is-4">Done</h3>
        <div className="columns is-multiline">
          {this.props.todosData
            .filter((value) => value.isDone)
            .map((todoData) => (
              <TodoItem
                key={todoData.uuidv4}
                data={todoData}
                onItemDeletePressed={this.props.onItemDeletePressed}
                onItemDonePressed={this.props.onItemDonePressed}
              />
            ))}
        </div>
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
  static lsKey = "AppState";

  constructor() {
    super();

    this.state = JSON.parse(localStorage.getItem(App.lsKey));

    if (this.state === null) {
      this.state = {
        todosData: [
          new TodoItemData("Иди товарищ, к нам в колхоз", false),
          new TodoItemData("Не пей метилового спирта", true),
          new TodoItemData("Молодой инженер, в цех!", false),
          new TodoItemData("Путешествуйте по горам Кавказа", false),
        ],
      };
    }
  }

  componentDidUpdate(prevProps, prevState) {
    localStorage.setItem(App.lsKey, JSON.stringify(this.state));
  }

  handleDeleteItem = (id) => {
    this.setState((state, props) => ({
      todosData: state.todosData.filter((item) => item.uuidv4 !== id),
    }));
  };

  handleDoneItem = (id) => {
    console.log("Id: ", id);
    const todosDataCopy = [...this.state.todosData];

    const i = todosDataCopy.findIndex((item) => item.uuidv4 === id);
    console.log("index: ", i);

    todosDataCopy[i] = {
      ...todosDataCopy[i],
      isDone: !todosDataCopy[i].isDone,
    };

    const removed = todosDataCopy.splice(i, 1);
    todosDataCopy.unshift(removed[0]);

    this.setState({ todosData: todosDataCopy });
  };

  handleAddNewItem = (data) => {
    console.log("New item, data:", data.body);

    const todosDataCopy = [...this.state.todosData];
    todosDataCopy.unshift(new TodoItemData(data.body));

    this.setState({ todosData: todosDataCopy });
  };

  render() {
    return (
      <section className="section">
        <div className="container">
          <TodoHead />
          <TodoBody
            todosData={this.state.todosData}
            onItemDeletePressed={this.handleDeleteItem}
            onItemDonePressed={this.handleDoneItem}
            onItemAddPressed={this.handleAddNewItem}
          />
        </div>
      </section>
    );
  }
}

export default App;
