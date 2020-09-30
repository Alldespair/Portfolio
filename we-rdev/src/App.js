import React, { Component } from 'react';
import './App.css';
import './index.sass';
import './App.scss';
import Header from './components/Header/header';

class App extends React.Component {
  state = {
    date: null
  };

  render() {
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}

export default App;