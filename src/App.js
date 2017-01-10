import React, { Component } from 'react';
import './App.css';
import TimeSeriesGraph from './components/TimeSeriesGraph';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TimeSeriesGraph url={process.env.PUBLIC_URL + 'data.csv'} />
        <TimeSeriesGraph url={process.env.PUBLIC_URL + 'more-data.csv'} />
        <TimeSeriesGraph url={process.env.PUBLIC_URL + 'even-more-data.csv'} />
      </div>
    );
  }
}

export default App;
