export interface IUsersResponse {
  // success: string;
  // admins: {
  //   docs: Array<User>;
  //   hasNextPage: boolean;
  //   hasPrevPage: boolean;
  //   limit: number;
  //   nextPage: number | null;
  //   page: number;
  //   pagingCounter: number;
  //   prevPage: number | null;
  //   totalDocs: number;
  //   totalPages: number;
  // };

  data: Array<User>;
}

export type User = {
  // id: string;
  // email: string;
  // firstName: string;
  // lastName: string;
  // picture: string;
  // role: string;
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBan: false;
  role: 1;
  imageURL: string;
  likedBlogs: string[];
};
