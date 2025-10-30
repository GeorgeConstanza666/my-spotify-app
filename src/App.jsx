import { useState } from 'react'
import './App.css'
import Playlist from './components/Playlist' 
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Tracklist from './components/Tracklist'
import Track from './components/Track'

function App() {

  const [searchResults, setSearchResults] = useState([]);

  async function searchSpotify(term) {
    const results = await Spotify.search(term);
    setSearchResults(results);
  }

  return (
    <div>
      <h1>Spotify Playlist Builder 🎵</h1>
      <SearchBar onSearch={searchSpotify}/>
      <div className="App-content">
        <SearchResults  tracks={searchResults}/>
        <Playlist />
      </div>
    </div>
  );
}

export default App
