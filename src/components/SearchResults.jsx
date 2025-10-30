import React from 'react';

function SearchResults({ tracks, selectedTrackId, onSelectTrack}) {
    return (
    <div>
      <h2>Search Results</h2>
      {tracks.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <ul>
          {tracks.map(track => (
            <li key={track.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ flex: 1 }}>
                {track.name} — {track.artist} ({track.album})
              </div>

              <button
                onClick={() => onSelectTrack(track)}
                aria-pressed={selectedTrackId === track.id}
                title="Select track"
              >
                {selectedTrackId === track.id ? '✓' : '+'}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

    export default SearchResults;