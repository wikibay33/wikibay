import { connectToDB } from '@/utils/database';
import User from '@/models/user';

export async function DELETE(request) {
  await connectToDB();

  try {
    const { id } = await request.json();
    await User.findByIdAndDelete(id);
    return new Response(JSON.stringify({ message: 'User deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}