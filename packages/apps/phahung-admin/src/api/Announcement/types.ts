import { AxiosResponse } from 'axios';
import { IEditAnnouncementPayload } from 'pages/Announcements/EditAnnouncement/types';
import { INewAnnouncementPayload } from '../../pages/Announcements/NewAnnouncement/types';

export interface IAnnouncementAPICall {
  createNewAnnouncement: (
    payload: INewAnnouncementPayload,
  ) => Promise<AxiosResponse>;
  editAnnouncement: (
    payload: IEditAnnouncementPayload,
    announcementId: string,
  ) => Promise<AxiosResponse>;
  deleteAnnouncement: (announcementId: string) => Promise<AxiosResponse>;
  getAnnouncements: (
    page: number,
    perPage: number,
    q: string,
  ) => Promise<AxiosResponse>;
  getAnnouncementById: (announcementId: string) => Promise<AxiosResponse>;
}
