import React from 'react'
import PriceCard from './PriceCard';

export default function SoftwarePricing({plansPricing}) {
  return (
    <div className='p-10'>
        <h2 className='text-center text-2xl font-bold'>Pricing plans</h2>
        <div className={`grid grid-cols-1 md:grid-cols-${plansPricing.length} pt-10`}>
        {plansPricing.map((plan,i)=>{
           return <PriceCard key={i} index={i} plan={plan}/>
        })}
        </div>
    </div>
  )
}
