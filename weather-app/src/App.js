import React from 'react';
import { UserProvider } from './Context/UserContext';
import SearchBar from './components/Search/SearchBar';
import Main from './components/Main/Main';
import './App.sass';

export default function App() {
  return (
    <UserProvider>
      <div className="app-wrap">
        <div className="app">
          <SearchBar />
          <Main />
        </div>
      </div>
    </UserProvider>
  );
};