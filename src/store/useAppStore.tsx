import React, { createContext, useContext, useEffect, useState } from 'react';
import { CHAPTERS_DATA, DEFAULT_IDENTITY, DEFAULT_STUDENTS } from '../data/chaptersData';
import { QUIZ_BANK_BAB1_2 } from '../data/quizBankBab1_2';
import { QUIZ_BANK_BAB3_4 } from '../data/quizBankBab3_4';
import { QUIZ_BANK_UAS } from '../data/quizBankUas';
import { DEFAULT_KKTP_DATA, DEFAULT_RPM_DATA } from '../data/rpmKktpData';
import {
  AppState,
  AttitudeObservation,
  CaseStudyResponse,
  ChapterData,
  ChapterId,
  KktpItem,
  KktpLevelName,
  ProjectSubmission,
  QuizAttempt,
  QuizQuestion,
  ReflectionEntry,
  RpmMeeting,
  StudentProfile,
} from '../types';

const STORAGE_KEY = 'psl_smpn16_serang_v1';

const INITIAL_QUESTIONS: QuizQuestion[] = [
  ...QUIZ_BANK_BAB1_2,
  ...QUIZ_BANK_BAB3_4,
  ...QUIZ_BANK_UAS,
];

const buildInitialState = (): AppState => ({
  version: 1,
  identity: DEFAULT_IDENTITY,
  students: DEFAULT_STUDENTS,
  activeStudentId: DEFAULT_STUDENTS[0].id,
  chapters: CHAPTERS_DATA,
  rpmList: DEFAULT_RPM_DATA,
  kktpList: DEFAULT_KKTP_DATA,
  questions: INITIAL_QUESTIONS,
  quizAttempts: [],
  completedSections: {},
  favoriteChapters: {},
  completedActivities: {},
  earnedBadges: {},
  caseResponses: {},
  projectSubmissions: {},
  reflections: [],
  diagnosticScores: {},
  attitudeObservations: [],
  characterJournal: {},
});

function replacePesertaDidikText(text: string): string {
  return text
    .replace(/PESERTA DIDIK/g, 'MURID')
    .replace(/Peserta [Dd]idik/g, 'Murid')
    .replace(/peserta [Dd]idik/g, 'murid');
}

function migrateStudentTerminology<T>(value: T): T {
  if (typeof value === 'string') {
    return replacePesertaDidikText(value) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => migrateStudentTerminology(item)) as unknown as T;
  }
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = migrateStudentTerminology(v);
    }
    return out as T;
  }
  return value;
}

export function resolveKktpStatus(
  score: number,
  kktpList: KktpItem[],
  chapterId?: ChapterId
): { level: KktpLevelName; passed: boolean; passingScore: number } {
  const relevant = chapterId
    ? kktpList.filter((k) => k.chapterId === chapterId)
    : kktpList;
  const target = relevant[0] || kktpList[0];

  if (!target) {
    return {
      level:
        score >= 90
          ? 'Sangat Berkembang'
          : score >= 75
          ? 'Berkembang Sesuai Harapan'
          : score >= 55
          ? 'Mulai Berkembang'
          : 'Belum Tampak',
      passed: score >= 75,
      passingScore: 75,
    };
  }

  const matchedRubric =
    target.rubrics.find((r) => score >= r.minScore && score <= r.maxScore) ||
    (score >= target.passingScore
      ? target.rubrics[2]
      : target.rubrics[0]);

  return {
    level: matchedRubric ? matchedRubric.level : score >= target.passingScore ? 'Berkembang Sesuai Harapan' : 'Mulai Berkembang',
    passed: score >= target.passingScore,
    passingScore: target.passingScore,
  };
}

interface AppContextValue {
  state: AppState;
  activeStudent: StudentProfile;
  isTeacherUnlocked: boolean;
  unlockTeacher: (pin: string) => boolean;
  lockTeacher: () => void;
  updateTeacherPin: (newPin: string) => void;
  updateAcademicYear: (year: string) => void;
  setActiveStudent: (studentId: string) => void;
  upsertStudent: (student: Omit<StudentProfile, 'id'> & { id?: string }) => StudentProfile;
  deleteStudent: (studentId: string) => void;
  toggleSectionComplete: (sectionId: string) => void;
  toggleFavoriteChapter: (chapterId: ChapterId) => void;
  updateChapterContent: (chapterId: ChapterId, patch: Partial<ChapterData>) => void;
  completeActivity: (activityId: string, badgeName?: string) => void;
  addCharacterJournal: (sila: string, action: string) => void;
  saveCaseResponse: (resp: CaseStudyResponse) => void;
  saveProjectSubmission: (sub: ProjectSubmission) => void;
  saveQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'timestamp'>) => QuizAttempt;
  saveReflection: (entry: Omit<ReflectionEntry, 'id' | 'createdAt' | 'studentId'>) => void;
  saveDiagnostic: (score: number, readiness: string) => void;
  saveAttitudeObservation: (obs: Omit<AttitudeObservation, 'id'>) => void;
  upsertRpm: (item: RpmMeeting) => void;
  deleteRpm: (id: string) => void;
  upsertKktp: (item: KktpItem) => void;
  deleteKktp: (id: string) => void;
  upsertQuestion: (q: QuizQuestion) => void;
  deleteQuestion: (id: string) => void;
  exportJsonBackup: () => void;
  importJsonBackup: (jsonText: string) => { ok: boolean; message: string };
  resetAllData: () => void;
  exportCsvGrades: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as AppState & {
          identity?: Partial<AppState['identity']> & { principalName?: string };
        };
        if (parsed && parsed.identity && Array.isArray(parsed.chapters) && Array.isArray(parsed.questions)) {
          const { principalName: _removed, ...restIdentity } = parsed.identity;
          const migrated = migrateStudentTerminology(parsed);
          return {
            ...migrated,
            identity: {
              ...DEFAULT_IDENTITY,
              ...migrateStudentTerminology(restIdentity),
              developerName: '@UjeTea',
            },
          };
        }
      }
    } catch {
      // Fallback to initial state if corrupted
    }
    return buildInitialState();
  });

  const [isTeacherUnlocked, setIsTeacherUnlocked] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota warning
    }
  }, [state]);

  const activeStudent =
    state.students.find((s) => s.id === state.activeStudentId) ||
    state.students[0] ||
    DEFAULT_STUDENTS[0];

  const unlockTeacher = (pin: string) => {
    if (pin.trim() === state.identity.teacherPin) {
      setIsTeacherUnlocked(true);
      return true;
    }
    return false;
  };

  const lockTeacher = () => setIsTeacherUnlocked(false);

  const updateTeacherPin = (newPin: string) => {
    setState((prev) => ({
      ...prev,
      identity: { ...prev.identity, teacherPin: newPin.trim() },
    }));
  };

  const updateAcademicYear = (year: string) => {
    setState((prev) => ({
      ...prev,
      identity: { ...prev.identity, academicYear: year },
    }));
  };

  const setActiveStudent = (studentId: string) => {
    setState((prev) => ({ ...prev, activeStudentId: studentId }));
  };

  const upsertStudent = (student: Omit<StudentProfile, 'id'> & { id?: string }): StudentProfile => {
    const id = student.id || `stu-${Date.now()}`;
    const newStu: StudentProfile = { ...student, id };
    setState((prev) => {
      const exists = prev.students.some((s) => s.id === id);
      const students = exists
        ? prev.students.map((s) => (s.id === id ? newStu : s))
        : [...prev.students, newStu];
      return {
        ...prev,
        students,
        activeStudentId: id,
      };
    });
    return newStu;
  };

  const deleteStudent = (studentId: string) => {
    setState((prev) => {
      if (prev.students.length <= 1) return prev;
      const students = prev.students.filter((s) => s.id !== studentId);
      const activeStudentId =
        prev.activeStudentId === studentId ? students[0].id : prev.activeStudentId;
      return { ...prev, students, activeStudentId };
    });
  };

  const toggleSectionComplete = (sectionId: string) => {
    const sid = activeStudent.id;
    setState((prev) => {
      const cur = prev.completedSections[sid] || [];
      const next = cur.includes(sectionId)
        ? cur.filter((x) => x !== sectionId)
        : [...cur, sectionId];
      return {
        ...prev,
        completedSections: { ...prev.completedSections, [sid]: next },
      };
    });
  };

  const toggleFavoriteChapter = (chapterId: ChapterId) => {
    const sid = activeStudent.id;
    setState((prev) => {
      const cur = prev.favoriteChapters[sid] || [];
      const next = cur.includes(chapterId)
        ? cur.filter((x) => x !== chapterId)
        : [...cur, chapterId];
      return {
        ...prev,
        favoriteChapters: { ...prev.favoriteChapters, [sid]: next },
      };
    });
  };

  const updateChapterContent = (chapterId: ChapterId, patch: Partial<ChapterData>) => {
    setState((prev) => ({
      ...prev,
      chapters: prev.chapters.map((c) => (c.id === chapterId ? { ...c, ...patch } : c)),
    }));
  };

  const completeActivity = (activityId: string, badgeName?: string) => {
    const sid = activeStudent.id;
    setState((prev) => {
      const curAct = prev.completedActivities[sid] || [];
      const nextAct = curAct.includes(activityId) ? curAct : [...curAct, activityId];

      const curBadges = prev.earnedBadges[sid] || [];
      let nextBadges = curBadges;
      if (badgeName && !curBadges.includes(badgeName)) {
        nextBadges = [...curBadges, badgeName];
      }
      if (nextAct.length >= 4 && !nextBadges.includes('Penjelajah Aktif Pancasila')) {
        nextBadges = [...nextBadges, 'Penjelajah Aktif Pancasila'];
      }
      if (nextAct.length >= 8 && !nextBadges.includes('Bintang Karakter Utama')) {
        nextBadges = [...nextBadges, 'Bintang Karakter Utama'];
      }

      return {
        ...prev,
        completedActivities: { ...prev.completedActivities, [sid]: nextAct },
        earnedBadges: { ...prev.earnedBadges, [sid]: nextBadges },
      };
    });
  };

  const addCharacterJournal = (sila: string, action: string) => {
    const sid = activeStudent.id;
    setState((prev) => {
      const cur = prev.characterJournal[sid] || [];
      const next = [
        { id: `cj-${Date.now()}`, date: new Date().toLocaleDateString('id-ID'), sila, action },
        ...cur,
      ];
      return {
        ...prev,
        characterJournal: { ...prev.characterJournal, [sid]: next },
      };
    });
  };

  const saveCaseResponse = (resp: CaseStudyResponse) => {
    const sid = activeStudent.id;
    setState((prev) => ({
      ...prev,
      caseResponses: {
        ...prev.caseResponses,
        [sid]: {
          ...(prev.caseResponses[sid] || {}),
          [resp.caseId]: resp,
        },
      },
    }));
  };

  const saveProjectSubmission = (sub: ProjectSubmission) => {
    const sid = activeStudent.id;
    setState((prev) => ({
      ...prev,
      projectSubmissions: {
        ...prev.projectSubmissions,
        [sid]: {
          ...(prev.projectSubmissions[sid] || {}),
          [sub.projectId]: sub,
        },
      },
    }));
  };

  const saveQuizAttempt = (attemptData: Omit<QuizAttempt, 'id' | 'timestamp'>): QuizAttempt => {
    const attempt: QuizAttempt = {
      ...attemptData,
      id: `qa-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    const sid = attempt.studentId;
    setState((prev) => {
      const curBadges = prev.earnedBadges[sid] || [];
      const nextBadges = [...curBadges];
      if (attempt.passed && !nextBadges.includes(`Tuntas ${attempt.packageTitle}`)) {
        nextBadges.push(`Tuntas ${attempt.packageTitle}`);
      }
      if (attempt.totalScore >= 90 && !nextBadges.includes('Master LITNUM Pancasila')) {
        nextBadges.push('Master LITNUM Pancasila');
      }
      return {
        ...prev,
        quizAttempts: [attempt, ...prev.quizAttempts],
        earnedBadges: { ...prev.earnedBadges, [sid]: nextBadges },
      };
    });
    return attempt;
  };

  const saveReflection = (entry: Omit<ReflectionEntry, 'id' | 'createdAt' | 'studentId'>) => {
    const item: ReflectionEntry = {
      ...entry,
      id: `ref-${Date.now()}`,
      studentId: activeStudent.id,
      createdAt: new Date().toISOString(),
    };
    setState((prev) => ({
      ...prev,
      reflections: [item, ...prev.reflections],
    }));
  };

  const saveDiagnostic = (score: number, readiness: string) => {
    const sid = activeStudent.id;
    setState((prev) => ({
      ...prev,
      diagnosticScores: {
        ...prev.diagnosticScores,
        [sid]: { score, readiness, completedAt: new Date().toISOString() },
      },
    }));
  };

  const saveAttitudeObservation = (obs: Omit<AttitudeObservation, 'id'>) => {
    const newObs: AttitudeObservation = { ...obs, id: `obs-${Date.now()}` };
    setState((prev) => ({
      ...prev,
      attitudeObservations: [newObs, ...prev.attitudeObservations],
    }));
  };

  const upsertRpm = (item: RpmMeeting) => {
    setState((prev) => {
      const exists = prev.rpmList.some((r) => r.id === item.id);
      const rpmList = exists
        ? prev.rpmList.map((r) => (r.id === item.id ? item : r))
        : [...prev.rpmList, item];
      return { ...prev, rpmList };
    });
  };

  const deleteRpm = (id: string) => {
    setState((prev) => ({
      ...prev,
      rpmList: prev.rpmList.filter((r) => r.id !== id),
    }));
  };

  const upsertKktp = (item: KktpItem) => {
    setState((prev) => {
      const exists = prev.kktpList.some((k) => k.id === item.id);
      const kktpList = exists
        ? prev.kktpList.map((k) => (k.id === item.id ? item : k))
        : [...prev.kktpList, item];
      return { ...prev, kktpList };
    });
  };

  const deleteKktp = (id: string) => {
    setState((prev) => ({
      ...prev,
      kktpList: prev.kktpList.filter((k) => k.id !== id),
    }));
  };

  const upsertQuestion = (q: QuizQuestion) => {
    setState((prev) => {
      const exists = prev.questions.some((item) => item.id === q.id);
      const questions = exists
        ? prev.questions.map((item) => (item.id === q.id ? q : item))
        : [q, ...prev.questions];
      return { ...prev, questions };
    });
  };

  const deleteQuestion = (id: string) => {
    setState((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== id),
    }));
  };

  const exportJsonBackup = () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cadangan-pancasila-smpn16-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importJsonBackup = (jsonText: string): { ok: boolean; message: string } => {
    try {
      const parsed = JSON.parse(jsonText) as AppState & {
        identity?: Partial<AppState['identity']> & { principalName?: string };
      };
      if (!parsed || !parsed.identity || !Array.isArray(parsed.rpmList) || !Array.isArray(parsed.kktpList) || !Array.isArray(parsed.questions)) {
        return { ok: false, message: 'Format berkas JSON tidak valid atau struktur data tidak lengkap.' };
      }
      const { principalName: _removed, ...restIdentity } = parsed.identity;
      const migrated = migrateStudentTerminology(parsed);
      setState({
        ...migrated,
        identity: {
          ...DEFAULT_IDENTITY,
          ...migrateStudentTerminology(restIdentity),
          developerName: '@UjeTea',
        },
      });
      return { ok: true, message: 'Data cadangan berhasil dipulihkan dan disimpan.' };
    } catch {
      return { ok: false, message: 'Gagal membaca berkas JSON. Pastikan berkas tidak rusak.' };
    }
  };

  const resetAllData = () => {
    const fresh = buildInitialState();
    setState(fresh);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  };

  const exportCsvGrades = () => {
    const header = [
      'Sekolah',
      'Guru Pengampu',
      'Nama Murid',
      'Kelas',
      'Paket Kuis/Evaluasi',
      'Tanggal',
      'Nilai Total',
      'Skor Literasi',
      'Skor Numerasi',
      'Level KKTP',
      'Status Ketuntasan',
    ];
    const rows = state.quizAttempts.map((a) => {
      const kktpRes = resolveKktpStatus(a.totalScore, state.kktpList);
      return [
        state.identity.schoolName,
        state.identity.teacherName,
        a.studentName,
        a.studentClass,
        a.packageTitle,
        new Date(a.timestamp).toLocaleDateString('id-ID'),
        String(a.totalScore),
        String(a.literasiScore),
        String(a.numerasiScore),
        kktpRes.level,
        kktpRes.passed ? 'Tuntas' : 'Perlu Penguatan',
      ];
    });

    const csv = [header, ...rows]
      .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `laporan-nilai-pancasila-smpn16-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        activeStudent,
        isTeacherUnlocked,
        unlockTeacher,
        lockTeacher,
        updateTeacherPin,
        updateAcademicYear,
        setActiveStudent,
        upsertStudent,
        deleteStudent,
        toggleSectionComplete,
        toggleFavoriteChapter,
        updateChapterContent,
        completeActivity,
        addCharacterJournal,
        saveCaseResponse,
        saveProjectSubmission,
        saveQuizAttempt,
        saveReflection,
        saveDiagnostic,
        saveAttitudeObservation,
        upsertRpm,
        deleteRpm,
        upsertKktp,
        deleteKktp,
        upsertQuestion,
        deleteQuestion,
        exportJsonBackup,
        importJsonBackup,
        resetAllData,
        exportCsvGrades,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used inside AppProvider');
  return ctx;
};
