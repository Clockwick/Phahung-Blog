import React, { createContext, useState } from 'react';

interface ISearchContext {
  inputSearch: string;
  valueSearch: string;
  setInputSearch: (s: string) => void;
  setValueSearch: (s: string) => void;
}

export const SearchContext: React.Context<ISearchContext> = createContext(
  {} as ISearchContext,
);

export const SearchProvider: React.FC = ({
  children,
}: React.PropsWithChildren<React.ReactNode>) => {
  const parseHTML = (s: string): string => {
    return s.replace(new RegExp('\\\\', 'g'), '\\\\');
  };

  const [inputSearch, _setInputSearch] = useState('');
  const [valueSearch, setValueSearch] = useState('');
  const setInputSearch = (s: string): void => {
    _setInputSearch(parseHTML(s));
  };

  const value = { inputSearch, setInputSearch, valueSearch, setValueSearch };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
