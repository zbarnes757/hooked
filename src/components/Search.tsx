import React, { useState } from 'react';

type SearchProps = {
  search: (searchValue: string) => void;
};

const Search: React.FC<SearchProps> = props => {
  const [searchValue, setSearchValue] = useState('');

  const resetInputField = () => {
    setSearchValue('');
  };

  const callSearchFunction = (e: React.MouseEvent) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  };

  return (
    <form className="search">
      <input
        type="text"
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
      />

      <input type="submit" value="SEARCH" onClick={callSearchFunction} />
    </form>
  );
};

export default Search;
