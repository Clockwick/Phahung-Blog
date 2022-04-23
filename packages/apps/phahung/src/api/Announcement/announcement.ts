/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

import type { IAnnouncementAPICall } from './types';

const announcementApiCall: IAnnouncementAPICall = {
  getAnnouncements: () => {
    localStorage.setItem(
      'idToken',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGhhaHVuZy1kYiIsImF1ZCI6InBoYWh1bmctZGIiLCJhdXRoX3RpbWUiOjE2NTA3MzU4MDgsInVzZXJfaWQiOiJZeHl3RGF1bVRBT2NBZ0JxMmZVYlBmTW1WZzIzIiwic3ViIjoiWXh5d0RhdW1UQU9jQWdCcTJmVWJQZk1tVmcyMyIsImlhdCI6MTY1MDczNTgwOCwiZXhwIjoxNjUwNzM5NDA4LCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJhZG1pbkBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.G7qE8CGCDiBMZeJpGcz9MDiwKHLCLy6RXkLRvC-t7TuRUi468_P6lIOQ0Rnx6Gg7s1aLJF8Q5azMkm7IJCF4nyU4lNn-qW38QPMV4anBAJBFUD9FQ6y4qXWE1_gytDsWxjgbS0XjIIIHY2-tC78oV5IlyBhF6W5RMAB5jdGnGiU656XsRACL2Zms75hY8WuEZFOtWdUEqew3AkoKGmUKs86KAs9N3fTugOlSsgSHkXGeN41f2tg1c5KoZMAPfareqqozMUyS1GgCkMBmA4v4MBB_xa5XUe6wrGhrqWPBnWmpdAbrpxeFUEa_KnRAQK0WOlGfCGo9e-5rlbZxOlrffw',
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
