

import CategoryProductsClient from './CategoryProductsClient';



export default async function HomePageCategories() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/softwares/top-products-per-category`);
    const topProductsData = await response.json();
    console.log(topProductsData);
    return <CategoryProductsClient topProductsData={topProductsData} />;
}