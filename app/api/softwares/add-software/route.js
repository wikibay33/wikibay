import { connectToDB } from '@/utils/database';
import Software from '@/models/software';

export async function POST(request) {
  await connectToDB();

  try {
    const data = await request.json();
    const newSoftware = await Software.create(data);
    return new Response(JSON.stringify(newSoftware), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}