/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

import type { IAnnouncementAPICall } from './types';

const announcementApiCall: IAnnouncementAPICall = {
  getAnnouncements: () => {
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
