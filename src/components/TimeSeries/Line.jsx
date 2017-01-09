import React, { Component } from 'react';

class Line extends Component {
  render() {
    return (
      <path
        transform={this.props.translate}
        d={this.props.d}
        stroke="#079FD1"
        fill="transparent"
        strokeWidth="2"
      >
      </path>
    );
  }
}

export default Line;