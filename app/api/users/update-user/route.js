import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export async function PUT(request) {
  await connectToDB();

  try {
    const data = await request.json();
    const { id, ...updateData } = data;
    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
    return new Response(JSON.stringify(updatedUser), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}