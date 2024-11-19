
import {connectToDB} from '@/utils/database';
import Software from '@/models/software';

export async function DELETE(request, { params }) {
  await connectToDB();
  
  try {
    const { id } = await params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const deletedSoftware = await Software.findByIdAndDelete(id);  
      if (!deletedSoftware) {
      return new Response(JSON.stringify({ error: 'Software not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(deletedSoftware), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}