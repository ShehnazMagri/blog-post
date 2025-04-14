'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux';
import { fetchBlogs } from '../redux/blogSlice';

const BlogList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, loading, error } = useSelector((state: RootState) => state.blogs);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blogs available</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {blogs.map((blog) => (
            <li
              key={blog._id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                margin: '1rem 0',
              }}
            >
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <small>
                {new Date(blog.createdAt).toLocaleDateString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogList;