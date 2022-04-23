/* eslint-disable import/no-unresolved */
import api from 'utils/api';

import type { IBlogAPICall } from './types';

const blogApiCall: IBlogAPICall = {
  createNewBlog: (payload) => {
    return api({
      method: 'post',
      url: '/blogs',
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  editBlog: (payload, blogId) => {
    return api({
      method: 'put',
      url: `/blog/update/${blogId}`,
      data: payload,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  deleteBlog: (blogId) => {
    return api({
      url: `/blog/${blogId}`,
      method: 'delete',
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  getBlogs: (page: number, perPage: number, q = '') => {
    return api({
      method: 'get',
      url: `/blogs?page=${page}&perPage=${perPage}${
        q.length > 0 ? `&q=${q}` : ''
      }`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  getBlogById: (blogId) => {
    return api({
      method: 'get',
      url: `/blog/edit/${blogId}`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  getAllTags: () => {
    return api({
      method: 'get',
      url: '/categories',
      // headers: {
      //   authorization: `Bearer ${localStorage.getItem('idToken')}`,
      // },
    });
  },

  uploadByFile: (file) => {
    // eslint-disable-next-line
    // const imagePath = sessionStorage.getItem('imagePath')!;
    const formData = new FormData();
    // formData.append('imagePath', imagePath);
    formData.append('file', file);
    return api({
      method: 'post',
      url: '/blogs/upload-image-by-file',
      data: formData,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  uploadByURL: (url) => {
    const imagePath = sessionStorage.getItem('imagePath');
    return api({
      method: 'post',
      url: '/image/upload/byUrl',
      data: { url, imagePath },
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
    });
  },

  updateBlogStatus: (blogId, status) => {
    return api({
      method: 'put',
      url: `/blogs/${blogId}/status`,
      headers: {
        authorization: `Bearer ${localStorage.getItem('idToken')}`,
      },
      data: {
        status,
      },
    });
  },
};

export default blogApiCall;
