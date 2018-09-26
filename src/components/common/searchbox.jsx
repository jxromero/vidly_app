import React from "react";

const SearchBox = ({ searchValue, onSearch }) => {
  return (
    <div className="form-group">
      <input
        type="text"
        className="form-control"
        placeholder="Search for movie..."
        onChange={e => onSearch(e.currentTarget.value)}
        value={searchValue}
      />
    </div>
  );
};

export default SearchBox;
