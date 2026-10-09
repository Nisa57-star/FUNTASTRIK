import React, { useState } from 'react';
import { 
  Battery, 
  ToggleLeft, 
  ToggleRight, 
  Zap, 
  Lightbulb, 
  ShieldAlert, 
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';

interface ComponentItem {
  id: string;
  name: string;
  category: string;
  symbolDescription: string;
  functionDesc: string;
  physicalLook: string;
  paperCircuitUsage: string;
  keyFacts: string[];
}

export const ComponentExplorationView: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('baterai');

  // Mini Sandbox State for Testing
  const [testBatteryVoltage, setTestBatteryVoltage] = useState<number>(3); // 3V coin cell
  const [testSwitchClosed, setTestSwitchClosed] = useState<boolean>(true);
  const [testLedPolarityCorrect, setTestLedPolarityCorrect] = useState<boolean>(true);
  const [testResistorValue, setTestResistorValue] = useState<number>(100); // 100 Ohm

  const components: ComponentItem[] = [
    {
      id: 'baterai',
      name: 'Baterai (Sumber Tegangan)',
      category: 'Sumber Energi Listrik',
      symbolDescription: 'Dua garis sejajar: garis panjang untuk kutub positif (+) dan garis pendek lebih tebal untuk kutub negatif (-).',
      functionDesc: 'Menyediakan beda potensial (tegangan listrik) yang mendorong muatan listrik (elektron) bergerak melalui rangkaian.',
      physicalLook: 'Baterai tabung AA (1,5V), AAA, kotak 9V, atau Baterai Koin CR2032 (3V) tipis bundar.',
      paperCircuitUsage: 'Pada proyek Paper Circuit, kita memakai baterai koin CR2032 (3V) karena bentuknya pipih dan pas diletakkan di lembaran kertas.',
      keyFacts: [
        'Satuan tegangan adalah Volt (V).',
        'Memiliki dua kutub: Positif (+) dan Negatif (-).',
        'Arus konvensional dianggap mengalir dari kutub (+) menuju kutub (-).',
      ],
    },
    {
      id: 'kabel',
      name: 'Kabel Konduktor / Pita Tembaga',
      category: 'Penghantar Arus',
      symbolDescription: 'Garis lurus penghubung antarkomponen dalam diagram sirkuit.',
      functionDesc: 'Sebagai jalan atau lintasan konduktif bagi elektron untuk mengalir tanpa hambatan yang berarti.',
      physicalLook: 'Kawat tembaga berisolasi plastik warna-warni, atau Pita Tembaga Konduktif (Copper Foil Tape) berperekat.',
      paperCircuitUsage: 'Pita tembaga ditempelkan pada kertas sebagai jalur sirkuit. Perekat tembaga harus ditekan kuat di persimpangan agar kontak listrik lancar!',
      keyFacts: [
        'Bahan konduktor terbaik: tembaga, perak, dan aluminium.',
        'Jika jalur robek atau terputus walau 1 milimeter, arus akan terhenti.',
        'Tidak boleh membuat pita (+) bersentuhan langsung dengan pita (-) tanpa beban (akan terjadi korsleting).',
      ],
    },
    {
      id: 'sakelar',
      name: 'Sakelar (Switch)',
      category: 'Pengendali Rangkaian',
      symbolDescription: 'Garis miring berengsel dengan dua titik kontak (terbuka jika terangkat, tertutup jika menempel).',
      functionDesc: 'Menyambung dan memutus aliran arus listrik sesuai keinginan pengguna secara aman.',
      physicalLook: 'Sakelar toggle cetek, sakelar geser (slide switch), atau sakelar tekan (push button).',
      paperCircuitUsage: 'Di paper circuit, sakelar dibuat sangat kreatif dengan teknik lipatan kertas (corner fold) atau klip kertas penjepit yang ditekan jari!',
      keyFacts: [
        'Sakelar Terbuka (OFF): Rangkaian putus, arus = 0 Ampere.',
        'Sakelar Tertutup (ON): Rangkaian tersambung sempurna, arus mengalir.',
        'Menghemat baterai saat alat tidak sedang dipakai.',
      ],
    },
    {
      id: 'led',
      name: 'Lampu & LED (Light Emitting Diode)',
      category: 'Beban Penerangan / Indikator',
      symbolDescription: 'Simbol segitiga menunjuk garis dengan 2 panah cahaya keluar (LED) atau lingkaran dengan tanda silang di dalamnya (lampu pijar).',
      functionDesc: 'Mengubah energi listrik menjadi energi cahaya (dan sedikit energi kalor pada lampu pijar).',
      physicalLook: 'LED mini 3mm atau 5mm dengan badan kubah plastik bening/berwarna dan dua kawat kaki logam.',
      paperCircuitUsage: 'Kaki LED ditekuk rata menempel di atas pita tembaga kertas boneka, lalu direkatkan erat dengan isolasi atau pita tembaga tambahan.',
      keyFacts: [
        'Kaki PANJANG adalah ANODA (+), harus dihubungkan ke kutub (+) baterai.',
        'Kaki PENDEK adalah KATODA (-), harus dihubungkan ke kutub (-) baterai.',
        'Jika kaki LED terpasang terbalik (reverse bias), LED tidak akan menyala sama sekali.',
      ],
    },
    {
      id: 'resistor',
      name: 'Resistor (Penghambat Arus)',
      category: 'Pembatas Arus Listrik',
      symbolDescription: 'Garis zig-zag bergerigi atau kotak persegi panjang kecil.',
      functionDesc: 'Memberikan nilai hambatan tertentu untuk mengatur dan membatasi besar arus yang lewat sehingga komponen lain tidak kelebihan arus.',
      physicalLook: 'Komponen tabung silinder kecil dengan gelang cincin kode warna (misal: cokelat-hitam-merah).',
      paperCircuitUsage: 'Mencegah LED terbakar jika tegangan baterai terlalu tinggi (misal saat memakai baterai 9V).',
      keyFacts: [
        'Satuan hambatan adalah Ohm (lambang Ω).',
        'Semakin besar nilai Ohm, semakin kecil arus listrik yang dapat lewat (Hukum Ohm).',
        'Energi yang dihambat diubah menjadi panas hangat.',
      ],
    },
  ];

  const currentComp = components.find((c) => c.id === selectedCompId) || components[0];

  // Calculate mini test current for display
  // Approximate LED forward drop 2.0V
  let testIsWorking = false;
  let testStatusMessage = '';
  let testCurrent_mA = 0;

  if (!testSwitchClosed) {
    testIsWorking = false;
    testStatusMessage = 'Sakelar Terbuka (OFF) — Arus listrik terputus total.';
    testCurrent_mA = 0;
  } else if (!testLedPolarityCorrect) {
    testIsWorking = false;
    testStatusMessage = 'Polaritas LED Terbalik! Arus terhalang di katoda/anoda (Reverse Bias). LED tidak menyala.';
    testCurrent_mA = 0;
  } else if (testBatteryVoltage < 1.8) {
    testIsWorking = false;
    testStatusMessage = 'Tegangan terlalu kecil (< 1,8V) untuk mengaktifkan semikonduktor LED.';
    testCurrent_mA = 0;
  } else {
    testIsWorking = true;
    const vEffective = testBatteryVoltage - 2.0; // forward drop
    const currentA = vEffective / (testResistorValue + 15); // circuit resistance
    testCurrent_mA = Math.round(currentA * 1000 * 10) / 10;
    testStatusMessage = `Rangkaian Tertutup & Polaritas Benar! Arus mengalir ~${testCurrent_mA} mA. LED MENYALA TERANG!`;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Title & Introduction */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Materi Inti Kelas IX IPA
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Eksplorasi Komponen Rangkaian Listrik
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Kenali fungsi, simbol standar internasional, dan tips penerapannya dalam proyek nyata <span className="font-semibold text-slate-800">Paper Circuit</span> boneka kertas. Klik setiap komponen di bawah ini untuk mempelajari detailnya:
        </p>
      </div>

      {/* Component Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {components.map((comp) => {
          const isSelected = comp.id === selectedCompId;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedCompId(comp.id)}
              className={`p-3.5 text-left rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  {comp.category}
                </span>
                {isSelected && (
                  <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
                )}
              </div>
              <span className={`text-sm font-bold ${isSelected ? 'text-blue-900' : 'text-slate-800'}`}>
                {comp.name.split(' (')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Component Card */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="bg-slate-900 text-white p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              {currentComp.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              {currentComp.name}
            </h2>
          </div>
          <div className="text-xs text-slate-300 bg-slate-800 border border-slate-700 px-3.5 py-1.5 rounded-lg max-w-md">
            Komponen krusial untuk proyek sains & paper craft
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Descriptions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Fungsi Utama dalam Rangkaian
              </h3>
              <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                {currentComp.functionDesc}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Bentuk Fisik Sehari-hari
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {currentComp.physicalLook}
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">
                  Aplikasi di Paper Circuit
                </h4>
                <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-medium">
                  {currentComp.paperCircuitUsage}
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Fakta Kunci & Prinsip Kerja
              </h3>
              <ul className="space-y-2">
                {currentComp.keyFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Visual Diagram & Symbol */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-slate-50/80 border border-slate-200 rounded-xl p-5 space-y-5">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Simbol Skematik Listrik
                </span>
                <span className="text-[11px] text-slate-500 font-mono">Standar IEC/IEEE</span>
              </div>

              {/* Schematic SVG Renderer */}
              <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center justify-center min-h-[160px]">
                {selectedCompId === 'baterai' && (
                  <svg viewBox="0 0 160 80" className="w-48 h-24">
                    <line x1="20" y1="40" x2="65" y2="40" stroke="#2563eb" strokeWidth="3" />
                    {/* Positive plate */}
                    <line x1="65" y1="20" x2="65" y2="60" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                    <text x="60" y="16" fontSize="12" fill="#2563eb" fontWeight="bold">+</text>
                    {/* Negative plate */}
                    <line x1="80" y1="28" x2="80" y2="52" stroke="#1e293b" strokeWidth="7" strokeLinecap="round" />
                    <text x="82" y="16" fontSize="12" fill="#64748b" fontWeight="bold">-</text>
                    <line x1="80" y1="40" x2="140" y2="40" stroke="#2563eb" strokeWidth="3" />
                  </svg>
                )}

                {selectedCompId === 'kabel' && (
                  <svg viewBox="0 0 160 80" className="w-48 h-24">
                    <line x1="15" y1="40" x2="145" y2="40" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
                    <circle cx="15" cy="40" r="5" fill="#d97706" />
                    <circle cx="145" cy="40" r="5" fill="#d97706" />
                    <text x="45" y="30" fontSize="11" fill="#78350f" fontWeight="bold">Pita Tembaga (Cu)</text>
                  </svg>
                )}

                {selectedCompId === 'sakelar' && (
                  <svg viewBox="0 0 160 80" className="w-48 h-24">
                    <line x1="20" y1="40" x2="55" y2="40" stroke="#2563eb" strokeWidth="3" />
                    <circle cx="55" cy="40" r="5" fill="#1e293b" />
                    <line x1="55" y1="40" x2="100" y2="22" stroke="#dc2626" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="105" cy="40" r="5" fill="#1e293b" />
                    <line x1="105" y1="40" x2="140" y2="40" stroke="#2563eb" strokeWidth="3" />
                    <text x="65" y="15" fontSize="11" fill="#dc2626" fontWeight="bold">Terbuka (OFF)</text>
                  </svg>
                )}

                {selectedCompId === 'led' && (
                  <svg viewBox="0 0 180 80" className="w-52 h-24">
                    <line x1="20" y1="40" x2="60" y2="40" stroke="#2563eb" strokeWidth="3" />
                    {/* Anode triangle */}
                    <polygon points="60,25 60,55 90,40" fill="#2563eb" />
                    {/* Cathode bar */}
                    <line x1="90" y1="25" x2="90" y2="55" stroke="#1e293b" strokeWidth="4" />
                    <line x1="90" y1="40" x2="140" y2="40" stroke="#2563eb" strokeWidth="3" />
                    {/* Light arrows */}
                    <line x1="75" y1="22" x2="90" y2="10" stroke="#eab308" strokeWidth="2.5" />
                    <polygon points="92,8 84,10 88,14" fill="#eab308" />
                    <line x1="88" y1="24" x2="103" y2="12" stroke="#eab308" strokeWidth="2.5" />
                    <polygon points="105,10 97,12 101,16" fill="#eab308" />
                    {/* Polarity text */}
                    <text x="35" y="25" fontSize="11" fill="#2563eb" fontWeight="bold">+ (Anoda)</text>
                    <text x="95" y="25" fontSize="11" fill="#64748b" fontWeight="bold">- (Katoda)</text>
                  </svg>
                )}

                {selectedCompId === 'resistor' && (
                  <svg viewBox="0 0 160 80" className="w-48 h-24">
                    <line x1="15" y1="40" x2="40" y2="40" stroke="#2563eb" strokeWidth="3" />
                    <polyline
                      points="40,40 46,25 58,55 70,25 82,55 94,25 106,55 118,25 124,40"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line x1="124" y1="40" x2="145" y2="40" stroke="#2563eb" strokeWidth="3" />
                    <text x="65" y="72" fontSize="11" fill="#475569" fontWeight="bold">Hambatan (R)</text>
                  </svg>
                )}
              </div>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 text-xs text-blue-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>{currentComp.symbolDescription}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mini Interactive Component Test Sandbox */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Zap className="w-4 h-4" />
              <span>Meja Uji Cepat Interaktif</span>
            </div>
            <h3 className="text-xl font-bold text-white mt-1">
              Simulasi Uji Nyala LED Sederhana
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Coba ubah polaritas dan posisi sakelar di bawah ini
          </span>
        </div>

        {/* Controls Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Tegangan Baterai */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Baterai Koin (V)</span>
              <span className="font-mono text-amber-300 font-bold">{testBatteryVoltage} V</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTestBatteryVoltage(1.5)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                  testBatteryVoltage === 1.5 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                1.5 V (AA)
              </button>
              <button
                onClick={() => setTestBatteryVoltage(3.0)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                  testBatteryVoltage === 3.0 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                3.0 V (CR2032)
              </button>
            </div>
          </div>

          {/* 2. Sakelar */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Sakelar Lipatan</span>
              <span className={`font-bold ${testSwitchClosed ? 'text-emerald-400' : 'text-rose-400'}`}>
                {testSwitchClosed ? 'Tertutup (ON)' : 'Terbuka (OFF)'}
              </span>
            </div>
            <button
              onClick={() => setTestSwitchClosed(!testSwitchClosed)}
              className={`w-full py-1.5 text-xs font-semibold rounded cursor-pointer flex items-center justify-center gap-1.5 ${
                testSwitchClosed
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-rose-600 text-white hover:bg-rose-700'
              }`}
            >
              {testSwitchClosed ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
              <span>{testSwitchClosed ? 'Buka Sakelar' : 'Tutup Sakelar'}</span>
            </button>
          </div>

          {/* 3. Polaritas LED */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Arah Polaritas LED</span>
              <span className={`font-bold ${testLedPolarityCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                {testLedPolarityCorrect ? 'Benar (+ ke +)' : 'Terbalik'}
              </span>
            </div>
            <button
              onClick={() => setTestLedPolarityCorrect(!testLedPolarityCorrect)}
              className={`w-full py-1.5 text-xs font-semibold rounded cursor-pointer ${
                testLedPolarityCorrect
                  ? 'bg-slate-700 text-slate-200 hover:bg-slate-600'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              {testLedPolarityCorrect ? 'Coba Balik Kaki LED' : 'Betulkan Kaki LED (+/-)'}
            </button>
          </div>

          {/* 4. Resistor Pelindung */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Hambatan Resistor</span>
              <span className="font-mono text-blue-300 font-bold">{testResistorValue} Ω</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTestResistorValue(50)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                  testResistorValue === 50 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                50 Ω
              </button>
              <button
                onClick={() => setTestResistorValue(220)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded cursor-pointer ${
                  testResistorValue === 220 ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                220 Ω
              </button>
            </div>
          </div>
        </div>

        {/* Live Visual Tester Display */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* LED Glow Display */}
            <div className="relative flex items-center justify-center w-20 h-20">
              {testIsWorking && (
                <div className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
              )}
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
                  testIsWorking
                    ? 'bg-amber-400 text-slate-950 shadow-amber-400/60 ring-4 ring-amber-300'
                    : 'bg-slate-800 text-slate-600 border border-slate-700'
                }`}
              >
                <Lightbulb className={`w-8 h-8 ${testIsWorking ? 'fill-amber-950 text-amber-950' : 'text-slate-600'}`} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${testIsWorking ? 'text-emerald-400' : 'text-rose-400'}`}>
                  Status LED: {testIsWorking ? 'MENYALA' : 'PADAM'}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs text-slate-400 font-mono">
                  I = {testCurrent_mA} mA
                </span>
              </div>
              <p className="text-sm text-slate-200 font-medium max-w-xl">
                {testStatusMessage}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-400 border-l border-slate-800 pl-4 py-1 shrink-0 space-y-1 hidden lg:block">
            <div className="text-slate-300 font-semibold">Tips Sains Fase D:</div>
            <div>Baterai CR2032 3V pas untuk LED 3V.</div>
            <div>Tanpa resistor, LED berisiko panas!</div>
          </div>
        </div>
      </section>
    </div>
  );
};
