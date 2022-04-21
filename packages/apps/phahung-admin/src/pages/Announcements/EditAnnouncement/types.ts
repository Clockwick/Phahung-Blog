import { IAnnouncement } from '../types';

export interface IAnnouncementResponse {
  success: number;
  announcement: IAnnouncement;
}

export interface IEditAnnouncementPayload {
  title: string;
  description: string;
}
