import React, { useState, useEffect } from 'react';
import { Database, Laptop, Router } from 'lucide-react';

const AffectedAssets = () => {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    fetch('/api/assets')
      .then(res => res.json())
      .then(data => setAssets(data))
      .catch(err => console.error("Error fetching assets:", err));
  }, []);

  const getIcon = (type) => {
    switch(type) {
      case 'db': return <Database size={16} />;
      case 'laptop': return <Laptop size={16} />;
      case 'router': return <Router size={16} />;
      default: return <Database size={16} />;
    }
  };

  const getColor = (severity) => {
    switch(severity) {
      case 'critical': return 'text-red-600 dark:text-red-400';
      case 'high': return 'text-orange-500';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg">Top Affected Assets</h3>
        <button className="text-xs font-bold text-primary bg-black dark:bg-white dark:text-black px-3 py-1 rounded-full hover:opacity-80 transition-opacity">View All</button>
      </div>
      <div className="flex flex-col gap-3">
        {assets.map((asset, i) => (
          <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-background-light dark:bg-[#2a2a20]">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white dark:bg-[#1c1c15] rounded-full border border-[#e6e6db] dark:border-[#333]">
                <span className="text-gray-500 text-sm">
                  {getIcon(asset.type)}
                </span>
              </div>
              <div>
                <p className="text-sm font-bold">{asset.name}</p>
                <p className="text-xs text-gray-500">{asset.issue}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-black ${getColor(asset.severity)}`}>{asset.count.toString().padStart(2, '0')}</p>
              <p className="text-[10px] text-gray-400">Incidents</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AffectedAssets;