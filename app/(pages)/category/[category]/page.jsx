// page.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
export default async function Page({ params }) {
    const { category } = await params;
    

    // Use an absolute URL for the fetch request
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'; // Use your actual base URL
    const response = await fetch(`${baseUrl}/api/softwares/get-category/${category}`, { cache: 'no-store' });

    if (!response.ok) {
        console.error('Error fetching category data:', response.statusText);
        return <div>Error loading category data</div>;
    }

    const posts = await response.json();
    

    return (
        <div>
            <h1 className='text-center text-3xl py-6'>{decodeURIComponent(category)}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {posts.map((product) => (
                <div key={product._id} className="p-4 border rounded-lg flex flex-col justify-between items-center">
                  <div className="flex justify-center items-center">
                  <Image
                    src={product.logo}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="mb-4 h-36"
                  />
                  </div>
                
                  <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                  <p className="text-sm mb-2">
                    Rating: {((product.priceRating + product.easeOfUseRating + product.featuresRating + product.supportRating) / 4).toFixed(1)} 
                  </p>
                  <p className="text-sm mb-4">{product.description}</p>
                 
                  <div className="w-full flex justify-between items-center">
                    <Link href={`/software/${product._id}`}>
                    <button
                      className="p-2 inline-flex rounded-xl items-center justify-center border border-slate-800 bg-[linear-gradient(110deg,#000000,45%,black,55%,#000000)] bg-[length:200%_100%] px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                    >
                      Read More
                    </button>
                    </Link>
                    <Link href={product?.affiliateUrl?.startsWith('http') ? product.affiliateUrl : `https://${product.affiliateUrl}`} target="_blank" rel="noopener noreferrer">

                    <button
                      type="submit"
                      className="p-2 inline-flex rounded-xl items-center justify-center border border-slate-800 bg-gradient-to-r from-teal-800 via-teal-600 to-teal-500 px-6 font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                      >
                      Visit Site
                    </button>
                    </Link>
                  </div>
                  
                 
                </div>
              ))}
            </div>
         
        </div>
    );
}
