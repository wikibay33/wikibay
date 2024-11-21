"use client";

import React from "react";

export default function DeleteReviewModal({ review, onClose, onDelete }) {
  const handleDeleteReview = async () => {
    try {
      await onDelete(); // Call parent function to delete the review
    } catch (error) {
      console.error("Error deleting review:", error.message);
      alert("Error deleting review. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl font-bold mb-4">Delete Review</h2>
        <p>Are you sure you want to delete this review?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-300 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDeleteReview}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
