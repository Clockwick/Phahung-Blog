import React from 'react';

export interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'size'
  > {
  size?: 'sm' | 'md' | 'lg';
  round?: 'sm' | 'md' | 'lg' | 'full';
  type?: string;
  placeholder?: string;
  className?: string;
}

export interface TextareaProps
  extends React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  size?: 'sm' | 'md' | 'lg';
  round?: 'sm' | 'md' | 'lg';
  rows?: number;
  cols?: number;
  placeholder?: string;
  className?: string;
}

export interface SelectProps
  extends Omit<
    React.DetailedHTMLProps<
      React.SelectHTMLAttributes<HTMLSelectElement>,
      HTMLSelectElement
    >,
    'size'
  > {
  size?: 'sm' | 'md' | 'lg';
  round?: 'sm' | 'md' | 'lg';
  placeholder?: string;
  className?: string;
  children?: React.ReactNode;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export interface OptionProps {
  label: string | number;
  value: string | number;
  selected?: boolean;
  disabled?: boolean;
}
