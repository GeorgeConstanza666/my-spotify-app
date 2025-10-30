import React, { useState } from 'react';

function SearchBar() {

    const [userInput, setUserInput] = useState('');

     function handleUserInput(e) {
    setUserInput(e.target.value);
  }

    return (
        <div>
            <form>
                <label for="searchbar">SearchBar</label>
                <br></br>
                <input id="searchbar" type="text" placeholder="Enter A Song, Album, or Artist" onChange={handleUserInput} value={userInput}/>
                <br></br>
                <button type="sumbit">Search</button>
            </form>
        </div>
    );
}

export default SearchBar;