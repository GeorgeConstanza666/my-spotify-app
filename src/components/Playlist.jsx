function Playlist({ playlists, selectedPlaylistId, onSelectPlaylist }) {
  return (
    <div className="playlist">
      <h2>My Spotify Playlists</h2>

      {playlists.length === 0 ? (
        <p>No playlists found.</p>
      ) : (
        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <strong>{playlist.name}</strong> — {playlist.tracksTotal} tracks
              </div>

              <button
                onClick={() => onSelectPlaylist(playlist.id)}
                aria-pressed={selectedPlaylistId === playlist.id}
                title="Select playlist"
              >
                {selectedPlaylistId === playlist.id ? '✓' : '+'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Playlist;