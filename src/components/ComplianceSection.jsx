import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { AlertCircle, CheckCircle, Clock } from 'lucide-react';

const ComplianceSection = () => {
  const [data, setData] = useState({ standards: [], violations: [] });

  useEffect(() => {
    fetch('/api/compliance')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.error("Error fetching compliance data:", err));
  }, []);

  const generateReport = () => {
      window.location.href = '/api/report';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pass': return <CheckCircle className="text-green-500 size-5" />;
      case 'Warn': return <AlertCircle className="text-yellow-500 size-5" />;
      case 'Info': return <Clock className="text-blue-500 size-5" />;
      default: return <Clock className="text-gray-500 size-5" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pass': return 'bg-green-500/10 text-green-500';
      case 'Warn': return 'bg-yellow-500/10 text-yellow-500';
      case 'Info': return 'bg-blue-500/10 text-blue-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white dark:bg-[#1c1c15] p-6 rounded-xl border border-[#e6e6db] dark:border-[#333]">

      {/* Policy Violations Donut */}
      <div className="flex flex-col">
        <h3 className="font-bold text-lg mb-4">Policy Violations</h3>
        <div className="flex items-center gap-6">
            <div className="relative size-32 shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data.violations}
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.violations.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-2xl font-black">89%</span>
                    <span className="text-[10px] text-gray-500 uppercase">Compliant</span>
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                {data.violations.map((item, i) => (
                     <div key={i} className="flex justify-between items-center text-sm">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                            <span className="text-gray-600 dark:text-gray-300">{item.name}</span>
                        </div>
                        <span className="font-bold">{item.value}</span>
                    </div>
                ))}
            </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[#f5f5f0] dark:border-[#2a2a20]">
             <button onClick={generateReport} className="w-full py-2 rounded-full border border-[#e6e6db] dark:border-[#333] hover:bg-gray-50 dark:hover:bg-[#2a2a20] text-xs font-bold transition-colors">
                 Generate Compliance Report
             </button>
        </div>
      </div>

      {/* Compliance Scorecard */}
      <div className="flex flex-col">
          <h3 className="font-bold text-lg mb-4">Compliance Status</h3>
          <div className="space-y-4">
              {data.standards.map((std, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-background-light dark:bg-[#2a2a20] rounded-lg">
                      <div className="flex items-center gap-3">
                          {getStatusIcon(std.status)}
                          <div>
                              <p className="font-bold text-sm">{std.standard}</p>
                              <p className="text-xs text-gray-500">{std.description}</p>
                          </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(std.status)}`}>{std.status}</span>
                  </div>
              ))}
          </div>

          <div className="mt-4">
               <div className="flex justify-between text-xs mb-1">
                   <span className="text-gray-500">Audit Log Volume (1h)</span>
                   <span className="font-bold">14,205 Events</span>
               </div>
               <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
                   <div className="bg-primary h-full w-[75%]"></div>
               </div>
          </div>
      </div>

    </div>
  );
};

export default ComplianceSection;