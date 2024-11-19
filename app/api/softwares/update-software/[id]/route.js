import { connectToDB } from '@/utils/database';
import Software from '@/models/software';

export async function PUT(request, { params }) {
  await connectToDB();

  try {
    const { id } =await params;
    if (!id) {
      return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
    }

    const data = await request.json();
    
    // Validate `data` if necessary
    if (!data || Object.keys(data).length === 0) {
      return new Response(JSON.stringify({ error: 'Update data is required' }), { status: 400 });
    }

    const updatedSoftware = await Software.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updatedSoftware) {
      return new Response(JSON.stringify({ error: 'Software not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(updatedSoftware), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
