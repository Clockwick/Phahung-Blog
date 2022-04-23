/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

import type { IAnnouncementAPICall } from './types';

const announcementApiCall: IAnnouncementAPICall = {
  getAnnouncements: () => {
    localStorage.setItem(
      'idToken',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGhhaHVuZy1kYiIsImF1ZCI6InBoYWh1bmctZGIiLCJhdXRoX3RpbWUiOjE2NTA3MTAwODYsInVzZXJfaWQiOiJZeHl3RGF1bVRBT2NBZ0JxMmZVYlBmTW1WZzIzIiwic3ViIjoiWXh5d0RhdW1UQU9jQWdCcTJmVWJQZk1tVmcyMyIsImlhdCI6MTY1MDcxMDA4NiwiZXhwIjoxNjUwNzEzNjg2LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.MwDc5gziPJrmpDWneiBTIWsgwDr-hgOZizUhnHa7nSGbQpyy3zlY1Il8-6DBTJ5s_i_nmz2s5h5iep8DH9WLjZisQB1SZjFFjh-dBeyxNf3NLbLnn7dQ46xA9icClgL_R3hxoEay7uLL1gEkufn8Bu4tUZIJl94j7KdFmGnWtHy_4E7ybuqpFmUSFmGjFALoYgx1zNJDPOpcqF1OnJdp5AA4skOj1cquw3_4UyaJzu42webeHc1OOceWvmFERFBEBPkrg3_Ylw0MbbAWiKyg9ez_JKdCoBNwv31ldlkb30StXpvoilsJ5trhZX0PjfWtqEmWBHkhahvNPmL-wM9J0g',
    );
    return api({
      method: 'get',
      url: `/announcement/all`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },
};

export default announcementApiCall;
