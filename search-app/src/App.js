// App.js
import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // 서버로 검색어 전송
    axios.post('http://localhost:5000/search', { searchTerm })
      .then((response) => setSearchResults(response.data))
      .catch((error) => console.error('Fetch error:', error));
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>

      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.sid}{result.major}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;