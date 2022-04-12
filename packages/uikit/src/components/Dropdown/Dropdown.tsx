import React from 'react';
import classNames from '../../utils/classNames';
import { DropdownProps } from './types';

const getOrigin = (value?: 'left' | 'right'): string => {
  switch (value) {
    case 'left':
      return 'left-0';
    case 'right':
      return 'right-0';
    default:
      return '';
  }
};

const Dropdown: React.FC<DropdownProps> = ({ origin = 'left', children }) => {
  return (
    <div
      className={classNames(
        'flex absolute flex-col p-3.5 w-48 bg-white rounded-md border border-gray-200 shadow-md',
        getOrigin(origin),
      )}
    >
      {children}
    </div>
  );
};

export default Dropdown;
