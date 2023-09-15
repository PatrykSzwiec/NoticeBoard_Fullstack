
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, InputGroup, Form } from "react-bootstrap";

const Search = () => {

  return (
    <div className="d-flex justify-content-between">
      <div>
      <InputGroup className="mb-3">
        <Form.Control type="text"
          placeholder="search phrase..."
        />
        <Link to="/ad/search/:searchPhrase">
          <Button variant="success">Search</Button>
        </Link>
      </InputGroup>      
      </div>
    </div>
  );
};

export default Search;