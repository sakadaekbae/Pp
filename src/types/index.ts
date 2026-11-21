export type SemesterType = 'ganjil' | 'genap';
export type ChapterId = 'bab1' | 'bab2' | 'bab3' | 'bab4';
export type LitNumType = 'Literasi' | 'Numerasi';
export type DifficultyLevel = 'Mudah' | 'Sedang' | 'Sulit';
export type QuestionType =
  | 'pg'
  | 'pg_kompleks'
  | 'benar_salah'
  | 'menjodohkan'
  | 'isian'
  | 'uraian';

export type KktpLevelName =
  | 'Belum Tampak'
  | 'Mulai Berkembang'
  | 'Berkembang Sesuai Harapan'
  | 'Sangat Berkembang';

export type NavSection =
  | 'beranda'
  | 'tujuan'
  | 'peta_konsep'
  | 'materi'
  | 'video'
  | 'aktivitas'
  | 'studi_kasus'
  | 'proyek'
  | 'kuis'
  | 'refleksi'
  | 'glosarium'
  | 'profil'
  | 'rpm'
  | 'kktp'
  | 'guru';

export interface SchoolIdentity {
  appName: string;
  schoolName: string;
  subject: string;
  gradePhase: string;
  curriculum: string;
  approach: string;
  teacherName: string;
  developerName: string;
  academicYear: string;
  teacherPin: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  kelas: string;
  nisn?: string;
}

export interface VideoSlide {
  id: string;
  title: string;
  narration: string;
  keyPoints: string[];
  visualTag: string;
}

export interface ChapterSection {
  id: string;
  title: string;
  conceptExplanation: string;
  whyItMatters: string;
  realLifeExamples: {
    context: string;
    detail: string;
  }[];
  comparison?: {
    title: string;
    leftLabel: string;
    leftPoints: string[];
    rightLabel: string;
    rightPoints: string[];
  };
}

export interface InfographicMetric {
  label: string;
  value: number;
  unit: string;
  note: string;
}

export interface ChapterData {
  id: ChapterId;
  number: number;
  semester: SemesterType;
  title: string;
  subtitle: string;
  tpCodes: string[];
  tujuanPembelajaran: string[];
  pertanyaanPemantik: string[];
  apersepsi: string;
  mindfulPrompts: string[];
  sections: ChapterSection[];
  infographic: {
    title: string;
    subtitle: string;
    metrics: InfographicMetric[];
    takeaway: string;
  };
  videoSlides: VideoSlide[];
  youtubeUrl: string;
  rangkuman: string[];
  joyfulCheck: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export interface RpmMeeting {
  id: string;
  semester: SemesterType;
  chapterId: ChapterId;
  pertemuanKe: string;
  materiPokok: string;
  alokasiWaktu: string;
  cp: string;
  tp: string;
  dimensiProfilLulusan: string[];
  pemahamanBermakna: string;
  pertanyaanPemantik: string;
  praktikPedagogis: string;
  lingkunganKemitraan: string;
  pengalamanBelajar: {
    memahami: string;
    mengaplikasi: string;
    merefleksi: string;
  };
  asesmen: {
    awal: string;
    proses: string;
    akhir: string;
  };
  mediaSumber: string;
}

export interface KktpLevelRange {
  level: KktpLevelName;
  minScore: number;
  maxScore: number;
  descriptor: string;
}

export interface KktpItem {
  id: string;
  semester: SemesterType;
  chapterId: ChapterId;
  tpCode: string;
  tujuanPembelajaran: string;
  indikator: string;
  passingScore: number;
  rubrics: KktpLevelRange[];
}

export interface StimulusChartData {
  type: 'bar' | 'pie' | 'table' | 'text' | 'pasal' | 'sosmed';
  title: string;
  source?: string;
  textContent?: string;
  headers?: string[];
  rows?: string[][];
  chartItems?: { label: string; value: number; color?: string }[];
  unit?: string;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface QuizQuestion {
  id: string;
  packageId: 'bab1' | 'bab2' | 'bab3' | 'bab4' | 'uas_ganjil' | 'uas_genap';
  chapterId: ChapterId;
  type: QuestionType;
  litNum: LitNumType;
  difficulty: DifficultyLevel;
  competency: string;
  kktpId: string;
  stimulus: StimulusChartData;
  prompt: string;
  options?: string[];
  correctIndex?: number; // pg
  correctIndices?: number[]; // pg_kompleks
  correctBool?: boolean; // benar_salah
  pairs?: MatchingPair[]; // menjodohkan
  acceptedAnswers?: string[]; // isian
  keywords?: string[]; // uraian
  sampleAnswer?: string; // uraian
  explanation: string;
  calculationSteps?: string[];
  remediationTopic: string;
}

export interface QuizAttempt {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  packageId: QuizQuestion['packageId'];
  packageTitle: string;
  timestamp: string;
  totalScore: number;
  literasiScore: number;
  numerasiScore: number;
  totalQuestions: number;
  correctCount: number;
  kktpLevel: KktpLevelName;
  passed: boolean;
  weakTopics: string[];
  certificateEarned: boolean;
}

export interface CaseStudyItem {
  id: string;
  chapterId: ChapterId;
  category: string;
  title: string;
  description: string;
  problemIdentification: string;
  analysisQuestions: string[];
  solutionOptions: {
    id: string;
    label: string;
    isRecommended: boolean;
    feedback: string;
  }[];
  pancasilaConnection: string;
  conclusion: string;
}

export interface CaseStudyResponse {
  caseId: string;
  selectedSolutionId: string;
  analysisNotes: string;
  reflectionText: string;
  completedAt: string;
}

export interface ProjectItem {
  id: string;
  chapterId: ChapterId;
  title: string;
  summary: string;
  objectives: string[];
  steps: string[];
  roles: string[];
  expectedProduct: string;
  rubric: {
    aspect: string;
    criteria: string;
    maxPoints: number;
  }[];
}

export interface ProjectSubmission {
  projectId: string;
  completedSteps: number[];
  assignedRole: string;
  documentationNote: string;
  reflection: string;
  updatedAt: string;
}

export interface ReflectionEntry {
  id: string;
  studentId: string;
  chapterId: ChapterId | 'umum';
  createdAt: string;
  newLearning: string;
  relevantValues: string;
  applicationPlan: string;
  challenges: string;
  improvementPlan: string;
}

export interface AttitudeObservation {
  id: string;
  studentId: string;
  date: string;
  kritis: number; // 1-4
  kolaborasi: number; // 1-4
  komunikasi: number; // 1-4
  karakterPancasila: number; // 1-4
  notes: string;
}

export interface GlossaryItem {
  id: string;
  term: string;
  chapterId: ChapterId;
  definition: string;
  example: string;
}

export interface AppState {
  version: number;
  identity: SchoolIdentity;
  students: StudentProfile[];
  activeStudentId: string;
  chapters: ChapterData[];
  rpmList: RpmMeeting[];
  kktpList: KktpItem[];
  questions: QuizQuestion[];
  quizAttempts: QuizAttempt[];
  completedSections: Record<string, string[]>; // studentId -> sectionIds
  favoriteChapters: Record<string, ChapterId[]>; // studentId -> chapterIds
  completedActivities: Record<string, string[]>; // studentId -> activityIds
  earnedBadges: Record<string, string[]>; // studentId -> badgeIds
  caseResponses: Record<string, Record<string, CaseStudyResponse>>; // studentId -> caseId -> resp
  projectSubmissions: Record<string, Record<string, ProjectSubmission>>; // studentId -> projectId -> sub
  reflections: ReflectionEntry[];
  diagnosticScores: Record<string, { score: number; completedAt: string; readiness: string }>;
  attitudeObservations: AttitudeObservation[];
  characterJournal: Record<string, { id: string; date: string; sila: string; action: string }[]>;
}
