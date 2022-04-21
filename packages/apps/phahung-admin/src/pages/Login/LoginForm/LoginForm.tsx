import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { Button, Input } from '@chan-chala/uikit';

import { useUser } from 'store/hooks/userHook';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import api from 'utils/api';
import { AxiosResponse } from 'axios';

interface MyFormValues {
  email: string;
  password: string;
}

const LoginCallback: React.FC = () => {
  const history = useHistory();

  const { isLoggedIn, fetchSessionHandler } = useUser();
  const initialValues: MyFormValues = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
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
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                const { email, password } = values;
                api({
                  method: 'POST',
                  url: '/signin',
                  data: {
                    email,
                    password,
                  },
                })
                  .then((res) => {
                    if (res.status === 200) {
                      localStorage.setItem('idToken', res.data as string);
                      fetchSessionHandler();
                    }
                  })
                  .catch((err: AxiosResponse<MyFormValues>) => {
                    actions.setSubmitting(false);
                    actions.setErrors(err.data);
                  });
              }}
            >
              {(props: FormikProps<MyFormValues>) => {
                const { email, password } = props.values;
                const { setValues } = props;
                return (
                  <Form className="flex flex-col justify-center items-center space-y-4">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <div>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        อีเมล
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="อีเมล"
                        onChange={(e) =>
                          setValues({
                            ...props.values,
                            email: e.target.value,
                          })
                        }
                        value={email}
                      />
                    </div>

                    <div>
                      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        รหัสผ่าน
                      </label>
                      <Input
                        id="password"
                        name="password"
                        placeholder="รหัสผ่าน"
                        value={password}
                        onChange={(e) =>
                          setValues({
                            ...props.values,
                            password: e.target.value,
                          })
                        }
                        type="password"
                      />
                    </div>
                    <Button size="lg" color="white" type="submit">
                      เข้าสู่ระบบ
                    </Button>
                  </Form>
                );
              }}
            </Formik>
            <Link
              to="/register"
              className="text-gray-700 text-sm font-bold hover:underline hover:cursor-pointer"
            >
              สมัครสมาชิก
            </Link>
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
