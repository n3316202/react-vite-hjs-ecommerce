import http from './HttpCommon';

export const getPosts = () => {
  return http.get('/posts');
};

export const getPostById = (id) => {
  return http.get(`/posts/${id}`);
};