import { connectToDB } from '@/utils/database';
import Software from '@/models/software';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { category } = await params;

    try {
        await connectToDB();

        // Fetch products by category
        const products = await Software.find({ category });
        if (!products.length) {
            console.log(`No products found for category: ${category}`); // Additional logging
            return NextResponse.json({ error: `No products found for category: ${category}` }, { status: 404 });
        }

        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
    }
}