// pages/about.js
import Link from 'next/link';
import React from 'react';
import { FaUsers, FaChartLine, FaShieldAlt, FaBullseye } from 'react-icons/fa';

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-600 to-teal-500 text-white py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About WikiBay</h1>
          <p className="text-xl md:text-2xl">
            Your trusted guide for making informed software and service decisions.
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16 max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaBullseye className="text-teal-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            To help individuals and businesses make the best software and service choices by providing transparent and reliable information.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaChartLine className="text-teal-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Data-Driven Insights</h3>
          <p className="text-gray-600">
            We analyze industry trends and compile unbiased insights to ensure you have access to the latest and most relevant information.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaShieldAlt className="text-teal-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Trust & Transparency</h3>
          <p className="text-gray-600">
            Our platform operates with complete transparency, providing trustworthy reviews and recommendations for all software and services.
          </p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <FaUsers className="text-teal-500 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Community-Focused</h3>
          <p className="text-gray-600">
            We prioritize our user&lsquo;s needs, actively listening to feedback to continuously enhance our services and user experience.
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Our Story</h2>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-8">
            Founded with the vision to simplify software selection for businesses and individuals, WikiBay provides clear, comprehensive, and unbiased information on a wide range of software and services. Through extensive research and user-centered analysis, we aim to guide users to make confident decisions that align with their goals.
          </p>
          <p className="text-lg text-gray-700 text-center max-w-3xl mx-auto">
            At WikiBay, we believe in empowering our users with the knowledge and tools they need to succeed. From reviews to comparisons, our resources are meticulously crafted to offer reliable insights for every user.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">Why Choose WikiBay?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaShieldAlt className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Trusted Expertise</h3>
              <p className="text-gray-600">
                Our team of experts brings years of experience and thorough research to provide accurate and reliable recommendations.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaChartLine className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Up-to-Date Information</h3>
              <p className="text-gray-600">
                We stay on top of the latest trends and changes in the industry to provide you with current, relevant information.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <FaUsers className="text-teal-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">User-Centric Approach</h3>
              <p className="text-gray-600">
                Our platform is designed to serve you, the user. We prioritize your needs and make it easy for you to find what you’re looking for.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-gradient-to-r from-teal-800 via-teal-600 to-teal-500 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Make Informed Decisions?</h2>
          <p className="text-lg mb-6">
            Join thousands of satisfied users who rely on WikiBay to choose the right software and services.
          </p>
          <Link href="/categories">
            <span className="bg-white text-teal-700 font-semibold py-3 px-8 rounded-lg transition hover:bg-gray-200">
              Explore Our Categories
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
