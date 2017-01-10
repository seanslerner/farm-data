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
      d3.extent(props.data[0].values, function(d) { return d.date; }))
               .rangeRound([0, props.width]);
  }

  componentDidUpdate() { this.renderAxis(); }
  componentDidMount() { this.renderAxis(); }

  renderAxis() {
    let node = ReactDOM.findDOMNode(this);

    let timeFormat = d3.timeFormat("%a");
    if (this.props.data[0].values.length > 7) {
      timeFormat = d3.timeFormat("%m/%d");
    }

    let ticks = d3.timeDay.every(1);
    if (this.props.data[0].values.length > 7) {
      ticks = d3.timeDay.every(2);
    }
    if (this.props.data[0].values.length > 14) {
      ticks = d3.timeWeek.every(1);
    }

    d3.select(node).call(
      d3.axisBottom(this.xScale)
        .ticks(ticks)
        .tickFormat(timeFormat)
        .tickSizeInner(0)
        .tickSizeOuter(0)
        .tickPadding(9)
    );
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