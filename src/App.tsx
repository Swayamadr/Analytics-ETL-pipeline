import React, { useState } from 'react';
import AnalyticsETLMVP from './sync-engine-mvp';

function App() {
  return (
    <div className="min-h-screen bg-[#020617] p-4 md:p-8 flex flex-col items-center justify-start gap-6 font-sans text-slate-100">
      
      {/* Portfolio Title Header */}
      <div className="text-center space-y-2 mt-4">
        <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Enterprise Data Engineering Showroom
        </h1>
        <p className="text-xs text-slate-400 max-w-md font-medium">
          Production Core System Portfolio Showcase
        </p>
      </div>

      {/* Primary Workspace Viewport Container */}
      <div className="w-full max-w-7xl animate-fade-in">
        <AnalyticsETLMVP />
      </div>
      
    </div>
  );
}

export default App;