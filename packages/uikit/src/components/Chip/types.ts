import React from 'react';

export interface ChipProps {
  id: string;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'white';
  hover?: boolean;
  active?: boolean;
  border?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  status: boolean;
}
