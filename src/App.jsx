import { useState } from 'react'
import './App.css'
import Playlist from './components/Playlist' 
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import Tracklist from './components/Tracklist'
import Track from './components/Track'

function App() {

  return (
    <div>
      <h1>Spotify Playlist Builder 🎵</h1>
      <SearchBar />
      <div className="App-content">
        <SearchResults />
        <Playlist />
      </div>
    </div>
  );
}

export default App
