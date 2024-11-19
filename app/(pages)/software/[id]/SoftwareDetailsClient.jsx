// app/(pages)/software/[id]/SoftwareDetailsClient.jsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Updated import for navigation
import Image from 'next/image';

export default function SoftwareDetailsClient({ software }) {
    const [newReview, setNewReview] = useState({ username: '', rating: '', comment: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const router = useRouter();

    const handleReviewChange = (e) => {
        const { name, value } = e.target;
        setNewReview({
            ...newReview,
            [name]: value,
        });
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const method = isEditing ? 'PUT' : 'POST';
        try {
            const response = await fetch(`/api/softwares/update-software/${software._id}`, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newReview),
            });
            if (response.ok) {
                router.refresh(); // Refresh data after submit
                setNewReview({ username: '', rating: '', comment: '' });
                setIsEditing(false);
                setEditIndex(null);
            } else {
                alert('Failed to submit the review');
            }
        } catch (error) {
            console.error('Error submitting the review:', error);
            alert('An error occurred while submitting the review');
        }
    };

    const handleEditReview = (index) => {
        setNewReview(software.reviews[index]);
        setIsEditing(true);
        setEditIndex(index);
    };
    const renderStars = (rating) => {
        if (typeof rating !== 'number' || isNaN(rating) || rating < 0) {
            rating = 0; // Default to 0 if invalid
        }
    
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - Math.ceil(rating);
    
        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, index) => (
                    <span key={index} className="text-yellow-500">&#9733;</span>
                ))}
                {halfStar && <span className="text-yellow-500">&#9733;</span>}
                {[...Array(emptyStars)].map((_, index) => (
                    <span key={index + fullStars} className="text-gray-300">&#9733;</span>
                ))}
            </div>
        );
    };
    

    return (
        <div className="flex flex-col md:flex-row gap-6">
            {/* Software Details */}
            <div className="flex-1 bg-white p-4 shadow-md rounded-md">
                <h1 className="text-3xl font-bold mb-4">{software.name}</h1>
                <Image src={software.logo} alt={software.name} height={100} width={100} className="mb-4 w-32 h-32" />
                <p className="text-lg mb-2">Company: {software.company}</p>
                <p className="text-lg mb-4">{software.description}</p>
                <div>
                    <h2 className="text-xl font-bold mb-2">Ratings</h2>
                    <div>
                    <p>Overall: {renderStars(software.rating?.overall ?? 0)}</p>
<p>Price: {renderStars(software.rating?.price ?? 0)}</p>
<p>Ease of Use: {renderStars(software.rating?.easeOfUse ?? 0)}</p>
<p>Features: {renderStars(software.rating?.features ?? 0)}</p>
<p>Support: {renderStars(software.rating?.support ?? 0)}</p>
                    </div>
                </div>
            </div>

            {/* User Reviews */}
            <div className="flex-1 bg-white p-4 shadow-md rounded-md">
                <h2 className="text-2xl font-bold mb-4">User Reviews</h2>
                {software.reviews.length > 0 ? (
                    software.reviews.map((review, index) => (
                        <div key={index} className="mb-4 p-3 bg-gray-50 border rounded-md">
                            <p>
                                <strong>{review.username}</strong> rated{' '}
                                <span className="text-yellow-500">{renderStars(review.rating)}</span>
                            </p>
                            <p>{review.comment}</p>
                            <button
                                className="mt-2 text-blue-500"
                                onClick={() => handleEditReview(index)}
                            >
                                Edit Review
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
                <h2 className="text-2xl font-bold mt-6 mb-4">
                    {isEditing ? 'Edit Your Review' : 'Add a Review'}
                </h2>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={newReview.username}
                            onChange={handleReviewChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Rating</label>
                        <input
                            type="number"
                            name="rating"
                            value={newReview.rating}
                            onChange={handleReviewChange}
                            min="0"
                            max="5"
                            step="0.1"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium">Comment</label>
                        <textarea
                            name="comment"
                            value={newReview.comment}
                            onChange={handleReviewChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                        {isEditing ? 'Update Review' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    );
}
