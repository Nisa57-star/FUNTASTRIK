import React, { useState } from 'react';
import { 
  Zap, 
  RotateCcw, 
  PlusCircle, 
  AlertTriangle, 
  CheckCircle2, 
  LineChart,
  Gauge,
  Sliders,
  Battery,
  Activity,
  Info,
  SlidersHorizontal,
  Compass
} from 'lucide-react';

interface DataPoint {
  v: number;
  r: number;
  i: number;
}

export const OhmsLawView: React.FC = () => {
  // Voltage measured by Voltmeter (adjustable by student from 0.0 to 24.0 V)
  const [voltage, setVoltage] = useState<number>(6.0);
  
  // Resistance of the ohmic resistor (adjustable from 2 to 100 Ω)
  const [resistance, setResistance] = useState<number>(20);
  
  // Voltmeter Range Selector (Batas Ukur): 10 V vs 25 V
  const [meterRange, setMeterRange] = useState<number>(25);

  // Voltmeter display mode: 'analog' (Jarum Bergerak) vs 'digital' (Layar LCD) vs 'gabungan'
  const [meterViewMode, setMeterViewMode] = useState<'analog' | 'digital' | 'gabungan'>('gabungan');

  // Recorded data points for graph plotting
  const [plottedPoints, setPlottedPoints] = useState<DataPoint[]>([
    { v: 3.0, r: 20, i: 0.15 },
    { v: 6.0, r: 20, i: 0.30 },
    { v: 9.0, r: 20, i: 0.45 },
    { v: 12.0, r: 20, i: 0.60 },
  ]);

  // Current calculation using Ohm's Law: I = V / R
  const currentAmpere = resistance > 0 ? Math.round((voltage / resistance) * 1000) / 1000 : 0;
  const currentMilliAmpere = Math.round(currentAmpere * 1000);
  const powerWatt = Math.round(voltage * currentAmpere * 100) / 100;

  // Add current reading to plot
  const handleAddPlotPoint = () => {
    const exists = plottedPoints.some((p) => p.v === voltage && p.r === resistance);
    if (!exists) {
      setPlottedPoints([...plottedPoints, { v: voltage, r: resistance, i: currentAmpere }]);
    }
  };

  const handleClearPoints = () => {
    setPlottedPoints([]);
  };

  // Voltmeter Needle Angle Calculation
  // Scale goes from 0 to meterRange (e.g. 25V). Arc spans from -60 deg to +60 deg (120 deg total arc)
  const needleAngle = Math.min(Math.max((voltage / meterRange) * 120 - 60, -65), 65);

  // Ammeter Needle Angle (scale 0 to 1.2 A)
  const ammeterMax = 1.2;
  const ammeterAngle = Math.min(Math.max((currentAmpere / ammeterMax) * 120 - 60, -65), 65);

  // Presets for quick student voltage changes
  const voltagePresets = [1.5, 3.0, 4.5, 6.0, 9.0, 12.0, 15.0, 18.0, 24.0];
  const resistancePresets = [5, 10, 20, 30, 50, 100];

  // SVG Graph Coordinate Mapping
  const maxV = 24;
  const maxI = 1.2;

  const getSvgX = (v: number) => 55 + (v / maxV) * 340;
  const getSvgY = (i: number) => 220 - (Math.min(i, maxI) / maxI) * 190;

  // Theoretical line points for current resistance R
  const lineP1 = { x: getSvgX(0), y: getSvgY(0) };
  const lineP2 = { x: getSvgX(24), y: getSvgY(24 / resistance) };

  // Automatic inquiry conclusion
  const autoConclusion = `Pada nilai hambatan tetap (R = ${resistance} Ω), setiap kenaikan nilai pada Voltmeter secara linier sebanding menaikkan kuat arus yang terbaca pada Amperemeter (I berbanding lurus dengan V). Rasio V / I selalu konstan sebesar ${resistance} Ω, membuktikan Hukum Ohm V = I × R.`;

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-8 select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* HEADER & EXPERIMENT OBJECTIVE                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-sky-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider bg-sky-100 text-sky-800 px-3 py-1 rounded-full border border-sky-200">
              Laboratorium Fisika Inquiry STEM
            </span>
            <span className="text-[11px] font-bold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
              SMP Kelas IX / Fase D
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Gauge className="w-8 h-8 text-sky-600" />
            <span>Eksperimen Hukum Ohm &amp; Voltmeter Interaktif</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Gunakan instrumen <strong>Voltmeter Nyata</strong> di bawah ini untuk mengatur beda potensial (V) secara langsung. Amati bagaimana jarum voltmeter dan amperemeter bergerak sesuai hukum ilmiah <strong className="text-sky-700">V = I × R</strong>!
          </p>
        </div>

        {/* Quick Reset */}
        <button
          onClick={() => {
            setVoltage(6.0);
            setResistance(20);
            setMeterRange(25);
          }}
          className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors cursor-pointer shrink-0 border border-slate-200"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Instrumen</span>
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SCIENTIFIC FORMULA BANNER                                     */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-blue-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border-2 border-white/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-5 text-center md:text-left border-b md:border-b-0 md:border-r border-slate-700/80 pb-5 md:pb-0 md:pr-6 space-y-2">
          <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
            Rumus Matematika Hukum Ohm
          </span>
          <div className="text-4xl sm:text-5xl font-black tracking-tight text-white font-mono drop-shadow-md">
            V = I × R
          </div>
          <div className="text-xs sm:text-sm font-mono text-sky-200">
            Dihitung untuk kuat arus: <span className="font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-500/30">I = V / R</span>
          </div>
        </div>

        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-amber-300 font-extrabold block text-sm">V (Tegangan)</span>
            <span className="text-slate-300 text-[11px]">Beda potensial pada Voltmeter dalam satuan <strong>Volt (V)</strong>.</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-sky-300 font-extrabold block text-sm">I (Kuat Arus)</span>
            <span className="text-slate-300 text-[11px]">Banyak muatan mengalir pada Amperemeter dalam <strong>Ampere (A)</strong>.</span>
          </div>
          <div className="bg-white/10 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
            <span className="text-emerald-300 font-extrabold block text-sm">R (Hambatan)</span>
            <span className="text-slate-300 text-[11px]">Nilai resistansi resistor ohmik dalam satuan <strong>Ohm (Ω)</strong>.</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* MAIN LAB WORKBENCH: REALISTIC VOLTMETER & AMPEREMETER BENCH   */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* =========================================================== */}
        {/* LEFT COLUMN: REALISTIC INTERACTIVE VOLTMETER INSTRUMENT     */}
        {/* =========================================================== */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* REALISTIC VOLTMETER BOX */}
          <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-slate-700 relative overflow-hidden">
            
            {/* Top Instrument Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 font-black flex items-center justify-center text-base shadow-md">
                  V
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white tracking-wide">
                    VOLTMETER LABORATORIUM
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    Model: FANTASTRIK-VM24 | Batas Ukur: {meterRange}V DC
                  </p>
                </div>
              </div>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => setMeterViewMode('gabungan')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                    meterViewMode === 'gabungan' ? 'bg-amber-400 text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dual Display
                </button>
                <button
                  onClick={() => setMeterViewMode('analog')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                    meterViewMode === 'analog' ? 'bg-amber-400 text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Jarum Analog
                </button>
                <button
                  onClick={() => setMeterViewMode('digital')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold cursor-pointer transition-colors ${
                    meterViewMode === 'digital' ? 'bg-amber-400 text-slate-900' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Digital LCD
                </button>
              </div>
            </div>

            {/* VOLTMETER DISPLAY GAUGE (ANALOG SCALE + MOVING NEEDLE) */}
            {(meterViewMode === 'analog' || meterViewMode === 'gabungan') && (
              <div className="my-5 bg-amber-50 rounded-2xl p-4 border-4 border-slate-800 shadow-inner relative flex flex-col items-center">
                <svg viewBox="0 0 360 190" className="w-full max-w-[420px] select-none">
                  {/* Gauge Arc Background */}
                  <path
                    d="M 50 160 A 130 130 0 0 1 310 160"
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Active Voltage Arc */}
                  <path
                    d="M 50 160 A 130 130 0 0 1 310 160"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="4"
                    strokeDasharray="4 2"
                  />

                  {/* Tick Marks and Numbers */}
                  {[0, 5, 10, 15, 20, 25].map((val) => {
                    const angle = (val / 25) * 120 - 60; // -60 to +60
                    const rad = ((angle - 90) * Math.PI) / 180;
                    const x1 = 180 + 130 * Math.cos(rad);
                    const y1 = 160 + 130 * Math.sin(rad);
                    const x2 = 180 + 114 * Math.cos(rad);
                    const y2 = 160 + 114 * Math.sin(rad);
                    const tx = 180 + 98 * Math.cos(rad);
                    const ty = 160 + 98 * Math.sin(rad);

                    return (
                      <g key={val}>
                        <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#1e293b" strokeWidth="2.5" />
                        <text
                          x={tx}
                          y={ty + 4}
                          fontSize="11"
                          fontWeight="bold"
                          fill="#0f172a"
                          textAnchor="middle"
                          fontFamily="monospace"
                        >
                          {val}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Brand and Label */}
                  <text x="180" y="85" fontSize="20" fontWeight="900" fill="#b45309" textAnchor="middle">
                    V
                  </text>
                  <text x="180" y="100" fontSize="9" fontWeight="bold" fill="#64748b" textAnchor="middle">
                    VOLT DC (BEDA POTENSIAL)
                  </text>

                  {/* Zero Adjust Screw */}
                  <circle cx="180" cy="160" r="14" fill="#334155" stroke="#1e293b" strokeWidth="2" />
                  <circle cx="180" cy="160" r="6" fill="#f8fafc" />

                  {/* Realistic Moving Needle */}
                  <g transform={`rotate(${needleAngle}, 180, 160)`} className="transition-transform duration-300 ease-out">
                    {/* Shadow */}
                    <line x1="180" y1="160" x2="180" y2="42" stroke="rgba(0,0,0,0.2)" strokeWidth="4" />
                    {/* Red Needle */}
                    <line x1="180" y1="170" x2="180" y2="38" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                    <polygon points="180,32 176,46 184,46" fill="#b91c1c" />
                  </g>
                </svg>

                {/* Sub-label under dial */}
                <div className="text-[11px] font-bold text-slate-700 bg-amber-200/60 px-3 py-0.5 rounded-full mt-[-8px]">
                  Posisi Jarum: {voltage.toFixed(1)} Volt
                </div>
              </div>
            )}

            {/* DIGITAL 7-SEGMENT / LCD DISPLAY */}
            {(meterViewMode === 'digital' || meterViewMode === 'gabungan') && (
              <div className="bg-slate-950 rounded-2xl p-4 border-2 border-slate-800 flex items-center justify-between shadow-inner my-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block">
                    PEMBACAAN DIGITAL
                  </span>
                  <span className="text-xs text-amber-400 font-bold">
                    Tegangan Terukur (V)
                  </span>
                </div>

                <div className="flex items-baseline gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-700">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400 tracking-wider">
                    {voltage < 10 ? `0${voltage.toFixed(1)}` : voltage.toFixed(1)}
                  </span>
                  <span className="text-base font-bold text-slate-400 font-mono">V</span>
                </div>
              </div>
            )}

            {/* INTERACTIVE CONTROLS DIRECTLY ON THE VOLTMETER BODY */}
            <div className="mt-4 pt-4 border-t border-slate-800 space-y-4">
              
              {/* Stepper and Slider Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <label className="text-white font-bold flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-400" />
                    <span>Putar / Geser Nilai Tegangan Voltmeter:</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setVoltage((prev) => Math.max(0, Math.round((prev - 0.5) * 10) / 10))}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold text-xs cursor-pointer"
                      title="Turunkan 0.5V"
                    >
                      - 0.5V
                    </button>
                    <button
                      onClick={() => setVoltage((prev) => Math.min(24, Math.round((prev + 0.5) * 10) / 10))}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white rounded font-bold text-xs cursor-pointer"
                      title="Naikkan 0.5V"
                    >
                      + 0.5V
                    </button>
                  </div>
                </div>

                {/* Range Slider for Smooth Continuous Tuning */}
                <input
                  type="range"
                  min="0.0"
                  max="24.0"
                  step="0.5"
                  value={voltage}
                  onChange={(e) => setVoltage(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-3 bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 px-1">
                  <span>0.0 V (OFF)</span>
                  <span>6.0 V</span>
                  <span>12.0 V</span>
                  <span>18.0 V</span>
                  <span>24.0 V (Maksimum)</span>
                </div>
              </div>

              {/* Quick Voltage Preset Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-300 block">
                  Pilihan Nilai Tegangan Cepat (Preset Baterai &amp; Sumber):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {voltagePresets.map((vp) => (
                    <button
                      key={vp}
                      onClick={() => setVoltage(vp)}
                      className={`px-3 py-1.5 rounded-xl font-mono font-bold text-xs cursor-pointer transition-all ${
                        voltage === vp
                          ? 'bg-amber-400 text-slate-950 shadow-md font-black scale-105 ring-2 ring-amber-300'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {vp} V
                    </button>
                  ))}
                </div>
              </div>

              {/* Terminal Probes & Range Selector on Voltmeter */}
              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Probes */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-rose-600 border border-rose-400 inline-block shadow-xs" />
                    <span className="text-[11px] text-slate-300 font-bold">Kutub (+) Positif</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-slate-700 border border-slate-500 inline-block shadow-xs" />
                    <span className="text-[11px] text-slate-300 font-bold">Kutub (-) Negatif / COM</span>
                  </div>
                </div>

                {/* Range Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Batas Ukur:</span>
                  <button
                    onClick={() => setMeterRange(10)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      meterRange === 10 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    10V
                  </button>
                  <button
                    onClick={() => setMeterRange(25)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                      meterRange === 25 ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    25V (Standar)
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* REALISTIC AMPEREMETER COMPANION GAUGE */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-sky-100 flex flex-col md:flex-row items-center justify-between gap-5">
            <div className="flex items-center gap-4 w-full md:w-auto">
              {/* Ammeter Circular Dial SVG */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-slate-900 rounded-full border-4 border-slate-700 flex items-center justify-center relative shadow-md shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full select-none">
                  {/* Gauge tick marks */}
                  <path d="M 20 75 A 38 38 0 1 1 80 75" fill="none" stroke="#64748b" strokeWidth="3" />
                  <text x="50" y="45" fontSize="16" fontWeight="bold" fill="#38bdf8" textAnchor="middle">A</text>
                  <text x="50" y="58" fontSize="6" fontWeight="bold" fill="#94a3b8" textAnchor="middle">AMPERE</text>
                  {/* Needle */}
                  <g transform={`rotate(${ammeterAngle}, 50, 75)`} className="transition-transform duration-300">
                    <line x1="50" y1="75" x2="50" y2="24" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="50" cy="75" r="4" fill="#0f172a" />
                  </g>
                </svg>
              </div>

              <div>
                <span className="text-[10px] font-black uppercase text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Alat Ukur Arus Seri
                </span>
                <h4 className="text-base font-extrabold text-slate-900 mt-1">
                  AMPEREMETER DIGITAL
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-2xl font-black font-mono text-sky-600">
                    {currentAmpere.toFixed(2)} A
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    ({currentMilliAmpere} mA)
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Dipasang secara <strong>SERI</strong> pada sirkuit untuk mengukur muatan per detik.
                </p>
              </div>
            </div>

            {/* Plot Button */}
            <button
              onClick={handleAddPlotPoint}
              className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Plot Data (V={voltage}V, I={currentAmpere}A)</span>
            </button>
          </div>

          {/* RESISTOR (HAMBATAN) CONTROLS WITH DYNAMIC COLOR BANDS */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-md border-2 border-sky-100 space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-emerald-600" />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    Resistor Ohmik (Beban Hambatan R)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Nilai hambatan tetap yang sedang diuji
                  </p>
                </div>
              </div>
              <span className="text-base font-black font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200">
                {resistance} Ω (Ohm)
              </span>
            </div>

            {/* Realistic Resistor Visual */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-center">
              <div className="flex items-center">
                <div className="w-12 h-1 bg-slate-400" />
                <div className="w-28 h-8 bg-amber-100 rounded-full border-2 border-amber-300 flex items-center justify-around px-2 shadow-xs">
                  <div className={`w-2 h-full ${resistance >= 50 ? 'bg-green-700' : resistance >= 20 ? 'bg-red-700' : 'bg-brown-700'}`} />
                  <div className={`w-2 h-full ${resistance % 10 === 0 ? 'bg-black' : 'bg-orange-600'}`} />
                  <div className="w-2 h-full bg-black" />
                  <div className="w-2 h-full bg-yellow-500" />
                </div>
                <div className="w-12 h-1 bg-slate-400" />
              </div>
            </div>

            {/* Resistance Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-700">
                <span>Atur Nilai Hambatan:</span>
                <span className="text-emerald-700">{resistance} Ω</span>
              </div>
              <input
                type="range"
                min="2"
                max="100"
                step="2"
                value={resistance}
                onChange={(e) => setResistance(parseInt(e.target.value))}
                className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>2 Ω (Kecil)</span>
                <span>20 Ω</span>
                <span>50 Ω</span>
                <span>100 Ω (Besar)</span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {resistancePresets.map((rp) => (
                <button
                  key={rp}
                  onClick={() => setResistance(rp)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                    resistance === rp
                      ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {rp} Ω
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* =========================================================== */}
        {/* RIGHT COLUMN: DYNAMIC GRAPH & SCIENTIFIC DATA TABLE         */}
        {/* =========================================================== */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Dynamic V - I Graph */}
          <div className="bg-white border-2 border-sky-100 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Analisis Grafik Data
                </span>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">
                  Kurva Linier V terhadap I
                </h3>
              </div>
              <button
                onClick={handleClearPoints}
                className="text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Titik</span>
              </button>
            </div>

            {/* SVG Dynamic Coordinate Graph */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex flex-col items-center">
              <svg viewBox="0 0 420 250" className="w-full h-auto select-none">
                {/* Axes lines */}
                <line x1="50" y1="220" x2="400" y2="220" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="220" x2="50" y2="20" stroke="#475569" strokeWidth="2" />

                {/* Grid Lines */}
                {[6, 12, 18, 24].map((vVal) => (
                  <g key={`x-${vVal}`}>
                    <line x1={getSvgX(vVal)} y1="20" x2={getSvgX(vVal)} y2="220" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x={getSvgX(vVal)} y="235" fontSize="10" fill="#64748b" textAnchor="middle" fontWeight="bold">
                      {vVal}V
                    </text>
                  </g>
                ))}

                {[0.3, 0.6, 0.9, 1.2].map((iVal) => (
                  <g key={`y-${iVal}`}>
                    <line x1="50" y1={getSvgY(iVal)} x2="400" y2={getSvgY(iVal)} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
                    <text x="42" y={getSvgY(iVal) + 4} fontSize="10" fill="#64748b" textAnchor="end" fontWeight="bold">
                      {iVal}A
                    </text>
                  </g>
                ))}

                {/* Axis Labels */}
                <text x="400" y="215" fontSize="11" fill="#1e293b" fontWeight="bold" textAnchor="end">
                  Tegangan V (Volt) →
                </text>
                <text x="58" y="25" fontSize="11" fill="#1e293b" fontWeight="bold">
                  ↑ Arus I (Ampere)
                </text>

                {/* Theoretical Straight Line for current R */}
                <line
                  x1={lineP1.x}
                  y1={lineP1.y}
                  x2={lineP2.x}
                  y2={lineP2.y}
                  stroke="#2563eb"
                  strokeWidth="2.5"
                />

                {/* Plotted Student Points */}
                {plottedPoints.map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={getSvgX(pt.v)}
                      cy={getSvgY(pt.i)}
                      r="5"
                      fill="#eab308"
                      stroke="#1e293b"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}

                {/* Current Active Point from Voltmeter */}
                <circle
                  cx={getSvgX(voltage)}
                  cy={getSvgY(currentAmpere)}
                  r="7"
                  fill="#ef4444"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              </svg>
              
              <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-600 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-0.5 bg-blue-600 inline-block" /> Garis Teori (R = {resistance} Ω)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Nilai Voltmeter Saat Ini
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-slate-700 inline-block" /> Titik Terplot ({plottedPoints.length})
                </span>
              </div>
            </div>

            {/* Scientific Calculation Step Card */}
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-1.5 text-xs text-sky-950">
              <div className="flex items-center gap-1.5 font-bold text-sky-900">
                <Activity className="w-4 h-4 text-sky-700" />
                <span>Pembuktian Hukum Ohm:</span>
              </div>
              <div className="font-mono text-xs bg-white p-2 rounded-xl border border-sky-200 font-bold space-y-0.5">
                <div>I = V / R</div>
                <div>I = {voltage} V / {resistance} Ω</div>
                <div className="text-sky-700 text-sm font-black">I = {currentAmpere.toFixed(3)} Ampere ({currentMilliAmpere} mA)</div>
              </div>
              <div className="text-[11px] text-slate-600">
                Daya disipasi termal: <strong className="font-mono">{powerWatt} Watt</strong> (P = V × I)
              </div>
            </div>

            {/* Auto Conclusion Box */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1.5 text-xs text-emerald-950">
              <div className="flex items-center gap-1.5 font-extrabold text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Kesimpulan Penyelidikan Siswa:</span>
              </div>
              <p className="leading-relaxed">
                {autoConclusion}
              </p>
            </div>
          </div>

          {/* Table of Recorded Plot Points */}
          <div className="bg-white border-2 border-sky-100 rounded-3xl p-5 shadow-md space-y-3">
            <h4 className="text-xs font-black uppercase text-slate-800 tracking-wider">
              Tabel Rekaman Titik Pengamatan ({plottedPoints.length} Data)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold">
                    <th className="p-2">Tegangan Voltmeter (V)</th>
                    <th className="p-2">Hambatan (Ω)</th>
                    <th className="p-2">Arus (A)</th>
                    <th className="p-2">Rasio V / I</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                  {plottedPoints.map((pt, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2 font-bold text-amber-700">{pt.v} V</td>
                      <td className="p-2 text-emerald-700">{pt.r} Ω</td>
                      <td className="p-2 font-bold text-sky-700">{pt.i} A</td>
                      <td className="p-2 text-slate-600">{(pt.v / pt.i).toFixed(1)} Ω</td>
                    </tr>
                  ))}
                  {plottedPoints.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-3 text-center text-slate-400 italic">
                        Belum ada data diplot. Klik tombol &quot;Plot Data&quot; di samping.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* PEDAGOGICAL IPA SMP CONCEPT NOTE: RESISTOR VS LED            */}
      {/* ------------------------------------------------------------- */}
      <section className="bg-amber-50/90 border-2 border-amber-300 rounded-3xl p-6 sm:p-7 space-y-3 text-amber-950 shadow-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5">
            <h4 className="text-sm font-extrabold uppercase tracking-wide text-amber-900">
              Catatan Konsep Penting IPA SMP: Resistor Ohmik vs Komponen Dioda / LED
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              Model matematis Hukum Ohm (<span className="font-mono font-bold">V = I × R</span>) di atas berlaku tepat untuk <strong>komponen konduktor ohmik</strong> (seperti kawat penghantar dan resistor), di mana grafik V terhadap I menghasilkan garis lurus sempurna.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900">
              Sebaliknya, pada proyek <strong>Paper Circuit</strong>, kita menggunakan <strong>LED (Light Emitting Diode)</strong> yang merupakan komponen semikonduktor <strong>non-linier</strong>. LED memerlukan tegangan ambang minimum (~1,8V hingga 3,0V) agar dapat menyala, dan setelah menyala hambatannya turun drastis. Oleh karena itu, baterai koin 3V (CR2032) sangat pas untuk 1 LED, namun memerlukan penambahan resistor pembatas arus jika tegangan sumber diperbesar!
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
