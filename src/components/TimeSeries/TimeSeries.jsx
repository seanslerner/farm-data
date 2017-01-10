import React, { Component } from 'react';
import * as d3 from 'd3';
import XAxis from './XAxis';
import Line from './Line';

class TimeSeries extends Component {
  constructor(props) {
    super();

    this.line = d3.line();
    this.xScale = d3.scaleTime();
    this.yScale = d3.scaleLinear();

    this.update_d3(props);
  }

  componentWillReceiveProps(newProps) {
    this.update_d3(newProps);
  }

  update_d3(props) {
    // let that = this;
    this.xScale
        .domain(d3.extent(props.data[0].values, (d) => d.date))
        .rangeRound([0, props.width]);

    this.yScale.domain([
      d3.min(props.data, (c) => d3.min(c.values, (d) => d.value )),
      d3.max(props.data, (c) => d3.max(c.values, (d) => d.value ))
    ]).rangeRound([
      props.height - props.topMargin - props.bottomMargin,
      0
    ]);

    this.line.x((d) => this.xScale(d.date))
             .y((d) => this.yScale(d.value));
  }

  strokeColor(id) {
    if (id === 'current') {
      return "#079FD1";
    }
    return "#CDD6D9";
  }

  render() {
    let translate = `translate(0, ${this.props.topMargin})`;
    let lineTranslate = `translate(${this.props.leftMargin + 3}, 0)`;

    let lines = this.props.data.map((d) => <Line
      key={`line-${d.id}`}
      translate={lineTranslate}
      d={this.line(d.values)}
      stroke={this.strokeColor(d.id)}
    />).reverse();
    console.log(lines);

    return (
      <g className="timeseries" transform={translate}>
        {lines}
        <XAxis {...this.props} />
      </g>
    );
  }
}

export default TimeSeries;