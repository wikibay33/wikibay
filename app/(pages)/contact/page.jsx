// pages/contact.jsx

import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-bold text-center text-teal-600 mb-8">Contact Us</h2>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <Mail className="text-teal-600 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Email Us</h4>
            <p className="text-gray-700">info@wikibay.com</p>
          </div>
          <div className="text-center">
            <Phone className="text-teal-600 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Call Us</h4>
            <p className="text-gray-700">+1 (123) 456-7890</p>
          </div>
          <div className="text-center">
            <MapPin className="text-teal-600 w-12 h-12 mx-auto mb-4" />
            <h4 className="text-xl font-semibold">Visit Us</h4>
            <p className="text-gray-700">123 WikiBay St, Tech City, USA</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 mb-12">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
            <Facebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
            <Twitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-700">
            <Linkedin size={24} />
          </a>
        </div>

        {/* Contact Form */}
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-teal-600 mb-6">Send Us a Message</h3>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 h-32"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
