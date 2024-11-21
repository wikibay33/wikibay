"use client";

import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import EditReviewModal from "@/components/reviews/EditReviewModal";
import DeleteReviewModal from "@/components/reviews/DeleteReviewModal";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import AverageRatingProgressBar from "@/components/reviews/AverageRatingProgressBar";

export default function ReviewList({ reviews, setReviews, softwareId }) {
    const { user } = useUser();
    const [modalType, setModalType] = useState(null);
    const [selectedReview, setSelectedReview] = useState(null);
  
    // Function to calculate average rating
    // const calculateAverageRating = () => {
    //   if (!reviews.length) return 0;
    //   const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    //   return (totalRating / reviews.length).toFixed(1); // Round to one decimal place
    // };
  
    const openModal = (type, review = null) => {
      setModalType(type);
      setSelectedReview(review);
    };
  
    const closeModal = () => {
      setModalType(null);
      setSelectedReview(null);
    };
  
    const handleDeleteReview = async () => {
      const response = await fetch(`/api/softwares/reviews/delete/${selectedReview._id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ softwareId }),
      });
  
      if (response.ok) {
        const data = await response.json();
        setReviews(data.reviews); // Update reviews with the new list
        closeModal();
      } else {
        alert("Failed to delete the review.");
      }
    };
  
    return (
      <div className="py-10">
        {/* Display average rating */}
        {/* <div className="flex items-center gap-2 text-lg font-bold mb-4">
          <span>Average Users Rating:</span>
          <span className="text-teal-800">{calculateAverageRating()}</span>
          <span>/ 5</span>
        </div> */}
        <div className="mb-8">
        <AverageRatingProgressBar reviews={reviews} />
      </div>
        {reviews?.map((review) => (
          <div key={review._id} className="p-4 border rounded mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <FaUser size={14} />
                {review.username}
              </div>
              <div>{Array(review.rating).fill("⭐")}</div>
            </div>
            <p>{review.comment}</p>
            {user?.id === review.userId && (
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => openModal("edit", review)}
                  className="text-blue-500"
                >
                  Edit
                </button>
                <button
                  onClick={() => openModal("delete", review)}
                  className="text-red-500"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
        {modalType === "edit" && (
          <EditReviewModal
            review={selectedReview}
            softwareId={softwareId}
            onClose={closeModal}
            onSave={(updatedReviews) => {
              setReviews(updatedReviews); // Update reviews state dynamically
            }}
          />
        )}
        {modalType === "delete" && (
          <DeleteReviewModal
            review={selectedReview}
            onClose={closeModal}
            onDelete={handleDeleteReview}
          />
        )}
      </div>
    );
  }
  