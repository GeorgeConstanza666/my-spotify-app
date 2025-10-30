import React from 'react';

function SearchResults({ tracks }) {
    return (
    <div>
      <h2>Search Results</h2>
      {tracks.length === 0 ? (
        <p>No results yet.</p>
      ) : (
        <ul>
          {tracks.map(track => (
            <li key={track.id}>
              {track.name} — {track.artist} ({track.album})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

    export default SearchResults;