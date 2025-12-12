import React, { useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { motion } from "framer-motion";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const ThreatMap = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    fetch('/api/threats')
      .then(res => res.json())
      .then(data => setMarkers(data))
      .catch(err => console.error("Error fetching threat map:", err));
  }, []);

  const getMarkerColor = (type) => {
      switch(type) {
          case 'high': return '#F00';
          case 'medium': return '#f9f506';
          default: return '#f9f506'; // default
      }
  };

  return (
    <div className="lg:col-span-1 bg-white dark:bg-[#1c1c15] rounded-xl border border-[#e6e6db] dark:border-[#333] flex flex-col overflow-hidden relative h-[400px]">
      <div className="p-6 absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <h3 className="font-bold text-lg text-black dark:text-white">Global Threat Landscape</h3>
        <div className="flex items-center gap-2 mt-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <p className="text-xs text-red-500 font-bold">Active Attack Vector: East Asia</p>
        </div>
      </div>

      <div className="flex-1 bg-background-light dark:bg-background-dark relative w-full h-full">
         <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }} style={{ width: "100%", height: "100%" }}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#2a2a20"
                    stroke="#333"
                    strokeWidth={0.5}
                    style={{
                        default: { outline: "none" },
                        hover: { fill: "#333", outline: "none" },
                        pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {markers.map((marker, i) => (
                <Marker key={i} coordinates={marker.coordinates}>
                    <circle r={marker.type === 'high' ? 3 : 2} fill={getMarkerColor(marker.type)} />
                    {marker.active && (
                        <motion.circle
                            r={15}
                            fill="none"
                            stroke={getMarkerColor(marker.type)}
                            strokeWidth={1}
                            initial={{ scale: 0.5, opacity: 1 }}
                            animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    )}
                </Marker>
            ))}
         </ComposableMap>
      </div>

      <div className="p-4 border-t border-[#e6e6db] dark:border-[#333] bg-white/90 dark:bg-[#1c1c15]/90 backdrop-blur-sm z-10">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center gap-2">
            <div className="size-2 bg-primary rounded-full"></div>
            <span>Low/Med</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 bg-red-500 rounded-full"></div>
            <span>Critical</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatMap;