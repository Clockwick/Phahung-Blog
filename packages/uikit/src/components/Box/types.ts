import React from 'react';

export interface BoxProps {
  id?: number;
  size?: 'sm' | 'md' | 'lg';
  round?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  className?: string;
  children?: React.ReactNode;
}
