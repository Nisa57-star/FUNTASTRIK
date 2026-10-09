export type TabType = 
  | 'beranda'
  | 'komponen'
  | 'simulasi'
  | 'hukum-ohm'
  | 'stem-challenge'
  | 'kuis-refleksi';

export type CircuitExperimentType = 'terbuka-tertutup' | 'seri' | 'paralel';

export interface ObservationRow {
  id: string;
  expNumber: number;
  circuitType: string;
  voltage: number;
  equivalentResistance: number;
  totalCurrent: number;
  bulbStatus: string;
  observationNotes: string;
  temporaryConclusion: string;
  timestamp: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  topic: string;
}

export interface ReflectionData {
  diffSeriesParallel: string;
  voltageImpactCurrent: string;
  paperCircuitFailCauses: string;
  virtualLabHelpDesign: string;
  designImprovements: string;
}

export interface StemDesignSheet {
  studentName: string;
  className: string;
  dollTheme: string;
  ledCount: number;
  circuitChoice: 'seri' | 'paralel';
  batteryType: string;
  ledColor: string;
  prediction: string;
  testResult: string;
  troublesFaced: string;
  improvementsMade: string;
}

export interface QuizSpreadsheetRow {
  id: string;
  studentName: string;
  className: string;
  studentNo: string;
  score: number;
  correctCount: number;
  totalQuestions: number;
  status: 'Tuntas' | 'Belum Tuntas';
  submittedAt: string;
}
