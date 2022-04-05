import React from 'react';
import { NavLink } from 'react-router-dom';

const MenuTitle: React.FC = () => {
  return (
    <NavLink to="/">
      <img src="/images/logo.png" alt="logo" />
    </NavLink>
  );
};

export default MenuTitle;
