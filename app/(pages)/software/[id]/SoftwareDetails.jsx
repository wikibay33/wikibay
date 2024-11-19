import Image from 'next/image';
import React from 'react';
import SoftwarePricing from './SoftwarePricing';
import ExpertReview from './ExpertReview';
import CompanyDescription from './CompanyDescription';
import UsersReviews from './UsersReviews';
import Link from 'next/link';

export default async function SoftwareDetails({ id }) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    
        // Use the full server URL for fetching data
        const response = await fetch(`${baseUrl}/api/softwares/get-software/${id}`);
        const software = await response.json();
        if (software.error) {
            return <div>Software not found</div>;
        }

        // Ensure plansPricing is an array
        const plansPricing = software.plansPricing || [];

        const priceRating = software.priceRating;
        const easeOfUseRating =software.easeOfUseRating ;
        const featuresRating = software.featuresRating;
        const supportRating =software.supportRating ;
    
        const overallRating = ((priceRating + easeOfUseRating + featuresRating + supportRating) / 4).toFixed(1);

        return (
            <div>
                <div className='px-24 grid grid-cols-1 md:grid-cols-3 gap-4 p-10 sticky top-10 bg-white shadow-xl'>
                    <div className='flex justify-center items-center'>
                        <Image src={software.logo} width={100} height={100} alt='logo'/>
                    </div>
                    
                    <div className='px-10 justify-center items-center hidden md:flex'>
                        <div className='text-center'>
                            <h2 className='text-2xl '>Overall Rating:</h2>
                            {overallRating || "N/A"}
                        </div>
                    </div>

                    <div className='flex justify-center items-center'>
                        <Link href={software?.affiliateUrl?.startsWith('http') ? software.affiliateUrl : `https://${software.affiliateUrl}`} target="_blank" rel="noopener noreferrer">
                            <button
                                type="button"
                                className="p-2 inline-flex rounded-xl items-center justify-center border border-slate-800 bg-gradient-to-r from-teal-800 via-teal-600 to-teal-500 px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                                >
                                Visit Site
                            </button>
                        </Link>
                    </div>
                </div>

                <CompanyDescription software={software} />

                {/* Pass the plansPricing safely */}
                <SoftwarePricing plansPricing={plansPricing} />

                <div className='grid grid-cols-1 lg:grid-cols-2 p-10'>
                    <div className="border-b lg:border-b-0 lg:border-r border-gray-300 p-4">
                        <ExpertReview software={software} />
                    </div>
                    <div className='lg:px-4'>
                        <UsersReviews software={software} />
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching software:', error);
        return <div>Failed to load software details</div>;
    }
}
