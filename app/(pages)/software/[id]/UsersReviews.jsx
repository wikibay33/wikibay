import React from 'react'

export default function UsersReviews({software}) {
    
  return (
    <div className='py-10 lg:py-0'>
    <div className='flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3'>
        <div  className='text-2xl font-bold'>Users Reviews</div>
        <button className='bg-blue-500 p-2 rounded-xl'>Add Review</button>
    </div>
    {software?.reviews?.length === 0 ? (<>No users reviews yet</>):(<>User reviews</>)}
    </div>
  )
}
