import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPICards from './components/KPICards';
import IncidentTrendChart from './components/IncidentTrendChart';
import ThreatMap from './components/ThreatMap';
import AffectedAssets from './components/AffectedAssets';
import FirewallActivity from './components/FirewallActivity';
import ComplianceSection from './components/ComplianceSection';

function App() {
  const [timeRange, setTimeRange] = useState('24H');
  const [data, setData] = useState({
    attacks: { count: 0, trend: 0 },
    logins: { count: 0, trend: 0 },
    malware: { count: 0, changes: 0, severity: 0 },
    score: 0,
    trendData: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpiRes, trendRes] = await Promise.all([
          fetch('/api/kpi-stats'),
          fetch('/api/trends')
        ]);

        const kpiData = await kpiRes.json();
        const trendData = await trendRes.json();

        setData({
          ...kpiData,
          trendData
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
    // In a real app, we would re-fetch when timeRange changes
    // fetchData(timeRange);
  }, [timeRange]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark text-[#181811] dark:text-white font-display">
      <Sidebar />
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        <Header timeRange={timeRange} setTimeRange={setTimeRange} />

        <div className="p-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
            <KPICards data={data} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[400px]">
                <IncidentTrendChart data={data.trendData} />
                <ThreatMap />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AffectedAssets />
                <FirewallActivity />
                <ComplianceSection />
            </div>
        </div>
      </main>
    </div>
  );
}

export default App;