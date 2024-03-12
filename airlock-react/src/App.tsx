import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from './d3logo-bw2.svg';
import './App.css';
import { PodBayDashboard } from './Dashboard';


const App: React.FC = () => {


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" width="128" />
      </header>

      <div>
        <PodBayDashboard />
      </div>
    </div>
  );
}

export default App;
