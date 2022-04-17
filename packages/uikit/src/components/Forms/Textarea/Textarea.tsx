import React from 'react';
import classNames from '../../../utils/classNames';
import { TextareaProps } from '../types';

const getRound = (value?: 'sm' | 'md' | 'lg'): string => {
  switch (value) {
    case 'sm':
      return 'rounded-sm';
    case 'md':
      return 'rounded-md';
    case 'lg':
      return 'rounded-lg';
    default:
      return 'rounded-sm';
  }
};

const getSize = (value?: 'sm' | 'md' | 'lg'): string => {
  switch (value) {
    case 'sm':
      return 'py-1 px-3 text-sm';
    case 'md':
      return 'py-1.5 px-3.5 text-base';
    case 'lg':
      return 'py-2 px-4 text-lg';
    default:
      return 'py-2 px-4 text-base';
  }
};

const Textarea: React.FC<TextareaProps> = ({
  size = 'md',
  round = 'md',
  rows,
  cols,
  placeholder,
  className,
  ...rest
}) => {
  return (
    <textarea
      placeholder={placeholder}
      className={classNames(
        'bg-white border focus:outline-none',
        className,
        getRound(round),
        getSize(size),
      )}
      rows={rows}
      cols={cols}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    />
  );
};

export default Textarea;
