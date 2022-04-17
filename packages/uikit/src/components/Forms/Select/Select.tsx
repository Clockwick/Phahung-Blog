import React from 'react';
import classNames from '../../../utils/classNames';
import { SelectProps, OptionProps } from '../types';

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

export const Option: React.FC<OptionProps> = ({
  label,
  value,
  selected,
  disabled,
}) => {
  return (
    <option value={value} selected={selected} disabled={disabled}>
      {label}
    </option>
  );
};

export const Select: React.FC<SelectProps> = ({
  name,
  round = 'md',
  size = 'md',
  placeholder,
  className,
  children,
  onChange,
  ...rest
}) => {
  return (
    <select
      name={name}
      className={classNames(
        'bg-white border focus:outline-none',
        className,
        getRound(round),
        getSize(size),
      )}
      onChange={onChange}
      {...rest} // eslint-disable-line react/jsx-props-no-spreading
    >
      {placeholder && <Option label={placeholder} value="" />}
      {children}
    </select>
  );
};
