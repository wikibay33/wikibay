import { connectToDB }  from '@/utils/database';
import Software from '@/models/software';

export async function GET(req, res) {
    await connectToDB();
  
  try {
    const softwares = await Software.find({}).sort({ createdAt: -1 });
    return new Response(JSON.stringify(softwares), { status: 200 });

  } catch (error) {
    throw new Error('Failed to fetch softwares: ' + error.message);
  }
};


