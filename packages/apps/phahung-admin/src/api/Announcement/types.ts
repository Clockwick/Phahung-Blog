import { AxiosResponse } from 'axios';
import { IEditBlogPayload } from 'pages/Blogs/EditBlog/types';
import { INewAnnouncementPayload } from '../../pages/Announcements/NewAnnouncement/types';

export interface IAnnouncementAPICall {
  createNewAnnouncement: (
    payload: INewAnnouncementPayload,
  ) => Promise<AxiosResponse>;
  editAnnouncement: (
    payload: IEditBlogPayload,
    announcementId: string,
  ) => Promise<AxiosResponse>;
  deleteAnnouncement: (announcementId: string) => Promise<AxiosResponse>;
  getAnnouncements: (
    page: number,
    perPage: number,
    q: string,
  ) => Promise<AxiosResponse>;
}
