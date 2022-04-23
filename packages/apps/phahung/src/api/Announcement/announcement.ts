/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

import type { IAnnouncementAPICall } from './types';

const announcementApiCall: IAnnouncementAPICall = {
  getAnnouncements: () => {
    localStorage.setItem(
      'idToken',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGhhaHVuZy1kYiIsImF1ZCI6InBoYWh1bmctZGIiLCJhdXRoX3RpbWUiOjE2NTA2OTk1OTYsInVzZXJfaWQiOiJZeHl3RGF1bVRBT2NBZ0JxMmZVYlBmTW1WZzIzIiwic3ViIjoiWXh5d0RhdW1UQU9jQWdCcTJmVWJQZk1tVmcyMyIsImlhdCI6MTY1MDY5OTU5NiwiZXhwIjoxNjUwNzAzMTk2LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.O0k8KwVnzDSOJbv0y7jSu3N_KWeyBCjNS9Si_2Kb3Z7mCWuuqhO1kb8Hc8YkPnK6OKBHWgDgJdKqHWIOhbRYhzNDL1EA_Qnrk-pJmhniBxbK7IX9AZqthcT8FfZJYUvghixUbjcFZPsNnOhr2S1b8dKMXujYy3o0WwkyCsdb2OrNuSAJuCmY59Oo8gtVRIwq8TG39UTYLqq0MWnuoRCj4mnLQlDLY0cDpRYfWZ_kpHnJE1jUCxUG3uozsel1Z8PK1HyoveViNC3cZ9nljEmXs2FKBqQJh2Mi6xAH6QSnR2Uj-jUhniFNRatZfDH4JMhYvBsZlARKyBGy09W69AVDvg',
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
