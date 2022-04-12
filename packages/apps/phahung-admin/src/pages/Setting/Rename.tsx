/* eslint-disable no-console */
import React, { useState } from 'react';
import { Input, Button } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';
import { ToastTrigger } from 'components/Toasts';
import axios from 'axios';
import { useUser } from 'store/hooks/userHook';
import { INamePayload } from './types';
import { User } from 'store/types';

interface UserProps {
  user: User;
}

const Rename: React.FC<UserProps> = ({ user }) => {
  const toast = useToast();
  const { fetchSessionHandler } = useUser();
  const [state, setState] = useState(false);
  const [name, setName] = useState(`${user.firstName}  ${user.lastName}`);

  const handleRename = (): void => {
    axios.defaults.withCredentials = true;
    const payload: INamePayload = {
      name,
    };
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('idToken')}`,
    };
    if (name.length > 5) {
      axios
        .put(`${import.meta.env.VITE_API_URL}/auth/admin/update`, payload, {
          headers,
        })
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
        onChange={(event) => {
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
        <div className="flex flex-row justify-around">
          {name}
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
              strokeWidth="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </div>
      </Button>
    </div>
  );
};

export default Rename;
