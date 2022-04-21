/* eslint-disable import/no-unresolved */
import React from 'react';
import { Button, Modal } from '@chan-chala/uikit';
import { useToast } from '@chakra-ui/react';
import { ToastTrigger } from 'components/Toasts';
import announcementApiCall from 'api/Announcement/announcement';
import { IDeleteAnnouncementResponse } from './types';

type Props = {
  announcementHandler: {
    deleteAnnouncementId: string;
    setIsFetchingDocs: React.Dispatch<React.SetStateAction<boolean>>;
  };
  handleDismiss?: () => void;
};

const defaultProps = {
  handleDismiss: undefined,
};

const DeleteAnnouncementModal: React.FC<Props> = ({
  announcementHandler,
  handleDismiss = () => undefined,
}) => {
  const toast = useToast();
  const handleDelete = async (): Promise<void> => {
    if (announcementHandler.deleteAnnouncementId.length > 0) {
      announcementApiCall
        .deleteAnnouncement(announcementHandler.deleteAnnouncementId)
        .then((res) => {
          // const responseData = res.data as IDeleteAnnouncementResponse;
          // if (responseData.success === 1) {
          announcementHandler.setIsFetchingDocs(false);
          toast(ToastTrigger.deleteAnnouncementSuccess());
          handleDismiss();
          // }
        })
        .catch(() => toast(ToastTrigger.deleteAnnouncementFail()));
    }
  };

  return (
    <Modal
      title="คุณต้องการที่จะลบประกาศนี้จริงๆหรือไม่?"
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
          ลบประกาศนี้
        </Button>
      </div>
    </Modal>
  );
};

DeleteAnnouncementModal.defaultProps = defaultProps;

export default DeleteAnnouncementModal;
