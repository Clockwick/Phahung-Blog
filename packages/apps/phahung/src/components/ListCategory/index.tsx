/* eslint-disable react/no-array-index-key */
import { Button, Stack } from '@mui/material';
import React from 'react';
import categoryNames from './cofig';

const ListCategory = () => {
  const query = 'โพสต์ธรรมะ';
  const handleOnClick = () => {
    // fetch data
    console.log('onclick');
  };
  console.log('categoryNames', categoryNames);
  return (
    <Stack direction="row" spacing={3} justifyContent="center">
      {categoryNames.map((categoryName, index) => (
        <Button
          key={index}
          variant={query === categoryName ? 'contained' : 'outlined'}
          onClick={handleOnClick}
        >
          {categoryName}
        </Button>
      ))}
    </Stack>
  );
};

export default ListCategory;
