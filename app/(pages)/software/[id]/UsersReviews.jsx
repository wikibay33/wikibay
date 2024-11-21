"use client";

import React, { useState } from "react";
import ReviewList from "@/components/reviews/ReviewList";
import AddReviewModal from "@/components/reviews/AddReviewModal";

export default function UsersReviews({ software }) {
  const [reviews, setReviews] = useState(software.reviews || []);
  const [showModal, setShowModal] = useState(false);

  const handleAddReview = (newReviews) => {
    setReviews(newReviews); // Update the review list dynamically
    setShowModal(false); // Close the modal
  };

  return (
    <div className="py-10 lg:py-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
        <div className="text-2xl font-bold">Users Reviews</div>
        <button
          className="bg-teal-700 text-white p-2 rounded-xl"
          onClick={() => setShowModal(true)}
        >
          Add Review
        </button>
      </div>
      {reviews.length === 0 ? (
        <>No users reviews yet</>
      ) : (
        <ReviewList reviews={reviews} setReviews={setReviews} softwareId={software._id} />
      )}
      {showModal && (
        <AddReviewModal
          softwareId={software._id}
          onClose={() => setShowModal(false)}
          onAdd={handleAddReview}
        />
      )}
    </div>
  );
}
