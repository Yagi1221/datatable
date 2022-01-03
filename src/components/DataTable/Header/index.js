import React from 'react';

const Header = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map(({ name }) => (
          <th key={name}>{name}</th>
        ))}
      </tr>
    </thead>
  );
};

export default Header;
