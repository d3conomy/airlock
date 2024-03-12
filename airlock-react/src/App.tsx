import React, { useEffect, useState } from 'react';
import logo from './d3logo-bw.svg';
import './App.css';
import { PodBayDashboard } from './Dashboard';


const App: React.FC = () => {


  return (
    <div className="App" style={{ backgroundColor: 'grey' }}>

      <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" width="128" /> */}
          <div className="glitch">
            <img src={logo} alt="" width="180px" />
            <div className="glitch__layers">
              <div className="glitch__layer"></div>
              <div className="glitch__layer"></div>
              <div className="glitch__layer"></div>
            </div>
          </div>
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
