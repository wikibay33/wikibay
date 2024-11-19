
'use client'
import Link from 'next/link';
import parse from 'html-react-parser'
export default  function BlogList({data}) {
  
    return (
      <div className='p-8 flex flex-col items-center min-h-dvh'>
        <h1 className="text-3xl text-center relative inline-block mb-8 py-4">
       مقالات
          <span className="block border-b-2 border-white w-full absolute bottom-0 left-0"></span>
        </h1>
        {data.length === 0 && <h1>No Blogs created</h1>} 
        <div className='blog-list w-full'>
          {data.map((blog) => (
            <Link href={`/blog/${blog._id}`} key={blog._id}>
              <div className='blog-item p-4 border-b-2 mb-4 shadow-md rounded-md flex flex-col gap-3 cursor-pointer hover:shadow-lg transition-shadow duration-200'>
                <h3 className='text-3xl'>{blog.title}</h3>
                <p className='text-lg mb-2'><strong>الكاتب:</strong> {blog.author}</p>
                <span className='text-lg flex flex-wrap gap-2 overflow-hidden'>{parse(blog.content.slice(0, 100))}...</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };
  
