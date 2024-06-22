import { useState } from "react";

const SearchBox = ({ city, setCity }) => {
  const [input, setInput] = useState(city);

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(input);
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input type="text" value={input} onChange={e} placeholder="Enter City" />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBox;
