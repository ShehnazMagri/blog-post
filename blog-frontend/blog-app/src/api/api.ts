import { Blog } from '@/features/blog/blogSlice';
import axios from 'axios';
 // adjust the path if needed

const BASE_URL = 'http://localhost:4000';

// ------------------- Auth APIs -------------------

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, {
    email,
    password
  });
  return res.data;  // expect { token: string }
};

// ------------------- Blog APIs -------------------

export const getBlogs = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/blogs`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
export const getBlogsById = async (token: string, id: string) => {
  const res = await axios.get(`${BASE_URL}/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createBlog = async (token: string, blogData: Partial<Blog>) => {
  const res = await axios.post(`${BASE_URL}/blogs`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateBlog = async (token: string, blogData: Blog) => {
  const res = await axios.put(`${BASE_URL}/blogs/${blogData._id}`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteBlog = async (token: string, id: string) => {
  const res = await axios.delete(`${BASE_URL}/blogs/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
