import React, { useState } from 'react';
import { StemDesignSheet } from '../types/circuits';
import { 
  Scissors, 
  Lightbulb, 
  CheckSquare, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Printer, 
  RotateCcw,
  HelpCircle,
  Cpu,
  Layers
} from 'lucide-react';

export const StemChallengeView: React.FC = () => {
  const [activeChallengeTab, setActiveChallengeTab] = useState<'dasar' | 'pengembangan' | 'troubleshooting' | 'lembar-kerja'>('dasar');

  // Interactive Troubleshooting State
  const [selectedCase, setSelectedCase] = useState<number>(1);
  const [studentDiagnosis, setStudentDiagnosis] = useState<string>('');
  const [isAnswerRevealed, setIsAnswerRevealed] = useState<boolean>(false);

  // Interactive Checklist State
  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    polaritasBaterai: false,
    jalurTembagaTersambung: false,
    lintasanTertutup: false,
    polaritasLedBenar: false,
    teganganSesuai: false,
  });

  // Interactive Design Worksheet State
  const [worksheet, setWorksheet] = useState<StemDesignSheet>({
    studentName: '',
    className: 'Kelas IX - IPA',
    dollTheme: 'Boneka Maskot Robotik',
    ledCount: 2,
    circuitChoice: 'paralel',
    batteryType: 'Baterai Koin CR2032 (3 Volt)',
    ledColor: 'Biru dan Kuning (3V)',
    prediction: 'Kedua LED akan menyala terang bersamaan karena dirangkai paralel dan masing-masing menerima tegangan penuh 3V dari baterai koin.',
    testResult: 'Saat sudut kertas sakelar ditekan, kedua LED berhasil menyala serempak.',
    troublesFaced: 'Awalnya LED biru tidak menyala karena pita tembaga terputus pada bagian lipatan leher boneka.',
    improvementsMade: 'Menempelkan lapisan pita tembaga ganda di atas lipatan dan meratakan perekatnya dengan penggaris.',
  });

  const toggleChecklistItem = (key: string) => {
    setChecklist({ ...checklist, [key]: !checklist[key] });
  };

  const troubleCases = [
    {
      id: 1,
      title: 'Kasus A: LED Terbalik (Reverse Polarity)',
      clue: 'Siswa sudah menempelkan pita tembaga dan menekan sakelar lipat kertas, namun LED merah tidak menyala sama sekali. Baterai masih baru 3V.',
      cause: 'Kaki anoda (+) LED tertukar terhubung ke kutub negatif (-), dan katoda (-) ke kutub positif (+).',
      fix: 'Lepas perekat pada kaki LED, putar posisi kaki agar kaki panjang (+) menempel pada pita yang mengarah ke kutub positif baterai koin.',
    },
    {
      id: 2,
      title: 'Kasus B: Pita Tembaga Retak di Lipatan (Broken Trace)',
      clue: 'Rangkaian sempat menyala sebentar, tetapi saat boneka kertas ditekuk atau dilipat, lampu tiba-tiba mati.',
      cause: 'Pita tembaga (copper tape) robek mikro atau retak di bagian garis lipatan kertas (crease), menyebabkan celah udara sehingga rangkaian berstatus TERBUKA.',
      fix: 'Tumpuk pita tembaga baru di atas lipatan yang retak (buat jembatan konduktif) dan gosok permukaannya agar lem perekat konduktif menempel kuat.',
    },
    {
      id: 3,
      title: 'Kasus C: Korsleting / Hubungan Singkat (Short Circuit)',
      clue: 'Baterai terasa hangat saat ditekan, namun LED tidak mau menyala.',
      cause: 'Pita tembaga kutub positif (+) bersentuhan langsung dengan pita tembaga kutub negatif (-) SEBELUM melewati kaki LED. Arus mengambil jalan pintas berhambatan nol.',
      fix: 'Beri jarak pemisah minimal 5 mm antara pita (+) dan pita (-), pastikan keduanya tidak bertumpuk tanpa pembatas isolator kertas.',
    },
    {
      id: 4,
      title: 'Kasus D: Kontak Baterai Koin Longgar (Loose Contact)',
      clue: 'LED hanya menyala berkedip-kedip saat ditekan sangat keras dengan dua jari.',
      cause: 'Kertas penutup lipatan sudut (switch flap) kurang menekan permukaan baterai koin CR2032.',
      fix: 'Gunakan penjepit kertas logam (paper clip) atau tambahkan bantalan kertas lipat di belakang baterai untuk memperkuat tekanan mekanis.',
    },
  ];

  const currentTrouble = troubleCases.find((c) => c.id === selectedCase) || troubleCases[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-10">
      {/* Page Header */}
      <div className="space-y-2 border-b border-slate-200 pb-5">
        <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
          Proyek STEM Rekayasa & Kreasi
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
          Tantangan STEM: Paper Circuit Boneka Kertas
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Terapkan hasil investigasi virtual lab ke dalam rekayasa teknologi nyata: Merancang boneka kertas bercahaya menggunakan <span className="font-semibold text-slate-800">baterai koin CR2032</span>, <span className="font-semibold text-slate-800">pita tembaga (copper tape)</span>, dan <span className="font-semibold text-slate-800">LED</span>.
        </p>
      </div>

      {/* Sub Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
        <button
          onClick={() => setActiveChallengeTab('dasar')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeChallengeTab === 'dasar' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Tantangan Dasar (1 LED)
        </button>
        <button
          onClick={() => setActiveChallengeTab('pengembangan')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeChallengeTab === 'pengembangan' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Tantangan Pengembangan (2 LED)
        </button>
        <button
          onClick={() => setActiveChallengeTab('troubleshooting')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeChallengeTab === 'troubleshooting' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Pemecahan Masalah (Troubleshooting)
        </button>
        <button
          onClick={() => setActiveChallengeTab('lembar-kerja')}
          className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
            activeChallengeTab === 'lembar-kerja' ? 'bg-white text-blue-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Lembar Rancangan Siswa
        </button>
      </div>

      {/* ============================================================== */}
      {/* TANTANGAN 1: DASAR (1 LED)                                      */}
      {/* ============================================================== */}
      {activeChallengeTab === 'dasar' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <span className="text-xs font-bold text-blue-600 uppercase">Tingkat 1 · Konsep Rangkaian Tertutup</span>
              <h2 className="text-xl font-bold text-slate-900">
                Membuat 1 LED Menyala dengan Sakelar Lipat Sudut
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tantangan paling mendasar dalam pembuatan paper circuit adalah menyusun satu loop tertutup yang menghubungkan baterai koin ke LED dengan sakelar sederhana berupa sudut kertas yang dapat dilipat.
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Langkah-Langkah Perancangan:
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                    <span>Tentukan letak mata atau jantung boneka kertas sebagai posisi memasang lampu LED.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                    <span>Tandai letak baterai koin CR2032 di bagian sudut bawah kartu/kertas.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
                    <span>Tempelkan pita tembaga positif (+) dari anoda LED menuju tempat baterai sisi atas (+).</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
                    <span>Tempelkan pita negatif (-) dari katoda LED menuju sudut lipat kertas sakelar.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">5</span>
                    <span>Uji sakelar: Tekan sudut lipatan kertas ke baterai. Jika rangkaian tertutup rapat, LED akan menyala gemerlap!</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checklist Evaluasi Diri */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600" />
                <span>Daftar Periksa (Self-Checklist) Kesiapan Rangkaian:</span>
              </h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <label className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={checklist.polaritasBaterai}
                    onChange={() => toggleChecklistItem('polaritasBaterai')}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Apakah kutub baterai koin (+ dan -) terhubung dengan benar?</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={checklist.jalurTembagaTersambung}
                    onChange={() => toggleChecklistItem('jalurTembagaTersambung')}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Apakah jalur pita tembaga tersambung rapat tanpa robekan di lipatan?</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={checklist.lintasanTertutup}
                    onChange={() => toggleChecklistItem('lintasanTertutup')}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Apakah rangkaian membentuk lintasan tertutup saat sakelar ditekan?</span>
                </label>
                <label className="flex items-center gap-3 p-2.5 bg-white rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-50">
                  <input
                    type="checkbox"
                    checked={checklist.polaritasLedBenar}
                    onChange={() => toggleChecklistItem('polaritasLedBenar')}
                    className="w-4 h-4 accent-blue-600 rounded"
                  />
                  <span>Apakah polaritas LED benar (kaki panjang ke +, kaki pendek ke -)?</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Visual Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-white">
              <img
                src="/src/assets/images/stem_paper_doll_circuit_1791525124744.jpg"
                alt="Template Skema Paper Circuit Boneka Kertas dengan LED dan Pita Tembaga"
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 bg-slate-900 text-white space-y-1">
                <span className="text-xs font-bold text-amber-400">Blueprint Rancangan Boneka Kertas</span>
                <p className="text-xs text-slate-300">
                  Gunakan contoh diagram di atas untuk merancang jalur pita tembaga pada karyamu sendiri.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TANTANGAN 2: PENGEMBANGAN (2 LED SERI VS PARALEL)               */}
      {/* ============================================================== */}
      {activeChallengeTab === 'pengembangan' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase">Tingkat 2 · Keputusan Rekayasa Listrik</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Membuat 2 LED Menyala: Seri atau Paralel untuk Baterai Koin 3V?
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
                Ketika siswa ingin memasang dua LED (misalnya untuk kedua mata boneka robot), mereka dihadapkan pada pertanyaan ilmiah: <strong className="text-slate-800">Apakah harus dirangkai Seri atau Paralel?</strong> Mari kita analisis dengan konsep tegangan!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Seri */}
              <div className="border border-slate-200 rounded-xl p-5 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-base">Opsi A: Rangkaian Seri 2 LED</h3>
                  <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    Tidak Disarankan untuk 3V
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Jika 2 buah LED putih/biru (tegangan kerja masing-masing ~3.0V) dirangkai seri pada baterai 3V:
                </p>
                <div className="bg-white p-3 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 space-y-1">
                  <div>V_butuh = V_LED1 + V_LED2</div>
                  <div>V_butuh = 3.0V + 3.0V = <span className="text-rose-600 font-bold">6.0 Volt!</span></div>
                  <div className="text-slate-500 text-[11px]">Baterai koin hanya 3V &lt; 6V ⇒ Lampu TIDAK AKAN MENYALA atau sangat redup.</div>
                </div>
                <div className="text-xs text-slate-500">
                  Selain itu, jika 1 LED rusak/lepas, LED kedua otomatis ikut mati.
                </div>
              </div>

              {/* Card Paralel */}
              <div className="border border-blue-200 rounded-xl p-5 bg-blue-50/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-blue-950 text-base">Opsi B: Rangkaian Paralel 2 LED</h3>
                  <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                    Sangat Dianjurkan (Rekomendasi STEM)
                  </span>
                </div>
                <p className="text-xs text-blue-900 leading-relaxed">
                  Jika 2 buah LED dirangkai secara paralel dengan percabangan pita tembaga mandiri:
                </p>
                <div className="bg-white p-3 rounded-lg border border-blue-200 font-mono text-xs text-slate-800 space-y-1">
                  <div>V_cabang1 = 3.0 Volt</div>
                  <div>V_cabang2 = 3.0 Volt</div>
                  <div className="text-emerald-700 font-bold">Setiap LED menerima tegangan penuh 3.0V!</div>
                </div>
                <div className="text-xs text-blue-900 leading-relaxed font-medium">
                  Kedua mata boneka akan menyala terang serempak, dan jika satu LED goyang/lepas, LED lainnya tetap menyala stabil!
                </div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Koneksi Inquiry ke Simulasi:</span>
                <p className="mt-0.5 leading-relaxed">
                  Hasil ini membuktikan temuan siswa di <strong>Eksperimen 3 Simulasi Virtual</strong>: Pada rangkaian paralel, tegangan pada setiap cabang sama besar dengan tegangan sumber!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* TANTANGAN 3: PEMECAHAN MASALAH (TROUBLESHOOTING)               */}
      {/* ============================================================== */}
      {activeChallengeTab === 'troubleshooting' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Pilih Kasus Kerusakan:
            </span>
            {troubleCases.map((tc) => (
              <button
                key={tc.id}
                onClick={() => {
                  setSelectedCase(tc.id);
                  setIsAnswerRevealed(false);
                  setStudentDiagnosis('');
                }}
                className={`w-full p-4 rounded-xl border text-left cursor-pointer transition-all ${
                  selectedCase === tc.id
                    ? 'border-blue-600 bg-blue-50/70 shadow-sm ring-1 ring-blue-500'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="text-xs font-bold text-slate-500 uppercase">Kasus 0{tc.id}</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">{tc.title}</div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-rose-600 uppercase">Investigasi Masalah</span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">{currentTrouble.title}</h3>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800 space-y-1">
              <span className="font-bold text-slate-500 text-xs uppercase tracking-wide">Gejala yang Terlihat:</span>
              <p className="leading-relaxed font-medium text-slate-800">
                “{currentTrouble.clue}”
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">
                Menurut analisismu, apa penyebabnya dan bagaimana cara memperbaikinya?
              </label>
              <textarea
                rows={3}
                value={studentDiagnosis}
                onChange={(e) => setStudentDiagnosis(e.target.value)}
                placeholder="Tuliskan dugaan penyebab kerusakan dan solusimu di sini..."
                className="w-full text-xs sm:text-sm p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAnswerRevealed(!isAnswerRevealed)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
              >
                {isAnswerRevealed ? 'Sembunyikan Kunci Solusi' : 'Buka Kunci Solusi & Pembahasan Ilmiah'}
              </button>
            </div>

            {isAnswerRevealed && (
              <div className="bg-emerald-50/90 border border-emerald-200 rounded-xl p-5 space-y-3 text-emerald-950">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Solusi Rekayasa STEM:</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div>
                    <strong className="text-emerald-900">Penyebab Sebenarnya:</strong> {currentTrouble.cause}
                  </div>
                  <div>
                    <strong className="text-emerald-900">Tindakan Perbaikan:</strong> {currentTrouble.fix}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* LEMBAR RANCANGAN SISWA INTERAKTIF                              */}
      {/* ============================================================== */}
      {activeChallengeTab === 'lembar-kerja' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 print-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Dokumen Portofolio Rekayasa Siswa
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                Lembar Perancangan Proyek Paper Circuit STEM
              </h2>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg flex items-center gap-2 cursor-pointer no-print"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan PDF Lembar Kerja</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Nama Lengkap Siswa:</label>
              <input
                type="text"
                placeholder="Contoh: Budi Santoso / Kelompok 3"
                value={worksheet.studentName}
                onChange={(e) => setWorksheet({ ...worksheet, studentName: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Kelas / Fase:</label>
              <input
                type="text"
                value={worksheet.className}
                onChange={(e) => setWorksheet({ ...worksheet, className: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700">Tema Boneka Kertas:</label>
              <input
                type="text"
                value={worksheet.dollTheme}
                onChange={(e) => setWorksheet({ ...worksheet, dollTheme: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Pilihan Susunan Rangkaian:</label>
              <select
                value={worksheet.circuitChoice}
                onChange={(e) => setWorksheet({ ...worksheet, circuitChoice: e.target.value as 'seri' | 'paralel' })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm bg-white"
              >
                <option value="paralel">Paralel (Rekomendasi untuk 3V)</option>
                <option value="seri">Seri (Khusus Tegangan Tinggi)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">Sumber Tegangan:</label>
              <input
                type="text"
                value={worksheet.batteryType}
                onChange={(e) => setWorksheet({ ...worksheet, batteryType: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700">1. Prediksi Awal Sebelum Pembuatan:</label>
              <textarea
                rows={2}
                value={worksheet.prediction}
                onChange={(e) => setWorksheet({ ...worksheet, prediction: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">2. Hasil Uji Coba Nyala Lampu:</label>
              <textarea
                rows={2}
                value={worksheet.testResult}
                onChange={(e) => setWorksheet({ ...worksheet, testResult: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">3. Masalah / Kendala yang Ditemukan:</label>
              <textarea
                rows={2}
                value={worksheet.troublesFaced}
                onChange={(e) => setWorksheet({ ...worksheet, troublesFaced: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-700">4. Perbaikan & Solusi Rekayasa yang Dilakukan:</label>
              <textarea
                rows={2}
                value={worksheet.improvementsMade}
                onChange={(e) => setWorksheet({ ...worksheet, improvementsMade: e.target.value })}
                className="w-full mt-1 p-2.5 border border-slate-300 rounded-lg text-xs sm:text-sm"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
