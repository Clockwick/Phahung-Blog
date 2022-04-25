/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Input, Button } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';
import { ToastTrigger } from 'components/Toasts';
import { useUser } from 'store/hooks/userHook';
import { User } from 'store/types';
import userApiCall from '../../api/User/user';

interface UserProps {
  user: User;
}

const Rename: React.FC<UserProps> = ({ user }) => {
  const toast = useToast();
  const { fetchSessionHandler } = useUser();
  const [state, setState] = useState(false);
  const [name, setName] = useState(`${user.firstName}  ${user.lastName}`);

  const handleRename = (): void => {
    const newName = name
      .trim()
      .split(' ')
      .filter((el) => el !== '');

    const payload: User = {
      ...user,
      firstName: newName[0],
      lastName: newName[1],
    };

    if (newName[0].length > 3 && newName[1].length > 3) {
      userApiCall
        .updateUser(payload)
        .then((res) => {
          setState(false);

          if (res.status === 200) {
            toast(
              ToastTrigger.renameSuccess(
                `เปลี่ยนชื่อผู้ใช้เป็น ${name} สำเร็จ!`,
              ),
            );
            fetchSessionHandler();
          } else {
            toast(
              ToastTrigger.renameFailed(
                `เปลี่ยนชื่อผู้ใช้ไม่สำเร็จ :\n${res.statusText}`,
              ),
            );
          }
        })
        .catch((error) => {
          const errorMsg = error.message;
          toast(
            ToastTrigger.renameFailed(
              `เปลี่ยนชื่อผู้ใช้ไม่สำเร็จ :\n${errorMsg}`,
            ),
          );
        });
    } else {
      toast(ToastTrigger.renameLength());
    }
  };

  return state ? (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRename();
      }}
    >
      <Input
        name="name"
        className="m-1 text-center"
        value={name}
        onChange={(event: any) => {
          setName(event.target.value);
        }}
      />
    </form>
  ) : (
    <div className="flex flex-row mx-2 w-100">
      <Button
        size="lg"
        color="white"
        border={false}
        onClick={() => {
          setState(true);
        }}
      >
        <div className="flex flex-row justify-around  ">
          <div className="pr-3">{name}</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6  "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
      </Button>
    </div>
  );
};

export default Rename;
