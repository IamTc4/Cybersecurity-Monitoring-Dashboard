import React from 'react';
import { LayoutDashboard, Shield, Database, FileText, Settings, LogOut } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex w-[280px] flex-col bg-white dark:bg-[#1c1c15] border-r border-[#e6e6db] dark:border-[#333] h-full justify-between p-6">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <div className="size-10 bg-primary rounded-full flex items-center justify-center text-black">
            <Shield className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-none tracking-tight">CyberGuard</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 uppercase tracking-wider font-semibold">Enterprise Monitor</p>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-full bg-primary text-black transition-all shadow-sm">
            <LayoutDashboard size={20} />
            <span className="font-bold text-sm">Dashboard</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a20] text-gray-700 dark:text-gray-300 transition-colors">
            <Shield size={20} />
            <span className="font-medium text-sm">Threat Intel</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a20] text-gray-700 dark:text-gray-300 transition-colors">
            <Database size={20} />
            <span className="font-medium text-sm">Assets</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a20] text-gray-700 dark:text-gray-300 transition-colors">
            <FileText size={20} />
            <span className="font-medium text-sm">Reports</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-full hover:bg-[#f5f5f0] dark:hover:bg-[#2a2a20] text-gray-700 dark:text-gray-300 transition-colors">
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </a>
        </nav>
      </div>
      <div className="p-4 rounded-xl bg-[#f5f5f0] dark:bg-[#2a2a20] flex items-center gap-3">
        <div className="size-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
             {/* Mock Avatar */}
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex Chen" />
        </div>
        <div className="flex-1 overflow-hidden">
          <p className="text-sm font-bold truncate">Alex Chen</p>
          <p className="text-xs text-gray-500 truncate">Lead Analyst</p>
        </div>
        <button className="text-gray-500 hover:text-black dark:hover:text-white">
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;