import React from 'react';

export type ModalProps = {
  title: string;
  children: React.ReactNode;
  handleDismiss?: () => void;
};
