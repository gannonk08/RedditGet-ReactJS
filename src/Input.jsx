import React, { Component } from 'react';

class Input extends Component {
  render() {
    // reference the input prop rather than display a hard-coded value
    return <div>{this.props.input}</div>;
  }
}

export default Input
