import React from 'react';
import { Story, Meta } from '@storybook/react';
import Textarea from './Textarea';
import { TextareaProps } from '../types';

export default {
  title: 'Components/Forms/Textarea',
  component: Textarea,
  argTypes: {
    size: {
      name: 'size',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    round: {
      name: 'round',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
      defaultValue: 'md',
    },
    rows: {
      name: 'rows',
      control: {
        type: 'number',
      },
    },
    cols: {
      name: 'cols',
      control: {
        type: 'number',
      },
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
    placeholder: 'Textarea',
  },
} as Meta;

export const Default: Story<TextareaProps> = ({
  size,
  round,
  rows,
  cols,
  placeholder,
  className,
}) => (
  <Textarea
    size={size}
    round={round}
    rows={rows}
    cols={cols}
    placeholder={placeholder}
    className={className}
  />
);
