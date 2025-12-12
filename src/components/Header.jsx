import React from 'react';
import { Search, Bell } from 'lucide-react';

const Header = ({ timeRange, setTimeRange }) => {
  return (
    <header className="sticky top-0 z-20 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#e6e6db] dark:border-[#333]">
      <div className="flex flex-col">
        <h2 className="text-2xl font-black tracking-tight">Security Overview</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Real-time threat analysis and system health</p>
      </div>
      <div className="flex items-center gap-3 flex-wrap justify-end">
        {/* Search */}
        <div className="hidden md:flex h-10 items-center bg-white dark:bg-[#1c1c15] rounded-full px-4 border border-[#e6e6db] dark:border-[#333] w-64 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all">
          <Search className="text-gray-400 size-4" />
          <input
            className="bg-transparent border-none focus:outline-none text-sm w-full ml-2 placeholder:text-gray-400 text-black dark:text-white"
            placeholder="Search logs, IPs, or assets..."
            type="text"
          />
        </div>
        {/* Time Range */}
        <div className="flex items-center bg-white dark:bg-[#1c1c15] rounded-full p-1 border border-[#e6e6db] dark:border-[#333]">
          {['24H', '7D', '30D'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                timeRange === range
                ? 'bg-primary text-black shadow-sm'
                : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-[#2a2a20] dark:text-gray-400 font-medium'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
        {/* Alerts */}
        <button className="relative size-10 rounded-full bg-white dark:bg-[#1c1c15] border border-[#e6e6db] dark:border-[#333] flex items-center justify-center hover:bg-gray-50 dark:hover:bg-[#2a2a20] transition-colors group">
          <Bell className="text-gray-600 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white size-5" />
          <span className="absolute top-0 right-0 size-3 bg-red-500 rounded-full border-2 border-white dark:border-[#1c1c15]"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;