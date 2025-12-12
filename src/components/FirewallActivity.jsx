import React, { useState, useEffect } from 'react';
import { BarChart, Bar, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const FirewallActivity = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/firewall')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Error fetching firewall activity:", err));
  }, []);

  return (
    <div className="bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-lg">Firewall Activity</h3>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs text-gray-500">Live</span>
        </div>
      </div>
      <div className="flex-1 w-full min-h-[100px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Tooltip
                cursor={{fill: 'transparent'}}
                contentStyle={{ backgroundColor: '#1c1c15', borderColor: '#333', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]}>
              {data.map((entry, index) => (
                <Cell
                    key={`cell-${index}`}
                    fill={entry.type === 'blocked' ? '#f87171' : entry.value >= 70 ? '#22c55e' : '#374151'}
                    className="transition-all duration-300 hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-[#f5f5f0] dark:border-[#2a2a20]">
        <div>
          <p className="text-xs text-gray-500 mb-1">Allowed Conn.</p>
          <p className="text-lg font-bold">1.2k <span className="text-xs font-normal text-green-600">req/s</span></p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Blocked Conn.</p>
          <p className="text-lg font-bold">48 <span className="text-xs font-normal text-red-500">req/s</span></p>
        </div>
      </div>
    </div>
  );
};

export default FirewallActivity;