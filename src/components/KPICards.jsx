import React from 'react';
import { Shield, TrendingUp, Lock, AlertTriangle, Bug, CheckCircle } from 'lucide-react';

const KPICards = ({ data }) => {
  const { attacks, logins, malware, score } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
      {/* Attacks Blocked */}
      <div className="bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333] flex flex-col justify-between h-[160px] relative overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
        <div className="flex justify-between items-start z-10">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Attacks Blocked</p>
            <p className="text-3xl font-black tracking-tighter">{attacks.count.toLocaleString()}</p>
          </div>
          <span className="text-primary bg-black/5 dark:bg-white/5 p-2 rounded-full">
            <Shield size={24} />
          </span>
        </div>
        <div className="z-10 flex items-center gap-2 mt-auto">
          <span className="bg-[#e0f2e3] text-[#078816] dark:bg-[#078816]/20 dark:text-[#4ade80] text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <TrendingUp size={14} /> {attacks.trend}%
          </span>
          <span className="text-xs text-gray-400">vs last 24h</span>
        </div>
        {/* Decorative Sparkline */}
        <div className="absolute bottom-0 left-0 right-0 h-16 opacity-10 bg-gradient-to-t from-primary/50 to-transparent pointer-events-none"></div>
        <svg className="absolute bottom-0 left-0 right-0 w-full h-16 text-primary opacity-20 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 40">
           <path d="M0 30 Q 10 35, 20 25 T 40 20 T 60 25 T 80 10 L 100 20 V 40 H 0 Z" fill="currentColor"></path>
           <path d="M0 30 Q 10 35, 20 25 T 40 20 T 60 25 T 80 10 L 100 20" fill="none" stroke="currentColor" strokeWidth="2"></path>
        </svg>
      </div>

      {/* Failed Logins */}
      <div className="bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333] flex flex-col justify-between h-[160px] cursor-pointer hover:border-red-500/50 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Failed Logins</p>
            <p className="text-3xl font-black tracking-tighter">{logins.count}</p>
          </div>
          <span className="text-red-500 bg-red-50 dark:bg-red-900/20 p-2 rounded-full">
            <Lock size={24} />
          </span>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
            <AlertTriangle size={14} /> {logins.trend > 0 ? '+' : ''}{logins.trend}%
          </span>
          <span className="text-xs text-gray-400">Alert threshold imminent</span>
        </div>
        <div className="w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full mt-4 overflow-hidden">
          <div className="bg-red-500 h-full rounded-full" style={{ width: '65%' }}></div>
        </div>
      </div>

      {/* Malware Detected */}
      <div className="bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333] flex flex-col justify-between h-[160px] cursor-pointer hover:border-orange-500/50 transition-colors">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Malware Detected</p>
            <p className="text-3xl font-black tracking-tighter">{malware.count.toString().padStart(2, '0')}</p>
          </div>
          <span className="text-orange-500 bg-orange-50 dark:bg-orange-900/20 p-2 rounded-full">
            <Bug size={24} />
          </span>
        </div>
        <div className="flex items-center gap-2 mt-auto">
          <span className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 text-xs font-bold px-2 py-1 rounded-full">
            {malware.changes} changes
          </span>
          <span className="text-xs text-gray-400">Last 7 Days</span>
        </div>
        <div className="flex gap-1 mt-4">
          {[...Array(4)].map((_, i) => (
             <div key={i} className={`h-1.5 w-full rounded-full ${i < malware.severity ? 'bg-orange-500' : 'bg-gray-200 dark:bg-gray-800'}`}></div>
          ))}
        </div>
      </div>

      {/* Security Score */}
      <div className="bg-primary/10 dark:bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-row items-center justify-between h-[160px]">
        <div className="flex flex-col h-full justify-between py-1">
          <div>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-300">Security Score</p>
            <p className="text-4xl font-black tracking-tighter text-black dark:text-primary mt-1">
              {score}
              <span className="text-xl text-gray-400 font-medium">/100</span>
            </p>
          </div>
          <span className={`text-xs font-bold flex items-center gap-1 ${score >= 90 ? 'text-green-700 dark:text-green-400' : score >= 75 ? 'text-yellow-700 dark:text-yellow-400' : 'text-red-700 dark:text-red-400'}`}>
            <CheckCircle size={16} /> {score >= 90 ? 'Excellent' : score >= 75 ? 'Good' : 'Critical'}
          </span>
        </div>
        {/* CSS Only Gauge */}
        <div className="relative size-24">
          <svg className="size-full -rotate-90" viewBox="0 0 36 36">
            <path className="text-gray-200 dark:text-gray-700" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4"></path>
            <path
                className="text-primary drop-shadow-[0_0_4px_rgba(249,245,6,0.6)] transition-all duration-1000 ease-out"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="currentColor"
                strokeDasharray={`${score}, 100`}
                strokeWidth="4"
            ></path>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <CheckCircle className="text-3xl text-gray-800 dark:text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICards;