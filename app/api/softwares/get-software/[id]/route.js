import { connectToDB } from '@/utils/database';
import Software from '@/models/software';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    await connectToDB();
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        const software = await Software.findById(id).lean(); // Use lean() for better performance
        if (!software) {
            return NextResponse.json({ error: 'Software not found' }, { status: 404 });
        }

        return NextResponse.json(software, { status: 200 });
    } catch (error) {
        console.error('Error fetching software:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
