import { connectToDB } from '@/utils/database';
import Category from '@/models/category';

export async function GET(req) {
    try {
        await connectToDB();
        const categories = await Category.find({}); // Fetch all categories

        console.log('Fetched categories:', categories);

        return new Response(JSON.stringify(categories.map((cat) => cat.name)), { status: 200 });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch categories' }), { status: 500 });
    }
}