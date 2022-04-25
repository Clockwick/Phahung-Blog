export interface IEditUserPayload {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBan: false;
  role: 0;
  imageURL: string;
  likedBlogs: string[];
}
export interface INamePayload {
  name: string;
}
