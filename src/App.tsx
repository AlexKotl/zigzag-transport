import { useState } from 'react';
import styled from 'styled-components';
import './App.scss';
import Header from './components/Header';
import PageHeader from './components/PageHeader';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

export default function App() {
  const [locationFrom, setLocationFrom] = useState(null);
  const [locationTo, setLocationTo] = useState(null);
  const [showResults, setShowResults] = useState(true);

  // changing reactive props will trigger search function inside SearchResults component
  const search = (from: string, to: string) => {
    setLocationFrom(from);
    setLocationTo(to);
  };

  return (
    <div className="App">
      <Header></Header>
      <PageHeader></PageHeader>
      <SearchForm onSearch={search}></SearchForm>
      <SearchResults
        locationFrom={locationFrom}
        locationTo={locationTo}
      ></SearchResults>
    </div>
  );
}
