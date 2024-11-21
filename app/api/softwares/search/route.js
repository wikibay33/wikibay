// pages/api/softwares/search.js
import { connectToDB } from "@/utils/database";
import Software from "@/models/software";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    await connectToDB();

    // Fetch the software data
    const results = await Software.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive regex match
    }).select("name description logo category priceRating easeOfUseRating featuresRating supportRating");

    // Calculate the overallRating dynamically
    const sortedResults = results
      .map((software) => {
        const overallRating = (
          ((software.priceRating || 0) +
            (software.easeOfUseRating || 0) +
            (software.featuresRating || 0) +
            (software.supportRating || 0)) /
          4
        ).toFixed(1); // Average and round to one decimal place

        return {
          ...software.toObject(),
          overallRating: parseFloat(overallRating), // Add overallRating dynamically
        };
      })
      .sort((a, b) => b.overallRating - a.overallRating); // Sort by overallRating in descending order

    return new Response(JSON.stringify(sortedResults), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error searching for software:", error);
    return new Response(
      JSON.stringify({ error: "Failed to search for software" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
