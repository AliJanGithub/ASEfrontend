import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const navigate=useNavigate()
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
const logout=()=>{
  localStorage.removeItem('token');
  navigate('/')

}
  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 text-xl font-bold">School Portal</div>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
             Home
            </Link>
            <Link to="/attendance" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Take Attendance
            </Link>
            <Link to="/student" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Enter Students
            </Link>
            <Link to="/reg" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Register as Teacher
            </Link>
            <Link to="/get" className="hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium">
            Get Your Attendance
            </Link>
            <button className="hover:bg-blue-500 px-3 bg-amber-900 py-2 rounded-md text-sm font-medium" onClick={logout}>Logout</button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500">
             Home
            </Link>
            <Link to="/attendance" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500">
              Take Attendance
            </Link>
            <Link to="/student" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500">
              Enter Students
            </Link>
            <Link to="/reg" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500">
              Register as Teacher
            </Link>
            <Link to="/get" className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500">
              Get You Attendance
            </Link>
            <button className="block bg-amber-900 px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-500" onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
}
