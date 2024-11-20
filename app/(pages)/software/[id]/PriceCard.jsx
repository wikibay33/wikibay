import React from 'react';

export default function PriceCard({ plan, index }) {
  console.log(plan);

  // Process featuresIncluded - handle both single and multiple items
  const features =
    plan.featuresIncluded.length > 0
      ? plan.featuresIncluded[0]?.includes(',')
        ? plan.featuresIncluded[0]?.split(',').map((feature) => feature.trim())
        : [plan.featuresIncluded[0]]
      : [];

  return (
    <div
      className={`flex flex-col justify-start items-center gap-4 p-4 text-center border-2 ${
        index === 0
          ? 'border-t-red-400'
          : index === 1
          ? 'border-t-blue-400'
          : index === 2
          ? 'border-t-green-400'
          : 'border-t-gray-400' // default color if index is not 0, 1, or 2
      }`}
    >
      <h2 className="text-3xl text-center">{plan.planName}</h2>
      <h2
        className={`text-3xl font-bold text-center ${
          index === 0
            ? 'text-red-400'
            : index === 1
            ? 'text-blue-400'
            : index === 2
            ? 'text-green-400'
            : 'border-t-gray-400' // default color if index is not 0, 1, or 2
        }`}
      >
        ${plan.price}/mo
      </h2>
      <h2>{plan.additionalInfo}</h2>
      <h2 className="font-bold border-grey border-t-2 p-2">{plan.planName} includes:</h2>
      <ul className="list-disc text-left pl-4">
        {features.map((feature, i) => (
          <li key={i} className="mb-1">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
