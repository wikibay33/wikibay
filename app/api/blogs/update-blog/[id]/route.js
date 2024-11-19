import { connectToDB } from '@/utils/database';
import Blog from '@/models/blog';

export async function PUT(request, { params }) {
  await connectToDB();

  try {
    const { id } = params;
    const data = await request.json();

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, data, { new: true });
    if (!updatedBlog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
