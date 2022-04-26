export interface IEditUserPayload {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBan: false;
  role: 0;
  picture: string;
  likedBlogs: string[];
}
export interface INamePayload {
  name: string;
}

export type someResponse = { message: string; status: number };

export const isSomeResponse = (x: any): x is someResponse => {
  return typeof x?.message === 'string' && typeof x?.status === 'number';
};
