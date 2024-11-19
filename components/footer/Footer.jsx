// components/Footer.js
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-teal-800 text-white p-8 pb-24 md:pb-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Menu Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Menu Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/partners">Partners</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
            <li><Link href="/blog">Blog</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms">Terms of Use</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/rate">How We Rate</Link></li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-bold text-2xl mb-4">WikiBay</h3>
          <p className="text-sm mb-4">
            This site helps users find helpful information on products and offers, while earning fees from partner brands. We strive to keep information accurate and up-to-date.
          </p>
          <div className="flex space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-white hover:text-gray-400" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white hover:text-gray-400" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-8">
        &copy; 2024 All rights reserved
      </div>
    </footer>
  );
}
