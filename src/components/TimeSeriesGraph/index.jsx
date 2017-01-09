import React, { Component } from 'react';
import * as d3 from 'd3'
import TimeSeries from '../TimeSeries';

class TimeSeriesGraph extends Component {
  constructor() {
    super();

    this.state = {
      rawData: []
    };
  }

  componentWillMount() {
    this.loadRawData();
  }

  loadRawData() {
    const that = this;

    const parseTime = d3.timeParse("%d-%b-%y");
    d3.tsv(that.props.url, function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
      return d;
    }, function(error, data) {
      if (error) {
        console.error(error);
        console.error(error.stack);
      } else {
        that.setState({rawData: data});

      }
    });
  }

  render() {
    let params = {
      width: 910,
      height: 200,
      leftMargin: 40,
      topMargin: 20,
      bottomMargin: 30,
    },
      fullWidth = 960;

    if (!this.state.rawData.length) {
      return (
        <h2>Loading data!</h2>
      );
    }

    return (
      <div>
        <svg width={fullWidth} height={params.height}>
          <TimeSeries {...params} data={this.state.rawData} />
        </svg>
      </div>
    );
  }
}

export default TimeSeriesGraph;