import React, { useState } from 'react';

function SearchBar({ onSearch }) {

    const [userInput, setUserInput] = useState('');

     function handleSubmit(e) {
        e.preventDefault();
        setUserInput(e.target.value);
  }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label for="searchbar">SearchBar</label>
                <br />
                <input id="searchbar" type="text" placeholder="Enter A Song, Album, or Artist" onChange={(e) => setUserInput(e.target.value)}
          value={userInput}/>
                <br />
                <button type="sumbit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;