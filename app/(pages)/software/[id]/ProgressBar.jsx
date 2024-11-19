"use client";
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = ({software}) => {
    const priceRating = software.priceRating;
        const easeOfUseRating =software.easeOfUseRating ;
        const featuresRating = software.featuresRating;
        const supportRating =software.supportRating ;

    const overallRating = ((priceRating + easeOfUseRating + featuresRating + supportRating) / 4).toFixed(1);

    const ratingData = [
        { name: 'Price', rating: priceRating },
        { name: 'Ease Of Use', rating: easeOfUseRating },
        { name: 'Features', rating: featuresRating },
        { name: 'Support', rating: supportRating },
    ];

    return (
        <div className="flex items-center space-x-8 py-10">
            {/* Circular progress bar for Overall Rating */}
            <div className="w-24 h-24">
                <CircularProgressbar
                    value={overallRating * 20} // Convert to percentage
                    text={overallRating}
                    styles={buildStyles({
                        textSize: '24px',
                        pathColor: '#3b82f6', // Tailwind blue-500
                        textColor: '#000',
                        trailColor: '#d1d5db', // Tailwind gray-300
                    })}
                />
            </div>

            {/* Horizontal rating bars */}
            <div>
                {ratingData.map((item, index) => (
                    <div key={index} className="flex items-center mb-2">
                        <span className="w-24 text-sm font-medium">{item.name}</span>
                        <div className="flex-1 h-4 bg-gray-300 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500"
                                style={{ width: `${(item.rating / 5) * 100}%` }}
                            ></div>
                        </div>
                        <span className="ml-2 text-sm font-semibold">{item.rating.toFixed(1)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProgressBar;
