import React, { useEffect, useMemo, useState } from 'react';
// import { Box, Button, useModal } from '@chan-chala/uikit';
import { Button, useModal } from '@chan-chala/uikit';
import { DeleteAdminModal, AddAdminModal } from '../AdminModal';
import { User } from './types';
import { Pagination } from './components';

const ListUser: React.FC = () => {
  const [didFetchUsers, setDidFetchUsers] = useState<boolean>(false);
  const [users, setUsers] = useState<Array<User>>([]);
  const [totalAdmin, setTotalAdmin] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<string>('');
  const [handleDeleteModalPresent] = useModal(
    <DeleteAdminModal deleteHandler={{ deleteId, setDidFetchUsers }} />,
  );
  const [handleAddModalPresent] = useModal(
    <AddAdminModal setDidFetchUsers={setDidFetchUsers} />,
  );

  useEffect(() => {
    if (deleteId.length > 0) {
      setDeleteId('');
      handleDeleteModalPresent();
    }
  }, [deleteId, handleDeleteModalPresent]);

  /* eslint-disable */
  const renderedUsers = useMemo(
    () => users,
    [didFetchUsers, setDidFetchUsers, users],
  );
  const renderedTotalUsers = useMemo(
    () => totalAdmin,
    [didFetchUsers, setDidFetchUsers, totalAdmin],
  );
  /* eslint-enable */

  return (
    <div className="w-full h-full">
      <div className="flex flex-row justify-between mb-4">
        <div className="text-4xl font-bold">
          รายชื่อผู้ดูแล ({renderedTotalUsers})
        </div>
        <div>
          <Button color="white" onClick={handleAddModalPresent}>
            เพิ่มผู้ดูแล
          </Button>
        </div>
      </div>
      <div className="flex flex-row flex-wrap items-start space-y-4">
        {/* Draft Component Outline */}
        {renderedUsers && renderedUsers.length > 0 ? (
          renderedUsers.map((user) => {
            return (
              <div
                className="flex flex-col justify-start items-center p-12 m-2 w-full h-96 bg-pink-50 rounded-lg shadow-lg sm:w-full md:w-64"
                key={user.id}
              >
                <div className="mb-6">
                  <img
                    className="object-cover object-center w-36 h-36 rounded-full"
                    src={user.picture}
                    alt={user.name}
                  />
                </div>
                <div className="text-center">
                  <div className="w-full text-xl font-bold text-black break-normal">
                    {user.name}
                  </div>
                  <div className="w-full text-base font-normal text-gray-800">
                    {user.email}
                  </div>
                  <div className="mb-3 w-full text-base font-normal text-red-500">
                    {user.role}
                  </div>
                  <Button
                    size="md"
                    color="red"
                    type="button"
                    border={false}
                    onClick={() => {
                      setDeleteId(user.id);
                    }}
                  >
                    ลบผู้ดูแล
                  </Button>
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
        usersHandler={{ setUsers, setTotalAdmin }}
        fetchHandler={{ didFetchUsers, setDidFetchUsers }}
      />
    </div>
  );
};

export default ListUser;
