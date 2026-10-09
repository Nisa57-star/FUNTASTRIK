import React, { useState } from 'react';
import { ObservationRow } from '../types/circuits';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Trash2, 
  Settings, 
  BarChart2, 
  BookOpen, 
  Eye, 
  FileText, 
  HelpCircle, 
  Lightbulb, 
  Share2, 
  FileSpreadsheet,
  AlertCircle,
  CheckCircle2,
  Zap,
  Scissors,
  X,
  Battery,
  RefreshCw,
  Power,
  Sliders
} from 'lucide-react';

export const CircuitSimulationView: React.FC = () => {
  // Main simulation submode:
  // 'simulasi' = Rangkaian Dasar (1 Lampu + Resistor)
  // 'seri'     = Rangkaian Seri (2 Lampu Berderet)
  // 'paralel'  = Rangkaian Paralel (2 Percabangan Mandiri)
  const [subMode, setSubMode] = useState<'simulasi' | 'seri' | 'paralel'>('simulasi');

  // Display mode: 'realistik' vs 'simbol' (diagram skematik ilmiah)
  const [displayMode, setDisplayMode] = useState<'realistik' | 'simbol'>('realistik');

  // Simulation execution running state
  const [isRunning, setIsRunning] = useState<boolean>(true);

  // Selected component for deep inspector / floating controls:
  // 'baterai' | 'sakelar' | 'lampu1' | 'lampu2' | 'resistor' | 'kabel' | null
  const [selectedComponent, setSelectedComponent] = useState<string | null>('baterai');

  // -------------------------------------------------------------
  // Electrical parameter values for Mode 1 (Rangkaian Dasar)
  // -------------------------------------------------------------
  const [voltage, setVoltage] = useState<number>(6); // Default 6 V
  const [resistance, setResistance] = useState<number>(100); // Default 100 Ω
  const [switchClosed, setSwitchClosed] = useState<boolean>(true); // Default ON
  const [selectedLoadType, setSelectedLoadType] = useState<'lampu' | 'led'>('lampu');
  const [ledColor, setLedColor] = useState<'merah' | 'kuning' | 'hijau' | 'biru'>('merah');
  const [wireBroken, setWireBroken] = useState<boolean>(false);
  const [batteryPolarityReversed, setBatteryPolarityReversed] = useState<boolean>(false);

  // -------------------------------------------------------------
  // Parameter values for Mode 2 (Rangkaian Seri)
  // -------------------------------------------------------------
  const [seriVoltage, setSeriVoltage] = useState<number>(6);
  const [seriR1, setSeriR1] = useState<number>(50); // Lampu 1 (50 Ω)
  const [seriR2, setSeriR2] = useState<number>(50); // Lampu 2 (50 Ω)
  const [seriSwitchClosed, setSeriSwitchClosed] = useState<boolean>(true);
  const [seriLampu1Putus, setSeriLampu1Putus] = useState<boolean>(false);
  const [seriLampu2Putus, setSeriLampu2Putus] = useState<boolean>(false);
  const [seriWireBroken, setSeriWireBroken] = useState<boolean>(false);

  // -------------------------------------------------------------
  // Parameter values for Mode 3 (Rangkaian Paralel)
  // -------------------------------------------------------------
  const [paralelVoltage, setParalelVoltage] = useState<number>(6);
  const [paralelR1, setParalelR1] = useState<number>(50); // Lampu Cabang 1 (50 Ω)
  const [paralelR2, setParalelR2] = useState<number>(50); // Lampu Cabang 2 (50 Ω)
  const [paralelMainSwitchClosed, setParalelMainSwitchClosed] = useState<boolean>(true); // Sakelar Utama
  const [paralelSwitch1Closed, setParalelSwitch1Closed] = useState<boolean>(true); // Sakelar Cabang 1
  const [paralelSwitch2Closed, setParalelSwitch2Closed] = useState<boolean>(true); // Sakelar Cabang 2
  const [paralelLampu1Putus, setParalelLampu1Putus] = useState<boolean>(false); // Lampu 1 dicabut
  const [paralelLampu2Putus, setParalelLampu2Putus] = useState<boolean>(false); // Lampu 2 dicabut
  const [paralelWireBroken, setParalelWireBroken] = useState<boolean>(false);

  // Notification Toast message for feedback
  const [toastMessage, setToastMessage] = useState<string>(
    'Silakan klik komponen mana saja di gambar rangkaian atau panel kiri untuk mengatur nilai dan mengujinya!'
  );

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
  };

  // Observation table toggle
  const [showTable, setShowTable] = useState<boolean>(false);

  // Table Data Observation State
  const [observations, setObservations] = useState<ObservationRow[]>([
    {
      id: 'obs-init-1',
      expNumber: 1,
      circuitType: 'Rangkaian Dasar (1 Lampu + Resistor)',
      voltage: 6,
      equivalentResistance: 100,
      totalCurrent: 0.06,
      bulbStatus: 'Menyala Normal',
      observationNotes: 'Sakelar ditutup, arus mengalir 0,06 A sesuai rumus I = V / R.',
      temporaryConclusion: 'Kuat arus berbanding lurus dengan tegangan dan berbanding terbalik dengan hambatan.',
      timestamp: '10:00:15',
    },
    {
      id: 'obs-init-2',
      expNumber: 2,
      circuitType: 'Rangkaian Seri (2 Lampu)',
      voltage: 6,
      equivalentResistance: 100,
      totalCurrent: 0.06,
      bulbStatus: 'Kedua Lampu Menyala (Tegangan Terbagi)',
      observationNotes: 'R_total = R1 + R2 = 50 + 50 = 100 Ω. Jika 1 lampu dicabut, seluruh lampu padam.',
      temporaryConclusion: 'Pada rangkaian seri hanya ada 1 jalur. Jika 1 komponen mati, semua mati.',
      timestamp: '10:05:22',
    },
    {
      id: 'obs-init-3',
      expNumber: 3,
      circuitType: 'Rangkaian Paralel (2 Cabang Mandiri)',
      voltage: 6,
      equivalentResistance: 25,
      totalCurrent: 0.24,
      bulbStatus: 'Lampu 1 ON | Lampu 2 ON (Tegangan Penuh 6V)',
      observationNotes: 'Setiap cabang mandiri. Mematikan Lampu 1 tidak mematikan Lampu 2.',
      temporaryConclusion: 'Pada paralel, satu lampu padam tidak membuat lampu di cabang lain padam.',
      timestamp: '10:10:05',
    },
  ]);

  const voltagePresets = [1.5, 3.0, 4.5, 6.0, 9.0, 12.0];
  const resistancePresets = [10, 25, 50, 100, 200, 500];

  // =========================================================
  // CALCULATIONS (STRICT PHYSICS LAW)
  // =========================================================

  // Mode 1: Simulasi Dasar
  let mode1Current = 0;
  let mode1Active = false;
  if (isRunning && switchClosed && !wireBroken && voltage > 0 && resistance > 0) {
    mode1Current = Math.round((voltage / resistance) * 1000) / 1000;
    mode1Active = mode1Current > 0;
  }

  // Mode 2: Rangkaian Seri
  // Single continuous loop. If ANY component breaks, entire current stops!
  const seriRTotal = seriR1 + seriR2;
  let seriCurrent = 0;
  let seriActive = false;
  let seriLampu1Menyala = false;
  let seriLampu2Menyala = false;
  let seriV1 = 0;
  let seriV2 = 0;

  if (
    isRunning &&
    seriSwitchClosed &&
    !seriWireBroken &&
    !seriLampu1Putus &&
    !seriLampu2Putus &&
    seriVoltage > 0 &&
    seriRTotal > 0
  ) {
    seriCurrent = Math.round((seriVoltage / seriRTotal) * 1000) / 1000;
    seriActive = seriCurrent > 0;
    seriLampu1Menyala = seriActive;
    seriLampu2Menyala = seriActive;
    seriV1 = Math.round(seriCurrent * seriR1 * 100) / 100;
    seriV2 = Math.round(seriCurrent * seriR2 * 100) / 100;
  }

  // Mode 3: Rangkaian Paralel
  // CRITICAL REQUIREMENT: INDEPENDENT BRANCHES!
  // If Lampu 1 is turned off/cabut/switch 1 off, Lampu 2 STAYS FULLY LIT WITH FULL VOLTAGE!
  let paralelI1 = 0;
  let paralelI2 = 0;
  let paralelITotal = 0;
  let paralelRTotal = 0;
  let paralelLampu1Menyala = false;
  let paralelLampu2Menyala = false;

  const branch1Active = isRunning && paralelMainSwitchClosed && paralelSwitch1Closed && !paralelLampu1Putus && !paralelWireBroken;
  const branch2Active = isRunning && paralelMainSwitchClosed && paralelSwitch2Closed && !paralelLampu2Putus && !paralelWireBroken;

  if (paralelVoltage > 0) {
    if (branch1Active && paralelR1 > 0) {
      paralelI1 = Math.round((paralelVoltage / paralelR1) * 1000) / 1000;
      paralelLampu1Menyala = true;
    } else {
      paralelI1 = 0;
      paralelLampu1Menyala = false;
    }

    if (branch2Active && paralelR2 > 0) {
      paralelI2 = Math.round((paralelVoltage / paralelR2) * 1000) / 1000;
      paralelLampu2Menyala = true;
    } else {
      paralelI2 = 0;
      paralelLampu2Menyala = false;
    }

    paralelITotal = Math.round((paralelI1 + paralelI2) * 1000) / 1000;

    if (branch1Active && branch2Active) {
      paralelRTotal = Math.round(((paralelR1 * paralelR2) / (paralelR1 + paralelR2)) * 10) / 10;
    } else if (branch1Active) {
      paralelRTotal = paralelR1;
    } else if (branch2Active) {
      paralelRTotal = paralelR2;
    } else {
      paralelRTotal = 0;
    }
  }

  const formatNum = (num: number) => num.toFixed(2).replace('.', ',');

  // =========================================================
  // ACTIONS & HANDLERS
  // =========================================================

  const handleToggleSimulation = () => {
    const next = !isRunning;
    setIsRunning(next);
    triggerToast(next ? '▶️ Simulasi Dijalankan! Aliran elektron aktif.' : '⏸️ Simulasi Dijeda.');
  };

  const handleReset = () => {
    if (subMode === 'simulasi') {
      setVoltage(6);
      setResistance(100);
      setSwitchClosed(true);
      setWireBroken(false);
      setSelectedLoadType('lampu');
    } else if (subMode === 'seri') {
      setSeriVoltage(6);
      setSeriR1(50);
      setSeriR2(50);
      setSeriSwitchClosed(true);
      setSeriLampu1Putus(false);
      setSeriLampu2Putus(false);
      setSeriWireBroken(false);
    } else {
      setParalelVoltage(6);
      setParalelR1(50);
      setParalelR2(50);
      setParalelMainSwitchClosed(true);
      setParalelSwitch1Closed(true);
      setParalelSwitch2Closed(true);
      setParalelLampu1Putus(false);
      setParalelLampu2Putus(false);
      setParalelWireBroken(false);
    }
    setIsRunning(true);
    triggerToast('🔄 Nilai simulasi berhasil direset ke pengaturan awal.');
  };

  const handleClearAll = () => {
    if (subMode === 'simulasi') {
      setVoltage(0);
      setSwitchClosed(false);
    } else if (subMode === 'seri') {
      setSeriVoltage(0);
      setSeriSwitchClosed(false);
      setSeriLampu1Putus(true);
      setSeriLampu2Putus(true);
    } else {
      setParalelVoltage(0);
      setParalelMainSwitchClosed(false);
      setParalelSwitch1Closed(false);
      setParalelSwitch2Closed(false);
      setParalelLampu1Putus(true);
      setParalelLampu2Putus(true);
    }
    setIsRunning(false);
    triggerToast('🗑️ Semua sumber dan beban dinonaktifkan.');
  };

  const handleRecordObservation = () => {
    let circuitName = '';
    let curV = 0;
    let curR = 0;
    let curI = 0;
    let status = '';
    let notes = '';
    let concl = '';

    if (subMode === 'simulasi') {
      circuitName = `Rangkaian Dasar (${selectedLoadType === 'lampu' ? 'Lampu' : 'LED'} + Resistor)`;
      curV = voltage;
      curR = resistance;
      curI = mode1Current;
      status = mode1Active ? 'Menyala Terang' : 'Mati (Terbuka/Tegangan 0)';
      notes = `V = ${curV} V, R = ${curR} Ω. Sakelar: ${switchClosed ? 'Tertutup' : 'Terbuka'}. Arus = ${curI} A.`;
      concl = mode1Active ? 'Arus sebanding dengan V dan berbanding terbalik dengan R.' : 'Arus tidak mengalir karena sirkuit terbuka.';
    } else if (subMode === 'seri') {
      circuitName = 'Rangkaian Seri (2 Lampu)';
      curV = seriVoltage;
      curR = seriRTotal;
      curI = seriCurrent;
      status = seriActive ? 'Kedua Lampu Menyala' : (seriLampu1Putus || seriLampu2Putus ? 'Padam (Lampu Dicabut)' : 'Padam (Sakelar Buka)');
      notes = `V = ${curV} V, R_total = ${curR} Ω. L1: ${seriLampu1Putus ? 'Dicabut' : 'Terpasang'}, L2: ${seriLampu2Putus ? 'Dicabut' : 'Terpasang'}. Arus = ${curI} A.`;
      concl = seriActive ? 'Arus seri bernilai sama di seluruh titik rangkaian.' : 'Jika satu komponen seri putus, seluruh sirkuit mati.';
    } else {
      circuitName = 'Rangkaian Paralel (2 Cabang)';
      curV = paralelVoltage;
      curR = paralelRTotal;
      curI = paralelITotal;
      status = `L1: ${paralelLampu1Menyala ? 'ON' : 'OFF'} | L2: ${paralelLampu2Menyala ? 'ON' : 'OFF'}`;
      notes = `V = ${curV} V. I1 = ${paralelI1} A, I2 = ${paralelI2} A. I_total = ${curI} A. R_pengganti = ${curR} Ω.`;
      concl = 'Cabang paralel mandiri: mematikan satu lampu tidak memadamkan lampu lainnya.';
    }

    const newRow: ObservationRow = {
      id: `obs-${Date.now()}`,
      expNumber: observations.length + 1,
      circuitType: circuitName,
      voltage: curV,
      equivalentResistance: curR,
      totalCurrent: curI,
      bulbStatus: status,
      observationNotes: notes,
      temporaryConclusion: concl,
      timestamp: new Date().toLocaleTimeString('id-ID'),
    };

    setObservations([newRow, ...observations]);
    setShowTable(true);
    triggerToast(`📊 Data percobaan ke-${newRow.expNumber} berhasil dicatat ke tabel pengamatan!`);
  };

  return (
    <div className="space-y-6 pb-12 select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP NOTIFICATION / FEEDBACK BANNER (ALWAYS VISIBLE & CLEAR)    */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-sky-500 text-white px-4 py-2.5 rounded-2xl shadow-md border-2 border-white flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-amber-300 fill-amber-300 shrink-0 animate-bounce" />
          <span>{toastMessage}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setShowTable(!showTable)}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>{showTable ? 'Tutup Tabel Data' : 'Buka Tabel Data Pengamatan'}</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3 CIRCUIT SUB-MODE SWITCHER (DESAIN TIGA PILIHAN UTAMA)        */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 p-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 px-3 py-1 text-slate-800 font-extrabold text-sm sm:text-base">
          <Share2 className="w-5 h-5 text-sky-600" />
          <span>Pilih Jenis Rangkaian:</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 w-full sm:w-auto">
          <button
            onClick={() => {
              setSubMode('simulasi');
              setSelectedComponent('baterai');
              triggerToast('Masuk ke Rangkaian Dasar (1 Beban). Klik baterai, sakelar, atau lampu!');
            }}
            className={`py-2 px-3 sm:px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer text-center ${
              subMode === 'simulasi'
                ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-300 scale-102'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rangkaian Dasar
          </button>

          <button
            onClick={() => {
              setSubMode('seri');
              setSelectedComponent('lampu1');
              triggerToast('Masuk ke Rangkaian Seri (2 Lampu Berderet). Coba klik Lampu 1 untuk mencabutnya!');
            }}
            className={`py-2 px-3 sm:px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer text-center ${
              subMode === 'seri'
                ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-300 scale-102'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rangkaian Seri
          </button>

          <button
            onClick={() => {
              setSubMode('paralel');
              setSelectedComponent('lampu1');
              triggerToast('Masuk ke Rangkaian Paralel (2 Cabang). Coba matikan Lampu 1, Lampu 2 TETAP MENYALA!');
            }}
            className={`py-2 px-3 sm:px-4 rounded-xl font-black text-xs sm:text-sm transition-all cursor-pointer text-center ${
              subMode === 'paralel'
                ? 'bg-amber-400 text-slate-900 shadow-md ring-2 ring-amber-300 scale-102'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Rangkaian Paralel
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3-COLUMN MAIN WORKSPACE: LEFT (COMPONENTS) | CENTER (CANVAS) | RIGHT (CONTROLS & READINGS) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* =========================================================== */}
        {/* LEFT COLUMN: PILIH KOMPONEN (SEMUA BISA DIKLIK & TERHUBUNG) */}
        {/* =========================================================== */}
        <div className="lg:col-span-3 bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden">
          <div className="bg-sky-500 text-white font-black px-4 py-3 flex items-center justify-between text-sm sm:text-base shadow-xs">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-300 fill-amber-300" />
              <span>Pilih Komponen</span>
            </div>
            <span className="text-[10px] bg-sky-600 text-sky-100 px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Klik &amp; Atur
            </span>
          </div>

          <div className="p-3 space-y-2.5">
            <p className="text-[11px] text-slate-600 px-1 leading-snug">
              Klik salah satu komponen di bawah ini untuk mengaturnya langsung di rangkaian:
            </p>

            {/* 1. Baterai (Sumber Tegangan) */}
            <button
              onClick={() => {
                setSelectedComponent('baterai');
                triggerToast('🔋 Komponen Baterai dipilih! Atur tegangan atau balik kutub di panel kontrol.');
              }}
              className={`w-full rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all text-left cursor-pointer border-2 ${
                selectedComponent === 'baterai'
                  ? 'bg-sky-100/90 border-sky-500 shadow-md ring-2 ring-sky-300'
                  : 'bg-slate-50 hover:bg-sky-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-8 bg-slate-900 rounded-lg flex items-center justify-between px-1 border border-slate-700 shrink-0">
                  <div className="bg-rose-600 w-3.5 h-full flex items-center justify-center text-white font-black text-xs">+</div>
                  <div className="text-slate-400 text-xs font-black pr-0.5">-</div>
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900">Baterai (Sumber V)</div>
                  <div className="text-[10px] text-slate-500">
                    {subMode === 'simulasi' ? `${voltage} V` : subMode === 'seri' ? `${seriVoltage} V` : `${paralelVoltage} V`}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-sky-600 text-white shrink-0">
                {selectedComponent === 'baterai' ? 'AKTIF ✓' : 'KLIK'}
              </span>
            </button>

            {/* 2. Sakelar */}
            <button
              onClick={() => {
                setSelectedComponent('sakelar');
                if (subMode === 'simulasi') {
                  const next = !switchClosed;
                  setSwitchClosed(next);
                  triggerToast(`⚡ Sakelar Dasar: ${next ? 'TERTUTUP (ON - Arus Mengalir)' : 'TERBUKA (OFF)'}`);
                } else if (subMode === 'seri') {
                  const next = !seriSwitchClosed;
                  setSeriSwitchClosed(next);
                  triggerToast(`⚡ Sakelar Seri: ${next ? 'TERTUTUP (ON)' : 'TERBUKA (OFF)'}`);
                } else {
                  const next = !paralelMainSwitchClosed;
                  setParalelMainSwitchClosed(next);
                  triggerToast(`⚡ Sakelar Utama Paralel: ${next ? 'TERTUTUP (ON)' : 'TERBUKA (OFF)'}`);
                }
              }}
              className={`w-full rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all text-left cursor-pointer border-2 ${
                selectedComponent === 'sakelar'
                  ? 'bg-emerald-100/90 border-emerald-500 shadow-md ring-2 ring-emerald-300'
                  : 'bg-slate-50 hover:bg-emerald-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
                  <div className={`w-6 h-2 rounded-full ${
                    (subMode === 'simulasi' ? switchClosed : subMode === 'seri' ? seriSwitchClosed : paralelMainSwitchClosed)
                      ? 'bg-emerald-500' : 'bg-rose-500'
                  }`} />
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900">Sakelar</div>
                  <div className="text-[10px] text-slate-500">
                    {(subMode === 'simulasi' ? switchClosed : subMode === 'seri' ? seriSwitchClosed : paralelMainSwitchClosed)
                      ? 'Posisi Tertutup (ON)' : 'Posisi Terbuka (OFF)'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded text-white shrink-0 ${
                (subMode === 'simulasi' ? switchClosed : subMode === 'seri' ? seriSwitchClosed : paralelMainSwitchClosed)
                  ? 'bg-emerald-600' : 'bg-rose-600'
              }`}>
                {(subMode === 'simulasi' ? switchClosed : subMode === 'seri' ? seriSwitchClosed : paralelMainSwitchClosed)
                  ? 'ON' : 'OFF'}
              </span>
            </button>

            {/* 3. Lampu Pijar 1 / Beban Utama */}
            <button
              onClick={() => {
                setSelectedComponent('lampu1');
                if (subMode === 'paralel') {
                  const next = !paralelSwitch1Closed;
                  setParalelSwitch1Closed(next);
                  triggerToast(next ? '💡 Lampu 1 DINYALAKAN!' : '💡 Lampu 1 DIMATIKAN! Lampu 2 tetap menyala.');
                } else if (subMode === 'seri') {
                  const next = !seriLampu1Putus;
                  setSeriLampu1Putus(next);
                  triggerToast(next ? '💡 Lampu 1 DICABUT! Kedua lampu padam total.' : '💡 Lampu 1 DIPASANG KEMBALI!');
                } else {
                  setSelectedLoadType('lampu');
                  triggerToast('💡 Lampu Pijar dipilih!');
                }
              }}
              className={`w-full rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all text-left cursor-pointer border-2 ${
                selectedComponent === 'lampu1'
                  ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-300'
                  : 'bg-slate-50 hover:bg-amber-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-8 bg-amber-200 rounded-lg flex items-center justify-center shrink-0 border border-amber-300">
                  <Lightbulb className={`w-5 h-5 ${
                    (mode1Active || seriLampu1Menyala || paralelLampu1Menyala)
                      ? 'text-amber-800 fill-amber-500' : 'text-slate-500'
                  }`} />
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900">
                    {subMode === 'simulasi' ? 'Lampu Pijar' : 'Lampu 1'}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    {subMode === 'simulasi' ? 'Beban Rangkaian' : subMode === 'seri' ? `${seriR1} Ω` : `${paralelR1} Ω`}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded text-white shrink-0 ${
                (mode1Active || seriLampu1Menyala || paralelLampu1Menyala) ? 'bg-amber-600' : 'bg-slate-500'
              }`}>
                {(mode1Active || seriLampu1Menyala || paralelLampu1Menyala) ? 'NYALA' : 'MATI'}
              </span>
            </button>

            {/* 4. Lampu Pijar 2 (Khusus Seri & Paralel) */}
            {(subMode === 'seri' || subMode === 'paralel') && (
              <button
                onClick={() => {
                  setSelectedComponent('lampu2');
                  if (subMode === 'paralel') {
                    const next = !paralelSwitch2Closed;
                    setParalelSwitch2Closed(next);
                    triggerToast(next ? '💡 Lampu 2 DINYALAKAN!' : '💡 Lampu 2 DIMATIKAN! Lampu 1 tetap menyala.');
                  } else {
                    const next = !seriLampu2Putus;
                    setSeriLampu2Putus(next);
                    triggerToast(next ? '💡 Lampu 2 DICABUT! Kedua lampu padam total.' : '💡 Lampu 2 DIPASANG KEMBALI!');
                  }
                }}
                className={`w-full rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all text-left cursor-pointer border-2 ${
                  selectedComponent === 'lampu2'
                    ? 'bg-amber-100/90 border-amber-500 shadow-md ring-2 ring-amber-300'
                    : 'bg-slate-50 hover:bg-amber-50/80 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-12 h-8 bg-amber-200 rounded-lg flex items-center justify-center shrink-0 border border-amber-300">
                    <Lightbulb className={`w-5 h-5 ${
                      (seriLampu2Menyala || paralelLampu2Menyala)
                        ? 'text-amber-800 fill-amber-500' : 'text-slate-500'
                    }`} />
                  </div>
                  <div>
                    <div className="text-xs sm:text-[13px] font-bold text-slate-900">Lampu 2</div>
                    <div className="text-[10px] text-slate-500">
                      {subMode === 'seri' ? `${seriR2} Ω` : `${paralelR2} Ω`}
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] font-black uppercase px-2 py-1 rounded text-white shrink-0 ${
                  (seriLampu2Menyala || paralelLampu2Menyala) ? 'bg-amber-600' : 'bg-slate-500'
                }`}>
                  {(seriLampu2Menyala || paralelLampu2Menyala) ? 'NYALA' : 'MATI'}
                </span>
              </button>
            )}

            {/* 5. Resistor (Hambatan) */}
            <button
              onClick={() => {
                setSelectedComponent('resistor');
                triggerToast('🎛️ Resistor dipilih! Atur nilai hambatan (Ohm) di panel kontrol.');
              }}
              className={`w-full rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all text-left cursor-pointer border-2 ${
                selectedComponent === 'resistor'
                  ? 'bg-orange-100/90 border-orange-500 shadow-md ring-2 ring-orange-300'
                  : 'bg-slate-50 hover:bg-orange-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 border border-amber-300">
                  <div className="w-9 h-3.5 bg-amber-200 rounded-full border border-amber-400 flex items-center justify-evenly px-0.5">
                    <span className="w-0.5 h-full bg-amber-800" />
                    <span className="w-0.5 h-full bg-slate-900" />
                    <span className="w-0.5 h-full bg-yellow-500" />
                  </div>
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900">Resistor</div>
                  <div className="text-[10px] text-slate-500">
                    {subMode === 'simulasi' ? `${resistance} Ω` : subMode === 'seri' ? `R1=${seriR1}Ω, R2=${seriR2}Ω` : `R1=${paralelR1}Ω, R2=${paralelR2}Ω`}
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-1 rounded bg-orange-600 text-white shrink-0">
                {selectedComponent === 'resistor' ? 'AKTIF ✓' : 'KLIK'}
              </span>
            </button>

            {/* 6. Kabel Penghubung (Bisa Diuji Putus / Sambung) */}
            <button
              onClick={() => {
                setSelectedComponent('kabel');
                if (subMode === 'simulasi') {
                  const next = !wireBroken;
                  setWireBroken(next);
                  triggerToast(next ? '✂️ Kabel DIPUTUS! Sirkuit terbuka, arus = 0 A.' : '🔌 Kabel DISAMBUNGKAN!');
                } else if (subMode === 'seri') {
                  const next = !seriWireBroken;
                  setSeriWireBroken(next);
                  triggerToast(next ? '✂️ Kabel Seri DIPUTUS!' : '🔌 Kabel Seri DISAMBUNGKAN!');
                } else {
                  const next = !paralelWireBroken;
                  setParalelWireBroken(next);
                  triggerToast(next ? '✂️ Kabel Utama Paralel DIPUTUS!' : '🔌 Kabel DISAMBUNGKAN!');
                }
              }}
              className={`w-full rounded-xl p-2.5 flex items-center justify-between gap-2 transition-all text-left cursor-pointer border-2 ${
                selectedComponent === 'kabel'
                  ? 'bg-rose-100/90 border-rose-500 shadow-md ring-2 ring-rose-300'
                  : 'bg-slate-50 hover:bg-rose-50/80 border-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-12 h-8 bg-slate-900 rounded-lg flex items-center justify-center shrink-0">
                  <Scissors className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs sm:text-[13px] font-bold text-slate-900">Kabel Penghubung</div>
                  <div className="text-[10px] text-slate-500">
                    {(subMode === 'simulasi' ? wireBroken : subMode === 'seri' ? seriWireBroken : paralelWireBroken)
                      ? 'Kabel Terputus (Putus Jalur)' : 'Kabel Tersambung Utuh'}
                  </div>
                </div>
              </div>
              <span className={`text-[10px] font-black uppercase px-2 py-1 rounded text-white shrink-0 ${
                (subMode === 'simulasi' ? wireBroken : subMode === 'seri' ? seriWireBroken : paralelWireBroken)
                  ? 'bg-rose-600' : 'bg-emerald-600'
              }`}>
                {(subMode === 'simulasi' ? wireBroken : subMode === 'seri' ? seriWireBroken : paralelWireBroken)
                  ? 'PUTUS' : 'UTUH'}
              </span>
            </button>

          </div>
        </div>

        {/* =========================================================== */}
        {/* CENTER COLUMN: CANVAS DENGAN SEMUA KOMPONEN BISA DIKLIK     */}
        {/* =========================================================== */}
        <div className="lg:col-span-6 bg-white rounded-2xl shadow-md border-2 border-sky-100 p-4 sm:p-5 flex flex-col justify-between space-y-4">
          
          {/* Top Quick Status Alert Bar */}
          {subMode === 'paralel' ? (
            <div className={`rounded-xl p-3 border text-xs flex items-center justify-between gap-2 transition-all ${
              !paralelLampu1Menyala && paralelLampu2Menyala
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : paralelLampu1Menyala && !paralelLampu2Menyala
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                : paralelLampu1Menyala && paralelLampu2Menyala
                ? 'bg-sky-50 border-sky-300 text-sky-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold">
                  {!paralelLampu1Menyala && paralelLampu2Menyala
                    ? '✅ BUKTI PARALEL: Lampu 1 OFF, tetapi Lampu 2 TETAP MENYALA TERANG (6V)!'
                    : paralelLampu1Menyala && !paralelLampu2Menyala
                    ? '✅ BUKTI PARALEL: Lampu 2 OFF, tetapi Lampu 1 TETAP MENYALA TERANG (6V)!'
                    : paralelLampu1Menyala && paralelLampu2Menyala
                    ? 'Kedua cabang paralel menyala mandiri dengan tegangan penuh!'
                    : 'Kedua cabang mati karena sakelar utama terbuka atau sumber 0V.'}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-600 text-white shrink-0">
                Paralel Mandiri
              </span>
            </div>
          ) : subMode === 'seri' ? (
            <div className={`rounded-xl p-3 border text-xs flex items-center justify-between gap-2 transition-all ${
              seriActive
                ? 'bg-sky-50 border-sky-300 text-sky-950'
                : 'bg-rose-50 border-rose-300 text-rose-950'
            }`}>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-bold">
                  {seriActive
                    ? 'Rangkaian Seri: Arus mengalir melalui satu jalur tunggal (tegangan terbagi).'
                    : (seriLampu1Putus || seriLampu2Putus)
                    ? '⚠️ BUKTI SERI: Satu lampu dicabut, SELURUH RANGKAIAN PUTUS & SEMUA PADAM!'
                    : 'Rangkaian seri terbuka (sakelar OFF).'}
                </span>
              </div>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-600 text-white shrink-0">
                Satu Jalur
              </span>
            </div>
          ) : (
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-2.5 flex items-center justify-between text-xs text-sky-900 font-semibold">
              <span>💡 Klik langsung Baterai, Sakelar, Lampu, Resistor, atau Kabel pada gambar di bawah!</span>
              <span className="text-[10px] bg-sky-200 text-sky-900 font-extrabold px-2 py-0.5 rounded">
                Interaktif 100%
              </span>
            </div>
          )}

          {/* SIMULATION SVG CANVAS */}
          <div className="relative rounded-2xl bg-white border-2 border-sky-200 shadow-inner overflow-hidden flex items-center justify-center min-h-[380px] sm:min-h-[440px]">
            {/* Grid Pattern Background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <defs>
                <pattern id="graphGridCanvas" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#93c5fd" strokeWidth="0.8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#graphGridCanvas)" />
            </svg>

            {/* ===================================================== */}
            {/* CANVAS 1: RANGKAIAN DASAR (1 BEBAN + RESISTOR)         */}
            {/* ===================================================== */}
            {subMode === 'simulasi' && (
              <svg viewBox="0 0 560 380" className="w-full h-full select-none relative z-10">
                {displayMode === 'realistik' ? (
                  <>
                    {/* Wires */}
                    <path d="M 120 180 L 120 80 L 220 80" fill="none" stroke={wireBroken ? "#94a3b8" : "#dc2626"} strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setWireBroken(!wireBroken); }} />
                    <path d="M 340 80 L 440 80 L 440 180" fill="none" stroke={wireBroken ? "#94a3b8" : "#dc2626"} strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setWireBroken(!wireBroken); }} />
                    <path d="M 440 240 L 440 310 L 340 310" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setWireBroken(!wireBroken); }} />
                    <path d="M 220 310 L 120 310 L 120 240" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setWireBroken(!wireBroken); }} />

                    {/* Animated current flow (pointer-events: none so it doesn't block clicks!) */}
                    {mode1Active && (
                      <path
                        d="M 120 180 L 120 80 L 220 80 M 340 80 L 440 80 L 440 180 M 440 240 L 440 310 L 340 310 M 220 310 L 120 310 L 120 240"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="3.5"
                        strokeDasharray="8 6"
                        className="animate-current-flow pointer-events-none"
                      />
                    )}

                    {wireBroken && (
                      <g transform="translate(160, 68)" className="pointer-events-none">
                        <circle cx="10" cy="10" r="14" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
                        <line x1="4" y1="4" x2="16" y2="16" stroke="#ef4444" strokeWidth="3" />
                        <line x1="16" y1="4" x2="4" y2="16" stroke="#ef4444" strokeWidth="3" />
                        <text x="10" y="-8" fill="#b91c1c" fontSize="11" fontWeight="bold" textAnchor="middle">KABEL PUTUS</text>
                      </g>
                    )}

                    {/* BATERAI (Clickable with full hit area & highlight) */}
                    <g 
                      transform="translate(60, 160)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('baterai');
                        triggerToast('Baterai diklik! Gunakan panel pengaturan di sebelah kanan untuk mengubah voltase.');
                      }}
                    >
                      <rect x="-6" y="-6" width="128" height="120" rx="14" fill={selectedComponent === 'baterai' ? '#e0f2fe' : 'transparent'} stroke={selectedComponent === 'baterai' ? '#0284c7' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="116" height="74" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                      <rect x="5" y="5" width="40" height="64" rx="6" fill="#dc2626" />
                      <text x="25" y="44" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle">+</text>
                      <rect x="55" y="5" width="56" height="64" rx="6" fill="#1e293b" />
                      <text x="83" y="44" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">-</text>
                      <text x="58" y="96" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">Baterai ({voltage} V)</text>
                      <text x="58" y="110" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">👆 Klik untuk kontrol</text>
                    </g>

                    {/* SAKELAR (Clickable) */}
                    <g 
                      transform="translate(220, 58)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('sakelar');
                        const next = !switchClosed;
                        setSwitchClosed(next);
                        triggerToast(`⚡ Sakelar diklik: ${next ? 'TERTUTUP (ON - Arus Mengalir)' : 'TERBUKA (OFF)'}`);
                      }}
                    >
                      <rect x="-6" y="-6" width="132" height="78" rx="12" fill={selectedComponent === 'sakelar' ? '#dcfce7' : 'transparent'} stroke={selectedComponent === 'sakelar' ? '#16a34a' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="120" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="15" cy="20" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                      <circle cx="105" cy="20" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                      {switchClosed ? (
                        <path d="M 15 20 L 105 20" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
                      ) : (
                        <path d="M 15 20 L 75 -5" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
                      )}
                      <text x="60" y="58" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Sakelar ({switchClosed ? 'ON' : 'OFF'})
                      </text>
                      <text x="60" y="70" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">👆 Klik ON / OFF</text>
                    </g>

                    {/* LAMPU / LED (Clickable) */}
                    <g 
                      transform="translate(410, 160)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('lampu1');
                        triggerToast('💡 Lampu diklik! Atur hambatan atau nyala di panel kontrol.');
                      }}
                    >
                      <rect x="-10" y="-10" width="80" height="135" rx="12" fill={selectedComponent === 'lampu1' ? '#fef3c7' : 'transparent'} stroke={selectedComponent === 'lampu1' ? '#d97706' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      {selectedLoadType === 'lampu' ? (
                        <>
                          {mode1Active && (
                            <circle cx="30" cy="30" r="50" fill="#fde047" opacity="0.45" filter="blur(10px)" className="pointer-events-none" />
                          )}
                          <rect x="18" y="55" width="24" height="22" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                          <circle cx="30" cy="25" r="28" fill={mode1Active ? '#fef08a' : '#f8fafc'} stroke={mode1Active ? '#f59e0b' : '#94a3b8'} strokeWidth="3.5" />
                          <path d="M 22 35 L 26 18 L 34 18 L 38 35" fill="none" stroke={mode1Active ? '#b45309' : '#64748b'} strokeWidth="2.5" />
                          <text x="30" y="102" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">Lampu Pijar</text>
                        </>
                      ) : (
                        <>
                          {mode1Active && (
                            <circle cx="30" cy="30" r="45" fill={ledColor === 'merah' ? '#fb7185' : '#fde047'} opacity="0.45" filter="blur(10px)" className="pointer-events-none" />
                          )}
                          <rect x="24" y="55" width="12" height="20" fill="#94a3b8" />
                          <path
                            d="M 12 35 C 12 12, 48 12, 48 35 L 48 55 L 12 55 Z"
                            fill={
                              mode1Active ? (ledColor === 'merah' ? '#f43f5e' : ledColor === 'kuning' ? '#eab308' : ledColor === 'hijau' ? '#10b981' : '#3b82f6') : '#cbd5e1'
                            }
                            stroke="#64748b"
                            strokeWidth="2.5"
                          />
                          <text x="30" y="102" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">LED ({ledColor})</text>
                        </>
                      )}
                      <text x="30" y="118" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">👆 Klik untuk atur</text>
                    </g>

                    {/* RESISTOR (Clickable) */}
                    <g 
                      transform="translate(220, 288)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('resistor');
                        triggerToast('🎛️ Resistor diklik! Atur nilai hambatan di panel kontrol kanan.');
                      }}
                    >
                      <rect x="-6" y="-6" width="132" height="85" rx="12" fill={selectedComponent === 'resistor' ? '#ffedd5' : 'transparent'} stroke={selectedComponent === 'resistor' ? '#ea580c' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      <line x1="0" y1="20" x2="30" y2="20" stroke="#94a3b8" strokeWidth="4" />
                      <line x1="90" y1="20" x2="120" y2="20" stroke="#94a3b8" strokeWidth="4" />
                      <rect x="25" y="7" width="70" height="26" rx="8" fill="#fde68a" stroke="#d97706" strokeWidth="2.5" />
                      <rect x="36" y="7" width="5" height="26" fill="#78350f" />
                      <rect x="48" y="7" width="5" height="26" fill="#0f172a" />
                      <rect x="60" y="7" width="5" height="26" fill="#78350f" />
                      <rect x="76" y="7" width="5" height="26" fill="#eab308" />
                      <text x="60" y="55" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">Resistor ({resistance} Ω)</text>
                      <text x="60" y="70" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">👆 Klik untuk atur</text>
                    </g>
                  </>
                ) : (
                  /* SCHEMATIC SYMBOLIC MODE 1 */
                  <>
                    <path d="M 120 180 L 120 80 L 230 80 M 330 80 L 440 80 L 440 180 M 440 220 L 440 310 L 330 310 M 230 310 L 120 310 L 120 220" fill="none" stroke="#0284c7" strokeWidth="3" />
                    <g transform="translate(120, 180)" className="cursor-pointer" onClick={() => setSelectedComponent('baterai')}>
                      <line x1="-25" y1="0" x2="25" y2="0" stroke="#0f172a" strokeWidth="4" />
                      <line x1="-12" y1="18" x2="12" y2="18" stroke="#0f172a" strokeWidth="6" />
                      <text x="-35" y="-5" fill="#dc2626" fontSize="14" fontWeight="bold">+</text>
                      <text x="-35" y="24" fill="#0f172a" fontSize="14" fontWeight="bold">-</text>
                      <text x="-40" y="10" fill="#0284c7" fontSize="11" textAnchor="end">{voltage}V</text>
                    </g>
                    <g transform="translate(230, 80)" className="cursor-pointer" onClick={() => { setSelectedComponent('sakelar'); setSwitchClosed(!switchClosed); }}>
                      <circle cx="0" cy="0" r="5" fill="#0f172a" />
                      <circle cx="100" cy="0" r="5" fill="#0f172a" />
                      <line x1="0" y1="0" x2={switchClosed ? 100 : 80} y2={switchClosed ? 0 : -25} stroke={switchClosed ? '#16a34a' : '#dc2626'} strokeWidth="4" />
                    </g>
                    <g transform="translate(440, 200)" className="cursor-pointer" onClick={() => setSelectedComponent('lampu1')}>
                      <circle cx="0" cy="0" r="20" fill="none" stroke={mode1Active ? '#eab308' : '#0f172a'} strokeWidth={mode1Active ? '4' : '3'} />
                      <line x1="-14" y1="-14" x2="14" y2="14" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="14" y1="-14" x2="-14" y2="14" stroke="#0f172a" strokeWidth="2.5" />
                    </g>
                    <g transform="translate(230, 310)" className="cursor-pointer" onClick={() => setSelectedComponent('resistor')}>
                      <polyline points="0,0 15,-15 30,15 45,-15 60,15 75,-15 90,15 100,0" fill="none" stroke="#0f172a" strokeWidth="3" />
                      <text x="50" y="25" fill="#0284c7" fontSize="11" textAnchor="middle">{resistance}Ω</text>
                    </g>
                  </>
                )}
              </svg>
            )}

            {/* ===================================================== */}
            {/* CANVAS 2: RANGKAIAN SERI (2 LAMPU DALAM 1 JALUR)       */}
            {/* ===================================================== */}
            {subMode === 'seri' && (
              <svg viewBox="0 0 560 380" className="w-full h-full select-none relative z-10">
                {displayMode === 'realistik' ? (
                  <>
                    {/* Continuous Single Loop Wires */}
                    <path d="M 100 180 L 100 70 L 170 70" fill="none" stroke={seriWireBroken ? "#94a3b8" : "#dc2626"} strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setSeriWireBroken(!seriWireBroken); }} />
                    <path d="M 270 70 L 320 70" fill="none" stroke={seriWireBroken ? "#94a3b8" : "#dc2626"} strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setSeriWireBroken(!seriWireBroken); }} />
                    <path d="M 400 70 L 470 70 L 470 180" fill="none" stroke={seriWireBroken ? "#94a3b8" : "#dc2626"} strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setSeriWireBroken(!seriWireBroken); }} />
                    <path d="M 470 250 L 470 320 L 100 320 L 100 240" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => { setSelectedComponent('kabel'); setSeriWireBroken(!seriWireBroken); }} />

                    {/* Animated current flow for series */}
                    {seriActive && (
                      <path
                        d="M 100 180 L 100 70 L 170 70 M 270 70 L 320 70 M 400 70 L 470 70 L 470 180 M 470 250 L 470 320 L 100 320 L 100 240"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="3.5"
                        strokeDasharray="8 6"
                        className="animate-current-flow pointer-events-none"
                      />
                    )}

                    {/* BATERAI SERI (Clickable) */}
                    <g 
                      transform="translate(50, 160)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('baterai');
                        triggerToast('Baterai Seri diklik! Atur tegangan di panel kanan.');
                      }}
                    >
                      <rect x="-6" y="-6" width="118" height="118" rx="14" fill={selectedComponent === 'baterai' ? '#e0f2fe' : 'transparent'} stroke={selectedComponent === 'baterai' ? '#0284c7' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="105" height="74" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                      <rect x="5" y="5" width="38" height="64" rx="6" fill="#dc2626" />
                      <text x="24" y="44" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle">+</text>
                      <rect x="50" y="5" width="50" height="64" rx="6" fill="#1e293b" />
                      <text x="75" y="44" fill="#ffffff" fontSize="26" fontWeight="900" textAnchor="middle">-</text>
                      <text x="52" y="96" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">Baterai ({seriVoltage} V)</text>
                      <text x="52" y="110" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">👆 Klik kontrol</text>
                    </g>

                    {/* SAKELAR SERI (Clickable) */}
                    <g 
                      transform="translate(170, 50)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('sakelar');
                        const next = !seriSwitchClosed;
                        setSeriSwitchClosed(next);
                        triggerToast(`⚡ Sakelar Seri: ${next ? 'TERTUTUP (ON)' : 'TERBUKA (OFF)'}`);
                      }}
                    >
                      <rect x="-6" y="-6" width="112" height="75" rx="12" fill={selectedComponent === 'sakelar' ? '#dcfce7' : 'transparent'} stroke={selectedComponent === 'sakelar' ? '#16a34a' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="100" height="40" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="15" cy="20" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                      <circle cx="85" cy="20" r="5" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
                      {seriSwitchClosed ? (
                        <path d="M 15 20 L 85 20" stroke="#16a34a" strokeWidth="8" strokeLinecap="round" />
                      ) : (
                        <path d="M 15 20 L 65 -5" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />
                      )}
                      <text x="50" y="56" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Sakelar ({seriSwitchClosed ? 'ON' : 'OFF'})
                      </text>
                      <text x="50" y="68" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">👆 Klik ON/OFF</text>
                    </g>

                    {/* LAMPU 1 SERI (Clickable & Can be disconnected to test series breakage) */}
                    <g 
                      transform="translate(330, 45)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('lampu1');
                        const next = !seriLampu1Putus;
                        setSeriLampu1Putus(next);
                        triggerToast(next ? '⚠️ Lampu 1 DICABUT! Seluruh rangkaian putus & kedua lampu padam!' : '💡 Lampu 1 DIPASANG KEMBALI!');
                      }}
                    >
                      <rect x="-8" y="-8" width="80" height="120" rx="12" fill={selectedComponent === 'lampu1' ? '#fef3c7' : 'transparent'} stroke={selectedComponent === 'lampu1' ? '#d97706' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      {seriLampu1Menyala && (
                        <circle cx="30" cy="25" r="45" fill="#fde047" opacity="0.45" filter="blur(10px)" className="pointer-events-none" />
                      )}
                      <rect x="18" y="50" width="24" height="20" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <circle cx="30" cy="25" r="26" fill={seriLampu1Menyala ? '#fef08a' : '#f8fafc'} stroke={seriLampu1Menyala ? '#f59e0b' : '#94a3b8'} strokeWidth="3.5" />
                      <path d="M 22 35 L 26 18 L 34 18 L 38 35" fill="none" stroke={seriLampu1Menyala ? '#b45309' : '#64748b'} strokeWidth="2.5" />
                      <text x="30" y="-8" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Lampu 1 ({seriR1} Ω)
                      </text>
                      {seriLampu1Putus ? (
                        <text x="30" y="30" fill="#ef4444" fontSize="10" fontWeight="900" textAnchor="middle">DICABUT ✕</text>
                      ) : (
                        <text x="30" y="86" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">V1 = {seriV1} V</text>
                      )}
                      <text x="30" y="100" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik cabut/pasang</text>
                    </g>

                    {/* LAMPU 2 SERI (Clickable) */}
                    <g 
                      transform="translate(440, 160)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('lampu2');
                        const next = !seriLampu2Putus;
                        setSeriLampu2Putus(next);
                        triggerToast(next ? '⚠️ Lampu 2 DICABUT! Seluruh rangkaian putus & kedua lampu padam!' : '💡 Lampu 2 DIPASANG KEMBALI!');
                      }}
                    >
                      <rect x="-8" y="-8" width="80" height="130" rx="12" fill={selectedComponent === 'lampu2' ? '#fef3c7' : 'transparent'} stroke={selectedComponent === 'lampu2' ? '#d97706' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      {seriLampu2Menyala && (
                        <circle cx="30" cy="30" r="45" fill="#fde047" opacity="0.45" filter="blur(10px)" className="pointer-events-none" />
                      )}
                      <rect x="18" y="55" width="24" height="20" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                      <circle cx="30" cy="25" r="26" fill={seriLampu2Menyala ? '#fef08a' : '#f8fafc'} stroke={seriLampu2Menyala ? '#f59e0b' : '#94a3b8'} strokeWidth="3.5" />
                      <path d="M 22 35 L 26 18 L 34 18 L 38 35" fill="none" stroke={seriLampu2Menyala ? '#b45309' : '#64748b'} strokeWidth="2.5" />
                      <text x="30" y="94" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Lampu 2 ({seriR2} Ω)
                      </text>
                      {seriLampu2Putus ? (
                        <text x="30" y="30" fill="#ef4444" fontSize="10" fontWeight="900" textAnchor="middle">DICABUT ✕</text>
                      ) : (
                        <text x="30" y="110" fill="#0284c7" fontSize="11" fontWeight="bold" textAnchor="middle">V2 = {seriV2} V</text>
                      )}
                      <text x="30" y="122" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik cabut/pasang</text>
                    </g>

                    {/* Series Circuit Callout Banner */}
                    <g transform="translate(180, 270)">
                      <rect x="0" y="0" width="260" height="38" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
                      <text x="130" y="16" fill="#1e3a8a" fontSize="11" fontWeight="bold" textAnchor="middle">
                        R_total = R1 + R2 = {seriRTotal} Ω (I = {formatNum(seriCurrent)} A)
                      </text>
                      <text x="130" y="30" fill="#0284c7" fontSize="10" textAnchor="middle">
                        Klik Lampu 1 atau Lampu 2 untuk mencabutnya!
                      </text>
                    </g>
                  </>
                ) : (
                  /* SCHEMATIC SYMBOLIC MODE 2 */
                  <>
                    <path d="M 100 180 L 100 70 L 180 70 M 260 70 L 330 70 M 390 70 L 470 70 L 470 170 M 470 230 L 470 320 L 100 320 L 100 220" fill="none" stroke="#0284c7" strokeWidth="3" />
                    <g transform="translate(100, 180)" className="cursor-pointer" onClick={() => setSelectedComponent('baterai')}>
                      <line x1="-25" y1="0" x2="25" y2="0" stroke="#0f172a" strokeWidth="4" />
                      <line x1="-12" y1="18" x2="12" y2="18" stroke="#0f172a" strokeWidth="6" />
                      <text x="-35" y="10" fill="#0284c7" fontSize="11" textAnchor="end">{seriVoltage}V</text>
                    </g>
                    <g transform="translate(180, 70)" className="cursor-pointer" onClick={() => { setSelectedComponent('sakelar'); setSeriSwitchClosed(!seriSwitchClosed); }}>
                      <circle cx="0" cy="0" r="5" fill="#0f172a" />
                      <circle cx="80" cy="0" r="5" fill="#0f172a" />
                      <line x1="0" y1="0" x2={seriSwitchClosed ? 80 : 65} y2={seriSwitchClosed ? 0 : -20} stroke={seriSwitchClosed ? '#16a34a' : '#dc2626'} strokeWidth="4" />
                    </g>
                    <g transform="translate(360, 70)" className="cursor-pointer" onClick={() => { setSelectedComponent('lampu1'); setSeriLampu1Putus(!seriLampu1Putus); }}>
                      <circle cx="0" cy="0" r="20" fill="none" stroke={seriLampu1Menyala ? '#eab308' : '#0f172a'} strokeWidth={seriLampu1Menyala ? '4' : '3'} />
                      <line x1="-14" y1="-14" x2="14" y2="14" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="14" y1="-14" x2="-14" y2="14" stroke="#0f172a" strokeWidth="2.5" />
                      <text x="0" y="-25" fill="#0f172a" fontSize="10" textAnchor="middle">L1</text>
                    </g>
                    <g transform="translate(470, 200)" className="cursor-pointer" onClick={() => { setSelectedComponent('lampu2'); setSeriLampu2Putus(!seriLampu2Putus); }}>
                      <circle cx="0" cy="0" r="20" fill="none" stroke={seriLampu2Menyala ? '#eab308' : '#0f172a'} strokeWidth={seriLampu2Menyala ? '4' : '3'} />
                      <line x1="-14" y1="-14" x2="14" y2="14" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="14" y1="-14" x2="-14" y2="14" stroke="#0f172a" strokeWidth="2.5" />
                      <text x="28" y="0" fill="#0f172a" fontSize="10" textAnchor="start">L2</text>
                    </g>
                  </>
                )}
              </svg>
            )}

            {/* ===================================================== */}
            {/* CANVAS 3: RANGKAIAN PARALEL (2 CABANG BENAR-BENAR MANDIRI) */}
            {/* ===================================================== */}
            {subMode === 'paralel' && (
              <svg viewBox="0 0 560 380" className="w-full h-full select-none relative z-10">
                {displayMode === 'realistik' ? (
                  <>
                    {/* Main Trunk Red Wire from Battery (+) up to Split Junction */}
                    <path d="M 70 180 L 70 90 L 140 90" fill="none" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => setSelectedComponent('kabel')} />
                    
                    {/* Split Junction Dots (Positive Node) */}
                    <circle cx="140" cy="90" r="8" fill="#b91c1c" />
                    <circle cx="140" cy="240" r="8" fill="#b91c1c" />
                    <line x1="140" y1="90" x2="140" y2="240" stroke="#dc2626" strokeWidth="8" strokeLinecap="round" />

                    {/* Cabang 1 (Top Branch): Wires to Switch 1 and Lampu 1 */}
                    <path d="M 140 90 L 200 90" fill="none" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
                    <path d="M 280 90 L 350 90" fill="none" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
                    <path d="M 410 90 L 480 90 L 480 160" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />

                    {/* Cabang 2 (Bottom Branch): Wires to Switch 2 and Lampu 2 */}
                    <path d="M 140 240 L 200 240" fill="none" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
                    <path d="M 280 240 L 350 240" fill="none" stroke="#dc2626" strokeWidth="7" strokeLinecap="round" />
                    <path d="M 410 240 L 480 240 L 480 160" fill="none" stroke="#0f172a" strokeWidth="7" strokeLinecap="round" />

                    {/* Merge Junction Dot (Negative Node) */}
                    <circle cx="480" cy="160" r="8" fill="#1e293b" />

                    {/* Return Trunk Black Wire back to Battery (-) */}
                    <path d="M 480 160 L 480 320 L 70 320 L 70 240" fill="none" stroke="#0f172a" strokeWidth="8" strokeLinecap="round" className="cursor-pointer" onClick={() => setSelectedComponent('kabel')} />

                    {/* INDEPENDENT ANIMATED FLOW ON CABANG 1 */}
                    {paralelLampu1Menyala && (
                      <path
                        d="M 140 90 L 350 90 M 410 90 L 480 90 L 480 160"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="3.5"
                        strokeDasharray="8 6"
                        className="animate-current-flow pointer-events-none"
                      />
                    )}

                    {/* INDEPENDENT ANIMATED FLOW ON CABANG 2 */}
                    {paralelLampu2Menyala && (
                      <path
                        d="M 140 240 L 350 240 M 410 240 L 480 240 L 480 160"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="3.5"
                        strokeDasharray="8 6"
                        className="animate-current-flow pointer-events-none"
                      />
                    )}

                    {/* TRUNK FLOW WHEN AT LEAST ONE IS ON */}
                    {(paralelLampu1Menyala || paralelLampu2Menyala) && (
                      <path
                        d="M 70 180 L 70 90 L 140 90 M 480 160 L 480 320 L 70 320 L 70 240"
                        fill="none"
                        stroke="#fef08a"
                        strokeWidth="4.5"
                        strokeDasharray="8 6"
                        className="animate-current-flow-fast pointer-events-none"
                      />
                    )}

                    {/* BATERAI PARALEL (Clickable) */}
                    <g 
                      transform="translate(30, 160)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('baterai');
                        triggerToast('Baterai Paralel diklik! Atur tegangan di panel kanan.');
                      }}
                    >
                      <rect x="-6" y="-6" width="98" height="110" rx="12" fill={selectedComponent === 'baterai' ? '#e0f2fe' : 'transparent'} stroke={selectedComponent === 'baterai' ? '#0284c7' : 'transparent'} strokeWidth="2.5" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="85" height="70" rx="8" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
                      <rect x="4" y="4" width="30" height="62" rx="4" fill="#dc2626" />
                      <text x="19" y="40" fill="#ffffff" fontSize="18" fontWeight="900" textAnchor="middle">+</text>
                      <rect x="38" y="4" width="43" height="62" rx="4" fill="#1e293b" />
                      <text x="60" y="42" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle">-</text>
                      <text x="42" y="88" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">Baterai ({paralelVoltage} V)</text>
                      <text x="42" y="100" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik atur V</text>
                    </g>

                    {/* CABANG 1: SAKELAR 1 (Clickable) */}
                    <g 
                      transform="translate(200, 70)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('sakelar');
                        const next = !paralelSwitch1Closed;
                        setParalelSwitch1Closed(next);
                        triggerToast(next ? '⚡ Sakelar Cabang 1 DITUTUP (ON)!' : '⚡ Sakelar Cabang 1 DIBUKA (OFF)! Lampu 2 tetap menyala.');
                      }}
                    >
                      <rect x="-6" y="-6" width="92" height="65" rx="10" fill={selectedComponent === 'sakelar' ? '#dcfce7' : 'transparent'} stroke={selectedComponent === 'sakelar' ? '#16a34a' : 'transparent'} strokeWidth="2" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="80" height="35" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="12" cy="18" r="4" fill="#cbd5e1" />
                      <circle cx="68" cy="18" r="4" fill="#cbd5e1" />
                      {paralelSwitch1Closed ? (
                        <line x1="12" y1="18" x2="68" y2="18" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
                      ) : (
                        <line x1="12" y1="18" x2="55" y2="0" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
                      )}
                      <text x="40" y="-8" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Sakelar 1 ({paralelSwitch1Closed ? 'ON' : 'OFF'})
                      </text>
                      <text x="40" y="48" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik ON/OFF</text>
                    </g>

                    {/* CABANG 1: LAMPU 1 (Clickable & Fully Independent) */}
                    <g 
                      transform="translate(350, 55)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('lampu1');
                        const next = !paralelSwitch1Closed;
                        setParalelSwitch1Closed(next);
                        triggerToast(next ? '💡 Lampu 1 Dihidupkan!' : '💡 Lampu 1 Dimatikan! Lampu 2 TETAP MENYALA!');
                      }}
                    >
                      <rect x="-8" y="-8" width="76" height="110" rx="12" fill={selectedComponent === 'lampu1' ? '#fef3c7' : 'transparent'} stroke={selectedComponent === 'lampu1' ? '#d97706' : 'transparent'} strokeWidth="2" strokeDasharray="4 2" />
                      {paralelLampu1Menyala && (
                        <circle cx="25" cy="25" r="45" fill="#fde047" opacity="0.45" filter="blur(10px)" className="pointer-events-none" />
                      )}
                      <rect x="15" y="48" width="20" height="18" rx="3" fill="#1e293b" />
                      <circle cx="25" cy="22" r="24" fill={paralelLampu1Menyala ? '#fef08a' : '#f8fafc'} stroke={paralelLampu1Menyala ? '#f59e0b' : '#94a3b8'} strokeWidth="3" />
                      <path d="M 18 30 L 22 16 L 28 16 L 32 30" fill="none" stroke={paralelLampu1Menyala ? '#b45309' : '#64748b'} strokeWidth="2" />
                      
                      <text x="25" y="-8" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Lampu 1 ({paralelR1} Ω)
                      </text>
                      <text x="25" y="80" fill={paralelLampu1Menyala ? '#0284c7' : '#ef4444'} fontSize="11" fontWeight="bold" textAnchor="middle">
                        {paralelLampu1Menyala ? `I1 = ${formatNum(paralelI1)} A` : 'MATI (OFF)'}
                      </text>
                      <text x="25" y="93" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik ON/OFF L1</text>
                    </g>

                    {/* CABANG 2: SAKELAR 2 (Clickable) */}
                    <g 
                      transform="translate(200, 220)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('sakelar');
                        const next = !paralelSwitch2Closed;
                        setParalelSwitch2Closed(next);
                        triggerToast(next ? '⚡ Sakelar Cabang 2 DITUTUP (ON)!' : '⚡ Sakelar Cabang 2 DIBUKA (OFF)! Lampu 1 tetap menyala.');
                      }}
                    >
                      <rect x="-6" y="-6" width="92" height="65" rx="10" fill={selectedComponent === 'sakelar' ? '#dcfce7' : 'transparent'} stroke={selectedComponent === 'sakelar' ? '#16a34a' : 'transparent'} strokeWidth="2" strokeDasharray="4 2" />
                      <rect x="0" y="0" width="80" height="35" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                      <circle cx="12" cy="18" r="4" fill="#cbd5e1" />
                      <circle cx="68" cy="18" r="4" fill="#cbd5e1" />
                      {paralelSwitch2Closed ? (
                        <line x1="12" y1="18" x2="68" y2="18" stroke="#16a34a" strokeWidth="6" strokeLinecap="round" />
                      ) : (
                        <line x1="12" y1="18" x2="55" y2="0" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
                      )}
                      <text x="40" y="-8" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">
                        Sakelar 2 ({paralelSwitch2Closed ? 'ON' : 'OFF'})
                      </text>
                      <text x="40" y="48" fill="#0284c7" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik ON/OFF</text>
                    </g>

                    {/* CABANG 2: LAMPU 2 (Clickable & Fully Independent) */}
                    <g 
                      transform="translate(350, 205)" 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedComponent('lampu2');
                        const next = !paralelSwitch2Closed;
                        setParalelSwitch2Closed(next);
                        triggerToast(next ? '💡 Lampu 2 Dihidupkan!' : '💡 Lampu 2 Dimatikan! Lampu 1 TETAP MENYALA!');
                      }}
                    >
                      <rect x="-8" y="-8" width="76" height="110" rx="12" fill={selectedComponent === 'lampu2' ? '#fef3c7' : 'transparent'} stroke={selectedComponent === 'lampu2' ? '#d97706' : 'transparent'} strokeWidth="2" strokeDasharray="4 2" />
                      {paralelLampu2Menyala && (
                        <circle cx="25" cy="25" r="45" fill="#fde047" opacity="0.45" filter="blur(10px)" className="pointer-events-none" />
                      )}
                      <rect x="15" y="48" width="20" height="18" rx="3" fill="#1e293b" />
                      <circle cx="25" cy="22" r="24" fill={paralelLampu2Menyala ? '#fef08a' : '#f8fafc'} stroke={paralelLampu2Menyala ? '#f59e0b' : '#94a3b8'} strokeWidth="3" />
                      <path d="M 18 30 L 22 16 L 28 16 L 32 30" fill="none" stroke={paralelLampu2Menyala ? '#b45309' : '#64748b'} strokeWidth="2" />
                      
                      <text x="25" y="-8" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">
                        Lampu 2 ({paralelR2} Ω)
                      </text>
                      <text x="25" y="80" fill={paralelLampu2Menyala ? '#0284c7' : '#ef4444'} fontSize="11" fontWeight="bold" textAnchor="middle">
                        {paralelLampu2Menyala ? `I2 = ${formatNum(paralelI2)} A` : 'MATI (OFF)'}
                      </text>
                      <text x="25" y="93" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">👆 Klik ON/OFF L2</text>
                    </g>
                  </>
                ) : (
                  /* SCHEMATIC SYMBOLIC MODE 3 */
                  <>
                    <path d="M 80 180 L 80 90 L 160 90 M 160 90 L 220 90 M 300 90 L 370 90 M 410 90 L 480 90 L 480 200 M 160 90 L 160 240 L 220 240 M 300 240 L 370 240 M 410 240 L 480 240 L 480 200 M 480 200 L 480 320 L 80 320 L 80 220" fill="none" stroke="#0284c7" strokeWidth="3" />
                    <circle cx="160" cy="90" r="5" fill="#0284c7" />
                    <circle cx="160" cy="240" r="5" fill="#0284c7" />
                    <circle cx="480" cy="90" r="5" fill="#0284c7" />
                    <circle cx="480" cy="240" r="5" fill="#0284c7" />
                    <g transform="translate(80, 180)" className="cursor-pointer" onClick={() => setSelectedComponent('baterai')}>
                      <line x1="-20" y1="0" x2="20" y2="0" stroke="#0f172a" strokeWidth="4" />
                      <line x1="-10" y1="18" x2="10" y2="18" stroke="#0f172a" strokeWidth="6" />
                      <text x="-28" y="10" fill="#0284c7" fontSize="11" textAnchor="end">{paralelVoltage}V</text>
                    </g>
                    <g transform="translate(220, 90)" className="cursor-pointer" onClick={() => { setSelectedComponent('sakelar'); setParalelSwitch1Closed(!paralelSwitch1Closed); }}>
                      <circle cx="0" cy="0" r="4" fill="#0f172a" />
                      <circle cx="60" cy="0" r="4" fill="#0f172a" />
                      <line x1="0" y1="0" x2={paralelSwitch1Closed ? 60 : 45} y2={paralelSwitch1Closed ? 0 : -20} stroke={paralelSwitch1Closed ? '#16a34a' : '#dc2626'} strokeWidth="3.5" />
                    </g>
                    <g transform="translate(390, 90)" className="cursor-pointer" onClick={() => { setSelectedComponent('lampu1'); setParalelSwitch1Closed(!paralelSwitch1Closed); }}>
                      <circle cx="0" cy="0" r="18" fill="none" stroke={paralelLampu1Menyala ? '#eab308' : '#0f172a'} strokeWidth={paralelLampu1Menyala ? '3.5' : '2.5'} />
                      <line x1="-12" y1="-12" x2="12" y2="12" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="12" y1="-12" x2="-12" y2="12" stroke="#0f172a" strokeWidth="2.5" />
                      <text x="0" y="-22" fill="#0f172a" fontSize="10" textAnchor="middle">L1</text>
                    </g>
                    <g transform="translate(220, 240)" className="cursor-pointer" onClick={() => { setSelectedComponent('sakelar'); setParalelSwitch2Closed(!paralelSwitch2Closed); }}>
                      <circle cx="0" cy="0" r="4" fill="#0f172a" />
                      <circle cx="60" cy="0" r="4" fill="#0f172a" />
                      <line x1="0" y1="0" x2={paralelSwitch2Closed ? 60 : 45} y2={paralelSwitch2Closed ? 0 : -20} stroke={paralelSwitch2Closed ? '#16a34a' : '#dc2626'} strokeWidth="3.5" />
                    </g>
                    <g transform="translate(390, 240)" className="cursor-pointer" onClick={() => { setSelectedComponent('lampu2'); setParalelSwitch2Closed(!paralelSwitch2Closed); }}>
                      <circle cx="0" cy="0" r="18" fill="none" stroke={paralelLampu2Menyala ? '#eab308' : '#0f172a'} strokeWidth={paralelLampu2Menyala ? '3.5' : '2.5'} />
                      <line x1="-12" y1="-12" x2="12" y2="12" stroke="#0f172a" strokeWidth="2.5" />
                      <line x1="12" y1="-12" x2="-12" y2="12" stroke="#0f172a" strokeWidth="2.5" />
                      <text x="0" y="-22" fill="#0f172a" fontSize="10" textAnchor="middle">L2</text>
                    </g>
                  </>
                )}
              </svg>
            )}

            {/* Quick Floating Action Popover for the Clicked Component */}
            {selectedComponent && (
              <div className="absolute top-3 left-3 right-3 sm:right-auto bg-white/95 backdrop-blur-md rounded-xl p-3 border-2 border-sky-400 shadow-xl z-20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold">
                    {selectedComponent === 'baterai' ? '🔋' : selectedComponent === 'sakelar' ? '⚡' : selectedComponent === 'resistor' ? '🎛️' : selectedComponent === 'kabel' ? '✂️' : '💡'}
                  </div>
                  <div>
                    <div className="font-extrabold text-slate-900 capitalize">
                      Komponen Terpilih: {selectedComponent === 'lampu1' ? 'Lampu 1' : selectedComponent === 'lampu2' ? 'Lampu 2' : selectedComponent}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      Gunakan tombol cepat di sebelah kanan untuk mengubah nilainya langsung!
                    </div>
                  </div>
                </div>

                {/* Inline Quick Buttons based on selected component */}
                {selectedComponent === 'baterai' && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-600 mr-1">Tegangan:</span>
                    {voltagePresets.map((vp) => (
                      <button
                        key={vp}
                        onClick={() => {
                          if (subMode === 'simulasi') setVoltage(vp);
                          else if (subMode === 'seri') setSeriVoltage(vp);
                          else setParalelVoltage(vp);
                          triggerToast(`🔋 Tegangan diubah ke ${vp} V`);
                        }}
                        className={`px-2 py-1 rounded font-bold text-xs cursor-pointer ${
                          (subMode === 'simulasi' ? voltage : subMode === 'seri' ? seriVoltage : paralelVoltage) === vp
                            ? 'bg-sky-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                        }`}
                      >
                        {vp}V
                      </button>
                    ))}
                  </div>
                )}

                {selectedComponent === 'sakelar' && (
                  <button
                    onClick={() => {
                      if (subMode === 'simulasi') setSwitchClosed(!switchClosed);
                      else if (subMode === 'seri') setSeriSwitchClosed(!seriSwitchClosed);
                      else setParalelMainSwitchClosed(!paralelMainSwitchClosed);
                    }}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-lg cursor-pointer"
                  >
                    Buka / Tutup Sakelar
                  </button>
                )}

                {(selectedComponent === 'lampu1' || selectedComponent === 'lampu2') && (
                  <div className="flex items-center gap-2">
                    {subMode === 'paralel' ? (
                      <>
                        <button
                          onClick={() => {
                            if (selectedComponent === 'lampu1') setParalelSwitch1Closed(!paralelSwitch1Closed);
                            else setParalelSwitch2Closed(!paralelSwitch2Closed);
                          }}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-900 font-extrabold rounded cursor-pointer"
                        >
                          Nyalakan / Matikan
                        </button>
                      </>
                    ) : subMode === 'seri' ? (
                      <button
                        onClick={() => {
                          if (selectedComponent === 'lampu1') setSeriLampu1Putus(!seriLampu1Putus);
                          else setSeriLampu2Putus(!seriLampu2Putus);
                        }}
                        className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded cursor-pointer"
                      >
                        {(selectedComponent === 'lampu1' ? seriLampu1Putus : seriLampu2Putus) ? 'Pasang Lampu' : 'Cabut Lampu (Putus)'}
                      </button>
                    ) : (
                      <button
                        onClick={() => setSelectedLoadType(selectedLoadType === 'lampu' ? 'led' : 'lampu')}
                        className="px-2.5 py-1 bg-sky-600 hover:bg-sky-700 text-white font-extrabold rounded cursor-pointer"
                      >
                        Ganti ke {selectedLoadType === 'lampu' ? 'LED' : 'Lampu Pijar'}
                      </button>
                    )}
                  </div>
                )}

                {selectedComponent === 'resistor' && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[11px] font-bold text-slate-600 mr-1">Nilai R:</span>
                    {resistancePresets.map((rp) => (
                      <button
                        key={rp}
                        onClick={() => {
                          if (subMode === 'simulasi') setResistance(rp);
                          else if (subMode === 'seri') { setSeriR1(rp); setSeriR2(rp); }
                          else { setParalelR1(rp); setParalelR2(rp); }
                          triggerToast(`🎛️ Hambatan diubah ke ${rp} Ω`);
                        }}
                        className="px-2 py-1 rounded font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 cursor-pointer"
                      >
                        {rp}Ω
                      </button>
                    ))}
                  </div>
                )}

                {selectedComponent === 'kabel' && (
                  <button
                    onClick={() => {
                      if (subMode === 'simulasi') setWireBroken(!wireBroken);
                      else if (subMode === 'seri') setSeriWireBroken(!seriWireBroken);
                      else setParalelWireBroken(!paralelWireBroken);
                    }}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-lg cursor-pointer"
                  >
                    {(subMode === 'simulasi' ? wireBroken : subMode === 'seri' ? seriWireBroken : paralelWireBroken) ? 'Sambung Kabel' : 'Gunting / Putus Kabel'}
                  </button>
                )}

                <button
                  onClick={() => setSelectedComponent(null)}
                  className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-slate-600"
                  title="Tutup popover"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Bottom Simulation Action Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={handleToggleSimulation}
              className={`py-3 px-4 rounded-2xl font-extrabold text-sm sm:text-base text-white shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 ${
                isRunning
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700'
                  : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isRunning ? 'Jeda Simulasi' : 'Jalankan Simulasi'}</span>
            </button>

            <button
              onClick={handleReset}
              className="py-3 px-4 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Reset</span>
            </button>

            <button
              onClick={handleClearAll}
              className="py-3 px-4 rounded-2xl font-extrabold text-sm sm:text-base text-white bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <Trash2 className="w-5 h-5" />
              <span>Hapus Semua</span>
            </button>
          </div>
        </div>

        {/* =========================================================== */}
        {/* RIGHT COLUMN: PENGATURAN NILAI & HASIL PENGUKURAN           */}
        {/* =========================================================== */}
        <div className="lg:col-span-3 space-y-4 flex flex-col justify-between">
          
          {/* Card 1: Pengaturan Nilai Interaktif */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden">
            <div className="bg-sky-500 text-white font-bold px-4 py-2.5 flex items-center justify-between text-sm shadow-xs">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-white" />
                <span>
                  {subMode === 'seri' ? 'Pengaturan Rangkaian Seri' : subMode === 'paralel' ? 'Pengaturan Rangkaian Paralel' : 'Pengaturan Nilai'}
                </span>
              </div>
              <Sliders className="w-4 h-4 text-sky-200" />
            </div>

            <div className="p-4 space-y-4">
              {/* MODE 1: Simulasi Dasar */}
              {subMode === 'simulasi' && (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">Tegangan Sumber (V)</span>
                      <span className="text-sm font-extrabold text-sky-950 bg-sky-100 px-3 py-0.5 rounded-lg border border-sky-200">
                        {voltage} V
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="12"
                      step="1.5"
                      value={voltage}
                      onChange={(e) => {
                        const v = parseFloat(e.target.value);
                        setVoltage(v);
                        triggerToast(`Tegangan baterai diatur ke ${v} V`);
                      }}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 px-0.5">
                      <span>0V</span>
                      <span>3V</span>
                      <span>6V</span>
                      <span>9V</span>
                      <span>12V</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-slate-800">Hambatan Resistor (Ω)</span>
                      <span className="text-sm font-extrabold text-sky-950 bg-sky-100 px-3 py-0.5 rounded-lg border border-sky-200">
                        {resistance} Ω
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={resistance}
                      onChange={(e) => {
                        const r = parseInt(e.target.value);
                        setResistance(r);
                        triggerToast(`Hambatan resistor diatur ke ${r} Ω`);
                      }}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 px-0.5">
                      <span>10Ω</span>
                      <span>100Ω</span>
                      <span>250Ω</span>
                      <span>500Ω</span>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 2: Rangkaian Seri */}
              {subMode === 'seri' && (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Tegangan Sumber (V)</span>
                      <span className="text-sm font-extrabold text-sky-950 bg-sky-100 px-2.5 py-0.5 rounded border border-sky-200">
                        {seriVoltage} V
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="12"
                      step="1.5"
                      value={seriVoltage}
                      onChange={(e) => setSeriVoltage(parseFloat(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Hambatan Lampu 1 (R1)</span>
                      <span className="text-xs font-mono font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {seriR1} Ω
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={seriR1}
                      onChange={(e) => setSeriR1(parseInt(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Hambatan Lampu 2 (R2)</span>
                      <span className="text-xs font-mono font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {seriR2} Ω
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={seriR2}
                      onChange={(e) => setSeriR2(parseInt(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>
                </>
              )}

              {/* MODE 3: Rangkaian Paralel */}
              {subMode === 'paralel' && (
                <>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Tegangan Sumber (V)</span>
                      <span className="text-sm font-extrabold text-sky-950 bg-sky-100 px-2.5 py-0.5 rounded border border-sky-200">
                        {paralelVoltage} V
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1.5"
                      max="12"
                      step="1.5"
                      value={paralelVoltage}
                      onChange={(e) => setParalelVoltage(parseFloat(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Hambatan Cabang 1 (R1)</span>
                      <span className="text-xs font-mono font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {paralelR1} Ω
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={paralelR1}
                      onChange={(e) => setParalelR1(parseInt(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800">Hambatan Cabang 2 (R2)</span>
                      <span className="text-xs font-mono font-bold text-sky-900 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        {paralelR2} Ω
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="10"
                      value={paralelR2}
                      onChange={(e) => setParalelR2(parseInt(e.target.value))}
                      className="w-full accent-sky-500 cursor-pointer h-2 bg-slate-200 rounded-lg"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Card 2: Hasil Pengukuran Nyata */}
          <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden">
            <div className="bg-sky-500 text-white font-bold px-4 py-2.5 flex items-center gap-2 text-sm shadow-xs">
              <BarChart2 className="w-4 h-4 text-white" />
              <span>Hasil Pengukuran Fisika</span>
            </div>

            <div className="p-4 space-y-3">
              {/* MODE 1 RESULTS */}
              {subMode === 'simulasi' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="bg-sky-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg min-w-[120px] text-center">
                      Tegangan (V)
                    </div>
                    <span className="text-base font-extrabold text-slate-900 font-mono">{voltage} V</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-emerald-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg min-w-[120px] text-center">
                      Hambatan (R)
                    </div>
                    <span className="text-base font-extrabold text-slate-900 font-mono">{resistance} Ω</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-amber-500 text-white font-bold text-xs px-3 py-1.5 rounded-lg min-w-[120px] text-center">
                      Arus (I)
                    </div>
                    <span className="text-lg font-black text-amber-600 font-mono">{formatNum(mode1Current)} A</span>
                  </div>

                  <div className="bg-amber-100 border border-amber-300 rounded-xl p-2.5 flex items-start gap-2 text-slate-900 text-xs">
                    <Lightbulb className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="leading-tight">
                      <span className="text-[11px] text-slate-600 block">Perhitungan Hukum Ohm:</span>
                      <strong className="font-mono text-slate-900 text-xs">
                        I = V / R = {voltage} / {resistance} = {formatNum(mode1Current)} A
                      </strong>
                    </div>
                  </div>
                </>
              )}

              {/* MODE 2 (SERI) RESULTS */}
              {subMode === 'seri' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="bg-sky-500 text-white font-bold text-xs px-3 py-1 rounded min-w-[120px] text-center">
                      Tegangan Sumber
                    </div>
                    <span className="text-base font-bold text-slate-900 font-mono">{seriVoltage} V</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded min-w-[120px] text-center">
                      Hambatan Total (Rs)
                    </div>
                    <span className="text-base font-bold text-slate-900 font-mono">{seriRTotal} Ω</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-amber-500 text-white font-bold text-xs px-3 py-1 rounded min-w-[120px] text-center">
                      Arus Seri (I)
                    </div>
                    <span className="text-base font-black text-amber-600 font-mono">{formatNum(seriCurrent)} A</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Tegangan L1:</span>
                      <strong className="font-mono text-slate-800">{seriV1} V</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Tegangan L2:</span>
                      <strong className="font-mono text-slate-800">{seriV2} V</strong>
                    </div>
                  </div>

                  <div className="bg-rose-50 border border-rose-200 rounded-xl p-2.5 text-xs text-rose-950 flex items-start gap-1.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Karakteristik Seri:</strong> Jika satu lampu putus/dicabut, lintasan tunggal terputus dan seluruh lampu ikut padam.
                    </div>
                  </div>
                </>
              )}

              {/* MODE 3 (PARALEL) RESULTS */}
              {subMode === 'paralel' && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="bg-sky-500 text-white font-bold text-xs px-3 py-1 rounded min-w-[120px] text-center">
                      Tegangan Cabang
                    </div>
                    <span className="text-base font-bold text-slate-900 font-mono">{paralelVoltage} V (Sama)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-emerald-500 text-white font-bold text-xs px-3 py-1 rounded min-w-[120px] text-center">
                      Hambatan Pengganti
                    </div>
                    <span className="text-base font-bold text-slate-900 font-mono">{paralelRTotal} Ω</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="bg-amber-500 text-white font-bold text-xs px-3 py-1 rounded min-w-[120px] text-center">
                      Arus Total (I_total)
                    </div>
                    <span className="text-base font-black text-amber-600 font-mono">{formatNum(paralelITotal)} A</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-slate-500 block">Cabang 1 (L1):</span>
                      <strong className="font-mono text-slate-800">{formatNum(paralelI1)} A</strong>
                      <span className={`block text-[10px] font-bold ${paralelLampu1Menyala ? 'text-emerald-600' : 'text-rose-500'}`}>
                        ({paralelLampu1Menyala ? 'Menyala' : 'Padam'})
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Cabang 2 (L2):</span>
                      <strong className="font-mono text-slate-800">{formatNum(paralelI2)} A</strong>
                      <span className={`block text-[10px] font-bold ${paralelLampu2Menyala ? 'text-emerald-600' : 'text-rose-500'}`}>
                        ({paralelLampu2Menyala ? 'Menyala' : 'Padam'})
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-2.5 text-xs text-emerald-950 flex items-start gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Keunggulan Paralel:</strong> Ketika satu lampu dimatikan, cabang lain <strong>TETAP MENYALA</strong> dengan tegangan penuh (6V)!
                    </div>
                  </div>
                </>
              )}

              {/* Record observation button */}
              <button
                onClick={handleRecordObservation}
                className="w-full mt-1 py-2.5 bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Rekam Data Percobaan ke Tabel</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* OBSERVATION DATA TABLE (EXPANDABLE & INTERACTIVE)             */}
      {/* ------------------------------------------------------------- */}
      {showTable && (
        <div className="bg-white rounded-2xl shadow-lg border-2 border-sky-200 p-5 space-y-4 animate-fade-in">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-sky-600" />
                <span>Tabel Data Hasil Pengamatan Siswa (Inquiry STEM)</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Data tercatat secara aktual dari model matematis simulasi real-time.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setObservations([])}
                className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-lg transition-colors border border-rose-200 cursor-pointer flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus Semua Data</span>
              </button>
              <button
                onClick={() => setShowTable(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-sky-50 text-sky-900 font-bold border-b border-sky-200">
                  <th className="py-2.5 px-3">No</th>
                  <th className="py-2.5 px-3">Jenis Rangkaian</th>
                  <th className="py-2.5 px-3">Tegangan (V)</th>
                  <th className="py-2.5 px-3">Hambatan (Ω)</th>
                  <th className="py-2.5 px-3">Arus (A)</th>
                  <th className="py-2.5 px-3">Kondisi Beban</th>
                  <th className="py-2.5 px-3">Catatan Pengamatan</th>
                  <th className="py-2.5 px-3">Kesimpulan</th>
                  <th className="py-2.5 px-3 text-center">Waktu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {observations.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2 px-3 font-bold text-slate-800">{row.expNumber}</td>
                    <td className="py-2 px-3 font-semibold text-slate-900">{row.circuitType}</td>
                    <td className="py-2 px-3 font-mono text-sky-900">{row.voltage} V</td>
                    <td className="py-2 px-3 font-mono text-emerald-900">{row.equivalentResistance} Ω</td>
                    <td className="py-2 px-3 font-mono font-bold text-amber-700">{formatNum(row.totalCurrent)} A</td>
                    <td className="py-2 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        {row.bulbStatus}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-slate-700 max-w-xs">{row.observationNotes}</td>
                    <td className="py-2 px-3 text-slate-700 max-w-xs italic">{row.temporaryConclusion}</td>
                    <td className="py-2 px-3 font-mono text-slate-400 text-[10px] text-center">{row.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM 4 INFORMATIVE PANELS (PETUNJUK, TAMPILAN, RUMUS, REFLEKSI) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 items-stretch">
        
        {/* Panel 1: Petunjuk Simulasi */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden flex flex-col">
          <div className="bg-sky-500 text-white font-bold px-4 py-2 flex items-center gap-2 text-xs sm:text-sm">
            <BookOpen className="w-4 h-4 text-white" />
            <span>Petunjuk Simulasi</span>
          </div>
          <div className="p-3.5 space-y-2 text-xs text-slate-700 flex-1">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <span>Klik komponen di gambar (baterai, sakelar, lampu, resistor, kabel) untuk mengaturnya.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <span>Ubah nilai tegangan dan hambatan menggunakan tombol preset atau slider di panel kanan.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <span>Klik sakelar untuk membuka atau menutup rangkaian listrik.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-sky-500 text-white font-bold flex items-center justify-center shrink-0 text-xs">4</span>
              <span>Pada paralel, matikan satu sakelar cabang untuk membuktikan lampu lain tetap menyala!</span>
            </div>
          </div>
        </div>

        {/* Panel 2: Mode Tampilan */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden flex flex-col">
          <div className="bg-sky-500 text-white font-bold px-4 py-2 flex items-center gap-2 text-xs sm:text-sm">
            <Eye className="w-4 h-4 text-white" />
            <span>Mode Tampilan</span>
          </div>
          <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-center">
            <button
              onClick={() => setDisplayMode('realistik')}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                displayMode === 'realistik'
                  ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span>Tampilan Realistik</span>
            </button>

            <button
              onClick={() => setDisplayMode('simbol')}
              className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                displayMode === 'simbol'
                  ? 'bg-sky-500 text-white border-sky-600 shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
              }`}
            >
              <span>Tampilan Simbol (Skematik)</span>
            </button>
          </div>
        </div>

        {/* Panel 3: Rumus dan Keterangan */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden flex flex-col">
          <div className="bg-sky-500 text-white font-bold px-4 py-2 flex items-center gap-2 text-xs sm:text-sm">
            <FileText className="w-4 h-4 text-white" />
            <span>Rumus dan Keterangan</span>
          </div>
          <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-center">
            <div className="bg-sky-50 border border-sky-200 rounded-xl p-2 text-center">
              <span className="text-xl sm:text-2xl font-black text-sky-950 font-mono tracking-wider">
                I = V / R
              </span>
            </div>
            <div className="space-y-1 text-slate-700 text-[11px] leading-tight">
              <div><strong>I:</strong> Kuat Arus Listrik (Ampere / A)</div>
              <div><strong>V:</strong> Tegangan Listrik (Volt / V)</div>
              <div><strong>R:</strong> Hambatan Listrik (Ohm / Ω)</div>
            </div>
          </div>
        </div>

        {/* Panel 4: Pertanyaan Refleksi */}
        <div className="bg-white rounded-2xl shadow-md border-2 border-sky-100 overflow-hidden flex flex-col">
          <div className="bg-sky-500 text-white font-bold px-4 py-2 flex items-center gap-2 text-xs sm:text-sm">
            <HelpCircle className="w-4 h-4 text-white" />
            <span>Pertanyaan Refleksi</span>
          </div>
          <div className="p-3.5 space-y-2 text-xs text-slate-700 flex-1">
            <div className="flex items-start gap-1.5">
              <span className="font-black text-sky-600">1.</span>
              <span>Apa yang terjadi pada kuat arus saat tegangan dinaikkan?</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-black text-sky-600">2.</span>
              <span>Mengapa saat 1 lampu dicabut pada rangkaian seri, lampu lainnya ikut mati?</span>
            </div>
            <div className="flex items-start gap-1.5">
              <span className="font-black text-sky-600">3.</span>
              <span>Mengapa rangkaian listrik di rumah tangga selalu dipasang secara paralel?</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
