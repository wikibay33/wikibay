import EditDeleteBlog from '@/components/edit-delete-blog/EditDeleteBlog';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import parse from 'html-react-parser';

export default function AllBlogsAdmin() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_PROD_URL ? process.env.NEXT_PUBLIC_BACKEND_PROD_URL : process.env.NEXT_PUBLIC_BACKEND_DEV_URL}api/blogs/get-blogs`);
      const res = await response.json();
      setData(res);
    };
    fetchData();
  }, []);

  const handleBlogUpdate = (updatedBlog) => {
    const updatedData = data.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog);
    setData(updatedData);
  };

  const handleBlogDelete = (blogId) => {
    // Filter out the deleted blog
    const updatedData = data.filter(blog => blog._id !== blogId);
    setData(updatedData);
  };

  if(data.length === 0) {
    return <div className='text-white min-h-[80vh] flex flex-col justify-center items-center '>لا يوجد حتى الان</div>
  }
  return (
    <div className='bg-white min-h-[80vh]'>
      {data.map((blog) => (
        <div key={blog._id} className='blog-item md:p-8 p-4 border-b-2 mb-4 shadow-md rounded-md flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow duration-200 '>
          <Link href={`/blog/${blog._id}`}>
            <div className='w-full'>
              <h3 className='text-3xl'>{blog.title}</h3>
              <p className='text-lg mb-2'><strong>الكاتب:</strong> {blog.author}</p>
              <span className='text-lg flex flex-wrap gap-2 overflow-hidden'>{parse(blog.content.slice(0, 100))}...</span>
            </div>
          </Link>
          <div className='flex justify-end items-center my-4'>
            <EditDeleteBlog blog={blog} onBlogUpdate={handleBlogUpdate} onBlogDelete={handleBlogDelete} />
          </div>
        </div>
      ))}
    </div>
  );
}
