/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Menu as MenuUI } from '@chan-chala/uikit';
import { useUser } from 'store/hooks/userHook';

import MenuTitle from './MenuTitle';
import config from './config';
import MenuDropdown from './MenuDropdown';
import mockProfile from '../../../public/images/Avatar.png';

const Menu: React.FC = ({ children }) => {
  const { user } = useUser();
  const name = `${user?.firstName} ${user?.lastName}`;
  return (
    <MenuUI
      title={<MenuTitle />}
      links={config}
      user={{ nickname: name, picture: mockProfile }}
      dropdown={<MenuDropdown />}
    >
      {children}
    </MenuUI>
  );
};

export default Menu;
