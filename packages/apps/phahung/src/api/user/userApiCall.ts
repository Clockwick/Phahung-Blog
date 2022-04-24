import api from '../../utils/api';
import type { IUserApiCall } from './types';
import { useUser } from '../../store/hooks/userHook';
// const TOKEN =
//   'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGhhaHVuZy1kYiIsImF1ZCI6InBoYWh1bmctZGIiLCJhdXRoX3RpbWUiOjE2NTA3ODQ4OTcsInVzZXJfaWQiOiJoaHRwenpXcnhvT05zTHFGMnZ1c3RYTENLbEIzIiwic3ViIjoiaGh0cHp6V3J4b09Oc0xxRjJ2dXN0WExDS2xCMyIsImlhdCI6MTY1MDc4NDg5NywiZXhwIjoxNjUwNzg4NDk3LCJlbWFpbCI6ImRlYXJAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImRlYXJAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cm-JhtQ9pLwCob-L2pP_F0j_JZslzDIrdSWMX47rBukJCM8AuQvwV0ZVqP8v1xo7U969vxrjVrtxbwbDJAdB27yN0cV9KDGHFUPIxLZpUAebkci6-SDRhmQ-5v7fvM1NCNzIZETCv5b2DU7Qs4o30qqbWAjasruxEPhRRlC73H4VH4BiDhZ8Cwu6vBhY0Y0X5_8rA6WuxvzvbQs2a6fTcK2UvRqx2a_fgpnFbX29on63ac5URTlcZ1Uiizok2B4dxqdSdhkQZvECUOMjlT8j6XPeIvmddSJZyU4KZDJNN4bzwPwnVZHBmKxqo4thxnSKGMXDy7eXh0MEruEZcflI1w';

const UserApiCall: IUserApiCall = {
  getLikedBlogs: () =>
    api({
      method: 'get',
      url: `/likedblogs`,
      headers: {
        // authorization: `Bearer ${TOKEN}`,
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
    }),

  uploadImage: (imageFile) =>
    api({
      method: 'put',
      url: `/users/update-image`,
      headers: {
        ContentType: 'multipart/form-data',
        // authorization: `Bearer ${TOKEN}`,
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
      data: imageFile,
    }),

  getSession: () =>
    api({
      method: 'get',
      url: `/get-session`,
      headers: {
        // authorization: `Bearer ${TOKEN}`,
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
    }),
  updateUser: (payload) =>
    api({
      method: 'put',
      url: `/user/update`,
      headers: {
        // authorization: `Bearer ${TOKEN}`,
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      withCredentials: true,
      data: payload,
    }),
};

export default UserApiCall;
