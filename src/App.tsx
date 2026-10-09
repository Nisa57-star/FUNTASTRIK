import React, { useState } from 'react';
import { TabType } from './types/circuits';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ComponentExplorationView } from './components/ComponentExplorationView';
import { CircuitSimulationView } from './components/CircuitSimulationView';
import { OhmsLawView } from './components/OhmsLawView';
import { StemChallengeView } from './components/StemChallengeView';
import { QuizReflectionView } from './components/QuizReflectionView';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('beranda'); // Front cover screen requested by user

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 via-sky-300 to-sky-200 flex flex-col text-slate-800 relative overflow-x-hidden selection:bg-amber-300 selection:text-slate-900">
      
      {/* Decorative Cartoon Nature Sky & Hills Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Soft Cartoon Clouds in Sky */}
        <div className="absolute top-4 left-10 w-44 h-16 bg-white/70 rounded-full blur-xs" />
        <div className="absolute top-10 left-20 w-32 h-14 bg-white/80 rounded-full blur-xs" />
        <div className="absolute top-6 right-20 w-60 h-20 bg-white/60 rounded-full blur-xs" />
        <div className="absolute top-14 right-36 w-40 h-16 bg-white/70 rounded-full blur-xs" />

        {/* Rolling Green Hills at Bottom (matching the background in SERI.png) */}
        <div className="absolute -bottom-16 -left-20 w-[120%] h-48 bg-gradient-to-t from-emerald-600 via-emerald-500 to-lime-500 rounded-t-[100%] opacity-90" />
        <div className="absolute -bottom-24 -right-10 w-[90%] h-52 bg-gradient-to-t from-emerald-700 via-green-600 to-emerald-400 rounded-t-[100%] opacity-85" />
      </div>

      {/* Main Content Shell */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation Bar Header */}
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Active Page View */}
        <main className="flex-1 pb-10">
          {activeTab === 'beranda' && <HomeView setActiveTab={setActiveTab} />}
          {activeTab === 'komponen' && <ComponentExplorationView />}
          {activeTab === 'simulasi' && <CircuitSimulationView />}
          {activeTab === 'hukum-ohm' && <OhmsLawView />}
          {activeTab === 'stem-challenge' && <StemChallengeView />}
          {activeTab === 'kuis-refleksi' && <QuizReflectionView />}
        </main>

        {/* Clean Light Footer */}
        <footer className="relative z-10 border-t border-sky-300/40 bg-white/60 backdrop-blur-md py-4 px-4 sm:px-6 text-xs text-slate-700 no-print">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 font-medium">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-blue-900">FANTASTRIK · Virtual Lab</span>
              <span aria-hidden="true">·</span>
              <span>Laboratorium Virtual Rangkaian Listrik IPA SMP Fase D</span>
            </div>
            <div className="text-slate-600">
              Multimedia Pembelajaran Interaktif (MPI) Canva · Inquiry STEM
            </div>
          </div>
        </footer>
      </div>

    </div>
  );
}
