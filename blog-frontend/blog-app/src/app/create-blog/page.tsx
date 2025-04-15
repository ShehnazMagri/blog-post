'use client';

import React, { useState } from 'react'
import { createBlog } from '@/api/api'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export const CreateBlog = () => {
    // const token = useSelector((state: RootState) => state.auth.token);
    // console.log(token)
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {

      e.preventDefault();
      const token = localStorage.getItem('token');
  
      if (!token) {
        toast.error('You must be logged in to create a blog.');
        return;
      }
  
      setLoading(true);
  
      try {
        const blogData = { title, content, author };
        const response = await createBlog(token, blogData);
        toast.success('Blog created successfully!');
        router.push('/blog');
  
        // Reset the form after success
        setTitle('');
        setContent('');
        setAuthor('');
      } catch (error: any) {
        console.error(error);
        toast.error(error?.response?.data?.message || 'Failed to create blog');
      } finally {
        setLoading(false);
      }
    };
  
    // const handleSubmit = async (e: { preventDefault: () => void; }) => {
    //   e.preventDefault();
    //   const token = localStorage.getItem('token');
    //   // Check if token is available
    //   if (!token) {
    //     toast.error("No token found. Please log in.");
    //     return;
    //   }
    
    //   const newBlog = {
    //     title,
    //     content,
    //     author
    //   };
    
    //   try {
    //     console.log("Sending token:", token);  // Log token for verification
    //     const response = await createBlog(newBlog, token);
    //     console.log('Blog created:', response);
    
    //     if (response.ok) {
    //       toast.success(response.message);
    //     } else {
    //       toast.error(response.message);
    //     }
    //   } catch (error) {
    //     console.error('Error:', error);
    //     toast.error('An error occurred while creating the blog.');
    //   }
    // };
    
    
  
    return (
        <section className="createblog-card min-h-screen flex items-center justify-center px-6 py-8 mt-1">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Create a Blog Post
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blog Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter blog title"
                  required
                />
              </div>
              <div>
                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Blog Content
                </label>
                <textarea
                  name="content"
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter blog content"
                  required
                />
              </div>
              <div>
                <label htmlFor="author" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter author name"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create Blog
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };
  
  export default CreateBlog;
