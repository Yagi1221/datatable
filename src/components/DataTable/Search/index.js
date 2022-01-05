import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const onInputChange = (value) => {
    setSearch(value);
    onSearch(value);
  };
  return (
    <input
      className='form-control'
      type='text'
      placeholder='搜尋'
      value={search}
      onChange={(e) => onInputChange(e.target.value)}
    />
  );
};

export default Search;
