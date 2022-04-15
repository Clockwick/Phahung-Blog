/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import categories from './config';

const ListCategory = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const handleOnClick = (categoryName: string) => {
    // fetch data axios post query
    setQuery(categoryName);

    console.log('onclick');
  };
  console.log('categories', categories);
  return (
    <Stack direction="row" spacing={3} justifyContent="space-around">
      {categories.map((category, index) => (
        <Button
          startIcon={
            <img alt="candle" width="30px" height="30px" src={category.icon} />
          }
          key={index}
          variant={query === category.name ? 'contained' : 'outlined'}
          onClick={() => handleOnClick(category.name)}
        >
          {category.name}
        </Button>
      ))}
    </Stack>
  );
};

export default ListCategory;
