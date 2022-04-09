import { Stack } from '@mui/material';
// eslint-disable-next-line import/no-unresolved
import SearchBar from 'components/SearchBar';
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import PopperBlog from 'components/Popper/PopperBlog';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-around"
      alignItems="center"
      sx={{ height: '50px', backgroundColor: '#FFF7F2' }}
    >
      <Link href="/" to="/">
        <img
          src="/assets/images/logo.png"
          width="50px"
          height="50px"
          alt="logo"
        />
      </Link>

      <Stack direction="row" alignItems="center">
        <SearchBar />
        <PopperBlog />
      </Stack>
    </Stack>
  );
};

export default Navbar;
