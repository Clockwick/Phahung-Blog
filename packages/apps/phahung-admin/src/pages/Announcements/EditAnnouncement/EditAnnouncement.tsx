/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Input } from '@chan-chala/uikit';
import React, { useEffect, useState } from 'react';
import mockAnnouncement from 'mock/announcements';
import { useParams, useHistory } from 'react-router-dom';
import announcementApiCall from 'api/Announcement/announcement';
import { useToast } from '@chakra-ui/react';
import { ToastTrigger } from 'components/Toasts';
import { IEditAnnouncementPayload } from './types';
// import announcementApiCall from 'api/Announcement/announcement';

interface Params {
  announcementId: string;
}
const EditAnnouncement: React.FC = () => {
  const history = useHistory();
  const toast = useToast();

  const { announcementId } = useParams<Params>();

  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  useEffect(() => {
    announcementApiCall.getAnnouncementById(announcementId).then((res) => {
      console.log('res', res);
      const initialDataAnnouncement: IEditAnnouncementPayload =
        res.data as IEditAnnouncementPayload;
      console.log(initialDataAnnouncement.title);
      setTitle(initialDataAnnouncement.title);
      setDescription(initialDataAnnouncement?.description);
    });
  }, [announcementId]);
  const handleOnClick = () => {
    const payload: IEditAnnouncementPayload = {
      title,
      description,
    };
    announcementApiCall.editAnnouncement(payload, announcementId).then(() => {
      history.push('/announcements');
      toast(
        ToastTrigger.editAnnouncementSuccess(
          `แก้ไขประกาศชื่อ "${title}" สำเร็จ`,
        ),
      );
    });
  };
  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center items-center">
          <span className="mt-8 mb-4 text-4xl font-bold">แก้ไขประกาศ</span>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex flex-wrap justify-center items-center my-4 space-x-4 w-full ">
            <div className="font-bold min-w-[70px] h-6">ชื่อประกาศ : </div>
            <Input
              placeholder="ใส่ชื่อหัวข้อประกาศ..."
              size="md"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </div>
          <div className="flex justify-center  my-4 space-x-4 w-full ">
            <div className="flex w-1/2 space-x-4 ">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label inline-block mb-2 text-gray-700  whitespace-nowrap font-bold"
              >
                รายละเอียด :
              </label>
              <textarea
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none "
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder="ใส่รายละเอียดประกาศ..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
          </div>
          <div className="flex justify-end  items-center  mt-8 mb-4 space-x-4 w-1/2 text-4xl font-bold ">
            <Button
              size="lg"
              color="blue"
              type="button"
              border={false}
              // onClick={() => onClick('publish')}
              onClick={() => {
                handleOnClick();
              }}
            >
              โพสประกาศ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditAnnouncement;
