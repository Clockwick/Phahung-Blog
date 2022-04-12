import React from 'react';
import classNames from '../../utils/classNames';
import { ChipProps } from './types';

const getColor = (
  status: boolean,
  hover: boolean,
  value?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'white',
): string => {
  if (status)
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
      case 'white':
        return `text-black bg-white ${hover && 'hover:bg-gray-200'}`;
      default:
        return 'bg-transparent';
    }
  else {
    // return Gray for a disable chip
    return `text-gray-500 bg-gray-300 ${hover && 'hover:bg-gray-200'}`;
  }
};

const Chip: React.FC<ChipProps> = ({
  id,
  color = 'blue',
  hover = true,
  active = true,
  border = true,
  status,
  onClick,
  children,
}) => {
  return (
    <button
      /* eslint-disable react/button-has-type */
      id={id}
      type="button"
      className={classNames(
        'mb-3 transition-all ease-in-out duration-100 py-1 px-4 h-10 rounded-full cursor-pointer text-lg overflow-hidden overflow-ellipsis flex justify-center items-center',
        active && 'active:scale-95',
        border && 'border',
        getColor(status, hover, color),
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Chip;
