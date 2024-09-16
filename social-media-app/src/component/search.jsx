import React, { useState } from 'react';
import { X, Search } from "lucide-react"; // Importing icons from lucide-react

const SearchDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      {/* Search Button */}
      <button
        className="fixed top-4 left-4 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
        onClick={toggleDrawer}
      >
        <Search className="w-6 h-6" />
      </button>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          onClick={toggleDrawer}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Search Bar */}
        <div className="p-6 mt-12">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Search
          </button>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
};

export default SearchDrawer;
