import { connectToDB } from '@/utils/database';
import Software from '@/models/software';

export async function POST(request) {
  await connectToDB();

  try {
    const { softwareId, review } = await request.json();
    console.log("API Received:", { softwareId, review });

    if (!softwareId || !review) {
      return new Response(
        JSON.stringify({ error: "Software ID and review data are required" }),
        { status: 400 }
      );
    }

    if (!review.userId || !review.username || !review.rating || !review.comment) {
      return new Response(
        JSON.stringify({ error: "Incomplete review data" }),
        { status: 400 }
      );
    }

    const software = await Software.findById(softwareId);

    if (!software) {
      return new Response(
        JSON.stringify({ error: "Software not found" }),
        { status: 404 }
      );
    }

    // Log before pushing to debug the issue
    console.log("Before push:", software.reviews);

    software.reviews.push(review);

    // Log after push to confirm it was added
    console.log("After push:", software.reviews);

    await software.save();

    return new Response(
      JSON.stringify({ message: "Review added successfully", software }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in adding review:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 }
    );
  }
}
