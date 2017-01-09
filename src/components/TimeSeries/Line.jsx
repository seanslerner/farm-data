import React, { Component } from 'react';

class Line extends Component {
  render() {
    return (
      <path
        transform={this.props.translate}
        d={this.props.d}
        stroke={this.props.stroke}
        fill="transparent"
        strokeWidth="2"
      >
      </path>
    );
  }
}

export default Line;