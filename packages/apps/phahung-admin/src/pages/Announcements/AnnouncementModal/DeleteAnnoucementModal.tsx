import React from 'react';
import { Button, Modal } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';
import { ToastTrigger } from 'components/Toasts';
import { blogApiCall } from '../../../api';
import { IDeleteBlogResponse } from './types';

type Props = {
  announcementHandler: {
    deleteBlogId: string;
    setIsFetchingDocs: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleDismiss?: () => void;
};

const defaultProps = {
  handleDismiss: undefined,
};

const DeleteBlogModal: React.FC<Props> = ({
  announcementHandler,
  handleDismiss = () => undefined,
}) => {
  const toast = useToast();
  const handleDelete = async (): Promise<void> => {
    if (announcementHandler.deleteBlogId.length > 0) {
      blogApiCall
        .deleteBlog(announcementHandler.deleteBlogId)
        .then((res) => {
          const responseData = res.data as IDeleteBlogResponse;
          if (responseData.success === 1) {
            announcementHandler.setIsFetchingDocs(false);
            toast(ToastTrigger.deleteBlogSuccess());
            handleDismiss();
          }
        })
        .catch(() => toast(ToastTrigger.deleteBlogFail()));
    }
  };

  return (
    <Modal
      title="คุณต้องการที่จะลบบทความนี้จริงๆหรือไม่?"
      handleDismiss={handleDismiss}
    >
      <div className="flex justify-center items-center space-x-10">
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
          ลบบทความนี้
        </Button>
      </div>
    </Modal>
  );
};

DeleteBlogModal.defaultProps = defaultProps;

export default DeleteBlogModal;
