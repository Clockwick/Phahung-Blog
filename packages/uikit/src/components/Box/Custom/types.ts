import React from 'react';

export interface PageBoxProps {
  id?: string;
  size?: 'sm' | 'md' | 'lg';
  round?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  className?: string;
  children?: React.ReactNode;
  clickHandler?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
