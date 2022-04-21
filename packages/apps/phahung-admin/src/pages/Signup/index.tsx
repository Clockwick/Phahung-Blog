import React from 'react';
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from 'formik';
import { Button, Input } from '@chan-chala/uikit';
import api from 'utils/api';
import { AxiosResponse } from 'axios';
import { Link, useHistory } from 'react-router-dom';

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const { push } = useHistory();
  const initialValues: MyFormValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  return (
    <div>
      <div className="flex justify-center items-center w-full h-screen">
        <div className="hidden w-7/12 h-full bg-yellow-600 xl:flex" />
        <div className="flex justify-center items-center w-full h-full bg-white xl:w-5/12">
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center mb-12">
              <img className="w-36" alt="phahung-logo" src="/images/logo.png" />
            </div>
            <div className="flex flex-col justify-center">
              <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                  const { confirmPassword, ...otherValue } = values;
                  const data = {
                    ...otherValue,
                    role: 0,
                  };

                  api({
                    method: 'POST',
                    url: '/signup',
                    data,
                  })
                    .then((res) => {
                      if (res.status === 200) {
                        push('/login');
                      }
                    })
                    .catch((err: AxiosResponse<MyFormValues>) => {
                      actions.setSubmitting(false);
                      actions.setErrors(err.data);
                    });
                }}
                validate={(values: MyFormValues) => {
                  const errors: Partial<MyFormValues> = {};
                  if (!values.firstName) {
                    errors.firstName = 'Required';
                  }
                  if (!values.lastName) {
                    errors.lastName = 'Required';
                  }
                  if (!values.email) {
                    errors.email = 'Required';
                  }
                  if (!values.password) {
                    errors.password = 'Required';
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = 'Required';
                  }
                  if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = 'Password does not match';
                  }
                  return errors;
                }}
              >
                {(props: FormikProps<MyFormValues>) => {
                  const {
                    firstName,
                    lastName,
                    email,
                    confirmPassword,
                    password,
                  } = props.values;
                  const { setValues, errors } = props;
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
                        {errors.email && (
                          <div className="text-red-500 text-xs italic">
                            {errors.email}
                          </div>
                        )}
                      </div>

                      <div>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          ชื่อจริง
                        </label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="ชื่อจริง"
                          value={firstName}
                          onChange={(e) =>
                            setValues({
                              ...props.values,
                              firstName: e.target.value,
                            })
                          }
                        />
                        {errors.firstName && (
                          <div className="text-red-500 text-xs italic">
                            {errors.firstName}
                          </div>
                        )}
                      </div>
                      <div>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          นามสกุล
                        </label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="นามสกุล"
                          value={lastName}
                          onChange={(e) =>
                            setValues({
                              ...props.values,
                              lastName: e.target.value,
                            })
                          }
                        />
                        {errors.lastName && (
                          <div className="text-red-500 text-xs italic">
                            {errors.lastName}
                          </div>
                        )}
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
                        {errors.password && (
                          <div className="text-red-500 text-xs italic">
                            {errors.password}
                          </div>
                        )}
                      </div>
                      <div>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          รหัสผ่าน
                        </label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="ยืนยันรหัสผ่าน"
                          value={confirmPassword}
                          onChange={(e) =>
                            setValues({
                              ...props.values,
                              confirmPassword: e.target.value,
                            })
                          }
                          type="password"
                        />
                        {errors.confirmPassword && (
                          <div className="text-red-500 text-xs italic">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>

                      <Button type="submit">ลงทะเบียน</Button>
                      <Link
                        to="/login"
                        className="text-gray-700 text-sm font-bold hover:underline hover:cursor-pointer"
                      >
                        เข้าสู่ระบบ
                      </Link>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
