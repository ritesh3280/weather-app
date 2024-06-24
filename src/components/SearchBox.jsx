// SearchBox.jsx

import React, { useState } from "react";

const SearchBox = ({ city, setCity }) => {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter City"
        className="search-input"
      />
      <button type="submit" className="btn">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
