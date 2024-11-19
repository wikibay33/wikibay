'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Home, FileText, Users, PlusCircle, Menu, LogOut, PenLine } from 'lucide-react';
import AddSoftware from '@/components/add-software/AddSoftware';
import BlogForm from '@/components/blogForm/BlogForm';
// import AllSoftwares from '@/components/adminComponents/all-softwares/AllSoftwares';
// import AllUsers from '@/components/adminComponents/all-users/AllUsers';
// import AllBlogsAdmin from './all-blogs/AllBlogsAdmin';

import { SignOutButton } from '@clerk/nextjs';
import AllBlogsAdmin from './all-blogs/AllBlogsAdmin';
import AllSoftwares from './all-softwares/AllSoftwares';

export default function AdminComponents() {
  const [showForm, setShowForm] = useState('add-software-form');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const updateMedia = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    updateMedia();
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSidebarToggle = () => {
    if (!isDesktop) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleClickIcon = (e, show) => {
    e.stopPropagation();
    setIsSidebarOpen(false);
    setShowForm(show);
  };

  return (
    <div className="flex w-full">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={` z-40 p-2 lg:p-8 bg-gray-600 text-white transition-all duration-300 ${
          isSidebarOpen ? 'fixed w-1/2 h-screen' : 'w-16 sticky top-24'
        } lg:w-64`}
        onClick={handleSidebarToggle}
      >
       
        
        {/* Sticky icons */}
        <nav className="flex flex-col space-y-2 sticky top-24">
        <div className="flex items-center justify-between p-2 ">
          {/* <h2 className={`text-xl font-bold ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>My App</h2> */}
          <button className="lg:hidden focus:outline-none" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
          <div className="flex gap-2 items-center p-2 text-base font-semibold hover:bg-gray-700 rounded-md" onClick={(e) => handleClickIcon(e, 'add-software-form')}>
            <PlusCircle className="w-6 h-6" /> <span className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block ml-2`}>Add Software</span>
          </div>
          <div className="flex gap-2 items-center p-2 text-base font-semibold hover:bg-gray-700 rounded-md" onClick={(e) => handleClickIcon(e, 'add-blog-form')}>
            <PenLine className="w-6 h-6" /> <span className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block ml-2`}>Add Blog</span>
          </div>
          <div className="flex gap-2 items-center p-2 text-base font-semibold hover:bg-gray-700 rounded-md" onClick={(e) => handleClickIcon(e, 'All-softwares')}>
            <Home className="w-6 h-6" /> <span className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block ml-2`}>All Softwares</span>
          </div>
          <div className="flex gap-2 items-center p-2 text-base font-semibold hover:bg-gray-700 rounded-md" onClick={(e) => handleClickIcon(e, 'All-blogs')}>
            <FileText className="w-6 h-6" /> <span className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block ml-2`}>All Blogs</span>
          </div>
          {/* <div className="flex gap-2 items-center p-2 text-base font-semibold hover:bg-gray-700 rounded-md" onClick={(e) => handleClickIcon(e, 'All-users')}>
            <Users className="w-6 h-6" /> <span className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block ml-2`}>All Users</span>
          </div> */}
          <div className="flex gap-2 items-center p-2 text-base font-semibold hover:bg-gray-700 rounded-md">
            <LogOut className="w-6 h-6" /> <SignOutButton className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block ml-2`}>Sign Out</SignOutButton>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-800 transition-all duration-300">
        {showForm === 'add-software-form' && <AddSoftware />}
        {showForm === 'add-blog-form' && <BlogForm setShowForm={setShowForm} />}
        {showForm === 'All-softwares' && <AllSoftwares />}
        {showForm === 'All-blogs' && <AllBlogsAdmin />}
        {/* {showForm === 'All-users' && <AllUsers />} */}
      </div>
    </div>
  );
}
