import { someResponse } from './someResponse';

export const isSomeResponse = (x: any): x is someResponse => {
  return typeof x?.message === 'string' && typeof x?.status === 'number';
};
