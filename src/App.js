import React, { Component } from 'react';
import './App.css';
import TimeSeriesGraph from './components/TimeSeriesGraph';


class App extends Component {
  render() {
    return (
      <div className="App">
        <TimeSeriesGraph url={process.env.PUBLIC_URL + 'alt-data.tsv'} />
      </div>
    );
  }
}

export default App;
