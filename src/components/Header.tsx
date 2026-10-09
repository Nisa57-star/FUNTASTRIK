import React from 'react';
import { TabType } from '../types/circuits';
import { 
  Home, 
  Cpu, 
  Share2, 
  LineChart, 
  Lightbulb, 
  ClipboardList,
  Zap
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'komponen', label: 'Komponen Rangkaian', icon: Cpu },
    { id: 'simulasi', label: 'Simulasi Rangkaian', icon: Share2 },
    { id: 'hukum-ohm', label: 'Eksperimen Hukum Ohm', icon: LineChart },
    { id: 'stem-challenge', label: 'Tantangan STEM Paper Circuit', icon: Lightbulb },
    { id: 'kuis-refleksi', label: 'Kuis & Refleksi', icon: ClipboardList },
  ];

  return (
    <header className="relative z-50 pt-2 px-3 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center justify-between gap-3">
        {/* Brand Logo Lockup matching the image */}
        <div className="flex items-center gap-3">
          {/* Round Blue Home Icon Button */}
          <button
            onClick={() => setActiveTab('beranda')}
            title="Kembali ke Beranda"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center shadow-md border-2 border-white transition-all cursor-pointer shrink-0"
          >
            <Home className="w-6 h-6 fill-white" />
          </button>

          {/* Fantastrik Fun Playful Logo */}
          <div 
            onClick={() => setActiveTab('beranda')}
            className="cursor-pointer select-none group"
          >
            <div className="relative inline-block">
              {/* Playful 3D Bubbly Text */}
              <div className="flex items-baseline font-black tracking-wider text-2xl sm:text-3xl text-sky-400 drop-shadow-[0_3px_2px_rgba(15,23,42,0.8)] filter">
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">F</span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">A</span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">N</span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)] relative">
                  T
                  {/* Little lightbulb icon on top of T */}
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-amber-300 animate-pulse">
                    💡
                  </span>
                </span>
                <span className="text-amber-400 drop-shadow-[0_2px_3px_rgba(180,83,9,1)] flex items-center mx-0.5">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-300 text-amber-400 inline" />
                </span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">T</span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">R</span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">I</span>
                <span className="text-white drop-shadow-[0_2px_3px_rgba(2,132,199,1)]">K</span>
              </div>

              {/* Subtitle Yellow Banner */}
              <div className="bg-amber-300 text-slate-900 font-extrabold text-[9px] sm:text-[10px] tracking-tight px-2.5 py-0.5 rounded-full border border-amber-400 shadow-sm whitespace-nowrap mt-0.5 text-center">
                Fun Learning through STEM and Interactive Electricity
              </div>
            </div>
          </div>
        </div>

        {/* Top Navigation Tabs Container (White rounded bar) */}
        <nav className="bg-white/95 backdrop-blur-md border-2 border-white rounded-2xl shadow-md p-1.5 flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-amber-300 text-slate-900 shadow-sm border border-amber-400'
                    : 'text-slate-700 hover:text-blue-700 hover:bg-sky-50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-slate-900 fill-slate-900/20' : 'text-blue-600'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
