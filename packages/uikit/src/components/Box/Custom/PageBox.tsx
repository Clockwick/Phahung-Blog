import React from 'react';
import classNames from '../../../utils/classNames';
import { PageBoxProps } from './types';

const getRound = (value?: 'sm' | 'md' | 'lg' | 'full'): string => {
  switch (value) {
    case 'sm':
      return 'rounded-sm';
    case 'md':
      return 'rounded-md';
    case 'lg':
      return 'rounded-lg';
    case 'full':
      return 'rounded-full';
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

const getShadow = (value?: 'none' | 'sm' | 'md' | 'lg'): string => {
  switch (value) {
    case 'sm':
      return 'shadow-sm';
    case 'md':
      return 'shadow-md';
    case 'lg':
      return 'shadow-lg';
    case 'none':
    default:
      return '';
  }
};

const Box: React.FC<PageBoxProps> = ({
  id = '-1',
  round = 'md',
  size = 'md',
  shadow = 'md',
  border = false,
  className,
  children,
  clickHandler,
}) => {
  return (
    <button
      id={id}
      className={classNames(
        className,
        'bg-white',
        border && 'border',
        getRound(round),
        getSize(size),
        getShadow(shadow),
      )}
      onClick={clickHandler}
      type="button"
    >
      {children}
    </button>
  );
};

export default Box;
