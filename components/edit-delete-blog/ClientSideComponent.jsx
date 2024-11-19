// components/client-side-component.jsx
'use client';

import EditDeleteBlog from './EditDeleteBlog';
import parse from 'html-react-parser';
import { useState } from 'react';

export default function ClientSideComponent({ initialData }) {
  const [data, setData] = useState(initialData);

  if (!data) {
    return <div className='mt-8 flex justify-center items-center'>No products found</div>;
  }

  // Define the update handler
  const handleBlogUpdate = (updatedBlog) => {
    // Optimistically update the UI
    setData(updatedBlog);
  };

  return (
    <div className='p-8 flex flex-col gap-4 min-h-[80vh]'>
    
      <h1 className='text-3xl bg-gray-100 shadow-md rounded-lg p-4'>{data.title}</h1>
      <h2 className='text-2xl bg-gray-100 shadow-md rounded-lg p-4 '>الكاتب: {data.author}</h2>
      <div className='text-lg bg-gray-100 shadow-md rounded-lg p-4 prose prose-lg max-w-none'>
        {parse(data.content)}
      </div>
    </div>
  );
}
