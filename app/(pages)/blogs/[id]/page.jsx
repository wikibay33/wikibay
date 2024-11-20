"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import MDEditor from '@uiw/react-md-editor';

export default function Page({ params: initialParams }) {
  const [params, setParams] = useState(null);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(false);

  // Unwrap params asynchronously
  useEffect(() => {
    async function fetchParams() {
      const resolvedParams = await initialParams;
      setParams(resolvedParams);
    }
    fetchParams();
  }, [initialParams]);

  // Fetch blog data when params are available
  useEffect(() => {
    if (!params) return;

    const fetchBlog = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/blogs/get-blog/${params.id}`, { cache: 'no-store' });

        if (!response.ok) {
          console.error('Error fetching blog data:', response.statusText);
          setError(true);
          return;
        }

        const data = await response.json();
        setBlog(data);
      } catch (err) {
        console.error('Error fetching blog data:', err);
        setError(true);
      }
    };

    fetchBlog();
  }, [params]);

  if (error) {
    return <div>Error loading blog data</div>;
  }

  if (!blog || !params) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-2 md:px-24 max-w-5xl mx-auto flex flex-col justify-center items-center">
      <div className="w-full flex justify-center items-center mb-4">
        <Image
          src={blog.image}
          alt={blog.title}
          width={1000}
          height={1000}
          className="max-h-96 w-full object-cover"
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <h2 className="text-2xl text-center">{blog.title}</h2>
      </div>
      <div className="w-full flex justify-between items-center">
        <h2 className="w-full flex justify-start items-center gap-2">
          <FaUser />
          {blog.author}
        </h2>
        <h2>
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </h2>
      </div>
      <div className="py-6">
      <div className="prose w-full bg-transparent text-black mb-4">
        <MDEditor.Markdown source={blog.content} style={{background:'transparent', width:"100%", color:"black"}}/>
      </div>
      </div>
    </div>
  );
}
