import React, { useContext } from 'react';
import { SearchContext } from 'src/contexts/SearchContext';
import { ISearch } from './type';

const Search: React.FC<ISearch> = () => {
  const { valueSearch, setInputSearch, setValueSearch } =
    useContext(SearchContext);
  // const [valueSearch, setValueSearch] = useState('');
  const handleClearInputSearch = (): void => {
    setInputSearch('');
    setValueSearch('');
  };
  return (
    <div className="flex items-center mr-4 h-12 bg-white rounded-full shadow-xl lg:w-1/3">
      <input
        className="mx-6 w-full h-full leading-tight text-gray-700 focus:outline-none"
        id="search"
        type="text"
        autoComplete="off"
        placeholder="Search"
        value={valueSearch}
        onChange={(e) => {
          setValueSearch(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            setInputSearch(valueSearch);
          }
        }}
      />
      <div className="p-2">
        <button
          type="submit"
          className="flex justify-center items-center p-2 h-full text-white bg-gray-500 rounded-full focus:outline-none active:bg-red-400"
          onClick={handleClearInputSearch}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
