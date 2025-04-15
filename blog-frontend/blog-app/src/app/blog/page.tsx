'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { getBlogs, deleteBlog, updateBlog } from '@/api/api';
import { toast } from 'react-toastify';


interface Blog {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export default function Blogs() {
  // const token = useSelector((state: RootState) => state.auth.token);
  // console.log(token)
  const [blogs, setBlogs] = useState([]);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<any>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');




  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const data = await getBlogs(token);
        console.log(data);
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleDropdownToggle = (id: string) => {
    setActiveDropdown(prev => (prev === id ? null : id));
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    const confirmDelete = confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      // Call the delete API
      const response = await deleteBlog(token, id);
      toast.success('Blog deleted successfully.');

      // Remove the deleted blog from the UI directly
      setBlogs(prevBlogs => prevBlogs.filter(blog => blog._id !== id)); // Use _id instead of id if that's what the backend returns

      // Close the dropdown after deleting the blog
      setActiveDropdown(null);

    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog.');
    }
  };

  const handleEdit = (blog: any) => {
    setTitle(blog.title);
    setContent(blog.content);
    setAuthor(blog.author);
    setEditBlog(blog);  // Set blog data to be edited
    setIsModalOpen(true);  // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditBlog(null);  // Clear the blog data when closing
  };

  // const handleUpdate = async (e: any) => {
  //   e.preventDefault();
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     toast.error('No token found. Please log in.');
  //     return;
  //   }
  //   const updatedBlog = {
  //     ...editBlog,
  //     title,
  //     content,
  //     author
  //   };
  //   try {
  //     const response = await updateBlog(token, updatedBlog);
  //     toast.success('Blog updated successfully.');
  //     setBlogs(prevBlogs =>
  //       prevBlogs.map(blog =>
  //         blog._id === updatedBlog._id ? updatedBlog : blog
  //       )
  //     );
  //     handleModalClose();
  //   } catch (error) {
  //     toast.error('Failed to update blog.');
  //   }
  // };
  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (!editBlog) return;
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found.');
      return;
    }
    const updatedBlog = { ...editBlog, title, content, author };
    try {
      await updateBlog(token, updatedBlog);
      toast.success('Blog updated successfully.');
      setBlogs(prev => prev.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
      closeModal();
    } catch (error) {
      toast.error('Failed to update blog.');
    }
  };



  // if (!token) return <div className="text-center mt-20 text-lg">Please login to view blogs.</div>;



  return (
    // <div className="p-6">
    //   <h1 className="text-3xl font-bold mb-4">All Blog Posts</h1>
    //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    //     {blogs.map((blog: any) => (
    //       <div
    //         key={blog._id}
    //         className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700"
    //       >
    //         <div className="flex justify-end px-4 pt-4 relative">
    //           <button
    //             onClick={() => handleDropdownToggle(blog._id)}
    //             className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
    //           >
    //             <span className="sr-only">Open dropdown</span>
    //             <svg
    //               className="w-5 h-5"
    //               aria-hidden="true"
    //               xmlns="http://www.w3.org/2000/svg"
    //               fill="currentColor"
    //               viewBox="0 0 16 3"
    //             >
    //               <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    //             </svg>
    //           </button>

    //           {activeDropdown === blog._id && (
    //             <div className="absolute top-10 right-4 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
    //               <ul className="py-2">
    //                 <li>
    //                   <button
    //                     onClick={() => handleEdit(blog)}
    //                     className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //                   >
    //                     Edit
    //                   </button>
    //                 </li>
    //                 <li>
    //                   <button
    //                     onClick={() => handleDelete(blog._id)}
    //                     className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
    //                   >
    //                     Delete
    //                   </button>
    //                 </li>
    //               </ul>
    //             </div>
    //           )}
    //         </div>

    //         <div className="flex flex-col items-center pb-10">
    //           {/* <img
    //         className="w-24 h-24 mb-3 rounded-full shadow-lg"
    //         src={blog.image || "/default-image.jpg"}
    //         alt="Blog"
    //       /> */}
    //           <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
    //             {blog.title}
    //           </h5>
    //           <p className="text-sm text-gray-700 dark:text-gray-400 text-center px-2">
    //             {blog.content}
    //           </p>
    //           <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
    //             By: {blog.author}
    //           </span>
    //         </div>
    //       </div>
         
    //   //    <>
    //   // { isModalOpen && (
    //   //       <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    //   //         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
    //   //           <h2 className="text-xl mb-4 text-gray-900 dark:text-gray-100 flex justify-between">Edit Blog <span className="h-6 w-6 cursor-pointer" onClick={closeModal}>X</span></h2>
    //   //           <form>
    //   //             <div className="mb-4">
    //   //               <label
    //   //                 htmlFor="title"
    //   //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //   //               >
    //   //                 Author
    //   //               </label>
    //   //               <input
    //   //                 type="text"
    //   //                 id="author"
    //   //                 // defaultValue={blog.title}
    //   //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    //   //               />
    //   //             </div>
    //   //             <div className="mb-4">
    //   //               <label
    //   //                 htmlFor="title"
    //   //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //   //               >
    //   //                 Title
    //   //               </label>
    //   //               <input
    //   //                 type="text"
    //   //                 id="title"
    //   //                 // defaultValue={blog.title}
    //   //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    //   //               />
    //   //             </div>
    //   //             <div className="mb-4">
    //   //               <label
    //   //                 htmlFor="content"
    //   //                 className="block text-sm font-medium text-gray-700 dark:text-gray-300"
    //   //               >
    //   //                 Content
    //   //               </label>
    //   //               <textarea
    //   //                 id="content"
    //   //                 // defaultValue={deleteBlog?.content}
    //   //                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
    //   //               ></textarea>
    //   //             </div>
    //   //             <div className="flex justify-end">
    //   //               <button
    //   //                 type="button"
    //   //                 onClick={closeModal}
    //   //                 className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md"
    //   //               >
    //   //                 Cancel
    //   //               </button>
    //   //               <button
    //   //                 type="submit"
    //   //                 className="px-4 py-2 bg-indigo-600 text-white rounded-md"
    //   //               >
    //   //                 Save
    //   //               </button>
    //   //             </div>
    //   //           </form>
    //   //         </div>
    //   //       </div>
    //   //     )}
    //   //     </>
    //       ))}
    //   {/* </div> */}





    //   {/* Edit Blog Modal */}




    // </div>
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">All Blog Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4 relative">
              <button
                onClick={() => handleDropdownToggle(blog._id)}
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              >
                <span className="sr-only">Open dropdown</span>
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>

              {activeDropdown === blog._id && (
                <div className="absolute top-10 right-4 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={() => handleEdit(blog)}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Edit
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center pb-10">
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{blog.title}</h5>
              <p className="text-sm text-gray-700 dark:text-gray-400 text-center px-2">{blog.content}</p>
              <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">By: {blog.author}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl mb-4 text-gray-900 dark:text-gray-100 flex justify-between">
              Edit Blog <span className="h-6 w-6 cursor-pointer" onClick={closeModal}>X</span>
            </h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Author</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={e => setAuthor(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Content</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                />
              </div>
              <div className="flex justify-end">
                <button type="button" onClick={closeModal} className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-md">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>


  );
}
