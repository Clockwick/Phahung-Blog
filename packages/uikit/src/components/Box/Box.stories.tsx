import React from 'react';
import { Story, Meta } from '@storybook/react';
import Box from './Box';
import { BoxProps } from './types';

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    size: {
      name: 'size',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    round: {
      name: 'round',
      options: ['sm', 'md', 'lg', 'full'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    shadow: {
      name: 'shadow',
      options: ['none', 'sm', 'md', 'lg'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    border: {
      name: 'border',
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
  args: {
    children: 'Box',
  },
} as Meta;

export const Default: Story<BoxProps> = ({
  size,
  round,
  shadow,
  border,
  children,
}) => (
  <Box size={size} round={round} shadow={shadow} border={border}>
    {children}
  </Box>
);
