/* eslint-disable import/no-unresolved */
import React from 'react';
import Menu from 'components/Menu';
import { useUser } from 'store/hooks/userHook';
import HelpButton from 'components/Button/HelpButton';
import Rename from './Rename';
import RenameGuide from './guide';
import mockProfile from '../../../public/images/Avatar.png';

const Setting: React.FC = () => {
  const { user } = useUser();
  console.log('user', user);
  return (
    <Menu>
      <div className="w-full h-full">
        <div className="flex justify-center mt-8 mb-4 w-full text-4xl font-bold">
          โปรไฟล์
        </div>
        <div className="flex w-full h-full">
          {user ? (
            <div className="flex-col w-full h-full">
              <div className="flex justify-center content-center">
                <img
                  referrerPolicy="no-referrer"
                  src={user.imageURL || mockProfile}
                  alt="user.profile"
                  className="w-48 rounded-full border-2 border-white border-solid md:w-60"
                />
              </div>
              <div className="my-8 text-center md:text-xl text-m">
                <div className="flex flex-row justify-center items-baseline">
                  <p className="font-bold">Admin Name : </p>
                  <Rename user={user} />
                </div>
                <div className="flex justify-center ml-9">
                  <p className="font-bold mx-2 ml-3">Email : </p>
                  <p className="ml-1">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </Menu>
  );
};

export default Setting;
