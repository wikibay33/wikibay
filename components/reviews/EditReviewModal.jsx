"use client";

import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

export default function EditReviewModal({ review, softwareId, onClose, onSave }) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const handleUpdateReview = async () => {
    if (!rating || !comment) {
      alert("Please provide a rating and a comment.");
      return;
    }

    const updatedReview = { rating, comment };

    const response = await fetch(`/api/softwares/reviews/update/${review._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ softwareId, updatedReview }),
    });

    if (response.ok) {
      const data = await response.json();
      onSave(data.reviews); // Update parent reviews state
      onClose();
    } else {
      alert("Failed to update review.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Edit Review</h2>
          <button onClick={onClose}>&times;</button>
        </div>
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
        </div>
        <div className="mt-4">
          <label className="block mb-1 font-semibold">Comment</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-teal-700 text-white px-4 py-2 rounded"
            onClick={handleUpdateReview}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
