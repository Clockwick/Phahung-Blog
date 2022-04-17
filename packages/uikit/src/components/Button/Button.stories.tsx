import React from 'react';
import { Story, Meta } from '@storybook/react';
import Button from './Button';
import { ButtonProps } from './types';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    hover: {
      name: 'hover',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    active: {
      name: 'active',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    border: {
      name: 'border',
      control: { type: 'boolean' },
      defaultValue: true,
    },
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
    color: {
      name: 'color',
      options: [
        'none',
        'blue',
        'green',
        'yellow',
        'red',
        'purple',
        'gray',
        'white',
      ],
      control: { type: 'select' },
      defaultValue: 'none',
    },
    children: {
      name: 'children',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: 'Button',
  },
} as Meta;

export const Default: Story<ButtonProps> = ({
  size,
  round,
  color,
  type,
  hover,
  active,
  border,
  onClick,
  children,
}) => (
  <Button
    size={size}
    round={round}
    color={color}
    type={type}
    hover={hover}
    active={active}
    border={border}
    onClick={onClick}
  >
    {children}
  </Button>
);
