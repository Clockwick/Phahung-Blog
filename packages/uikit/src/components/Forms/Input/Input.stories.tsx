import React from 'react';
import { Story, Meta } from '@storybook/react';
import Input from './Input';
import { InputProps } from '../types';

export default {
  title: 'Components/Forms/Input',
  component: Input,
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
    type: {
      name: 'type',
      options: ['text', 'number'],
      control: { type: 'select' },
      defaultValue: true,
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

export const Default: Story<InputProps> = ({
  size,
  round,
  type,
  placeholder,
  className,
}) => (
  <Input
    size={size}
    round={round}
    type={type}
    placeholder={placeholder}
    className={className}
  />
);
