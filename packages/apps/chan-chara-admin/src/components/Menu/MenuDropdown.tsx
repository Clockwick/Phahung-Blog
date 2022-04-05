import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Dropdown } from '@chan-chala/uikit';

import { useUser } from 'store/hooks/userHook';

const MenuDropdown: React.FC = () => {
  const { logoutHandler } = useUser();
  const { push } = useHistory();

  return (
    <Dropdown origin="right">
      <Button
        size="md"
        color="white"
        type="button"
        border={false}
        onClick={() => push('/setting')}
      >
        <div className="flex flex-row items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="p-1 w-8 h-8 bg-gray-200 rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>Settings</div>
        </div>
      </Button>
      <Button
        size="md"
        color="white"
        type="button"
        border={false}
        onClick={logoutHandler}
      >
        <div className="flex flex-row items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="p-1 w-8 h-8 bg-gray-200 rounded-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <div>Logout</div>
        </div>
      </Button>
    </Dropdown>
  );
};

export default MenuDropdown;
