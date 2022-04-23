/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import api from '../../utils/api';

import type { IAnnouncementAPICall } from './types';

const announcementApiCall: IAnnouncementAPICall = {
  getAnnouncements: () => {
    localStorage.setItem(
      'idToken',
      'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM2NzNkM2M5NDdhZWIxOGI2NGU1OGUzZWRlMzI1NWZiZjU3NTI4NWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGhhaHVuZy1kYiIsImF1ZCI6InBoYWh1bmctZGIiLCJhdXRoX3RpbWUiOjE2NTA2OTU0OTYsInVzZXJfaWQiOiIwRjl0bTlJVk0zUGJXanNCYmtYNldsdkJ4WmcyIiwic3ViIjoiMEY5dG05SVZNM1BiV2pzQmJrWDZXbHZCeFpnMiIsImlhdCI6MTY1MDY5NTQ5NiwiZXhwIjoxNjUwNjk5MDk2LCJlbWFpbCI6ImpvaG5AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImpvaG5AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.JU9ltRydvAJt-m7fWfuNJjbnJJRO6XDR0HASUtRvE4HXM_mHNSxxC7amUNfk5CM5egUKfe0EDI4-COlIGRRobrLmDPvu0uhTr6BAgUttTVdR49nTAxSIGlX5D7NfHJ5_GH4TSLUBFUlb7BZvEWtmWyrEhyYpn7wnoPTHu3lN18Tl-D2Fe7gH3gKm7QiZOZXqruDzwVTMBGikyR3sh7mt41KSAGsYKYICah2hN4QBZUi0MzNwLWNaatY0ifN_TzY7YSgkiUHImMNOBM4eQr4ljVTViYw7TWq4d-vFIhfIBxNBBP0tVr2IckZ6_l1lXFSsESoDwYOAdi0_jbfuI8oeYQ',
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
