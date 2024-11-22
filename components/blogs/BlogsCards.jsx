import Image from 'next/image';
import React from 'react'
import { FaUser } from 'react-icons/fa'; // Example from React Icons
import Link from 'next/link';
export default async function BlogsCards() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/blogs/get-blogs`, {
      cache: 'no-store', // Ensure fresh data is fetched
    });
    let blogs = await response.json();
blogs = blogs.slice(0, 12); // Limit to 12 blogs
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-2 my-4'>
        {blogs && 
            (blogs.map((blog,i)=>{
                return <Link href={`/blogs/${blog._id}`} key={i} ><div className='w-full flex-col justify-center items-center  p-2 border-2 border-gray-300'>
                    <Image src={blog.image} alt={blog.title} width={1000} height={100} className='w-full max-h-48'/> 
                    <h2 
    className="text-2xl font-semibold line-clamp-2 overflow-hidden"
    style={{
        display: '-webkit-box',
        WebkitLineClamp: 2, // Ensure this matches the desired number of lines
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden', // Ensure text overflow is handled properly
        textOverflow: 'ellipsis', // Add ellipsis for the truncated text
    }}
>
    {blog.title}
</h2>
                    <div className='flex justify-between items-center'>
                    
                    <h2  className='flex justify-between items-center gap-1'><FaUser/> {blog.author}</h2>
                    <h2><b>
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })}
        </b></h2>
                    </div>
                    

                </div>
                </Link>
            }))
        }
       
    </div>
  )
}
