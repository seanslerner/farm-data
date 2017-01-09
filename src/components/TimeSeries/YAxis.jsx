import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class YAxis extends Component {
  constructor(props) {
    super();

    this.yScale = d3.scaleLinear();
    this.update_d3(props);
  }

  componentWillReceiveProps(newProps) {
    this.update_d3(newProps);
  }

  update_d3(props) {
    this.yScale.domain([
      d3.min(props.data, (c) => d3.min(c.values, (d) => d.value )),
      d3.max(props.data, (c) => d3.max(c.values, (d) => d.value ))
    ]).rangeRound([
      props.height - props.topMargin - props.bottomMargin,
      0
    ]);
  }

  componentDidUpdate() { this.renderAxis(); }
  componentDidMount() { this.renderAxis(); }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this);

    d3.select(node).call(d3.axisLeft(this.yScale))
    .append("text")
      .attr("fill", "#000")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .style("text-anchor", "end")
      .text("Price ($)");
  }

  render() {
    let translate = `translate(40, 0)`;
    return (
      <g className="axis axis--y" transform={translate}>
      </g>
    );
  }
}

export default YAxis;