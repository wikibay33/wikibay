"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { CiStar } from "react-icons/ci";
import { AiFillStar } from "react-icons/ai";

export default function AddReviewModal({ softwareId, onClose, onAdd }) {
  const { isSignedIn, user } = useUser();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddReview = async () => {
    if (!rating || !comment) {
      alert("Please provide a rating and a comment.");
      return;
    }

    const review = {
      username: user?.firstName || "Anonymous",
      userId: user?.id,
      rating,
      comment,
      image: user?.imageUrl || null,
    };

    const response = await fetch(`/api/softwares/reviews/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ softwareId, review }),
    });

    if (response.ok) {
      const data = await response.json();
      onAdd(data.software.reviews); // Update parent reviews
    } else {
      alert("Failed to add review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Add Review</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        {!isSignedIn ? (
          <div className="mt-4">
            <p>Please sign in to leave a review.</p>
            <a href="/sign-in" className="text-blue-500 underline">
              Sign In
            </a>
          </div>
        ) : (
          <div className="mt-4">
            <label className="block mb-1 font-semibold">Rating</label>
            <div className="flex gap-1">
    
{[1, 2, 3, 4, 5].map((star) => (
  <button
    key={star}
    type="button"
    className={`text-2xl ${
      rating >= star ? "text-yellow-500" : "text-gray-300"
    }`}
    onClick={() => setRating(star)}
  >
    <AiFillStar />
  </button>
))}
</div>
            <label className="block mt-4 mb-1 font-semibold">Comment</label>
            <textarea
              className="w-full border rounded px-2 py-1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded mr-2"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="bg-teal-700 text-white px-4 py-2 rounded"
                onClick={handleAddReview}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
