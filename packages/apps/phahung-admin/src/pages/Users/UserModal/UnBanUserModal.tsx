/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Modal } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';

import { ToastTrigger } from 'components/Toasts';
import { userApiCall } from '../../../api';

type Props = {
  unBanHandler: {
    unBanId: string;
    setDidFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleDismiss?: () => void | undefined;
};

const defaultProps = {
  handleDismiss: undefined,
};

const UnBanUserModal: React.FC<Props> = ({
  unBanHandler,
  handleDismiss = () => undefined,
}) => {
  const toast = useToast();

  const handleUnBan = async (): Promise<void> => {
    userApiCall
      .unBanUser(unBanHandler.unBanId)
      .then((res) => {
        toast(ToastTrigger.unBanUserSuccess());
        unBanHandler.setDidFetchUsers(false);
        handleDismiss();
      })
      .catch((err) => {
        const errMsg = err.message;
        toast(ToastTrigger.deleteUserFailed(`${errMsg}`));
      });
  };

  return (
    <Modal
      title="คุณต้องการที่จะยกเลิกแบนผู้ใช้จริงๆหรือไม่?"
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
          onClick={handleUnBan}
        >
          ฉันต้องการยกเลิกแบนผู้ใช้
        </Button>
      </div>
    </Modal>
  );
};

UnBanUserModal.defaultProps = defaultProps;

export default UnBanUserModal;
