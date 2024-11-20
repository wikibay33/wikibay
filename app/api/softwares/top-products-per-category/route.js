import { connectToDB } from '@/utils/database';
import Software from '@/models/software';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectToDB();

    const categories = ["VPN", "CRM", "AI Tools", "E-Commerce", "Website Builders", "Web Hosting", "Payroll Services"];

    const categoryQueries = categories.map((category) => 
      Software.find({ category })
        .sort({ overallRating: -1 })
        .limit(3)
        .select('name description logo priceRating easeOfUseRating featuresRating supportRating')
        .lean()
    );

    const categoryData = await Promise.all(categoryQueries);

    const responseData = categories.reduce((acc, category, index) => {
      acc[category] = categoryData[index];
      return acc;
    }, {});

    console.log('Fetched Category Data:', responseData);

    return NextResponse.json(responseData, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        Expires: '0',
        Pragma: 'no-cache',
      },
    });
  } catch (error) {
    console.error("Error fetching top products per category:", error);
    return NextResponse.json({ error: "Failed to fetch top products per category" }, { status: 500 });
  }
}
