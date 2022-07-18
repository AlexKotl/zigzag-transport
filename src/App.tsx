import React from 'react';
import './App.scss';
import Header from './components/Header';
import PageHeader from './components/PageHeader';
import Search from './components/Search';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <PageHeader></PageHeader>
      <Search></Search>
    </div>
  );
}

export default App;
