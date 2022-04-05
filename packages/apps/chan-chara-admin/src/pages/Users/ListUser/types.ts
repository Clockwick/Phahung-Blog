export interface IUsersResponse {
  success: string;
  admins: {
    docs: Array<User>;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
    nextPage: number | null;
    page: number;
    pagingCounter: number;
    prevPage: number | null;
    totalDocs: number;
    totalPages: number;
  };
}

export type User = {
  id: string;
  email: string;
  name: string;
  picture: string;
  role: string;
};
