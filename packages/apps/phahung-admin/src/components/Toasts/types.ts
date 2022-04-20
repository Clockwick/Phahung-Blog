import { UseToastOptions } from '@chakra-ui/react';

export interface IToastCall {
  createBlogSuccess: (desp: string) => UseToastOptions;
  createBlogFail: (desp: string) => UseToastOptions;
  createBlogEmpty: () => UseToastOptions;
  editBlogSuccess: (desp: string) => UseToastOptions;
  editBlogFail: (desp: string) => UseToastOptions;
  editBlogEmpty: () => UseToastOptions;
  publishBlogStatus: () => UseToastOptions;
  draftBlogStatus: () => UseToastOptions;
  changeBlogStatusFail: () => UseToastOptions;
  deleteBlogSuccess: () => UseToastOptions;
  deleteBlogFail: () => UseToastOptions;
  createTagSuccess: (desp: string) => UseToastOptions;
  deleteTagSuccess: (desp: string) => UseToastOptions;
  addUserSuccess: (desp: string) => UseToastOptions;
  addUserFailed: (desp: string) => UseToastOptions;
  deleteUserSuccess: () => UseToastOptions;
  banUserSuccess: () => UseToastOptions;
  deleteUserFailed: (desp: string) => UseToastOptions;
  renameSuccess: (desp: string) => UseToastOptions;
  renameFailed: (desp: string) => UseToastOptions;
  renameLength: () => UseToastOptions;
  sessionTimeOut: () => UseToastOptions;
  uploadImageFail: () => UseToastOptions;
  createAnnouncementSuccess: (desp: string) => UseToastOptions;
  editAnnouncementSuccess: (desp: string) => UseToastOptions;
  deleteAnnouncementSuccess: () => UseToastOptions;
  deleteAnnouncementFail: () => UseToastOptions;
}
