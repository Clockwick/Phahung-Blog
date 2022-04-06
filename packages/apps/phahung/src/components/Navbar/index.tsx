import { Stack } from '@mui/material';
import SearchBar from 'components/SearchBar';
import React from 'react';
import PopperBlog from 'components/Popper/PopperBlog';

const Navbar: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: '50px' }}
    >
      <img src="../../../assets/images/logo.png" width="50px" height="50px" />
      <Stack direction="row" alignItems="center">
        <SearchBar />
        <PopperBlog />
      </Stack>
    </Stack>
  );
};

export default Navbar;
