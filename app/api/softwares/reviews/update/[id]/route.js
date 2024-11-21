import { connectToDB } from "@/utils/database";
import Software from "@/models/software";

export async function PUT(request, { params }) {
  await connectToDB();

  try {
    const { id: reviewId } = await params; // Await params for Next.js dynamic routes
    const { softwareId, updatedReview } = await request.json();

    // Validate required data
    if (!reviewId) {
      return new Response(JSON.stringify({ error: "Review ID is required" }), { status: 400 });
    }

    if (!softwareId) {
      return new Response(JSON.stringify({ error: "Software ID is required" }), { status: 400 });
    }

    if (!updatedReview || Object.keys(updatedReview).length === 0) {
      return new Response(JSON.stringify({ error: "Updated review data is required" }), { status: 400 });
    }

    // Find the software
    const software = await Software.findById(softwareId);

    if (!software) {
      return new Response(JSON.stringify({ error: "Software not found" }), { status: 404 });
    }

    // Find and update the review
    const review = software.reviews.id(reviewId);

    if (!review) {
      return new Response(JSON.stringify({ error: "Review not found" }), { status: 404 });
    }

    // Update review fields
    Object.assign(review, updatedReview);
    await software.save();

    return new Response(
      JSON.stringify({ message: "Review updated successfully", reviews: software.reviews }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error.message);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}
