import { connectToDB } from '@/utils/database';
import Blog from '@/models/blog';

export async function GET(request, { params }) {
  await connectToDB();

  try {
    const { id } = params;

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const blog = await Blog.findById(id);
    if (!blog) {
      return new Response(JSON.stringify({ error: 'Blog not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}