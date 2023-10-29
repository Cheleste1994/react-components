import React, { Component } from 'react';

class ErrorComponent extends Component {
  componentDidMount() {
    throw new Error('This is a sample error for testing purposes.');
  }

  render() {
    return <div />;
  }
}

export default ErrorComponent;
