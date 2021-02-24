import React from 'react';
import './App.css';
import Main from "./component/main.js"
import Login from "./component/Login.js"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {


  if(!localStorage.getItem('token')) {
    return <Login  />
  }

  return (
    
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
