import React, { useState } from 'react';
import { Home, Search, Compass, PlusCircle, Bell, X, Search as SearchIcon,MessageCircleMore,Swords } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function VerticalMenu() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  // const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  return (
    <>
      {/* Sidebar Menu */}
      <div className="flex flex-col w-20 h-screen  p-4 z-20">
        {/* App Name */}
        <div className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent hover:from-blue-400 hover:via-green-500 hover:to-yellow-500 transition-all duration-500 ease-in-out hover:scale-110">
          <Swords className='h-6 w-6' />
        </div>

        {/* Menu Items */}
        <nav className="space-y-6">
          {/* Home */}
          <a
            href="/"
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 relative group"
          >
            <Home className="h-6 w-6" />
            {/* <span className="relative transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-3">
              Home
            </span> */}
          </a>


          {/* Search (opens the drawer) */}
          <button
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300"
            onClick={toggleDrawer}
          >
            <div

              className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 relative group"
            >
              <Search className="h-6 w-6" />
              {/* <span className="relative transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-3">
                Search
              </span> */}
            </div>

          </button>

          {/* Explore */}
          <a
            href="Explore"
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 relative group"
          >
            <Compass className="h-6 w-6" />
            {/* <span className="relative transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-3">
              Explore
            </span> */}
          </a>
          <a
            href="Chat"
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 relative group"
          >
            <MessageCircleMore className="h-6 w-6" />
            {/* <span className="relative transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-3">
              Chats
            </span> */}
          </a>


          {/* Create */}
          <a
            href="/Create"
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 relative group"
          >
            <PlusCircle className="h-6 w-6" />
            {/* <span className="relative transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-3">
              Create
            </span> */}
          </a>


          {/* Notifications */}
          <a
            href="#"
            className="flex items-center space-x-3 text-lg text-gray-700 hover:text-blue-500 transition-colors duration-300 relative group"
          >
            <Bell className="h-6 w-6" />
            {/* <span className="relative transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-3">
              Notifications
            </span> */}
          </a>

        </nav>
      </div>

      {/* Drawer */}
      <div
        className={`fixed rounded-md top-0 left-0 h-full w-[28rem] bg-gray-200 shadow-lg z-50 transform ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300"
          onClick={toggleDrawer}
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>

        {/* Search Section */}
        <div className="p-6 mt-16">
          {/* Search Title */}
          <h2 className="text-2xl font-bold text-black mb-4">Search</h2>

          <div className="relative">
            {/* Input Box */}
            <input
              type="text"
              placeholder="Search..."
              onFocus={handleFocus}
              onBlur={handleBlur}
              className="w-full p-3 pl-12 h-10  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black transition-all duration-300"
            />
            {/* Search Icon */}
            {!isInputFocused && (
              <SearchIcon className="absolute left-5 top-3 h-4 text-gray-500" />
            )}
            {/* Cross Icon */}
            {isInputFocused && (
              <button
                className="absolute left-3 top-3 text-gray-500"
                onClick={() => document.querySelector('input').value = ''}
              >
                <X className="absolute left-3 w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-900 my-4"></div>

        {/* Search Results */}
        <div className="p-6">
          {/* Placeholder for search results */}
          <p className="text-black">Results will be displayed here...</p>
        </div>
      </div>

      {/* Overlay to close drawer when clicking outside */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={toggleDrawer}
        ></div>
      )}
    </>
  );
}
