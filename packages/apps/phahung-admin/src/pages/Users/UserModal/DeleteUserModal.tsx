/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Modal } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';

import { ToastTrigger } from 'components/Toasts';
import { userApiCall } from '../../../api';

type Props = {
  deleteHandler: {
    deleteId: string;
    setDidFetchUsers: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleDismiss?: () => void | undefined;
};

const defaultProps = {
  handleDismiss: undefined,
};

const DeleteUserModal: React.FC<Props> = ({
  deleteHandler,
  handleDismiss = () => undefined,
}) => {
  const toast = useToast();

  const handleDelete = async (): Promise<void> => {
    userApiCall
      .delete(deleteHandler.deleteId)
      .then((res) => {
        if (res.status === 200) {
          toast(ToastTrigger.deleteUserSuccess());
          deleteHandler.setDidFetchUsers(false);
          handleDismiss();
        } else {
          toast(ToastTrigger.deleteUserFailed(`${res.statusText}`));
        }
      })
      .catch((err) => {
        const errMsg = err.message;
        toast(ToastTrigger.deleteUserFailed(`${errMsg}`));
      });
  };

  return (
    <Modal
      title="คุณต้องการที่จะลบผู้ใช้จริงๆหรือไม่?"
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
          onClick={handleDelete}
        >
          ฉันต้องการที่จะลบผู้ใช้
        </Button>
      </div>
    </Modal>
  );
};

DeleteUserModal.defaultProps = defaultProps;

export default DeleteUserModal;
