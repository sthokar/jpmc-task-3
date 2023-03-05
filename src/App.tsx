import React, { useState } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

function App() {
  const [data, setData] = useState<ServerRespond[]>([]);
  const [showGraph, setShowGraph] = useState<boolean>(false);

  const renderGraph = () => {
    if (showGraph) {
      return <Graph data={data} />;
    }
  };

  const getDataFromServer = () => {
    let x = 0;
    const interval = setInterval(() => {
      DataStreamer.getData((serverResponds: ServerRespond[]) => {
        setData(serverResponds);
        setShowGraph(true);
      });
      x++;
      if (x > 1000) {
        clearInterval(interval);
      }
    }, 100);
  };

  return (
    <div className="App">
      <header className="App-header">Bank Merge & Co Task 3</header>
      <div className="App-content">
        <button
          className="btn btn-primary Stream-button"
          onClick={getDataFromServer}
        >
          Start Streaming Data
        </button>
        <div className="Graph">{renderGraph()}</div>
      </div>
    </div>
  );
}

export default App;
