import { AxiosResponse } from 'axios';

export interface IAnnouncementAPICall {
  getAnnouncements: () => Promise<AxiosResponse>;
}
