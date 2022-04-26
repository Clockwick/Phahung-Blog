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
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  isBan: false;
  role: 1;
  picture: string;
  likedBlogs: string[];
  likedComments: string[] | null;
};
