"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const AverageRatingProgressBar = ({ reviews }) => {
  const calculateAverageRating = () => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Rounded to one decimal place
  };

  const averageRating = calculateAverageRating();

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-32 h-32">
        <CircularProgressbar
          value={averageRating * 20} // Convert to percentage
          text={`${averageRating} / 5`}
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#34d399", // Tailwind green-500
            textColor: "#000",
            trailColor: "#d1d5db", // Tailwind gray-300
          })}
        />
      </div>
      <p className="text-lg font-semibold text-gray-800">Average Users Rating</p>
    </div>
  );
};

export default AverageRatingProgressBar;
