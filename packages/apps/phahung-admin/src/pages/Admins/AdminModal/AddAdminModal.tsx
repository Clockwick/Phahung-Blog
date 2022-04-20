/* eslint-disable import/extensions */
import { Button, Modal, Input } from '@chan-chala/uikit';
import React, { useState } from 'react';
import { useToast } from '@chakra-ui/react';

import { ToastTrigger } from 'components/Toasts';
import { EmailPayload } from './types';
import { userApiCall } from '../../../api';

type Props = {
  setDidFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  handleDismiss?: () => void | undefined;
};

const defaultProps = {
  handleDismiss: undefined,
};

const AddUserModal: React.FC<Props> = ({
  setDidFetchUsers,
  handleDismiss = () => undefined,
}) => {
  /* eslint-disable */
  const toast = useToast();
  const [email, setEmail] = useState('' as string);
  const [errorMsg, setErrorMsg] = useState(
    'กรุณากรอกอีเมลให้ถูกรูปแบบ' as string,
  );
  const [isError, setIsError] = useState(false as boolean);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleCreateAdmin = async (
    e: React.MouseEvent<HTMLElement>,
  ): Promise<void> => {
    e.preventDefault();
    if (validateEmail(email)) {
      setIsError(false);
      const payload: EmailPayload = {
        email,
      };
      const response = await userApiCall.createAdmin(payload);
      if (response.status === 201) {
        toast(
          ToastTrigger.addUserSuccess(`เพิ่มผู้ใช้ ${email} เข้าสู่ระบบแล้ว`),
        );
        setDidFetchUsers(false);
      } else {
        toast(ToastTrigger.addUserFailed(`${response.statusText}`));
      }
      handleDismiss();
      return;
    }
    toast(
      ToastTrigger.addUserFailed(`เกิดข้อผิดพลาด, กรุณาตรวจสอบอีเมลอีกครั้ง`),
    );
    setIsError(true);
  };

  const validateEmail = (email: string): boolean => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  return (
    <Modal title="กรุณากรอกอีเมลของผู้ดูแล" handleDismiss={handleDismiss}>
      <div className="flex flex-col justify-center items-center space-y-6">
        <Input
          placeholder="อีเมล..."
          size="lg"
          onChange={handleOnChange}
          autoFocus
        />
        {isError ? <div className="text-red-600">{errorMsg}</div> : null}
        <Button
          size="md"
          color="green"
          type="button"
          border={false}
          onClick={handleCreateAdmin}
        >
          เพิ่มผู้ดูแล
        </Button>
      </div>
    </Modal>
  );
};

AddUserModal.defaultProps = defaultProps;

export default AddUserModal;
