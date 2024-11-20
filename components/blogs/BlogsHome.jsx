import React from 'react'
import BlogsCards from './BlogsCards'
import Link from 'next/link'

export default function BlogsHome() {
  return (
    <div className='p-8'>
        <h2 className="text-3xl font-bold">Blogs</h2>
        <BlogsCards/>
        <div className="flex justify-end items-center py-4">
          <Link href={'/blogs'} className="text-blue-500">Show All Blogs</Link>
        </div>
    </div>
  )
}
