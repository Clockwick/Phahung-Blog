import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from 'config/firebase';

import { Button } from '@chan-chala/uikit';
import { Google } from 'icons/.';

import { useUser } from 'store/hooks/userHook';

const LoginCallback: React.FC = () => {
  const history = useHistory();

  const { isLoggedIn, fetchSessionHandler } = useUser();

  // const openAuthWindow = (url: string, width: number, height: number): void => {
  //   const top = (window.screen.height - height) / 4;
  //   const left = (window.screen.width - width) / 2;

  //   const oauthWindow = window.open(
  //     url,
  //     '_blank',
  //     `location=0,status=0,width=${width},height=${height},top=${top},left=${left}`,
  //   );

  //   if (oauthWindow) {
  //     const oauthInterval = window.setInterval(() => {
  //       if (oauthWindow.closed) {
  //         fetchSessionHandler();
  //         window.clearInterval(oauthInterval);
  //       }
  //     }, 1000);
  //   }
  // };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/blogs');
    }
  }, [isLoggedIn, history]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="hidden w-7/12 h-full bg-yellow-600 xl:flex" />
      <div className="flex justify-center items-center w-full h-full bg-white xl:w-5/12">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center mb-12">
            <img
              className="w-36"
              alt="chan-chara-logo"
              src="/images/logo.png"
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <Button
              size="lg"
              color="white"
              type="button"
              onClick={fetchSessionHandler}
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginCallback;

/**
 * 
 * openAuthWindow(
                  `${import.meta.env.VITE_API_URL}/auth/google/login${
                    import.meta.env.VITE_NODE_ENV === 'development'
                      ? '?redirect=http://localhost:3000'
                      : ''
                  }`,
                  800,
                  800,
                );
 */
