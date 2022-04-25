/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Modal } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';

import { ToastTrigger } from 'components/Toasts';
import { userApiCall } from '../../../api';

type Props = {
  banHandler: {
    banId: string;
    setDidFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleDismiss?: () => void | undefined;
};

const defaultProps = {
  handleDismiss: undefined,
};

const BanUserModal: React.FC<Props> = ({
  banHandler,
  handleDismiss = () => undefined,
}) => {
  const toast = useToast();

  const handleBan = async (): Promise<void> => {
    userApiCall
      .banUser(banHandler.banId)
      .then((res) => {
        toast(ToastTrigger.banUserSuccess());
        banHandler.setDidFetchUsers(false);
        handleDismiss();
      })
      .catch((err) => {
        const errMsg = err.message;
        toast(ToastTrigger.deleteUserFailed(`${errMsg}`));
      });
  };

  return (
    <Modal
      title="คุณต้องการที่จะแบนผู้ใช้จริงหรือไม่?"
      handleDismiss={handleDismiss}
    >
      <div className="flex justify-between items-center p-4 ">
        <Button
          size="md"
          color="gray"
          type="button"
          border={false}
          onClick={handleDismiss}
        >
          ยกเลิก
        </Button>
        <Button
          size="md"
          color="red"
          type="button"
          border={false}
          onClick={handleBan}
        >
          ฉันต้องการที่จะแบนผู้ใช้
        </Button>
      </div>
    </Modal>
  );
};

BanUserModal.defaultProps = defaultProps;

export default BanUserModal;
