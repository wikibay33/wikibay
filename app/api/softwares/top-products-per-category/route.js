// /app/api/softwares/top-products-per-category/route.js

import { connectToDB } from '@/utils/database';
import Software from '@/models/software';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        await connectToDB();

        // Define the categories you're interested in
        const categories = ["VPN", "CRM", "AI Tools", "E-Commerce", "Website Builders", "Web Hosting", "Payroll Services"];

        // Prepare an array to store the promises for each category's query
        const categoryQueries = categories.map(category => 
            Software.find({ category })
                .sort({ overallRating: -1 }) // Sort by rating, assuming higher rating is better
                .limit(3) // Only get the top 3 products
                .select('name description logo priceRating easeOfUseRating featuresRating supportRating') // Fetch only minimal fields
                .lean() // Improve performance by not attaching Mongoose document methods
        );

        // Resolve all promises to fetch data for each category
        const categoryData = await Promise.all(categoryQueries);

        // Prepare a response object, each category's data as an array
        const responseData = categories.reduce((acc, category, index) => {
            acc[category] = categoryData[index];
            return acc;
        }, {});

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("Error fetching top products per category:", error);
        return NextResponse.json({ error: "Failed to fetch top products per category" }, { status: 500 });
    }
}
