import React from 'react';
import classNames from '../../utils/classNames';
import { ButtonProps } from './types';

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
      return 'p-0.5 text-sm';
    case 'md':
      return 'p-1 text-base';
    case 'lg':
      return 'p-1.5 text-lg';
    default:
      return 'p-0.5 text-base';
  }
};

const getColor = (
  hover: boolean,
  value?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'white',
): string => {
  switch (value) {
    case 'blue':
      return `text-white bg-blue-500 ${hover && 'hover:bg-blue-600'}`;
    case 'green':
      return `text-white bg-green-500 ${hover && 'hover:bg-green-600'}`;
    case 'yellow':
      return `text-white bg-yellow-500 ${hover && 'hover:bg-yellow-600'}`;
    case 'red':
      return `text-white bg-red-500 ${hover && 'hover:bg-red-600'}`;
    case 'purple':
      return `text-white bg-purple-500 ${hover && 'hover:bg-purple-600'}`;
    case 'gray':
      return `text-black bg-gray-300 ${
        hover && 'hover:bg-gray-400 hover:bg-opacity-60'
      }`;
    case 'white':
      return `text-black bg-white ${hover && 'hover:bg-gray-200'}`;
    default:
      return 'bg-transparent';
  }
};

const Button: React.FC<ButtonProps> = ({
  size = 'md',
  round = 'md',
  color,
  type = 'button',
  hover = true,
  active = true,
  border = true,
  onClick,
  children,
}) => {
  return (
    <button
      /* eslint-disable react/button-has-type */
      type={type}
      className={classNames(
        'font-normal transition-all ease-in-out duration-100',
        active && 'active:scale-95',
        border && 'border',
        getRound(round),
        getSize(size),
        getColor(hover, color),
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
