import React from 'react'
import ProgressBar from './ProgressBar'
import ProsCons from './ProsCons'

export default function ExpertReview({software}) {
  console.log(software);
  return (
    <>
    <div className='text-2xl font-bold'>ExpertReview</div>
    <ProgressBar software={software}/>
    <ProsCons expretProsCons={software.expertReview || []}/>
    <h2 className='text-2xl font-bold py-5'>Customer Support</h2>
    <p>{software.customerSupport}</p>
    {software.featuresFunctionality && (
    <div>
        <h2 className='text-2xl font-bold py-5'>Features Functionality</h2>
        <p className='mb-4'>{software.featuresFunctionality.generalFeatures}</p>
        <ul>
            {software.featuresFunctionality.FeaturesDescription.map((feature, index) => (
                <li key={index}>
                    <strong>{feature.title}</strong>: {feature.description}
                </li>
            ))}
        </ul>
    </div>
)}
    
    <h2 className='text-2xl font-bold py-5'>Ease Of Use</h2>
    <p>{software.easeOfUse}</p>

    <h2 className='text-2xl font-bold py-5'>verdict</h2>
    <p>{software.verdict}</p>
    <h2 className='text-2xl font-bold py-5'>promotions</h2>
    <p>{software.promotions}</p>

    </>
  )
}
