import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 py-10 px-6 lg:px-20">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          At <span className="font-semibold">Wikibay.io</span>, we value your privacy. This policy explains how we handle your information.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">1. Information We Collect</h2>
        <p className="text-gray-700 mb-4">
          We may collect personal information like your name and email, and non-personal information like your IP address.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">2. How We Use Your Information</h2>
        <p className="text-gray-700 mb-4">
          Your information is used to improve our services, communicate with you, and analyze website performance.
        </p>
        <h2 className="text-xl font-semibold text-gray-800 mt-6">3. Data Security</h2>
        <p className="text-gray-700">
          We take reasonable measures to protect your data but cannot guarantee 100% security.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
