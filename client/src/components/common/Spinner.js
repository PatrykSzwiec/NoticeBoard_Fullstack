import React from 'react';

const Spinner = () => {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  };

export default Spinner;