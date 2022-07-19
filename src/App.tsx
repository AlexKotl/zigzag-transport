import { useState } from 'react';
import './App.scss';
import Header from './components/Header';
import PageHeader from './components/PageHeader';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function App() {
  const [locationFrom, setLocationFrom] = useState(null);
  const [locationTo, setLocationTo] = useState(null);

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

export default App;
