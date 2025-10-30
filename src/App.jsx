import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Spotify from './Spotify';
import Playlist from './components/Playlist.jsx';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlists, setPlaylists] = useState([]);


  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);

  useEffect(() => {
    async function init() {
      await Spotify.handleRedirect();

      const userPlaylists = await Spotify.getUserPlaylists();
      setPlaylists(userPlaylists);
    }

    init();
  }, []);

  const handleSearch = async (term) => {
    const results = await Spotify.search(term);
    setSearchResults(results);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleSelectPlaylist = (playlistId) => {
    setSelectedPlaylistId(playlistId);
  };

  const handleAdd = async () => {
    if (!selectedTrack || !selectedPlaylistId) {
      alert('Select a track and a playlist first.');
      return;
    }

    const ok = await Spotify.addTrackToPlaylist(selectedPlaylistId, selectedTrack.uri);
    if (ok) {
      alert(`Added "${selectedTrack.name}" to playlist.`);
      setSelectedTrack(null);
      setSelectedPlaylistId(null);
      const userPlaylists = await Spotify.getUserPlaylists();
      setPlaylists(userPlaylists);
    } else {
      alert('Failed to add track. Check console for details.');
    }
  };

  return (
    <div className="app">
      <h1>Spotify Playlist Builder 🎵</h1>

      <button onClick={() => Spotify.login()}>Login to Spotify</button>

      <div className="main-content">
        <div className="search-section">
          <SearchBar onSearch={handleSearch} />
          <SearchResults tracks={searchResults} 
          selectedTrackId={selectedTrack?.id}
            onSelectTrack={handleSelectTrack}/>
        </div>

        <div className="playlist-section">
          <Playlist
            playlists={playlists}
            selectedPlaylistId={selectedPlaylistId}
            onSelectPlaylist={handleSelectPlaylist}
          />

          <div style={{ marginTop: 12 }}>
            <button
              onClick={handleAdd}
              disabled={!selectedTrack || !selectedPlaylistId}
            >
              add
            </button>
            {selectedTrack && (
              <span style={{ marginLeft: 10 }}>
                Selected track: {selectedTrack.name}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
