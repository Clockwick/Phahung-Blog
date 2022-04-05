import { Input } from '@chan-chala/uikit';
import React from 'react';

interface ISearchBar {
  submitHandler: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<SVGSVGElement>,
  ) => void;
  searchInputHandler: (e: React.FormEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<ISearchBar> = ({
  submitHandler,
  searchInputHandler,
}) => {
  return (
    <form className="flex items-center space-x-2" onSubmit={submitHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={submitHandler}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <Input
        className="w-[450px]"
        type="text"
        placeholder="search"
        onChange={searchInputHandler}
      />
    </form>
  );
};

export default SearchBar;
