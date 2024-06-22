import React, { useState } from "react";

const SearchBox = ({ city, setCity }) => {
  const [input, setInput] = useState(city);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput(""); // Clear input after search
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Enter City"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
