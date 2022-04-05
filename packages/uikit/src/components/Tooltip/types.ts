import React from 'react';

export interface ITooltip {
  id: string;
  place?: 'top' | 'right' | 'bottom' | 'left';
  type?: 'dark' | 'success' | 'warning' | 'error' | 'info' | 'light';
  effect?: 'float' | 'solid';
  children: React.ReactNode;
}
