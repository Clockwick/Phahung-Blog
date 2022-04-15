/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Typography, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import items from './config';

const NavItems = (): JSX.Element => {
  return (
    <Stack direction="row">
      {items.map((item, index) => (
        <Link to={item.path} key={index}>
          <Typography variant="h6">{item.name}</Typography>
        </Link>
      ))}
    </Stack>
  );
};

export default NavItems;
