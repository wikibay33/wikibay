import React from 'react'

export default function CompanyDescription({software}) {
  return (
    <div className='py-5' >
  <div className='p-4 border-2 border-gray-300'>
        <h2 className='text-3xl font-bold'>{software.name}</h2>
        <h2 className='text-1xl font-semibold'>Category: {software.category}</h2>
        <p>{software.description}</p>
    </div>
    </div>
  
  )
}
