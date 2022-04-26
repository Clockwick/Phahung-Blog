/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { IconButton } from '@mui/material';
import Menu from 'components/Menu';
import { useUser } from 'store/hooks/userHook';
import HelpButton from 'components/Button/HelpButton';
import Rename from './Rename';
import RenameGuide from './guide';
import mockProfile from '../../../public/images/Avatar.png';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import UserApiCall from '../../api/User/user';
import { someResponse, isSomeResponse } from './types';
import { useToast } from '@chakra-ui/react';
import { ToastTrigger } from 'components/Toasts';

const Setting: React.FC = () => {
  const toast = useToast();
  const { user, fetchSessionHandler } = useUser();
  const [userImage, setUserImage] = useState<string>('');
  const [didSetImage, setDidSetImage] = useState<boolean>(false);

  console.log('user', user);

  useEffect(() => {
    if (user && user?.picture) setUserImage(user?.picture);
    else setUserImage(mockProfile);

    setDidSetImage(true);
  }, [didSetImage]);

  const uploadImg = (event: any) => {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append('File', event.target.files[0]);

      UserApiCall.uploadImage(formData).then(async (res) => {
        if (res.status === 200) {
          const responseData = res.data as { url: string } | someResponse;
          if (isSomeResponse(responseData)) {
            console.log(responseData);
            toast(ToastTrigger.uploadImageFail());
          } else {
            await fetchSessionHandler();
            const urlImage: string = responseData.url;
            setUserImage(urlImage);
            toast(ToastTrigger.uploadImageSuccess());
          }
        } else {
          console.error('res', res);
          toast(ToastTrigger.uploadImageFail());
        }
      });
    }
  };

  return (
    <Menu>
      <div className="w-full h-full">
        <div className="flex justify-center mt-8 mb-4 w-full text-4xl font-bold">
          โปรไฟล์
        </div>
        <div className="flex w-full h-full">
          {user ? (
            <div className="flex flex-col w-full h-full">
              <div className="flex flex-col justify-center items-center">
                <img
                  referrerPolicy="no-referrer"
                  src={userImage}
                  alt="user.profile"
                  className="w-48 h-48 rounded-full border-2 border-white border-solid  md:w-60 md:h-60"
                />

                <IconButton
                  size="large"
                  component="label"
                  sx={{
                    margin: '1% 1% 0% 1%',
                    width: '5%',
                    height: '5%',
                    backgroundColor: 'white',
                    boxShadow: '3px 3px 5px #AAAAAA',
                    '&:hover': {
                      backgroundColor: '#f5f5f5',
                    },
                  }}
                >
                  <AddPhotoAlternateIcon
                    fontSize="large"
                    sx={{ color: '#ff8a00', '&:hover': { opacity: 0.8 } }}
                  />
                  <input
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                    style={{ display: 'none' }}
                    hidden
                    onChange={(e) => uploadImg(e)}
                  />
                </IconButton>
              </div>
              <div className="my-8 text-center md:text-xl text-m">
                <div className="flex flex-row justify-center items-baseline">
                  <p className="font-bold">Admin Name : </p>
                  <Rename user={user} />
                </div>
                <div className="flex justify-center ml-9">
                  <p className="font-bold mx-2 ml-3">Email : </p>
                  <p className="ml-1">{user.email}</p>
                </div>
              </div>
            </div>
          ) : (
            <span>Loading...</span>
          )}
        </div>
      </div>
    </Menu>
  );
};

export default Setting;
