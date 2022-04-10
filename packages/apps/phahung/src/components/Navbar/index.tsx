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
      justifyContent="space-between"
      alignItems="center"
      sx={{ height: '70px', backgroundColor: '#FFF7F2' }}
    >
      <Link href="/" to="/">
        <img
          src="/assets/images/logo.png"
          width="60px"
          height="60px"
          alt="logo"
        />
      </Link>

      <Stack direction="row" alignItems="center" sx={{ paddingRight: 4 }}>
        <SearchBar />
        <PopperBlog />
      </Stack>
    </Stack>
  );
};

export default Navbar;
