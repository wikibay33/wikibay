// pages/api/softwares/search.js
import { connectToDB } from "@/utils/database";
import Software from "@/models/software";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q");

  try {
    await connectToDB();
    const results = await Software.find({
      name: { $regex: query, $options: "i" }, // Case-insensitive regex match
    })
      .select("name description logo")
      .limit(10);

    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error searching for software:", error);
    return new Response(JSON.stringify({ error: "Failed to search for software" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
