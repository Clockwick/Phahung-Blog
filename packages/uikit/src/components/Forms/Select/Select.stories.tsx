import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Select, Option } from './Select';
import { SelectProps } from '../types';

export default {
  title: 'Components/Forms/Select',
  component: Select,
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
    placeholder: {
      name: 'placeholder',
      control: {
        type: 'text',
      },
    },
    className: {
      name: 'className',
      control: {
        type: 'text',
      },
    },
  },
  args: {
    placeholder: 'Input',
  },
} as Meta;

export const Default: Story<SelectProps> = ({
  size,
  round,
  placeholder,
  className,
}) => (
  <Select
    size={size}
    round={round}
    placeholder={placeholder}
    className={className}
  >
    <Option label="1" value="1" />
    <Option label="2" value="2" />
    <Option label="3" value="3" />
  </Select>
);
