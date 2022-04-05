/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from 'react';
import { Menu as MenuUI } from '@chan-chala/uikit';
import { useUser } from 'store/hooks/userHook';

import MenuTitle from './MenuTitle';
import config from './config';
import MenuDropdown from './MenuDropdown';

const Menu: React.FC = ({ children }) => {
  const { user } = useUser();
  return user!.role === 'Administrator' ? (
    <MenuUI
      title={<MenuTitle />}
      links={config.filter((conf) => conf.label !== 'Users')}
      user={{ nickname: user!.name, picture: user!.picture }}
      dropdown={<MenuDropdown />}
    >
      {children}
    </MenuUI>
  ) : (
    <MenuUI
      title={<MenuTitle />}
      links={config}
      user={{ nickname: user!.name, picture: user!.picture }}
      dropdown={<MenuDropdown />}
    >
      {children}
    </MenuUI>
  );
};

export default Menu;
