import { connectToDB } from '@/utils/database';
import Category from '@/models/category'; // Adjust the model name if necessary

export async function POST(req) {
    try {
        const { category } = await req.json(); // Parse JSON body
        console.log('Category received:', category);

        if (!category) {
            console.error('Category is missing');
            return new Response(JSON.stringify({ message: 'Category is required' }), { status: 400 });
        }

        await connectToDB();
        console.log('Connected to the database');

        const newCategory = new Category({ name: category });
        await newCategory.save();

        console.log('Category saved:', newCategory.name);
        return new Response(JSON.stringify({ message: 'Category added successfully', category: newCategory.name }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error adding category:', error);
        return new Response(JSON.stringify({ message: 'Failed to add category: ' + error.message }), {
            status: 500,
        });
    }
}

