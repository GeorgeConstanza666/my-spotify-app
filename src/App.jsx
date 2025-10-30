import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Spotify from './Spotify';

function App() {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Проверяем, есть ли код от Spotify после редиректа
    Spotify.handleRedirect();
  }, []);

  const handleSearch = async (term) => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Spotify Playlist Builder 🎵</h1>
      <button onClick={() => Spotify.login()}>Login to Spotify</button>
      <SearchBar onSearch={handleSearch} />
      <SearchResults tracks={searchResults} />
    </div>
  );
}

export default App;
