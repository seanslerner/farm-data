import React, { Component } from 'react';
import * as d3 from 'd3';
import YAxis from './YAxis';
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
    let that = this;
    that.xScale.domain(
      d3.extent(props.data, function(d) { return d.date; }))
               .rangeRound([0, props.width]);

    that.yScale.domain(
      d3.extent(props.data, function(d) { return d.close; }))
               .rangeRound([
      props.height - props.topMargin - props.bottomMargin,
      0
    ]);

    that.line.x(function(d) { return that.xScale(d.date); })
             .y(function(d) { return that.yScale(d.close); });
  }

  render() {
    let translate = `translate(0, ${this.props.topMargin})`;
    let lineTranslate = `translate(${this.props.leftMargin + 3}, 0)`;

    return (
      <g className="timeseries" transform={translate}>
        <Line
          translate={lineTranslate}
          d={this.line(this.props.data)}
        />
        <YAxis {...this.props} />
        <XAxis {...this.props} />
      </g>
    );
  }
}

export default TimeSeries;