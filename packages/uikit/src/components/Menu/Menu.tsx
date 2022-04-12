import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '../Button';
import { Input } from '../Forms';
import { Box } from '../Box';
import { MenuProps } from './types';
import { useClickOutside } from '../../hooks/useClickOutside';
import classNames from '../../utils/classNames';

const Menu: React.FC<MenuProps> = ({
  title,
  links,
  search = {
    enable: false,
  },
  user,
  dropdown,
  children,
}) => {
  const [ref, isClick] = useClickOutside();
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleToggleMenu = useCallback(() => {
    setShowMenu(!showMenu);
  }, [showMenu]);

  const handleToggleDropdown = useCallback(() => {
    setShowDropdown(!showDropdown);
  }, [showDropdown]);

  useEffect(() => {
    if (isClick) {
      setShowDropdown(false);
    }
  }, [isClick]);

  return (
    <div className="flex flex-row">
      <Box
        className={classNames(
          'flex fixed right-0 bottom-0 left-0 flex-col bg-white transition-all duration-300',
          'sm:top-4 sm:bottom-4 sm:left-4 sm:p-4 sm:divide-y-4 sm:divide-dotted z-30',
          showMenu ? 'sm:w-64' : 'sm:w-24',
        )}
      >
        <div className="hidden overflow-hidden flex-col justify-center items-center py-4 h-32 sm:flex">
          {title}
        </div>
        <div className="flex flex-row justify-evenly py-2 font-medium text-gray-800 sm:flex-col sm:py-4 sm:space-y-2">
          {links.map((link) => (
            <NavLink
              exact
              to={link.href}
              className={classNames(
                'flex items-center py-2 px-4 space-x-4 rounded-xl',
                'hover:bg-gray-200',
                showMenu ? 'flex-row' : 'flex-col',
              )}
              activeClassName="bg-gray-200"
              key={link.label}
            >
              {link.icon}
              {showMenu && (
                <span className="hidden sm:block truncate">{link.label}</span>
              )}
            </NavLink>
          ))}
        </div>
      </Box>
      <div className="flex-auto">
        <Box
          className={classNames(
            'flex fixed top-2 right-2 left-2 flex-row justify-between items-center p-2 h-16 bg-white border-gray-200 transition-all duration-300',
            'sm:top-4 sm:right-4 sm:p-4 z-30',
            showMenu ? 'sm:left-72' : 'sm:left-32',
          )}
        >
          <div className="flex flex-row flex-1 sm:flex-none sm:space-x-2">
            <div className="hidden sm:block">
              <Button
                color="white"
                round="lg"
                size="lg"
                onClick={handleToggleMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={classNames(
                    'h-6 w-6 transition-all duration-300',
                    showMenu && '-rotate-180',
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </Button>
            </div>
            {search.enable && (
              <div className="flex relative flex-row flex-1 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute ml-2 w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <Input
                  type="text"
                  placeholder="ค้นหา"
                  className="flex-1 pl-10"
                  {...search.props} // eslint-disable-line react/jsx-props-no-spreading
                />
              </div>
            )}
          </div>
          <div className="hidden flex-row items-center space-x-2 sm:flex">
            <div className="hidden md:block">{user.nickname}</div>
            <img
              referrerPolicy="no-referrer"
              src={user.picture}
              alt="profile images"
              className="object-cover object-center w-8 h-8 rounded-full"
            />
            <div
              className="relative"
              ref={ref as React.RefObject<HTMLDivElement>}
            >
              <Button
                color="white"
                round="full"
                border={false}
                onClick={handleToggleDropdown}
              >
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
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </Button>
              {showDropdown && dropdown}
            </div>
          </div>
        </Box>
        <div
          className={classNames(
            'my-24 mx-2 transition-all duration-300',
            'sm:mr-4 sm:mb-0',
            showMenu ? 'sm:ml-72' : 'sm:ml-32',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Menu;
