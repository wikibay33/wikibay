import { connectToDB } from '@/utils/database';
import Blog from '@/models/blog';

export async function POST(request) {
  await connectToDB();

  try {
    const data = await request.json();
    const newBlog = await Blog.create(data);
    return new Response(JSON.stringify(newBlog), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}