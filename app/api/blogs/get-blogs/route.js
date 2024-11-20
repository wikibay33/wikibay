import { connectToDB } from '@/utils/database';
import Blog from '@/models/blog';
export const dynamic = 'force-dynamic';

export async function GET(req, res) {
  await connectToDB();

  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 }); 
    return new Response(JSON.stringify(blogs), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
