import React, { useEffect, useMemo, useState } from 'react';
// import { Box, Button, useModal } from '@chan-chala/uikit';
import { Button, useModal } from '@chan-chala/uikit';
import { BanUserModal, DeleteUserModal } from '../UserModal';
import { User } from './types';
import { Pagination } from './components';

const ListUser: React.FC = () => {
  const [didFetchUsers, setDidFetchUsers] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);

  const [totalUser, setTotalUser] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<string>('');
  const [banId, setBanId] = useState<string>('');
  const [handleDeleteModalPresent] = useModal(
    <DeleteUserModal deleteHandler={{ deleteId, setDidFetchUsers }} />,
  );
  const [handleBanModalPresent] = useModal(
    <BanUserModal banHandler={{ banId, setDidFetchUsers }} />,
  );

  useEffect(() => {
    if (deleteId.length > 0) {
      setDeleteId('');
      handleDeleteModalPresent();
    } else if (banId.length > 0) {
      setBanId('');
      handleBanModalPresent();
    }
  }, [deleteId, banId, handleDeleteModalPresent, handleBanModalPresent]);

  /* eslint-disable */
  const renderedUsers = useMemo(
    () => users,
    [didFetchUsers, setDidFetchUsers, users],
  );
  const renderedTotalUsers = useMemo(
    () => totalUser,
    [didFetchUsers, setDidFetchUsers, totalUser],
  );
  /* eslint-enable */

  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between mb-4">
        <div className="text-4xl font-bold">
          รายชื่อผู้ใช้ ({renderedTotalUsers})
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-start ">
        {/* Draft Component Outline */}
        {renderedUsers && renderedUsers.length > 0 ? (
          renderedUsers.map((user) => {
            return (
              <div
                className="flex flex-col justify-start items-center p-12 m-2 w-full h-96 bg-pink-50 rounded-lg shadow-lg sm:w-full md:w-64"
                key={user.uid}
              >
                <div className="mb-6">
                  <img
                    className="object-cover object-center w-36 h-36 rounded-full"
                    src={user.imageURL}
                    alt={user.firstName}
                  />
                </div>
                <div className="text-center">
                  <div className="w-full text-xl font-bold text-black break-normal">
                    {user.firstName}
                  </div>
                  <div className="w-full text-base font-normal text-gray-800">
                    {user.email}
                  </div>
                  <div className="mb-3 w-full text-base font-normal text-red-500">
                    {user.role}
                  </div>
                  <div className="flex justify-center space-x-4">
                    <Button
                      size="md"
                      color="red"
                      type="button"
                      border={false}
                      onClick={() => {
                        setBanId(user.uid);
                      }}
                    >
                      แบนผู้ใช้
                    </Button>
                    <Button
                      size="md"
                      color="red"
                      type="button"
                      border={false}
                      onClick={() => {
                        setDeleteId(user.uid);
                      }}
                    >
                      ลบผู้ใช้
                    </Button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div> ไม่มีข้อมูล </div>
        )}
        {/* Draft Component Outline */}
      </div>
      <Pagination
        usersHandler={{ setUsers, setTotalUser }}
        fetchHandler={{ didFetchUsers, setDidFetchUsers }}
      />
    </div>
  );
};

export default ListUser;
