

import CategoryProductsClient from './CategoryProductsClient';



export default async function HomePageCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const response = await fetch(`${baseUrl}/api/softwares/top-products-per-category`, {
    cache: 'no-store', // Ensure fresh data is fetched
  });
  
  const topProductsData = await response.json();

  return <CategoryProductsClient topProductsData={topProductsData} />;
}
