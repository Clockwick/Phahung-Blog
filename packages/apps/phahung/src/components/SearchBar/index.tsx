import React, { useState } from 'react';

import { InputBase, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  //   borderStyle: 'ridge',
  borderRadius: '10px',
  margin: '20px',
  //   '&:hover': { border: '1px solid' },
  cursor: 'pointer',
  marginLeft: 0,
  marginRight: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '90%',
  cursor: 'pointer',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    // backgroundColor: 'red',
    cursor: 'pointer',
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '0ch',
      '&:focus': {
        width: '60ch',
        border: '1px solid',
      },
    },
  },
}));
const SearchBar = () => {
  const [value, setValue] = useState<string>('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <>
        <Search sx={{ display: 'flex' }}>
          <SearchIconWrapper
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <SearchIcon sx={{ color: 'black' }} />
          </SearchIconWrapper>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ width: '100%', py: 0.4 }}
          >
            <StyledInputBase
              placeholder="ค้นหาบทความ..."
              inputProps={{ 'aria-label': 'search' }}
              // onKeyDown={(e) => handleSubmit(e)}
              onChange={(e: any) => setValue(e.target.value)}
              value={value}
              sx={{ width: '90%' }}
            />
          </Stack>
        </Search>
      </>
    </form>
  );
};
export default SearchBar;
