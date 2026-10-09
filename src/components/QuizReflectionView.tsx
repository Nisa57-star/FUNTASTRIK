import React, { useState, useEffect } from 'react';
import { QuizQuestion, ReflectionData, QuizSpreadsheetRow } from '../types/circuits';
import { 
  CheckCircle, 
  XCircle, 
  Award, 
  RotateCcw, 
  Save, 
  Printer, 
  BookOpen, 
  ChevronRight,
  Sparkles,
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  User,
  GraduationCap,
  Hash,
  Send,
  AlertCircle,
  ExternalLink,
  Search,
  Trash2,
  Share2,
  Table,
  RefreshCw,
  Plus
} from 'lucide-react';

export const QuizReflectionView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'kuis' | 'spreadsheet' | 'refleksi'>('kuis');

  // --- STUDENT IDENTITY FIELDS ---
  const [studentName, setStudentName] = useState<string>('');
  const [studentClass, setStudentClass] = useState<string>('IX-A');
  const [studentNo, setStudentNo] = useState<string>('');
  const [identityError, setIdentityError] = useState<string | null>(null);

  // --- SPREADSHEET RECAP STATE (PERSISTENT VIA LOCALSTORAGE) ---
  const [spreadsheetRecords, setSpreadsheetRecords] = useState<QuizSpreadsheetRow[]>(() => {
    const saved = localStorage.getItem('fantastrik_quiz_spreadsheet');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    // Initial sample student records for realistic classroom preview
    return [
      {
        id: 'rec-1',
        studentName: 'Ahmad Fauzan',
        className: 'IX-A',
        studentNo: '02',
        score: 90,
        correctCount: 9,
        totalQuestions: 10,
        status: 'Tuntas',
        submittedAt: '09/10/2026, 08:12:15',
      },
      {
        id: 'rec-2',
        studentName: 'Dewi Lestari',
        className: 'IX-A',
        studentNo: '08',
        score: 100,
        correctCount: 10,
        totalQuestions: 10,
        status: 'Tuntas',
        submittedAt: '09/10/2026, 08:14:40',
      },
      {
        id: 'rec-3',
        studentName: 'Budi Santoso',
        className: 'IX-A',
        studentNo: '05',
        score: 70,
        correctCount: 7,
        totalQuestions: 10,
        status: 'Belum Tuntas',
        submittedAt: '09/10/2026, 08:18:02',
      },
    ];
  });

  // Save spreadsheet to localStorage whenever updated
  useEffect(() => {
    localStorage.setItem('fantastrik_quiz_spreadsheet', JSON.stringify(spreadsheetRecords));
  }, [spreadsheetRecords]);

  // Modal and Notifications for Deletion
  const [showClearConfirmModal, setShowClearConfirmModal] = useState<boolean>(false);
  const [deleteNotification, setDeleteNotification] = useState<string | null>(null);

  // Optional Teacher Webhook URL for direct Google Sheets auto-sync
  const [googleSheetWebhookUrl, setGoogleSheetWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('fantastrik_gsheet_webhook') || '';
  });
  const [showWebhookConfig, setShowWebhookConfig] = useState<boolean>(false);
  const [webhookSaveNotice, setWebhookSaveNotice] = useState<string | null>(null);

  // Search filter for spreadsheet view
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  // --- 10 SOAL KUIS PILIHAN GANDA SMP FASE D IPA ---
  const quizQuestions: QuizQuestion[] = [
    {
      id: 1,
      topic: 'Komponen Rangkaian Listrik',
      question: 'Komponen dalam rangkaian listrik yang berfungsi menyediakan beda potensial agar elektron dapat bergerak mengalir adalah...',
      options: [
        'A. Resistor',
        'B. Baterai (Sumber Tegangan)',
        'C. Sakelar',
        'D. Voltmeter',
      ],
      correctAnswer: 1,
      explanation: 'Baterai berfungsi sebagai sumber energi listrik yang menghasilkan beda potensial (tegangan) untuk mendorong elektron bebas mengalir dalam lintasan tertutup.',
    },
    {
      id: 2,
      topic: 'Rangkaian Terbuka dan Tertutup',
      question: 'Sebuah lampu bohlam tidak dapat menyala ketika sakelar dibuka karena...',
      options: [
        'A. Muatan listrik bergerak terlalu cepat',
        'B. Tegangan baterai mendadak habis',
        'C. Lintasan sirkuit terputus sehingga kuat arus listrik menjadi 0 Ampere',
        'D. Hambatan kawat menjadi nol',
      ],
      correctAnswer: 2,
      explanation: 'Arus listrik hanya dapat mengalir pada rangkaian tertutup (closed circuit). Ketika sakelar terbuka, terdapat celah udara berhambatan sangat tinggi yang memutus lintasan arus.',
    },
    {
      id: 3,
      topic: 'Karakteristik Rangkaian Seri',
      question: 'Pada lampu hias yang disusun secara seri, jika salah satu bohlam putus atau dilepas dari dudukannya, maka lampu-lampu lainnya akan...',
      options: [
        'A. Tetap menyala sama terangnya',
        'B. Menyala semakin terang',
        'C. Otomatis ikut padam total',
        'D. Berkedip-kedip cepat',
      ],
      correctAnswer: 2,
      explanation: 'Dalam rangkaian seri hanya terdapat satu jalur tunggal bagi aliran arus. Jika satu bagian terputus, seluruh rangkaian menjadi terbuka sehingga semua lampu padam.',
    },
    {
      id: 4,
      topic: 'Karakteristik Rangkaian Paralel',
      question: 'Kelebihan utama memasang lampu rumah atau LED paper circuit dalam rangkaian paralel adalah...',
      options: [
        'A. Jika satu cabang terputus, lampu pada cabang lain tetap menyala',
        'B. Arus listrik di setiap cabang selalu sama besar dengan arus total',
        'C. Hambatan total menjadi lebih besar dari cabang terbesarnya',
        'D. Tidak memerlukan kabel tembaga',
      ],
      correctAnswer: 0,
      explanation: 'Pada susunan paralel, setiap beban berada pada cabang mandiri yang langsung terhubung ke sumber tegangan. Matinya satu cabang tidak memutus aliran cabang lainnya.',
    },
    {
      id: 5,
      topic: 'Perhitungan Hukum Ohm',
      question: 'Sebuah resistor memiliki hambatan 20 Ω dan dihubungkan pada baterai bertegangan 6 Volt. Berapakah kuat arus yang mengalir melalui resistor tersebut?',
      options: [
        'A. 120 A',
        'B. 3,33 A',
        'C. 0,30 A (300 mA)',
        'D. 0,03 A',
      ],
      correctAnswer: 2,
      explanation: 'Sesuai Hukum Ohm: I = V / R = 6 V / 20 Ω = 0,30 Ampere (atau 300 mA).',
    },
    {
      id: 6,
      topic: 'Hubungan Tegangan dan Arus',
      question: 'Berdasarkan Hukum Ohm, jika nilai hambatan (R) dijaga tetap konstan, apa yang terjadi pada kuat arus (I) jika tegangan baterai (V) dinaikkan menjadi dua kali lipat?',
      options: [
        'A. Kuat arus berkurang menjadi setengahnya',
        'B. Kuat arus naik menjadi dua kali lipat',
        'C. Kuat arus tetap konstan tidak berubah',
        'D. Kuat arus menjadi nol',
      ],
      correctAnswer: 1,
      explanation: 'Kuat arus listrik (I) berbanding lurus dengan beda potensial (V) pada hambatan tetap. Jika V berlipat dua, maka I juga ikut berlipat dua.',
    },
    {
      id: 7,
      topic: 'Hambatan Pengganti',
      question: 'Dua buah resistor masing-masing bernilai 10 Ω dan 30 Ω dirangkai secara seri. Berapakah hambatan total penggantinya?',
      options: [
        'A. 7,5 Ω',
        'B. 20 Ω',
        'C. 40 Ω',
        'D. 300 Ω',
      ],
      correctAnswer: 2,
      explanation: 'Pada susunan seri, hambatan total adalah penjumlahan langsung: R_total = R1 + R2 = 10 Ω + 30 Ω = 40 Ω.',
    },
    {
      id: 8,
      topic: 'Polaritas Komponen LED',
      question: 'Ketika memasang LED pada proyek paper circuit, kaki panjang adalah kutub ... dan harus dihubungkan ke kutub ... baterai koin.',
      options: [
        'A. Katoda (-), dihubungkan ke positif (+)',
        'B. Anoda (+), dihubungkan ke positif (+)',
        'C. Anoda (+), dihubungkan ke negatif (-)',
        'D. Katoda (-), dihubungkan ke negatif (-)',
      ],
      correctAnswer: 1,
      explanation: 'Kaki panjang LED adalah Anoda bertanda positif (+), sedangkan kaki pendek adalah Katoda bertanda negatif (-). LED hanya menyala jika Anoda mendapat tegangan positif (Forward Bias).',
    },
    {
      id: 9,
      topic: 'Troubleshooting Paper Circuit',
      question: 'Pada boneka kertas, jika pita tembaga positif (+) menyentuh langsung pita tembaga negatif (-) tanpa melewati LED, hal ini disebut ... dan mengakibatkan ...',
      options: [
        'A. Rangkaian seri; lampu menyala redup',
        'B. Korsleting (short circuit); baterai cepat panas dan LED tidak menyala',
        'C. Rangkaian terbuka; arus mengalir sangat lancar',
        'D. Dioda zener; lampu menyala sangat terang',
      ],
      correctAnswer: 1,
      explanation: 'Hubungan singkat (korsleting/short circuit) terjadi saat kutub (+) dan (-) tersambung tanpa beban perantara. Hambatan menjadi nol sehingga arus besar mengalir dan baterai menjadi panas terkuras.',
    },
    {
      id: 10,
      topic: 'Penerapan Rekayasa STEM',
      question: 'Mengapa rangkaian paralel lebih dipilih daripada seri ketika memasang 2 buah LED putih (tegangan kerja ~3V) pada satu buah baterai koin CR2032 (3V)?',
      options: [
        'A. Karena pada rangkaian paralel, setiap LED menerima tegangan 3V sesuai kebutuhan kerjanya',
        'B. Karena rangkaian seri membutuhkan lebih banyak baterai 9V',
        'C. Karena pada rangkaian seri baterai koin akan meledak',
        'D. Karena pita tembaga hanya bisa dipasang satu arah',
      ],
      correctAnswer: 0,
      explanation: 'Pada rangkaian paralel, tegangan pada setiap cabang sama dengan tegangan sumber (3V), sehingga kedua LED dapat menyala optimal. Jika diseri pada 3V, tegangan terbagi menjadi 1,5V per LED yang tidak cukup untuk menyalakan LED putih.',
    },
  ];

  // Quiz State
  const [userAnswers, setUserAnswers] = useState<{ [questionId: number]: number }>({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState<boolean>(false);
  const [justSubmittedRecord, setJustSubmittedRecord] = useState<QuizSpreadsheetRow | null>(null);

  // Reflection State (Local Storage persistent)
  const [reflection, setReflection] = useState<ReflectionData>(() => {
    const saved = localStorage.getItem('fantastrik_reflection');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      diffSeriesParallel: 'Perbedaan utama: Rangkaian seri hanya punya 1 jalur tunggal sehingga jika 1 lampu mati, semua mati. Sedangkan rangkaian paralel punya percabangan mandiri sehingga jika 1 lampu mati, lampu lain tetap menyala.',
      voltageImpactCurrent: 'Pada hambatan tetap, semakin tinggi tegangan sumber maka semakin besar kuat arus yang mengalir (I berbanding lurus dengan V sesuai Hukum Ohm).',
      paperCircuitFailCauses: 'Penyebab LED paper circuit tidak menyala: kaki LED terbalik (+/-), pita tembaga robek di lipatan kertas, korsleting pita tembaga bersentuhan langsung, atau baterai koin longgar.',
      virtualLabHelpDesign: 'Virtual lab membantu saya memahami bahwa untuk baterai koin 3V, 2 LED harus dipasang paralel agar tegangan tidak terbagi menjadi terlalu kecil.',
      designImprovements: 'Saya akan menambahkan penguat lipatan isolasi pada bagian leher boneka agar pita tembaga tidak mudah robek saat dimainkan.',
    };
  });

  const [savedNotification, setSavedNotification] = useState<boolean>(false);

  const handleSelectOption = (qId: number, optIndex: number) => {
    if (isQuizSubmitted) return;
    setUserAnswers({ ...userAnswers, [qId]: optIndex });
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsQuizSubmitted(false);
    setJustSubmittedRecord(null);
  };

  const calculateScore = () => {
    let score = 0;
    let correctCount = 0;
    quizQuestions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        score += 10;
        correctCount += 1;
      }
    });
    return { score, correctCount };
  };

  // --- SUBMIT QUIZ & RECORD TO SPREADSHEET ---
  const handleSubmitQuiz = () => {
    if (!studentName.trim()) {
      setIdentityError('Harap tuliskan Nama Lengkapmu terlebih dahulu sebelum mengirim nilai!');
      window.scrollTo({ top: 150, behavior: 'smooth' });
      return;
    }

    setIdentityError(null);
    const { score, correctCount } = calculateScore();
    const isPassing = score >= 75;

    const newRecord: QuizSpreadsheetRow = {
      id: `sub-${Date.now()}`,
      studentName: studentName.trim(),
      className: studentClass || 'IX-A',
      studentNo: studentNo.trim() || '-',
      score: score,
      correctCount: correctCount,
      totalQuestions: quizQuestions.length,
      status: isPassing ? 'Tuntas' : 'Belum Tuntas',
      submittedAt: new Date().toLocaleString('id-ID', {
        dateStyle: 'short',
        timeStyle: 'medium',
      }),
    };

    // Add to spreadsheet
    setSpreadsheetRecords((prev) => [newRecord, ...prev]);
    setJustSubmittedRecord(newRecord);
    setIsQuizSubmitted(true);

    // Optional: send to Google Sheets Webhook if configured by teacher
    if (googleSheetWebhookUrl.trim()) {
      try {
        fetch(googleSheetWebhookUrl.trim(), {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord),
        }).catch(() => {
          // ignore
        });
      } catch {
        // ignore
      }
    }

    // Scroll smoothly to results
    window.scrollTo({ top: 200, behavior: 'smooth' });
  };

  // --- DELETE ALL SPREADSHEET RECORDS (RELIABLE IN-APP ACTION) ---
  const handleConfirmDeleteAll = () => {
    setSpreadsheetRecords([]);
    localStorage.removeItem('fantastrik_quiz_spreadsheet');
    setShowClearConfirmModal(false);
    setDeleteNotification('Seluruh data rekap nilai di spreadsheet berhasil dihapus.');
    setTimeout(() => setDeleteNotification(null), 3500);
  };

  // --- DELETE SINGLE ROW RECORD ---
  const handleDeleteSingleRecord = (recordId: string) => {
    setSpreadsheetRecords((prev) => prev.filter((r) => r.id !== recordId));
    setDeleteNotification('1 baris rekapan nilai siswa berhasil dihapus.');
    setTimeout(() => setDeleteNotification(null), 3000);
  };

  // --- LOAD SAMPLE CLASSROOM DATA ---
  const handleLoadSampleData = () => {
    const sampleData: QuizSpreadsheetRow[] = [
      {
        id: `rec-${Date.now()}-1`,
        studentName: 'Ahmad Fauzan',
        className: 'IX-A',
        studentNo: '02',
        score: 90,
        correctCount: 9,
        totalQuestions: 10,
        status: 'Tuntas',
        submittedAt: '09/10/2026, 08:12:15',
      },
      {
        id: `rec-${Date.now()}-2`,
        studentName: 'Dewi Lestari',
        className: 'IX-A',
        studentNo: '08',
        score: 100,
        correctCount: 10,
        totalQuestions: 10,
        status: 'Tuntas',
        submittedAt: '09/10/2026, 08:14:40',
      },
      {
        id: `rec-${Date.now()}-3`,
        studentName: 'Budi Santoso',
        className: 'IX-A',
        studentNo: '05',
        score: 70,
        correctCount: 7,
        totalQuestions: 10,
        status: 'Belum Tuntas',
        submittedAt: '09/10/2026, 08:18:02',
      },
      {
        id: `rec-${Date.now()}-4`,
        studentName: 'Siti Rahmawati',
        className: 'IX-A',
        studentNo: '24',
        score: 80,
        correctCount: 8,
        totalQuestions: 10,
        status: 'Tuntas',
        submittedAt: '09/10/2026, 08:22:11',
      },
    ];
    setSpreadsheetRecords(sampleData);
    setDeleteNotification('Data contoh kelas berhasil dimuat ke spreadsheet.');
    setTimeout(() => setDeleteNotification(null), 3000);
  };

  const handleSaveReflection = () => {
    localStorage.setItem('fantastrik_reflection', JSON.stringify(reflection));
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 3000);
  };

  // Download Spreadsheet as CSV
  const handleDownloadCSV = () => {
    const headers = ['No', 'Nama Siswa', 'Kelas', 'No Absen', 'Skor (0-100)', 'Jawaban Benar', 'Total Soal', 'Status Kelulusan', 'Waktu Pengiriman'];
    const rows = spreadsheetRecords.map((r, i) => [
      i + 1,
      `"${r.studentName.replace(/"/g, '""')}"`,
      r.className,
      r.studentNo,
      r.score,
      r.correctCount,
      r.totalQuestions,
      r.status,
      `"${r.submittedAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Rekap_Nilai_Kuis_FANTASTRIK_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy Spreadsheet TSV format for direct paste into Google Sheets
  const handleCopyTSV = () => {
    const headers = ['No', 'Nama Siswa', 'Kelas', 'No Absen', 'Skor', 'Benar', 'Total', 'Status', 'Waktu'];
    const rows = spreadsheetRecords.map((r, i) => [
      i + 1,
      r.studentName,
      r.className,
      r.studentNo,
      r.score,
      r.correctCount,
      r.totalQuestions,
      r.status,
      r.submittedAt,
    ]);

    const tsvText = [headers.join('\t'), ...rows.map((e) => e.join('\t'))].join('\n');
    navigator.clipboard.writeText(tsvText).then(() => {
      setCopyStatus(true);
      setTimeout(() => setCopyStatus(false), 2500);
    });
  };

  // Filtered records
  const filteredRecords = spreadsheetRecords.filter((r) => {
    const q = searchFilter.toLowerCase();
    return (
      r.studentName.toLowerCase().includes(q) ||
      r.className.toLowerCase().includes(q) ||
      r.studentNo.includes(q)
    );
  });

  // Calculate Class Statistics
  const totalSubmissions = spreadsheetRecords.length;
  const avgScore = totalSubmissions > 0 
    ? Math.round(spreadsheetRecords.reduce((acc, c) => acc + c.score, 0) / totalSubmissions) 
    : 0;
  const highestScore = totalSubmissions > 0 ? Math.max(...spreadsheetRecords.map((r) => r.score)) : 0;
  const passingRate = totalSubmissions > 0 
    ? Math.round((spreadsheetRecords.filter((r) => r.status === 'Tuntas').length / totalSubmissions) * 100) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 space-y-8 select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* HEADER & TOP NAVIGATION                                       */}
      {/* ------------------------------------------------------------- */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-md border-2 border-sky-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              Evaluasi &amp; Rekap Spreadsheet
            </span>
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200">
              IPA SMP Kelas IX Fase D
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Award className="w-8 h-8 text-amber-500" />
            <span>Kuis Interaktif &amp; Spreadsheet Nilai</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
            Isi identitas nama, kerjakan kuis 10 butir soal, dan kirim jawaban. Skor akan langsung dihitung dan otomatis <strong>masuk ke tabel spreadsheet</strong> rekap kelas!
          </p>
        </div>

        {/* Sub-tab Navigation Buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('kuis')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSubTab === 'kuis'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kuis (10 Soal)</span>
          </button>

          <button
            onClick={() => setActiveSubTab('spreadsheet')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 relative ${
              activeSubTab === 'spreadsheet'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Spreadsheet Rekap</span>
            {spreadsheetRecords.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-black flex items-center justify-center">
                {spreadsheetRecords.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('refleksi')}
            className={`flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
              activeSubTab === 'refleksi'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Refleksi Diri</span>
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/* SUBTAB 1: KUIS INTERAKTIF & IDENTITAS SISWA                     */}
      {/* ============================================================== */}
      {activeSubTab === 'kuis' && (
        <div className="space-y-6">
          
          {/* STUDENT IDENTITY INPUT CARD */}
          <div className="bg-gradient-to-r from-sky-50 via-white to-emerald-50 rounded-3xl p-5 sm:p-7 border-2 border-sky-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-sky-100 pb-3">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-sky-600" />
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Data Identitas Siswa (Untuk Rekap Nilai ke Spreadsheet)
                </h3>
              </div>
              <span className="text-[11px] font-bold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full">
                Wajib Diisi
              </span>
            </div>

            {identityError && (
              <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-xs font-bold text-rose-800 flex items-center gap-2 animate-shake">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{identityError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              {/* Kolom Nama Siswa */}
              <div className="sm:col-span-6 space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  <span>Nama Lengkap Siswa:</span>
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Nisa Dewi Pratama"
                  value={studentName}
                  disabled={isQuizSubmitted}
                  onChange={(e) => {
                    setStudentName(e.target.value);
                    if (identityError) setIdentityError(null);
                  }}
                  className={`w-full p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all focus:outline-none focus:ring-2 ${
                    identityError && !studentName.trim()
                      ? 'border-rose-400 bg-rose-50 focus:ring-rose-400'
                      : 'border-slate-300 bg-white focus:ring-sky-500'
                  }`}
                />
              </div>

              {/* Kolom Kelas */}
              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-sky-600" />
                  <span>Kelas:</span>
                </label>
                <select
                  value={studentClass}
                  disabled={isQuizSubmitted}
                  onChange={(e) => setStudentClass(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
                >
                  <option value="IX-A">Kelas IX-A</option>
                  <option value="IX-B">Kelas IX-B</option>
                  <option value="IX-C">Kelas IX-C</option>
                  <option value="IX-D">Kelas IX-D</option>
                  <option value="IX-E">Kelas IX-E</option>
                  <option value="IX-F">Kelas IX-F</option>
                </select>
              </div>

              {/* Kolom Nomor Absen */}
              <div className="sm:col-span-3 space-y-1.5">
                <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Hash className="w-3.5 h-3.5 text-sky-600" />
                  <span>Nomor Absen:</span>
                </label>
                <input
                  type="number"
                  placeholder="Contoh: 14"
                  min="1"
                  max="50"
                  value={studentNo}
                  disabled={isQuizSubmitted}
                  onChange={(e) => setStudentNo(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* SCORE RESULT BANNER (SHOWN IMMEDIATELY UPON SUBMISSION) */}
          {isQuizSubmitted && justSubmittedRecord && (
            <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-emerald-400 space-y-5 animate-scale-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                    {justSubmittedRecord.score}
                  </div>
                  <div>
                    <span className="text-[11px] font-black uppercase text-amber-300 tracking-wider">
                      Hasil Penilaian Virtual Lab
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      Skor: {justSubmittedRecord.score} / 100
                    </h2>
                    <p className="text-xs text-sky-200 mt-0.5">
                      Nama: <strong className="text-white">{justSubmittedRecord.studentName}</strong> ({justSubmittedRecord.className} / Absen {justSubmittedRecord.studentNo})
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setActiveSubTab('spreadsheet')}
                    className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Lihat di Spreadsheet Rekap</span>
                  </button>
                  <button
                    onClick={handleResetQuiz}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Ulangi Kuis</span>
                  </button>
                </div>
              </div>

              {/* SUCCESS NOTICE THAT RECORD IS IN SPREADSHEET */}
              <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                <div className="text-xs sm:text-sm text-emerald-100 leading-snug">
                  <strong className="text-emerald-300 font-extrabold block">
                    ✓ Nilai Sukses Masuk ke Spreadsheet Rekap Kelas!
                  </strong>
                  Nilaimu telah tercatat pada tabel spreadsheet dengan rincian {justSubmittedRecord.correctCount} dari 10 soal benar ({justSubmittedRecord.status}). Guru dapat melihat dan mengunduh rekapan nilaimu.
                </div>
              </div>

              {/* Feedback Text */}
              <div className="text-xs sm:text-sm text-sky-100 leading-relaxed">
                {justSubmittedRecord.score >= 80 ? (
                  <p className="font-semibold text-emerald-300">
                    🎉 Luar biasa! Kamu sangat menguasai konsep rangkaian listrik dan siap merancang paper circuit boneka secara mandiri!
                  </p>
                ) : justSubmittedRecord.score >= 60 ? (
                  <p className="font-semibold text-amber-300">
                    👍 Bagus! Sebagian besar konsep sudah kamu kuasai. Cek pembahasan di bawah pada butir soal yang belum tepat.
                  </p>
                ) : (
                  <p className="font-semibold text-rose-300">
                    💪 Jangan berkecil hati! Buka kembali tab Simulasi Rangkaian dan Hukum Ohm, lalu ulangi kuis untuk mencapai skor maksimal.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* 10 QUESTION LIST */}
          <div className="space-y-6">
            {quizQuestions.map((q, idx) => {
              const selectedOpt = userAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctAnswer;

              return (
                <div
                  key={q.id}
                  className={`bg-white border-2 rounded-3xl p-5 sm:p-7 transition-all shadow-sm ${
                    isQuizSubmitted
                      ? isCorrect
                        ? 'border-emerald-300 bg-emerald-50/20'
                        : 'border-rose-300 bg-rose-50/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-black text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200 uppercase tracking-wider">
                      Soal {idx + 1} · {q.topic}
                    </span>
                    {isQuizSubmitted && (
                      <span className={`text-xs font-black flex items-center gap-1.5 px-3 py-1 rounded-full ${
                        isCorrect ? 'text-emerald-700 bg-emerald-100' : 'text-rose-700 bg-rose-100'
                      }`}>
                        {isCorrect ? <CheckCircle className="w-4 h-4 text-emerald-600" /> : <XCircle className="w-4 h-4 text-rose-600" />}
                        <span>{isCorrect ? 'BENAR (+10)' : 'SALAH (0)'}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 mb-4 leading-relaxed">
                    {q.question}
                  </h3>

                  <div className="space-y-2.5">
                    {q.options.map((option, optIdx) => {
                      const isSelected = selectedOpt === optIdx;
                      let optionStyle = 'border-slate-200 hover:bg-sky-50/60 text-slate-800 bg-slate-50/50';

                      if (isQuizSubmitted) {
                        if (optIdx === q.correctAnswer) {
                          optionStyle = 'border-emerald-500 bg-emerald-100/80 text-emerald-950 font-bold';
                        } else if (isSelected && optIdx !== q.correctAnswer) {
                          optionStyle = 'border-rose-500 bg-rose-100/80 text-rose-950 font-semibold';
                        }
                      } else if (isSelected) {
                        optionStyle = 'border-sky-500 bg-sky-100/90 text-sky-950 font-bold ring-2 ring-sky-300';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isQuizSubmitted}
                          onClick={() => handleSelectOption(q.id, optIdx)}
                          className={`w-full p-3.5 text-left text-xs sm:text-sm rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${optionStyle}`}
                        >
                          <span>{option}</span>
                          {isSelected && !isQuizSubmitted && (
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-600 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isQuizSubmitted && (
                    <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-700 space-y-1">
                      <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4 text-sky-600" />
                        <span>Pembahasan Pedagogis IPA:</span>
                      </span>
                      <p className="leading-relaxed text-slate-600">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* SUBMIT BUTTON */}
          {!isQuizSubmitted && (
            <div className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-5 rounded-3xl border-2 border-sky-300 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-700 space-y-0.5 text-center sm:text-left">
                <div>
                  Terjawab: <strong className="text-sky-700 text-sm">{Object.keys(userAnswers).length} dari 10 soal</strong>
                </div>
                <div className="text-slate-500 text-[11px]">
                  {studentName.trim() ? `Siswa: ${studentName.trim()} (${studentClass})` : '⚠️ Isi nama siswa di kolom atas'}
                </div>
              </div>

              <button
                onClick={handleSubmitQuiz}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 hover:from-emerald-700 hover:to-green-700 text-white font-black text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Kirim Nilai &amp; Masuk ke Spreadsheet</span>
              </button>
            </div>
          )}

        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 2: TABEL SPREADSHEET REKAP NILAI (GOOGLE SHEETS STYLE)  */}
      {/* ============================================================== */}
      {activeSubTab === 'spreadsheet' && (
        <div className="space-y-6">
          
          {/* TOAST / ACTION NOTIFICATION */}
          {deleteNotification && (
            <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-lg border border-slate-700 flex items-center justify-between text-xs sm:text-sm font-semibold animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{deleteNotification}</span>
              </div>
              <button onClick={() => setDeleteNotification(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>
          )}

          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-100 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Total Siswa Submit
              </span>
              <span className="text-2xl font-black font-mono text-slate-900 mt-1 block">
                {totalSubmissions} Siswa
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-sky-100 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Rata-Rata Nilai
              </span>
              <span className="text-2xl font-black font-mono text-sky-600 mt-1 block">
                {avgScore} / 100
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-amber-100 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Nilai Tertinggi
              </span>
              <span className="text-2xl font-black font-mono text-amber-600 mt-1 block">
                {highestScore}
              </span>
            </div>

            <div className="bg-white rounded-2xl p-4 border-2 border-emerald-100 shadow-xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                Ketuntasan (KKM ≥ 75)
              </span>
              <span className="text-2xl font-black font-mono text-emerald-600 mt-1 block">
                {passingRate}%
              </span>
            </div>
          </div>

          {/* SPREADSHEET TOOLBAR */}
          <div className="bg-white rounded-3xl p-5 border-2 border-emerald-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-4 border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
                  <FileSpreadsheet className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Spreadsheet Rekap Hasil Kuis Siswa
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tabel data terintegrasi yang mencatat otomatis setiap siswa yang mengirim nilai.
                  </p>
                </div>
              </div>

              {/* Action Buttons: Download CSV, Copy TSV, Sync Webhook */}
              <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                <button
                  onClick={handleDownloadCSV}
                  disabled={spreadsheetRecords.length === 0}
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Unduh file .csv yang bisa dibuka di Excel & Google Sheets"
                >
                  <Download className="w-4 h-4" />
                  <span>Unduh (.CSV / Excel)</span>
                </button>

                <button
                  onClick={handleCopyTSV}
                  disabled={spreadsheetRecords.length === 0}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold text-xs rounded-xl border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Salin tabel untuk paste langsung ke Google Sheets"
                >
                  {copyStatus ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copyStatus ? 'Tersalin!' : 'Salin untuk G-Sheets'}</span>
                </button>

                <button
                  onClick={() => setShowWebhookConfig(!showWebhookConfig)}
                  className="px-3 py-2 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs rounded-xl border border-sky-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Pengaturan URL Google Sheets Guru"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Sync Google Sheets</span>
                </button>
              </div>
            </div>

            {/* Optional Google Sheets Webhook Sync Drawer */}
            {showWebhookConfig && (
              <div className="bg-sky-50/80 rounded-2xl p-4 border border-sky-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sky-950">
                    🔗 Sinkronisasi Otomatis ke Google Sheets Guru (Apps Script):
                  </span>
                  <button onClick={() => setShowWebhookConfig(false)} className="text-slate-400 hover:text-slate-600">✕</button>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  Jika Ibu/Bapak Guru memiliki Webhook URL Google Apps Script yang tersambung ke Google Spreadsheet, masukkan URL di bawah agar setiap pengiriman kuis langsung otomatis terisi ke sheet online:
                </p>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://script.google.com/macros/s/.../exec"
                    value={googleSheetWebhookUrl}
                    onChange={(e) => {
                      setGoogleSheetWebhookUrl(e.target.value);
                      localStorage.setItem('fantastrik_gsheet_webhook', e.target.value);
                    }}
                    className="flex-1 p-2 rounded-xl border border-sky-300 bg-white text-xs font-mono"
                  />
                  <button
                    onClick={() => {
                      localStorage.setItem('fantastrik_gsheet_webhook', googleSheetWebhookUrl);
                      setWebhookSaveNotice('✓ URL Webhook Google Sheets berhasil disimpan!');
                      setTimeout(() => setWebhookSaveNotice(null), 3000);
                    }}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl cursor-pointer"
                  >
                    Simpan
                  </button>
                </div>
                {webhookSaveNotice && (
                  <span className="text-emerald-700 font-bold block">{webhookSaveNotice}</span>
                )}
              </div>
            )}

            {/* Search Filter & PROMINENT WORKING CLEAR/DELETE BUTTON */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama siswa atau kelas..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50"
                />
              </div>

              {/* ACTION: HAPUS SEMUA REKAP / MUAT DATA CONTOH */}
              <div className="flex items-center gap-2 shrink-0">
                {spreadsheetRecords.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setShowClearConfirmModal(true)}
                    className="px-3.5 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                    title="Kosongkan seluruh riwayat rekap nilai di spreadsheet"
                  >
                    <Trash2 className="w-4 h-4 text-rose-600" />
                    <span>Hapus Semua Rekap</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleLoadSampleData}
                    className="px-3.5 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-xl border border-sky-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    title="Muat data contoh siswa untuk menguji tabel"
                  >
                    <Plus className="w-4 h-4 text-sky-600" />
                    <span>Muat Data Contoh</span>
                  </button>
                )}
              </div>
            </div>

            {/* THE GOOGLE SHEETS SPREADSHEET TABLE */}
            <div className="overflow-x-auto rounded-2xl border-2 border-emerald-300 shadow-inner">
              <table className="w-full text-xs text-left border-collapse">
                {/* Google Sheets Distinctive Green Header */}
                <thead>
                  <tr className="bg-emerald-700 text-white font-black tracking-wide">
                    <th className="py-3 px-3 text-center border-r border-emerald-600 w-12">No</th>
                    <th className="py-3 px-4 border-r border-emerald-600">Nama Siswa</th>
                    <th className="py-3 px-3 text-center border-r border-emerald-600">Kelas</th>
                    <th className="py-3 px-3 text-center border-r border-emerald-600">No Absen</th>
                    <th className="py-3 px-3 text-center border-r border-emerald-600">Skor (0-100)</th>
                    <th className="py-3 px-3 text-center border-r border-emerald-600">Benar / Soal</th>
                    <th className="py-3 px-3 text-center border-r border-emerald-600">Status</th>
                    <th className="py-3 px-3 text-center border-r border-emerald-600">Waktu Submit</th>
                    <th className="py-3 px-3 text-center w-14">Aksi</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white font-mono text-[11px]">
                  {filteredRecords.map((row, idx) => (
                    <tr 
                      key={row.id} 
                      className={`hover:bg-emerald-50/50 transition-colors ${
                        row.id === justSubmittedRecord?.id ? 'bg-amber-100/70 font-bold' : idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 text-slate-500 font-bold">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 px-4 border-r border-slate-200 font-sans font-bold text-slate-900">
                        {row.studentName}
                        {row.id === justSubmittedRecord?.id && (
                          <span className="ml-2 text-[9px] bg-amber-400 text-slate-950 px-1.5 py-0.5 rounded font-black">
                            BARU
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 text-slate-700 font-sans font-semibold">
                        {row.className}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 text-slate-600 font-mono">
                        {row.studentNo}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200">
                        <span className={`px-2 py-0.5 rounded-lg font-black text-xs ${
                          row.score >= 80 ? 'bg-emerald-100 text-emerald-800' :
                          row.score >= 70 ? 'bg-sky-100 text-sky-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {row.score}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 text-slate-700">
                        {row.correctCount} / {row.totalQuestions}
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 font-sans">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === 'Tuntas' 
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center border-r border-slate-200 text-slate-500 text-[10px]">
                        {row.submittedAt}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          onClick={() => handleDeleteSingleRecord(row.id)}
                          className="p-1 hover:bg-rose-100 rounded text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                          title="Hapus baris ini"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={9} className="py-10 text-center text-slate-400 font-sans">
                        <div className="space-y-2">
                          <p className="italic">Belum ada data rekapan di spreadsheet.</p>
                          <button
                            onClick={handleLoadSampleData}
                            className="px-4 py-2 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-xl text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Muat Data Contoh Kelas</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Menampilkan {filteredRecords.length} rekapan nilai siswa</span>
              <span className="italic">Data tersimpan di penyimpanan browser (LocalStorage)</span>
            </div>
          </div>

        </div>
      )}

      {/* ============================================================== */}
      {/* SUBTAB 3: REFLEKSI SISWA                                       */}
      {/* ============================================================== */}
      {activeSubTab === 'refleksi' && (
        <div className="bg-white border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 print-area">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Refleksi Pembelajaran Berdiferensiasi
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                Lembar Refleksi Pengalaman Praktikum
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Jawablah 5 pertanyaan pemantik di bawah ini berdasarkan temuan yang kamu dapatkan selama praktikum:
              </p>
            </div>

            <div className="flex items-center gap-2 no-print">
              <button
                onClick={handleSaveReflection}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Jawaban</span>
              </button>
              <button
                onClick={() => window.print()}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer border border-slate-200"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Lembar</span>
              </button>
            </div>
          </div>

          {savedNotification && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-fade-in">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Jawaban refleksimu berhasil disimpan di peramban ini!</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                1. Apa perbedaan utama antara rangkaian seri dan paralel yang kamu amati dalam simulasi?
              </label>
              <textarea
                rows={3}
                value={reflection.diffSeriesParallel}
                onChange={(e) => setReflection({ ...reflection, diffSeriesParallel: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                2. Bagaimana perubahan tegangan memengaruhi arus listrik pada nilai hambatan tetap?
              </label>
              <textarea
                rows={3}
                value={reflection.voltageImpactCurrent}
                onChange={(e) => setReflection({ ...reflection, voltageImpactCurrent: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                3. Apa saja penyebab yang mungkin membuat lampu LED pada proyek paper circuit tidak dapat menyala?
              </label>
              <textarea
                rows={3}
                value={reflection.paperCircuitFailCauses}
                onChange={(e) => setReflection({ ...reflection, paperCircuitFailCauses: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                4. Bagaimana hasil virtual lab ini membantumu merancang produk paper circuit boneka kertas?
              </label>
              <textarea
                rows={3}
                value={reflection.virtualLabHelpDesign}
                onChange={(e) => setReflection({ ...reflection, virtualLabHelpDesign: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs sm:text-sm font-bold text-slate-900">
                5. Apa perbaikan atau modifikasi yang akan kamu lakukan pada rancangan boneka kertarmu selanjutnya?
              </label>
              <textarea
                rows={3}
                value={reflection.designImprovements}
                onChange={(e) => setReflection({ ...reflection, designImprovements: e.target.value })}
                className="w-full text-xs sm:text-sm p-3.5 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* IN-APP CONFIRMATION MODAL TO SAFELY CLEAR SPREADSHEET RECAP    */}
      {/* ============================================================== */}
      {showClearConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border-2 border-rose-200 space-y-4 animate-scale-up">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  Hapus Seluruh Rekap Nilai?
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Mengosongkan {spreadsheetRecords.length} data siswa dari spreadsheet.
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-rose-50 p-3.5 rounded-2xl border border-rose-200 leading-relaxed">
              ⚠️ Tindakan ini akan menghapus seluruh rekapan nilai kuis yang tersimpan di peramban ini. Pastikan Anda sudah mengunduh file <strong>.CSV / Excel</strong> jika masih memerlukan data nilai siswa.
            </p>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirmModal(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteAll}
                className="px-5 py-2.5 rounded-xl font-black text-xs bg-rose-600 hover:bg-rose-700 text-white transition-colors cursor-pointer shadow-md flex items-center gap-1.5 active:scale-95"
              >
                <Trash2 className="w-4 h-4" />
                <span>Ya, Hapus Semua Rekapan</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
