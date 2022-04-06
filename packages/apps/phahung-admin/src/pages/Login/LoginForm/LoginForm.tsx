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

  const loginWithGoogle = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (res) => {
      const idToken = await res.user.getIdToken();
      localStorage.setItem('idToken', idToken);
      fetchSessionHandler();
    });
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/blogs');
    }
  }, [isLoggedIn, history]);

  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="hidden w-7/12 h-full bg-green-400 xl:flex" />
      <div className="flex justify-center items-center w-full h-full bg-white xl:w-5/12">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-center items-center mb-12">
            <img
              className="w-36 h-36"
              alt="chan-chara-logo"
              src="/images/chan-chara-logo-green.png"
            />
          </div>
          <div className="flex flex-col justify-center items-center space-y-4">
            <p>เข้าสู่ระบบโดย</p>
            <Button
              size="lg"
              color="white"
              type="button"
              onClick={() => loginWithGoogle()}
            >
              <div className="flex justify-center items-center space-x-2">
                <Google className="w-8" />
                <p>Google</p>
              </div>
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
