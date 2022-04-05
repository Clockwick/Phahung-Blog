import { AxiosResponse } from 'axios';

export interface ITagAPICall {
  createNewTag: (tag: string) => Promise<AxiosResponse>;
  deleteTag: (id: string) => Promise<AxiosResponse>;
}
