// // app/api/deleteImage/route.js
// import { NextResponse } from 'next/server';
// import { cloudinary } from 'next-cloudinary';

// export async function DELETE(req) {
//     const { publicId } = await req.json(); // Parse the request body

//     try {
//         const result = await cloudinary.uploader.destroy(publicId);

//         if (result.result === 'ok') {
//             return NextResponse.json({ message: 'Image deleted successfully' });
//         } else {
//             return NextResponse.json({ message: 'Failed to delete image' }, { status: 400 });
//         }
//     } catch (error) {
//         console.error('Cloudinary delete error:', error);
//         return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
//     }
// }
