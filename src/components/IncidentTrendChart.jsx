import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const IncidentTrendChart = ({ data }) => {
  return (
    <div className="lg:col-span-2 bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333] flex flex-col h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-bold text-lg">Incident Trend Analysis</h3>
          <p className="text-sm text-gray-400">Hourly incident volume by category</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#2a2a20] text-xs font-bold hover:bg-gray-200 transition-colors">DDoS</button>
          <button className="px-3 py-1 rounded-full bg-gray-100 dark:bg-[#2a2a20] text-xs font-bold hover:bg-gray-200 transition-colors">Phishing</button>
          <button className="px-3 py-1 rounded-full bg-primary text-black text-xs font-bold shadow-sm">All</button>
        </div>
      </div>
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f9f506" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f9f506" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#333" strokeDasharray="3 3" opacity={0.3} />
            <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af', fontSize: 12 }}
                dy={10}
            />
            <Tooltip
                contentStyle={{ backgroundColor: '#1c1c15', borderColor: '#333', borderRadius: '8px', color: '#fff' }}
                itemStyle={{ color: '#f9f506' }}
            />
            <Area
                type="monotone"
                dataKey="value"
                stroke="#f9f506"
                fillOpacity={1}
                fill="url(#colorIncidents)"
                strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentTrendChart;