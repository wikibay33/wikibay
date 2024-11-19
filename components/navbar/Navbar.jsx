'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Grid, Info, User } from 'lucide-react';
import { UserButton, useUser } from '@clerk/nextjs';
import Image from 'next/image';

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md py-4 text-black sticky top-0 z-50">
        <div className="container mx-auto md:px-8 px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center text-3xl font-bold">
            <Image src="/logo-transparent.png" height={100} width={50} alt="logo" />
            <span className="text-2xl font-bold bg-gradient-to-r from-teal-800 via-green-800 to-green-700 bg-clip-text text-transparent">
              WikiBay.io
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="space-x-6 hidden md:block">
            <Link href="/" className="text-lg hover:underline">Home</Link>
            <Link href="/categories" className="text-lg hover:underline">Categories</Link>
            <Link href="/about" className="text-lg hover:underline">About</Link>
            <Link href="/contact" className="text-lg hover:underline">Contact Us</Link>
          </div>

          {/* User Links */}
          <div className="flex items-center justify-center gap-8">
            {/* Render placeholder if data isn’t fully loaded */}
            {!isLoaded ? (
              <div className="flex items-center gap-4 ">
                <span className="animate-pulse bg-white rounded h-6 w-20"></span>
                <span className="animate-pulse bg-white rounded h-6 w-12"></span>
              </div>
            ) : isSignedIn ? (
              <>
                {user?.publicMetadata?.role === 'admin' && (
                  <Link href="/admin">
                    <button>Admin</button>
                  </Link>
                )}
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-teal-800 via-green-700 to-green-600 py-1 px-2 rounded-xl text-white">
                <Link href="/sign-in" className="text-lg hover:underline">Sign In</Link>
                <span>/</span>
                <Link href="/sign-up" className="text-lg hover:underline">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Bottom Navigation Bar (Mobile) */}
      <nav className="bg-white shadow-md py-4 fixed bottom-0 left-0 right-0 border-t text-black block md:hidden z-50">
        <div className="flex justify-around items-center">
          <Link href="/" className="flex flex-col items-center">
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/categories" className="flex flex-col items-center">
            <Grid className="h-6 w-6" />
            <span className="text-xs mt-1">Categories</span>
          </Link>
          <Link href="/about" className="flex flex-col items-center">
            <Info className="h-6 w-6" />
            <span className="text-xs mt-1">About us</span>
          </Link>
          <Link href="/my-software" className="flex flex-col items-center">
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">My Software</span>
          </Link>
        </div>
      </nav>
    </>
  );
}
