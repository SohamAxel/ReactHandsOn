import React from "react";

export class CounterNameClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      age: 0,
    };
  }

  render() {
    return (
      <>
        <input
          type="text"
          name="name"
          id="name"
          value={this.state.name}
          onInput={(e) => this.setState({ name: e.target.value })}
        />
        <div className="counter">
          <button
            onClick={() =>
              this.setState((prevState) => ({
                age: prevState.age - 1
              }))
            }
          >
            -
          </button>
          {this.state.age}
          <button
            onClick={() =>
              this.setState((prevState) => ({
                age: prevState.age + 1
              }))
            }
          >
            +
          </button>
        </div>
        <p>{`My name is ${this.state.name} and I am ${this.state.age} years old`}</p>
      </>
    );
  }
}
