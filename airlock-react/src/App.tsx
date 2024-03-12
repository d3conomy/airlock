import React, { useEffect, useState } from 'react';
import logo from './d3logo-green.svg';
import './App.css';
import { PodBayDashboard } from './Dashboard';


const App: React.FC = () => {


  return (
    <div className="App" style={{ backgroundColor: 'grey' }}>

      <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" width="128" />
      </div>

      <div>
        <PodBayDashboard />
      </div>

      <div className="App-footer">
        <p>d3</p>
      </div>
    </div>
  );
}

export default App;
