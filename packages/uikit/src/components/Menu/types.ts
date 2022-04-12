import React from 'react';
import { InputProps } from '../Forms/types';

export interface MenuProps {
  title: React.ReactNode;
  links: { icon: React.ReactNode; label: string; href: string }[];
  search?: {
    enable: boolean;
    props?: InputProps;
  };
  user: {
    nickname: string;
    picture: string;
  };
  dropdown: React.ReactNode;
}
