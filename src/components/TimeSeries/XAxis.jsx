import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class XAxis extends Component {
  constructor(props) {
    super();

    this.xScale = d3.scaleTime();
    this.update_d3(props);
  }

  componentWillReceiveProps(newProps) {
    this.update_d3(newProps);
  }

  update_d3(props) {
    let that = this;
    that.xScale.domain(
      d3.extent(props.data, function(d) { return d.date; }))
               .rangeRound([0, props.width]);
  }

  componentDidUpdate() { this.renderAxis(); }
  componentDidMount() { this.renderAxis(); }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this);

    d3.select(node).call(d3.axisBottom(this.xScale));
  }

  render() {
    let translate = `translate(${this.props.leftMargin}, ${this.props.height - 40})`;
    return (
      <g className="axis axis--x" transform={translate}>
      </g>
    );
  }
}

export default XAxis;