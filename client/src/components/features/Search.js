import React, { useState } from 'react';

import { Button, InputGroup, Form } from "react-bootstrap";

const Search = () => {
  const [searchPhrase, setSearchPhrase] = useState('');

  const handleSearch = () => {
    // Redirect to the search results page with the search phrase
    window.location.href = `/ad/search/${searchPhrase}`;
  };
  return (
    <div className="d-flex justify-content-between">
      <div>
      <InputGroup className="mb-3">
        <Form.Control type="text"
          placeholder="search phrase..."
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
        />
        <Button variant="success" onClick={handleSearch}>Search</Button>
      </InputGroup>
      </div>
    </div>
  );
};

export default Search;