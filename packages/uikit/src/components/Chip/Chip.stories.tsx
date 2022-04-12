import React from 'react';
import { Story, Meta } from '@storybook/react';
import Chip from './Chip';
import { ChipProps } from './types';

export default {
  title: 'Components/Chip',
  component: Chip,
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
      defaultValue: 'lg',
    },
    status: {
      name: 'status',
      control: { type: 'boolean' },
      defaultValue: true,
    },
    color: {
      name: 'color',
      options: ['none', 'blue', 'green', 'yellow', 'red', 'purple', 'white'],
      control: { type: 'select' },
      defaultValue: 'blue',
    },
    children: {
      name: 'children',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    children: 'Chip',
  },
} as Meta;

export const Default: Story<ChipProps> = ({
  id,
  status,
  color,
  hover,
  active,
  border,
  onClick,
  children,
}) => (
  <Chip
    id={id}
    color={color}
    hover={hover}
    active={active}
    border={border}
    onClick={onClick}
    status={status}
  >
    {children}
  </Chip>
);
