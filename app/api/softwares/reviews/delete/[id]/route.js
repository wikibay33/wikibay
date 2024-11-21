import { connectToDB } from "@/utils/database";
import Software from "@/models/software";

export async function DELETE(request, { params }) {
  await connectToDB();

  try {
    const { id: reviewId } = await params; // Await `params`
    const { softwareId } = await request.json();

    if (!reviewId) {
      return new Response(JSON.stringify({ error: "Review ID is required" }), { status: 400 });
    }

    if (!softwareId) {
      return new Response(JSON.stringify({ error: "Software ID is required" }), { status: 400 });
    }

    const software = await Software.findById(softwareId);

    if (!software) {
      return new Response(JSON.stringify({ error: "Software not found" }), { status: 404 });
    }

    // Find and remove the review
    const review = software.reviews.id(reviewId);

    if (!review) {
      return new Response(JSON.stringify({ error: "Review not found" }), { status: 404 });
    }

    software.reviews.pull({ _id: reviewId }); // Use `pull` instead of `remove`
    await software.save();

    return new Response(
      JSON.stringify({ message: "Review deleted successfully", reviews: software.reviews }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error.message);
    return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), { status: 500 });
  }
}
