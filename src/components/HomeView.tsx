import React from 'react';
import { TabType } from '../types/circuits';
import { 
  Play, 
  Lightbulb, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Cpu, 
  Workflow, 
  Compass, 
  HelpCircle,
  Scissors,
  Home,
  Share2,
  LineChart,
  ClipboardList,
  Check,
  Zap
} from 'lucide-react';

interface HomeViewProps {
  setActiveTab: (tab: TabType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab }) => {
  const learningObjectives = [
    {
      num: '01',
      title: 'Identifikasi Komponen & Fungsi',
      desc: 'Mengenal baterai, kabel konduktor, sakelar, lampu/LED, dan resistor beserta simbol skematiknya.',
    },
    {
      num: '02',
      title: 'Rangkaian Terbuka vs Tertutup',
      desc: 'Membedakan kondisi aliran arus saat sakelar terputus (terbuka) dan saat membentuk lintasan tertutup (loop).',
    },
    {
      num: '03',
      title: 'Karakteristik Seri & Paralel',
      desc: 'Menganalisis perilaku arus, tegangan, dan dampak putusnya satu cabang pada susunan seri dan paralel.',
    },
    {
      num: '04',
      title: 'Pengaruh Tegangan & Hambatan',
      desc: 'Menyelidiki perubahan kuat arus listrik ketika tegangan sumber dinaikkan atau nilai resistor diperbesar.',
    },
    {
      num: '05',
      title: 'Penerapan Hukum Ohm',
      desc: 'Menggunakan rumus V = I × R untuk menyelesaikan perhitungan matematis sederhana pada rangkaian listrik.',
    },
    {
      num: '06',
      title: 'Rancang Paper Circuit STEM',
      desc: 'Mengaplikasikan prinsip rangkaian ke proyek nyata: membuat boneka kertas bercahaya dengan pita tembaga dan LED.',
    },
    {
      num: '07',
      title: 'Kesimpulan Berbasis Bukti',
      desc: 'Menyampaikan argumentasi ilmiah dan kesimpulan berdasarkan data simulasi aktual, bukan sekadar hafalan.',
    },
  ];

  const inquirySteps = [
    {
      step: 'Tahap 1',
      title: 'Orientasi Masalah',
      desc: 'Mengamati pertanyaan pemantik: Mengapa lampu pada suatu rangkaian dapat menyala terang, sedangkan yang lain redup atau padam?',
      icon: Compass,
    },
    {
      step: 'Tahap 2',
      title: 'Prediksi & Hipotesis',
      desc: 'Menyusun dugaan awal mengenai pengaruh kondisi sakelar, polaritas LED, nilai tegangan, serta susunan seri dan paralel.',
      icon: HelpCircle,
    },
    {
      step: 'Tahap 3',
      title: 'Penyelidikan Virtual',
      desc: 'Mengubah variabel tegangan dan hambatan secara interaktif di laboratorium simulasi untuk mengamati kuat arus.',
      icon: Cpu,
    },
    {
      step: 'Tahap 4',
      title: 'Analisis Data & Grafik',
      desc: 'Merekam data ke tabel pengamatan dan mengamati kurva hubungan V terhadap I pada Hukum Ohm.',
      icon: Workflow,
    },
    {
      step: 'Tahap 5',
      title: 'Menyusun Kesimpulan',
      desc: 'Menjawab pertanyaan penyelidikan dengan fakta empiris dari amperemeter dan voltmeter hasil simulasi aktual.',
      icon: CheckCircle2,
    },
    {
      step: 'Tahap 6',
      title: 'Solusi Rekayasa STEM',
      desc: 'Mentransfer konsep ke proyek paper circuit nyata: Merancang boneka kertas dengan baterai koin dan pita konduktif.',
      icon: Scissors,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      
      {/* ============================================================== */}
      {/* HERO SECTION: FANTASTRIK EXACT REPLICA OF THE COVER SCREEN     */}
      {/* ============================================================== */}
      <section className="relative px-3 sm:px-6 pt-2">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-b from-sky-400 via-sky-300 to-emerald-400 shadow-2xl border-4 border-white/80 overflow-hidden relative min-h-[580px] sm:min-h-[640px] flex flex-col justify-between p-4 sm:p-8">
          
          {/* Nature Background Elements (Sun, Clouds, Wind Turbines, Solar Panels) */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            {/* Sun in Top-Right */}
            <div className="absolute top-6 right-8 w-20 h-20 sm:w-28 sm:h-28 bg-amber-300 rounded-full shadow-[0_0_40px_rgba(253,224,71,0.9)] border-4 border-amber-200">
              <div className="w-full h-full rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200" />
            </div>

            {/* Clouds */}
            <div className="absolute top-10 left-12 w-44 h-16 bg-white/80 rounded-full blur-xs" />
            <div className="absolute top-16 left-28 w-32 h-14 bg-white/90 rounded-full blur-xs" />
            <div className="absolute top-8 right-44 w-52 h-16 bg-white/80 rounded-full blur-xs" />

            {/* Wind Turbines on Left */}
            <div className="absolute bottom-28 left-6 sm:left-12 opacity-80 flex items-end gap-6">
              <div className="w-2.5 h-32 bg-white/90 rounded-t-full relative">
                <div className="w-16 h-1 bg-white/90 absolute -top-1 -left-7 rotate-45" />
                <div className="w-16 h-1 bg-white/90 absolute -top-1 -left-7 -rotate-45" />
              </div>
              <div className="w-2 h-24 bg-white/80 rounded-t-full relative">
                <div className="w-12 h-1 bg-white/80 absolute -top-1 -left-5 rotate-45" />
                <div className="w-12 h-1 bg-white/80 absolute -top-1 -left-5 -rotate-45" />
              </div>
            </div>

            {/* Solar Panels on Left Bottom */}
            <div className="absolute bottom-20 left-4 sm:left-16 w-28 h-16 bg-blue-700/80 border-2 border-white rounded-lg -rotate-12 grid grid-cols-3 grid-rows-2 gap-1 p-1 opacity-80 shadow-md">
              <div className="bg-sky-400/80 rounded-xs" />
              <div className="bg-sky-400/80 rounded-xs" />
              <div className="bg-sky-400/80 rounded-xs" />
              <div className="bg-sky-400/80 rounded-xs" />
              <div className="bg-sky-400/80 rounded-xs" />
              <div className="bg-sky-400/80 rounded-xs" />
            </div>

            {/* Rolling Hills Background */}
            <div className="absolute -bottom-16 left-0 right-0 h-44 bg-gradient-to-t from-emerald-700 via-emerald-600 to-green-500 rounded-t-[100%] opacity-90" />
          </div>

          {/* Top Center: Main Logo, Badges, and Pinned Note */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2 sm:pt-4">
            
            {/* Left Area: Boy Engineer Mascot Illustration */}
            <div className="lg:col-span-3 flex justify-center lg:justify-start items-center">
              <div className="relative w-48 sm:w-60 lg:w-68 filter drop-shadow-xl select-none group">
                {/* SVG High-Fidelity Illustration of Young Boy Engineer Mascot */}
                <svg viewBox="0 0 240 320" className="w-full h-auto">
                  {/* Energy Aura behind cap */}
                  <circle cx="120" cy="110" r="85" fill="#fef08a" opacity="0.3" filter="blur(8px)" />
                  
                  {/* White Cap with Blue Trim and Lightning Bolt */}
                  <path d="M 60 90 Q 120 40 180 90 Q 210 110 200 130 L 40 130 Q 30 110 60 90 Z" fill="#ffffff" stroke="#1e3a8a" strokeWidth="3" />
                  <path d="M 40 130 Q 120 150 200 130 L 220 140 Q 120 165 20 140 Z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="2.5" />
                  {/* Lightning emblem on Cap */}
                  <polygon points="120,65 110,88 122,88 114,115 134,84 122,84" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                  
                  {/* Cute Face */}
                  <circle cx="120" cy="140" r="50" fill="#fed7aa" stroke="#78350f" strokeWidth="2" />
                  {/* Hair tufts */}
                  <path d="M 70 120 Q 90 95 120 100 Q 150 95 170 120" fill="#451a03" />
                  {/* Eyes */}
                  <ellipse cx="102" cy="138" rx="7" ry="10" fill="#1e293b" />
                  <circle cx="105" cy="134" r="3" fill="#ffffff" />
                  <ellipse cx="138" cy="138" rx="7" ry="10" fill="#1e293b" />
                  <circle cx="141" cy="134" r="3" fill="#ffffff" />
                  {/* Rosy cheeks */}
                  <ellipse cx="88" cy="150" rx="9" ry="5" fill="#f43f5e" opacity="0.4" />
                  <ellipse cx="152" cy="150" rx="9" ry="5" fill="#f43f5e" opacity="0.4" />
                  {/* Happy Smile */}
                  <path d="M 108 155 Q 120 172 132 155" fill="#e11d48" stroke="#881337" strokeWidth="2" strokeLinecap="round" />

                  {/* Blue Mechanic Jumpsuit Body */}
                  <path d="M 85 190 L 155 190 L 175 310 L 65 310 Z" fill="#2563eb" stroke="#1e3a8a" strokeWidth="3" />
                  {/* Collar */}
                  <polygon points="85,190 120,215 105,190" fill="#1d4ed8" />
                  <polygon points="155,190 120,215 135,190" fill="#1d4ed8" />
                  {/* Pockets */}
                  <rect x="85" y="225" width="28" height="25" rx="3" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5" />
                  <rect x="127" y="225" width="28" height="25" rx="3" fill="#1d4ed8" stroke="#1e3a8a" strokeWidth="1.5" />
                  {/* Belt */}
                  <rect x="75" y="270" width="90" height="15" rx="2" fill="#1e293b" />
                  <rect x="110" y="267" width="20" height="21" rx="2" fill="#f59e0b" />

                  {/* Left Waving Arm with White Glove */}
                  <path d="M 85 195 Q 40 180 30 140" fill="none" stroke="#2563eb" strokeWidth="24" strokeLinecap="round" />
                  {/* Waving Glove */}
                  <g transform="translate(15, 110)">
                    <circle cx="18" cy="20" r="18" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
                    <rect x="8" y="0" width="8" height="18" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                    <rect x="18" y="-5" width="8" height="22" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                    <rect x="28" y="2" width="8" height="18" rx="4" fill="#ffffff" stroke="#1e293b" strokeWidth="2" />
                  </g>

                  {/* Right Arm resting down */}
                  <path d="M 155 195 Q 185 240 175 280" fill="none" stroke="#2563eb" strokeWidth="22" strokeLinecap="round" />
                  <circle cx="175" cy="285" r="14" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />
                </svg>
              </div>
            </div>

            {/* Center Area: FANTASTRIK Logo, Badges, and Huge Start Button */}
            <div className="lg:col-span-6 flex flex-col items-center text-center space-y-3 sm:space-y-4">
              
              {/* Grand 3D Cartoon FANTASTRIK Logo */}
              <div className="relative inline-block select-none">
                {/* Glow behind logo */}
                <div className="absolute -inset-4 bg-amber-300/40 rounded-full blur-xl" />

                <div className="relative flex items-center justify-center font-black tracking-widest text-4xl sm:text-6xl md:text-7xl filter drop-shadow-[0_8px_6px_rgba(15,23,42,0.8)]">
                  {/* F */}
                  <span className="text-amber-300 drop-shadow-[0_4px_4px_rgba(30,58,138,1)] stroke-2">F</span>
                  {/* A */}
                  <span className="text-amber-300 drop-shadow-[0_4px_4px_rgba(30,58,138,1)]">A</span>
                  {/* N */}
                  <span className="text-amber-300 drop-shadow-[0_4px_4px_rgba(30,58,138,1)]">N</span>
                  {/* T with glowing lightbulb on top */}
                  <span className="text-amber-300 drop-shadow-[0_4px_4px_rgba(30,58,138,1)] relative">
                    T
                    <span className="absolute -top-7 sm:-top-10 left-1/2 -translate-x-1/2 text-2xl sm:text-4xl animate-bounce">
                      💡
                    </span>
                  </span>
                  {/* Lightning 4 / S in bright yellow */}
                  <span className="text-yellow-400 drop-shadow-[0_4px_4px_rgba(180,83,9,1)] inline-flex items-center mx-1">
                    <Zap className="w-9 h-9 sm:w-14 sm:h-14 fill-yellow-300 text-yellow-500 inline" />
                  </span>
                  {/* T */}
                  <span className="text-sky-100 drop-shadow-[0_4px_4px_rgba(30,58,138,1)]">T</span>
                  {/* R */}
                  <span className="text-sky-100 drop-shadow-[0_4px_4px_rgba(30,58,138,1)]">R</span>
                  {/* I */}
                  <span className="text-sky-100 drop-shadow-[0_4px_4px_rgba(30,58,138,1)]">I</span>
                  {/* K */}
                  <span className="text-sky-100 drop-shadow-[0_4px_4px_rgba(30,58,138,1)]">K</span>
                </div>

                {/* Subtitle Yellow Oval Banner */}
                <div className="mt-1 bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm md:text-base tracking-tight px-4 sm:px-6 py-1.5 rounded-full border-2 border-amber-400 shadow-md inline-block">
                  Fun Learning through STEM and Interactive Electricity
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
                {/* Dark Blue Pill: VIRTUAL LAB RANGKAIAN LISTRIK */}
                <div className="bg-blue-900 text-white font-extrabold text-xs sm:text-sm tracking-wide px-5 py-2 rounded-full border border-blue-700 shadow-md uppercase">
                  VIRTUAL LAB RANGKAIAN LISTRIK
                </div>

                {/* Light Blue Pill: IPA KELAS IX SMP */}
                <div className="bg-white/95 text-blue-900 font-extrabold text-xs sm:text-sm tracking-wide px-5 py-2 rounded-full border-2 border-blue-400 shadow-md uppercase">
                  IPA KELAS IX SMP
                </div>
              </div>

              {/* HUGE GLOWING ORANGE CTA BUTTON */}
              <div className="pt-3 sm:pt-5">
                <button
                  onClick={() => setActiveTab('simulasi')}
                  className="group relative inline-flex items-center gap-3.5 px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-500 hover:from-amber-300 hover:via-orange-400 hover:to-amber-400 text-white font-black text-lg sm:text-2xl rounded-full shadow-[0_8px_25px_rgba(249,115,22,0.8)] border-4 border-white active:scale-95 transition-all cursor-pointer"
                >
                  {/* Play circle icon */}
                  <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white flex items-center justify-center text-orange-600 shadow-md group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-orange-600 ml-0.5" />
                  </div>
                  <span className="tracking-wider drop-shadow-[0_2px_4px_rgba(154,52,18,0.9)]">
                    MULAI EKSPERIMEN
                  </span>
                </button>
              </div>

            </div>

            {/* Right Area: Paper Doll STEM Craft Project & Pinned Note */}
            <div className="lg:col-span-3 flex flex-col items-center lg:items-end space-y-4">
              
              {/* Pinned Sticky Memo Note: "Eksplorasi" */}
              <div className="w-52 sm:w-56 bg-amber-50 rounded-xl p-4 shadow-xl border border-amber-200 rotate-2 relative">
                {/* Red Pin Tack */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-rose-500 border border-white shadow-xs" />
                
                <div className="flex items-center justify-between border-b border-amber-200/80 pb-2 mb-2">
                  <span className="font-extrabold text-slate-800 text-sm">Eksplorasi</span>
                  <span className="text-base">💡</span>
                </div>

                <div className="space-y-1.5 text-xs font-bold text-slate-700">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Simulasi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Rangkaian</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Virtual Lab</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 stroke-[3]" />
                    <span>Proyek Paper Circuit</span>
                  </div>
                </div>
              </div>

              {/* Cute Paper Doll Craft Project Visual */}
              <div 
                onClick={() => setActiveTab('stem-challenge')}
                className="bg-white/90 backdrop-blur-xs p-3 rounded-2xl border-2 border-white shadow-lg cursor-pointer hover:scale-105 transition-all text-center select-none"
              >
                <div className="w-40 sm:w-44 h-44 sm:h-48 rounded-xl overflow-hidden relative bg-slate-900 border border-slate-200">
                  <img
                    src="/src/assets/images/stem_paper_doll_circuit_1791525124744.jpg"
                    alt="Paper Doll Circuit Project"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-2 justify-center">
                    <span className="text-[11px] font-bold text-amber-300">
                      Proyek Paper Circuit ✂️
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* ============================================================== */}
          {/* BOTTOM DOCK NAVBAR: 6 ROUNDED BUTTONS MATCHING USER IMAGE       */}
          {/* ============================================================== */}
          <div className="relative z-10 pt-6">
            <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border-2 border-white p-2 sm:p-2.5 flex items-center justify-between gap-1.5 sm:gap-2 overflow-x-auto">
              
              {/* 1. Beranda (Active Blue Button) */}
              <button
                onClick={() => setActiveTab('beranda')}
                className="flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
              >
                <Home className="w-4 h-4 fill-white" />
                <span>Beranda</span>
              </button>

              {/* 2. Komponen Rangkaian */}
              <button
                onClick={() => setActiveTab('komponen')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-sky-50 font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
              >
                <span className="text-base">🔋</span>
                <span>Komponen Rangkaian</span>
              </button>

              {/* 3. Simulasi Rangkaian */}
              <button
                onClick={() => setActiveTab('simulasi')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-sky-50 font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
              >
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Simulasi Rangkaian</span>
              </button>

              {/* 4. Eksperimen Hukum Ohm */}
              <button
                onClick={() => setActiveTab('hukum-ohm')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-sky-50 font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
              >
                <LineChart className="w-4 h-4 text-emerald-600" />
                <span>Eksperimen Hukum Ohm</span>
              </button>

              {/* 5. Tantangan STEM Paper Circuit */}
              <button
                onClick={() => setActiveTab('stem-challenge')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-sky-50 font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
              >
                <span className="text-base">✂️</span>
                <span>Tantangan STEM Paper Circuit</span>
              </button>

              {/* 6. Kuis & Refleksi */}
              <button
                onClick={() => setActiveTab('kuis-refleksi')}
                className="flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-700 hover:bg-sky-50 font-bold text-xs sm:text-sm transition-all cursor-pointer shrink-0"
              >
                <ClipboardList className="w-4 h-4 text-sky-600" />
                <span>Kuis & Refleksi</span>
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================== */}
      {/* INQUIRY STEM GUIDANCE & 7 LEARNING OBJECTIVES                  */}
      {/* ============================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6 pt-4">
        
        {/* Pertanyaan Pemantik Inquiry */}
        <div className="bg-amber-100 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 text-amber-950 shadow-sm">
          <div className="flex items-start gap-3.5">
            <Lightbulb className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h2 className="text-xs font-black uppercase tracking-wider text-amber-800">
                Pertanyaan Pemantik Penyelidikan STEM:
              </h2>
              <p className="text-base sm:text-xl font-extrabold text-slate-900 mt-1">
                “Mengapa lampu pada suatu rangkaian listrik dapat menyala terang, sedangkan pada rangkaian lain padam atau redup?”
              </p>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                Melalui FANTASTRIK Virtual Lab, kamu akan menguji variabel bebas (tegangan & hambatan) dan variabel terikat (arus & nyala lampu), membuktikan Hukum Ohm, dan merancang proyek boneka kertas dengan LED menyala!
              </p>
            </div>
          </div>
        </div>

        {/* 7 Tujuan Pembelajaran */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-sky-200 pb-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
                <Target className="w-4 h-4" />
                <span>Capaian Pembelajaran IPA SMP Fase D</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Tujuan Pembelajaran Virtual Lab
              </h2>
            </div>
            <span className="text-xs text-slate-600 font-medium">7 Indikator Kompetensi Inquiry STEM</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learningObjectives.map((obj) => (
              <div
                key={obj.num}
                className="bg-white border-2 border-sky-100 rounded-2xl p-5 shadow-xs hover:border-sky-300 hover:shadow-md transition-all"
              >
                <div className="flex items-baseline justify-between mb-2">
                  <span className="font-mono text-xs font-extrabold text-blue-600 tracking-wider">
                    {obj.num}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5">
                  {obj.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {obj.desc}
                </p>
              </div>
            ))}

            {/* Direct CTA card */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl p-5 flex flex-col justify-between shadow-md">
              <div>
                <div className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Siap Memulai?
                </div>
                <h3 className="text-lg font-black text-white mt-1">
                  Masuk ke Meja Simulasi
                </h3>
                <p className="text-xs text-blue-100 mt-2 leading-relaxed">
                  Rakit komponen, atur slider tegangan dan hambatan, serta rekam data hasil pengamatan!
                </p>
              </div>
              <button
                onClick={() => setActiveTab('simulasi')}
                className="mt-4 flex items-center justify-between px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <span>Buka Simulasi Rangkaian</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 6 Alur Inquiry STEM */}
        <div className="space-y-4 pt-4">
          <div className="border-b border-sky-200 pb-3">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>Pendekatan Saintifik</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-1">
              Alur Belajar Inquiry STEM di FANTASTRIK
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {inquirySteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-sky-100 rounded-2xl p-5 shadow-xs"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-extrabold text-blue-600 uppercase">
                        {step.step}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 leading-tight">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
};
