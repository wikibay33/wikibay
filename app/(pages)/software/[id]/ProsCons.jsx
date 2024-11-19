import React from 'react';

export default function ProsCons({ expretProsCons }) {
  return (
    <div className="flex flex-col justify-start items-start gap-4">
      <div>
        <h2 className="text-green-600 text-2xl font-bold">PROS</h2>
        {(expretProsCons?.pros || []).length > 0 ? (
          expretProsCons.pros.map((pro, i) => (
            <div key={i}>{i + 1}. {pro}</div>
          ))
        ) : (
          <div>No pros available</div>
        )}
      </div>
      <div>
        <h2 className="text-red-600 text-2xl font-bold">CONS</h2>
        {(expretProsCons?.cons || []).length > 0 ? (
          expretProsCons.cons.map((con, i) => (
            <div key={i}>{i + 1}. {con}</div>
          ))
        ) : (
          <div>No cons available</div>
        )}
      </div>
    </div>
  );
}
