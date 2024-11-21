import React from 'react';

export default function PriceCard({ plan, index }) {
  return (
    <div
      className={`flex flex-col justify-start items-center gap-4 p-4 text-center border-2 rounded-lg shadow-md ${
        index === 0
          ? 'border-t-red-400'
          : index === 1
          ? 'border-t-blue-400'
          : index === 2
          ? 'border-t-green-400'
          : 'border-t-gray-400'
      }`}
    >
      {/* Plan Name */}
      <h2 className="text-3xl font-bold">{plan.planName}</h2>

      {/* Plan Price */}
      <h3
        className={`text-2xl font-bold ${
          index === 0
            ? 'text-red-400'
            : index === 1
            ? 'text-blue-400'
            : index === 2
            ? 'text-green-400'
            : 'text-gray-400'
        }`}
      >
        ${plan.price}/mo
      </h3>

      {/* Additional Information */}
      <p className="text-sm text-gray-600 p-3 border-b-2 border-b-gray-300 w-full">{plan.additionalInfo}</p>

      {/* Features Section */}
      <div className="w-full text-left">
        <h4 className="font-bold text-lg mb-2">{plan.planName} includes:</h4>
        <ul className="list-disc pl-5">
          {plan.featuresIncluded.map((feature, i) => (
            <li key={i} className="text-gray-800 mb-1">
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
