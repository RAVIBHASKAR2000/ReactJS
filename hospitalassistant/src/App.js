import React from 'react';
import Main from './component/MainComponent';
import './App.css';
import { BrowserRouter } from 'react-router-dom';

function App() {
  
    return (
      <BrowserRouter>
        <div className="App">
          <Main/>
        </div>
      </BrowserRouter>
    );
  
}

export default App;
