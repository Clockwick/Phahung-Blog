export interface IAnnouncementsResponse {
  announcements: Array<Announcement>;
}

export type Announcement = {
  id: string;
  title: string;
  description: string;
  createdAt: number;
};
