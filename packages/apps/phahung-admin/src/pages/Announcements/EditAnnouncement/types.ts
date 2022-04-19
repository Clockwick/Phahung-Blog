import { IAnnouncement } from '../types';

export interface IAnnouncementResponse {
  success: number;
  announcement: IAnnouncement;
}

export interface IEditAnnouncementPayload {
  id: string;
  title: string;
  description: string;
  //   createdAt: number;
}
