import React from 'react';
import { Story, Meta } from '@storybook/react';
import Modal from './Modal';
import { ModalProps } from './types';

export default {
  title: 'Components/Modal',
  component: Modal,
  argTypes: {
    title: {
      name: 'title',
      control: {
        type: 'text',
      },
    },
    children: {
      name: 'children',
      control: {
        type: 'text',
      },
    },
  },
} as Meta;

export const Default: Story<ModalProps> = ({ title, children }) => (
  <Modal title={title}>{children}</Modal>
);
