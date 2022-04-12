/* import React from 'react';
import Switch from 'react-switch';
import { SwitchProps } from './types';

const getSize = (size: 'md'): { width: number; height: number } => {
  switch (size) {
    case 'md':
      return {
        width: 50,
        height: 25,
      };
    default:
      return {
        width: 50,
        height: 25,
      };
  }
};

const ToggleSwitch: React.FC<SwitchProps> = ({
  size = 'md',
  checked,
  handleChange,
}) => {
  const { width, height } = getSize(size); // ตอนนี้มีแค่ Size md
  return (
    <Switch
      onChange={handleChange}
      checked={checked}
      uncheckedIcon
      checkedIcon
      width={width}
      height={height}
    />
  );
};


export default ToggleSwitch; */
