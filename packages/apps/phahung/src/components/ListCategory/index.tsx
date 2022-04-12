/* eslint-disable react/no-array-index-key */
import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import categoryNames from './cofig';

const ListCategory = (): JSX.Element => {
  const [query, setQuery] = useState<string>('');
  const handleOnClick = (categoryName: string) => {
    // fetch data axios post query
    setQuery(categoryName);

    console.log('onclick');
  };
  console.log('categoryNames', categoryNames);
  return (
    <Stack direction="row" spacing={3} justifyContent="center">
      {categoryNames.map((categoryName, index) => (
        <Button
          key={index}
          variant={query === categoryName ? 'contained' : 'outlined'}
          onClick={() => handleOnClick(categoryName)}
        >
          {categoryName}
        </Button>
      ))}
    </Stack>
  );
};

export default ListCategory;
