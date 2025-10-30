import { useState } from 'react';

function SearchBar({ onSearch }) {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userInput.trim() !== '') onSearch(userInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a song, album, or artist"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
