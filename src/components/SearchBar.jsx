import React, { useRef } from "react";

function SearchBar({ query, setQuery }) {
  const searchRef = useRef();

  function handleChange() {
    setQuery(searchRef.current.value);
  }

  return (
    <div>
      <input
        type="text"
        ref={searchRef}
        value={query}
        onChange={handleChange}
        placeholder="Search tasks..."
      />
    </div>
  );
}

export default SearchBar;