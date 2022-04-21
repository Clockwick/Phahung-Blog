/* eslint-disable import/no-unresolved */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button, Input } from '@chan-chala/uikit';
import announcementApiCall from 'api/Announcement/announcement';
import React, { useState } from 'react';
import { ToastTrigger } from 'components/Toasts';
import { useToast } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { INewAnnouncementPayload } from './types';

const NewAnnouncement: React.FC = () => {
  const history = useHistory();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const toast = useToast();
  const payload: INewAnnouncementPayload = {
    title,
    description,
  };
  const handleOnClick = () => {
    announcementApiCall.createNewAnnouncement(payload).then((res) => {
      toast(
        ToastTrigger.createAnnouncementSuccess(
          `ประกาศชื่อ "${title}" ได้ถูกสร้างขึ้น`,
        ),
      );
      history.push('/announcements');
    });
  };

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-center items-center">
          <span className="mt-8 mb-4 text-4xl font-bold">สร้างประกาศ</span>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <div className="flex flex-wrap justify-center items-center my-4 space-x-4 w-full ">
            <div className="font-bold min-w-[70px] h-6">
              ชื่อประกาศ (จำเป็น*) :{' '}
            </div>
            <Input
              placeholder="ใส่ชื่อหัวข้อประกาศ..."
              size="md"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end  items-center  mt-8 mb-4 space-x-4 w-1/2 text-4xl font-bold ">
            <Button
              size="lg"
              color="blue"
              type="button"
              border={false}
              onClick={() => handleOnClick()}
            >
              โพสประกาศ
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewAnnouncement;
