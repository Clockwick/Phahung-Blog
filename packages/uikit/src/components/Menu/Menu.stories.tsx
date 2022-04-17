import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Meta } from '@storybook/react';
import { Box } from '../Box';
import { Dropdown } from '../Dropdown';
import Menu from './Menu';

export default {
  title: 'Components/Menu',
  component: Menu,
  argTypes: {},
} as Meta;

const links = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    label: 'Dashboard',
    href: '/',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
        />
      </svg>
    ),
    label: 'Blogs',
    href: '/blogs',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    label: 'Users',
    href: '/users',
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
    label: 'Profile',
    href: '/profile',
  },
];

const Logo: React.FC = () => (
  <>
    <div className="text-4xl whitespace-nowrap">👴👵</div>
    <div className="mt-4 text-2xl font-semibold whitespace-nowrap">
      Chan Chara
    </div>
  </>
);

const MenuDropdown: React.FC = () => {
  return <Dropdown origin="right">Dropdown</Dropdown>;
};

const user = {
  nickname: 'Mr.elon musk',
  image: 'favicon.ico',
};

export const Default: React.FC = () => (
  <BrowserRouter>
    <div style={{ height: 'calc(100vh - 2rem)' }} className="scale-100">
      <Menu
        links={links}
        title={<Logo />}
        user={user}
        dropdown={<MenuDropdown />}
      >
        <div className="grid grid-cols-3 gap-4">
          <Box className="col-span-3">
            <br />
            <br />
            <br />
          </Box>
          <Box>
            <br />
            <br />
            <br />
          </Box>
          <Box className="col-span-2">
            <br />
            <br />
            <br />
          </Box>
          <Box>
            <br />
            <br />
            <br />
          </Box>
          <Box>
            <br />
            <br />
            <br />
          </Box>
          <Box>
            <br />
            <br />
            <br />
          </Box>
          <Box className="col-span-2">
            <br />
            <br />
            <br />
          </Box>
          <Box>
            <br />
            <br />
            <br />
          </Box>
        </div>
      </Menu>
    </div>
  </BrowserRouter>
);
