import React from 'react';

export interface ButtonProps {
  size?: 'sm' | 'md' | 'lg';
  round?: 'sm' | 'md' | 'lg' | 'full';
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'white';
  type?: 'button' | 'submit' | 'reset';
  hover?: boolean;
  active?: boolean;
  border?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}
