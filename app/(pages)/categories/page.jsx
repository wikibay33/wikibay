import Link from 'next/link';
import React from 'react';
import { FaGlobe, FaBriefcase, FaRobot, FaShoppingCart, FaLaptopCode, FaServer, FaMoneyBillWave } from 'react-icons/fa';

export default function Page() {
    const categories = [
        { name: "VPN", icon: <FaGlobe /> },
        { name: "CRM", icon: <FaBriefcase /> },
        { name: "AI Tools", icon: <FaRobot /> },
        { name: "E-Commerce", icon: <FaShoppingCart /> },
        { name: "Website Builders", icon: <FaLaptopCode /> },
        { name: "Web Hosting", icon: <FaServer /> },
        { name: "Payroll Services", icon: <FaMoneyBillWave /> },
    ];

    return (
        <div className="p-4">
            <h2 className='text-3xl py-6 text-center'>All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                {categories.map((category, i) => (
                    <Link href={`/category/${category.name}`} key={i}>
                    <div
                        
                        className="flex flex-col items-center justify-center p-6 border rounded-lg shadow-md bg-white text-center hover:bg-gray-100"
                    >
                        <div className="text-3xl text-teal-600 mb-2">{category.icon}</div>
                        <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
