import React, { useRef, useState } from 'react';
import {
  CheckCircle2,
  Download,
  Edit3,
  FileSpreadsheet,
  KeyRound,
  Lock,
  Plus,
  Printer,
  RefreshCw,
  Trash2,
  Upload,
  Users,
} from 'lucide-react';
import { Smpn16Logo } from '../components/icons/Smpn16Logo';
import { KELAS_GROUPS } from '../data/chaptersData';
import { resolveKktpStatus, useAppStore } from '../store/useAppStore';
import { ChapterId, DifficultyLevel, LitNumType, NavSection, QuizQuestion } from '../types';
import { downloadGradesReportPdf } from '../utils/pdfExporter';

interface TeacherDashboardViewProps {
  onNavigate: (section: NavSection) => void;
}

type TeacherTab = 'nilai' | 'soal' | 'materi' | 'siswa' | 'cadangan';

export const TeacherDashboardView: React.FC<TeacherDashboardViewProps> = ({ onNavigate }) => {
  const {
    state,
    isTeacherUnlocked,
    unlockTeacher,
    lockTeacher,
    updateTeacherPin,
    upsertStudent,
    deleteStudent,
    updateChapterContent,
    upsertQuestion,
    deleteQuestion,
    saveAttitudeObservation,
    exportCsvGrades,
    exportJsonBackup,
    importJsonBackup,
    resetAllData,
  } = useAppStore();

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState<TeacherTab>('nilai');

  // New/Edit Question State
  const [pkgFilter, setPkgFilter] = useState<QuizQuestion['packageId']>('bab1');
  const [editingQ, setEditingQ] = useState<QuizQuestion | null>(null);

  // Student & Attitude Form
  const [newStuName, setNewStuName] = useState('');
  const [newStuClass, setNewStuClass] = useState('VIII-A');
  const [obsStudentId, setObsStudentId] = useState(state.students[0]?.id || '');
  const [obsKritis, setObsKritis] = useState(4);
  const [obsKolab, setObsKolab] = useState(4);
  const [obsKom, setObsKom] = useState(4);
  const [obsKarakter, setObsKarakter] = useState(4);
  const [obsNote, setObsNote] = useState('');
  const [obsMsg, setObsMsg] = useState('');

  // Backup / PIN change state
  const [newPin, setNewPin] = useState('');
  const [pinSavedMsg, setPinSavedMsg] = useState('');
  const [importMsg, setImportMsg] = useState('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadGradesPdf = async () => {
    setIsExportingPdf(true);
    try {
      await downloadGradesReportPdf(state.quizAttempts, state.kktpList, state.identity);
    } finally {
      setIsExportingPdf(false);
    }
  };

  if (!isTeacherUnlocked) {
    return (
      <div className="max-w-md mx-auto mt-8 rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 shadow-sm">
        <div className="flex items-center gap-3.5">
          <Smpn16Logo size={52} />
          <div>
            <p className="text-xs font-semibold text-blue-900 uppercase">Akses Terproteksi</p>
            <h1 className="text-xl font-bold text-slate-900">Dashboard Guru</h1>
            <p className="text-xs text-slate-500">
              {state.identity.teacherName} · {state.identity.schoolName}
            </p>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!unlockTeacher(pinInput)) {
              setPinError('PIN Guru tidak cocok. Silakan coba lagi.');
            } else {
              setPinError('');
              setPinInput('');
            }
          }}
          className="space-y-3"
        >
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Masukkan PIN / Kata Sandi Guru
            </label>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setPinError('');
              }}
              placeholder="PIN awal: 160845"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            />
            <p className="text-[11px] text-slate-500 mt-1">
              PIN bawaan: <span className="font-mono font-bold">160845</span> (dapat diubah setelah masuk).
            </p>
          </div>
          {pinError && <p className="text-xs font-semibold text-red-700">{pinError}</p>}
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-900 text-white text-sm font-semibold hover:bg-blue-950 min-h-[44px]"
          >
            <Lock className="w-4 h-4" />
            <span>Masuk Dashboard Guru</span>
          </button>
        </form>
      </div>
    );
  }

  const startCreateQuestion = () => {
    setEditingQ({
      id: `q-custom-${Date.now()}`,
      packageId: pkgFilter,
      chapterId: pkgFilter.startsWith('bab') ? (pkgFilter as ChapterId) : 'bab1',
      type: 'pg',
      litNum: 'Literasi',
      difficulty: 'Sedang',
      competency: 'Menganalisis kasus nyata nilai Pancasila',
      kktpId: 'kktp-1-1',
      stimulus: {
        type: 'text',
        title: 'Stimulus Konteks Nyata',
        textContent: 'Tuliskan teks bacaan, kutipan pasal, atau cerita kasus di sini...',
      },
      prompt: 'Tuliskan pertanyaan evaluasi...',
      options: ['Pilihan A (Benar)', 'Pilihan B', 'Pilihan C', 'Pilihan D'],
      correctIndex: 0,
      explanation: 'Tuliskan pembahasan lengkap soal...',
      remediationTopic: 'Bab 1: Pancasila dalam Kehidupan',
    });
  };

  const filteredQuestions = state.questions.filter((q) => q.packageId === pkgFilter);

  return (
    <div className="space-y-6">
      {/* Header Guru */}
      <div className="rounded-2xl bg-[#0F2942] text-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 no-print">
        <div className="flex items-center gap-3.5">
          <Smpn16Logo size={54} className="shrink-0" />
          <div>
            <p className="text-xs text-amber-300 font-semibold uppercase tracking-wide">
              Dashboard Guru · {state.identity.schoolName}
            </p>
            <h1 className="text-xl sm:text-2xl font-bold">{state.identity.teacherName}</h1>
            <p className="text-xs text-blue-100">
              Tahun Ajaran {state.identity.academicYear} · {state.identity.curriculum}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('rpm')}
            className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold min-h-[40px]"
          >
            Kelola RPM
          </button>
          <button
            onClick={() => onNavigate('kktp')}
            className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold min-h-[40px]"
          >
            Kelola KKTP
          </button>
          <button
            onClick={lockTeacher}
            className="px-3.5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-semibold min-h-[40px]"
          >
            Kunci Akses Guru
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 no-print">
        {[
          { id: 'nilai', label: 'Laporan Nilai & KKTP' },
          { id: 'soal', label: `Bank Soal LITNUM (${state.questions.length})` },
          { id: 'materi', label: 'Materi & Tautan Video' },
          { id: 'siswa', label: `Siswa & Observasi Sikap (${state.students.length})` },
          { id: 'cadangan', label: 'PIN & Cadangan JSON' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as TeacherTab)}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors min-h-[44px] ${
              activeTab === t.id
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* TAB 1: LAPORAN NILAI & KETERCAPAIAN KKTP */}
      {activeTab === 'nilai' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Rekap Nilai & Ketercapaian KKTP</h2>
              <p className="text-xs text-slate-500">
                Predikat dihitung otomatis mengikuti batas tuntas dan rentang rubrik pada menu KKTP.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={exportCsvGrades}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 min-h-[40px]"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>Unduh CSV / Excel</span>
              </button>
              <button
                onClick={handleDownloadGradesPdf}
                disabled={isExportingPdf}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-700 text-white text-xs font-semibold hover:bg-red-800 disabled:opacity-60 min-h-[40px]"
              >
                <Download className="w-4 h-4" />
                <span>{isExportingPdf ? 'Membuat PDF...' : 'Unduh Laporan PDF'}</span>
              </button>
              <button
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 min-h-[40px]"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak</span>
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden print-container">
            <div className="hidden print-only p-5 border-b border-slate-300 text-center">
              <h2 className="text-lg font-bold">LAPORAN HASIL EVALUASI LITERASI–NUMERASI</h2>
              <p className="text-xs">
                {state.identity.schoolName} · Guru Pengampu: {state.identity.teacherName}
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 font-semibold text-slate-700">Murid</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Kelas</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Paket Evaluasi</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Nilai</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Lit</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Num</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Level KKTP Aktif</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {state.quizAttempts.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                        Belum ada murid yang menyelesaikan Kuis LITNUM.
                      </td>
                    </tr>
                  ) : (
                    state.quizAttempts.map((a) => {
                      const kktpLive = resolveKktpStatus(a.totalScore, state.kktpList);
                      return (
                        <tr key={a.id} className="hover:bg-slate-50/70">
                          <td className="px-4 py-3 font-medium text-slate-900">{a.studentName}</td>
                          <td className="px-4 py-3 text-slate-600">{a.studentClass}</td>
                          <td className="px-4 py-3 text-slate-700">{a.packageTitle}</td>
                          <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                            {a.totalScore}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-slate-700 tabular-nums">
                            {a.literasiScore}
                          </td>
                          <td className="px-4 py-3 text-right font-mono text-slate-700 tabular-nums">
                            {a.numerasiScore}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs font-semibold ${
                                kktpLive.passed ? 'text-emerald-700' : 'text-amber-700'
                              }`}
                            >
                              {kktpLive.level} ({kktpLive.passed ? 'Tuntas' : 'Perlu Penguatan'})
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BANK SOAL LITNUM MANAGER */}
      {activeTab === 'soal' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(['bab1', 'bab2', 'bab3', 'bab4', 'uas_ganjil', 'uas_genap'] as const).map((pkg) => (
                <button
                  key={pkg}
                  onClick={() => setPkgFilter(pkg)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold min-h-[38px] ${
                    pkgFilter === pkg
                      ? 'bg-blue-900 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {pkg.replace('_', ' ').toUpperCase()}
                </button>
              ))}
            </div>
            <button
              onClick={startCreateQuestion}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Soal Baru</span>
            </button>
          </div>

          {editingQ && (
            <div className="rounded-2xl bg-white border-2 border-blue-700 p-5 space-y-3">
              <h3 className="text-base font-bold text-blue-950">Editor Soal LITNUM</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Muatan</label>
                  <select
                    value={editingQ.litNum}
                    onChange={(e) => setEditingQ({ ...editingQ, litNum: e.target.value as LitNumType })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    <option value="Literasi">Literasi</option>
                    <option value="Numerasi">Numerasi</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Tingkat Kesulitan</label>
                  <select
                    value={editingQ.difficulty}
                    onChange={(e) =>
                      setEditingQ({ ...editingQ, difficulty: e.target.value as DifficultyLevel })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
                  >
                    <option value="Mudah">Mudah</option>
                    <option value="Sedang">Sedang</option>
                    <option value="Sulit">Sulit (HOTS)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">Kompetensi Diukur</label>
                  <input
                    type="text"
                    value={editingQ.competency}
                    onChange={(e) => setEditingQ({ ...editingQ, competency: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700">Judul Stimulus</label>
                <input
                  type="text"
                  value={editingQ.stimulus.title}
                  onChange={(e) =>
                    setEditingQ({
                      ...editingQ,
                      stimulus: { ...editingQ.stimulus, title: e.target.value },
                    })
                  }
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {editingQ.stimulus.textContent !== undefined && (
                <div>
                  <label className="text-xs font-semibold text-slate-700">Teks Stimulus</label>
                  <textarea
                    rows={2}
                    value={editingQ.stimulus.textContent}
                    onChange={(e) =>
                      setEditingQ({
                        ...editingQ,
                        stimulus: { ...editingQ.stimulus, textContent: e.target.value },
                      })
                    }
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700">Pertanyaan Soal</label>
                <textarea
                  rows={2}
                  value={editingQ.prompt}
                  onChange={(e) => setEditingQ({ ...editingQ, prompt: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              {editingQ.type === 'pg' && editingQ.options && (
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700">
                    Pilihan Jawaban & Kunci Benar
                  </label>
                  {editingQ.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct-opt"
                        checked={editingQ.correctIndex === idx}
                        onChange={() => setEditingQ({ ...editingQ, correctIndex: idx })}
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const next = [...editingQ.options!];
                          next[idx] = e.target.value;
                          setEditingQ({ ...editingQ, options: next });
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-slate-700">Pembahasan Soal</label>
                <textarea
                  rows={2}
                  value={editingQ.explanation}
                  onChange={(e) => setEditingQ({ ...editingQ, explanation: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    upsertQuestion(editingQ);
                    setEditingQ(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold min-h-[40px]"
                >
                  Simpan Soal
                </button>
                <button
                  onClick={() => setEditingQ(null)}
                  className="px-4 py-2 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold min-h-[40px]"
                >
                  Batal
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {filteredQuestions.map((q, i) => (
              <div
                key={q.id}
                className="rounded-xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <p className="text-xs font-mono text-slate-500">
                    #{i + 1} · <strong className="text-blue-800">{q.litNum}</strong> · {q.type} ·{' '}
                    {q.difficulty}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">{q.prompt}</p>
                  <p className="text-xs text-slate-500">Kompetensi: {q.competency}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => setEditingQ(JSON.parse(JSON.stringify(q)))}
                    className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                    title="Edit soal"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteQuestion(q.id)}
                    className="p-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                    title="Hapus soal"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: MATERI & TAUTAN VIDEO YOUTUBE */}
      {activeTab === 'materi' && (
        <div className="space-y-4">
          {state.chapters.map((ch) => (
            <div key={ch.id} className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
              <h3 className="text-base font-bold text-slate-900">
                Bab {ch.number}: {ch.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700">Subjudul Bab</label>
                  <input
                    type="text"
                    value={ch.subtitle}
                    onChange={(e) => updateChapterContent(ch.id, { subtitle: e.target.value })}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Tautan Video YouTube Pembelajaran (Opsional)
                  </label>
                  <input
                    type="url"
                    value={ch.youtubeUrl}
                    onChange={(e) => updateChapterContent(ch.id, { youtubeUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700">Apersepsi Pembelajaran</label>
                <textarea
                  rows={2}
                  value={ch.apersepsi}
                  onChange={(e) => updateChapterContent(ch.id, { apersepsi: e.target.value })}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: KELOLA SISWA & OBSERVASI SIKAP */}
      {activeTab === 'siswa' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-2 text-blue-900">
              <Users className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-900">Data Kelas & Murid</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newStuName.trim()) return;
                upsertStudent({ name: newStuName.trim(), kelas: newStuClass });
                setNewStuName('');
              }}
              className="flex flex-col sm:flex-row gap-2"
            >
              <input
                type="text"
                value={newStuName}
                onChange={(e) => setNewStuName(e.target.value)}
                placeholder="Nama murid baru..."
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
                required
              />
              <select
                value={newStuClass}
                onChange={(e) => setNewStuClass(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                {KELAS_GROUPS.map((grp) => (
                  <optgroup key={grp.grade} label={`Kelas ${grp.grade}`}>
                    {grp.options.map((k) => (
                      <option key={k} value={k}>
                        {k}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-800 text-white text-xs font-semibold min-h-[40px]"
              >
                Tambah
              </button>
            </form>

            <div className="divide-y divide-slate-100">
              {state.students.map((s) => (
                <div key={s.id} className="py-2.5 flex items-center justify-between text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.kelas}</p>
                  </div>
                  <button
                    onClick={() => deleteStudent(s.id)}
                    disabled={state.students.length <= 1}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-30"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">
              Input Observasi Sikap & Keterampilan (Skala 1–4)
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!obsStudentId) return;
                saveAttitudeObservation({
                  studentId: obsStudentId,
                  date: new Date().toLocaleDateString('id-ID'),
                  kritis: obsKritis,
                  kolaborasi: obsKolab,
                  komunikasi: obsKom,
                  karakterPancasila: obsKarakter,
                  notes: obsNote.trim(),
                });
                setObsNote('');
                setObsMsg('Observasi sikap siswa tersimpan!');
                setTimeout(() => setObsMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <select
                value={obsStudentId}
                onChange={(e) => setObsStudentId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white"
              >
                {state.students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.kelas})
                  </option>
                ))}
              </select>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="font-semibold text-slate-700">Berpikir Kritis (1–4)</label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={obsKritis}
                    onChange={(e) => setObsKritis(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Kolaborasi (1–4)</label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={obsKolab}
                    onChange={(e) => setObsKolab(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Komunikasi (1–4)</label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={obsKom}
                    onChange={(e) => setObsKom(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700">Karakter Pancasila (1–4)</label>
                  <input
                    type="number"
                    min={1}
                    max={4}
                    value={obsKarakter}
                    onChange={(e) => setObsKarakter(Number(e.target.value))}
                    className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 font-mono"
                  />
                </div>
              </div>

              <textarea
                rows={2}
                value={obsNote}
                onChange={(e) => setObsNote(e.target.value)}
                placeholder="Catatan pengamatan autentik guru saat diskusi/proyek..."
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-lg bg-emerald-700 text-white text-xs font-semibold min-h-[40px]"
                >
                  Simpan Catatan Sikap
                </button>
                {obsMsg && (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {obsMsg}
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 5: PIN & CADANGAN JSON */}
      {activeTab === 'cadangan' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex items-center gap-2 text-blue-900">
              <KeyRound className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-900">Ubah PIN / Kata Sandi Guru</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newPin.trim().length < 4) return;
                updateTeacherPin(newPin);
                setNewPin('');
                setPinSavedMsg('PIN Guru berhasil diperbarui!');
                setTimeout(() => setPinSavedMsg(''), 3000);
              }}
              className="space-y-3"
            >
              <input
                type="password"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="Masukkan PIN baru (minimal 4 karakter)"
                minLength={4}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm"
                required
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs sm:text-sm font-semibold min-h-[44px]"
              >
                Simpan PIN Baru
              </button>
              {pinSavedMsg && <p className="text-xs font-semibold text-emerald-700">{pinSavedMsg}</p>}
            </form>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-4">
            <h2 className="text-lg font-bold text-slate-900">Cadangan & Pemulihan Data (JSON)</h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Ekspor seluruh data (progres, nilai, RPM, KKTP, bank soal) ke berkas JSON sebagai cadangan atau untuk dipindahkan ke perangkat lain.
            </p>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={exportJsonBackup}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Ekspor Cadangan JSON</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 min-h-[44px]"
              >
                <Upload className="w-4 h-4" />
                <span>Impor JSON</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    const res = importJsonBackup(String(reader.result || ''));
                    setImportMsg(res.message);
                  };
                  reader.readAsText(file);
                }}
              />

              <button
                onClick={() => {
                  resetAllData();
                  setImportMsg('Seluruh data dikembalikan ke pengaturan awal aplikasi.');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 bg-red-50 text-red-800 text-xs font-semibold hover:bg-red-100 min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reset Awal</span>
              </button>
            </div>
            {importMsg && (
              <p className="text-xs font-semibold text-blue-900 bg-blue-50 p-3 rounded-lg border border-blue-200">
                {importMsg}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
