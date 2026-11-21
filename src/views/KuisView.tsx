import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Play,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { CertificateModal } from '../components/CertificateModal';
import { StimulusVisual } from '../components/StimulusVisual';
import { resolveKktpStatus, useAppStore } from '../store/useAppStore';
import { ChapterId, NavSection, QuizAttempt, QuizQuestion } from '../types';

interface KuisViewProps {
  onNavigate: (section: NavSection, chapterId?: ChapterId) => void;
}

type PackageId = QuizQuestion['packageId'];

interface ShuffledQuestion extends QuizQuestion {
  shuffledOptions?: string[];
  mappedCorrectIndex?: number;
  mappedCorrectIndices?: number[];
  shuffledRightPairs?: string[];
}

function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function prepareShuffledQuestions(questions: QuizQuestion[]): ShuffledQuestion[] {
  return shuffleArray(questions).map((q) => {
    if ((q.type === 'pg' || q.type === 'pg_kompleks') && q.options) {
      const indexed = q.options.map((opt, idx) => ({ opt, idx }));
      const shuffled = shuffleArray(indexed);
      const shuffledOptions = shuffled.map((x) => x.opt);
      const mappedCorrectIndex =
        q.correctIndex !== undefined
          ? shuffled.findIndex((x) => x.idx === q.correctIndex)
          : undefined;
      const mappedCorrectIndices =
        q.correctIndices !== undefined
          ? q.correctIndices
              .map((orig) => shuffled.findIndex((x) => x.idx === orig))
              .filter((x) => x !== -1)
          : undefined;
      return {
        ...q,
        shuffledOptions,
        mappedCorrectIndex,
        mappedCorrectIndices,
      };
    }
    if (q.type === 'menjodohkan' && q.pairs) {
      return {
        ...q,
        shuffledRightPairs: shuffleArray(q.pairs.map((p) => p.right)),
      };
    }
    return { ...q };
  });
}

const PACKAGES: { id: PackageId; title: string; subtitle: string; chapterId?: ChapterId }[] = [
  { id: 'bab1', title: 'Paket Evaluasi Bab 1', subtitle: 'Pancasila dalam Kehidupan Bangsaku', chapterId: 'bab1' },
  { id: 'bab2', title: 'Paket Evaluasi Bab 2', subtitle: 'Pedoman Negaraku (Konstitusi & UUD 1945)', chapterId: 'bab2' },
  { id: 'bab3', title: 'Paket Evaluasi Bab 3', subtitle: 'Bhinneka Tunggal Ika & Toleransi', chapterId: 'bab3' },
  { id: 'bab4', title: 'Paket Evaluasi Bab 4', subtitle: 'NKRI, Demokrasi, Hak & Kewajiban', chapterId: 'bab4' },
  { id: 'uas_ganjil', title: 'Asesmen Akhir Semester Ganjil', subtitle: 'Kompilasi LITNUM Bab 1 & Bab 2' },
  { id: 'uas_genap', title: 'Asesmen Akhir Semester Genap', subtitle: 'Kompilasi LITNUM Bab 3 & Bab 4' },
];

type AnswerValue =
  | number
  | number[]
  | boolean
  | Record<string, string>
  | string;

function evaluateQuestion(q: ShuffledQuestion, ans: AnswerValue | undefined): boolean {
  if (ans === undefined) return false;
  if (q.type === 'pg') {
    return ans === q.mappedCorrectIndex;
  }
  if (q.type === 'pg_kompleks') {
    if (!Array.isArray(ans) || !q.mappedCorrectIndices) return false;
    if (ans.length !== q.mappedCorrectIndices.length) return false;
    return q.mappedCorrectIndices.every((ci) => ans.includes(ci));
  }
  if (q.type === 'benar_salah') {
    return ans === q.correctBool;
  }
  if (q.type === 'menjodohkan' && q.pairs) {
    if (typeof ans !== 'object' || Array.isArray(ans)) return false;
    const map = ans as Record<string, string>;
    return q.pairs.every((p) => map[p.id] === p.right);
  }
  if (q.type === 'isian' && q.acceptedAnswers) {
    if (typeof ans !== 'string') return false;
    const normalized = ans.trim().toLowerCase();
    return q.acceptedAnswers.some((acc) => normalized === acc.toLowerCase());
  }
  if (q.type === 'uraian' && q.keywords) {
    if (typeof ans !== 'string') return false;
    const text = ans.trim().toLowerCase();
    if (text.length < 15) return false;
    const matched = q.keywords.filter((kw) => text.includes(kw.toLowerCase())).length;
    return matched >= 2;
  }
  return false;
}

export const KuisView: React.FC<KuisViewProps> = ({ onNavigate }) => {
  const { state, activeStudent, saveQuizAttempt } = useAppStore();

  const [activePackage, setActivePackage] = useState<PackageId | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<ShuffledQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [submittedAttempt, setSubmittedAttempt] = useState<QuizAttempt | null>(null);
  const [evalDetails, setEvalDetails] = useState<Record<string, boolean>>({});
  const [certificateAttempt, setCertificateAttempt] = useState<QuizAttempt | null>(null);

  const startQuiz = (pkgId: PackageId) => {
    const raw = state.questions.filter((q) => q.packageId === pkgId);
    const shuffled = prepareShuffledQuestions(raw);
    setActivePackage(pkgId);
    setSessionQuestions(shuffled);
    setCurrentIdx(0);
    setAnswers({});
    setSubmittedAttempt(null);
    setEvalDetails({});
  };

  const handleFinishQuiz = () => {
    if (!activePackage) return;
    const pkgMeta = PACKAGES.find((p) => p.id === activePackage)!;
    const results: Record<string, boolean> = {};
    let totalCorrect = 0;
    let litTotal = 0;
    let litCorrect = 0;
    let numTotal = 0;
    let numCorrect = 0;
    const weakSet = new Set<string>();

    sessionQuestions.forEach((q) => {
      const ok = evaluateQuestion(q, answers[q.id]);
      results[q.id] = ok;
      if (ok) totalCorrect += 1;
      else weakSet.add(q.remediationTopic);

      if (q.litNum === 'Literasi') {
        litTotal += 1;
        if (ok) litCorrect += 1;
      } else {
        numTotal += 1;
        if (ok) numCorrect += 1;
      }
    });

    const totalScore = Math.round((totalCorrect / Math.max(1, sessionQuestions.length)) * 100);
    const literasiScore = litTotal > 0 ? Math.round((litCorrect / litTotal) * 100) : totalScore;
    const numerasiScore = numTotal > 0 ? Math.round((numCorrect / numTotal) * 100) : totalScore;

    const kktpRes = resolveKktpStatus(totalScore, state.kktpList, pkgMeta.chapterId);

    const saved = saveQuizAttempt({
      studentId: activeStudent.id,
      studentName: activeStudent.name,
      studentClass: activeStudent.kelas,
      packageId: activePackage,
      packageTitle: pkgMeta.title,
      totalScore,
      literasiScore,
      numerasiScore,
      totalQuestions: sessionQuestions.length,
      correctCount: totalCorrect,
      kktpLevel: kktpRes.level,
      passed: kktpRes.passed,
      weakTopics: Array.from(weakSet),
      certificateEarned: kktpRes.passed,
    });

    setEvalDetails(results);
    setSubmittedAttempt(saved);
  };

  const myHistory = state.quizAttempts.filter((a) => a.studentId === activeStudent.id);

  // ==================== PACKAGE SELECTOR SCREEN ====================
  if (!activePackage) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2">
          <div className="flex items-center gap-2 text-blue-900">
            <Award className="w-5 h-5" />
            <p className="text-xs font-semibold uppercase tracking-wide">
              Evaluasi Literasi & Numerasi (LITNUM) · Terintegrasi KKTP
            </p>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Kuis & Evaluasi Pembelajaran</h1>
          <p className="text-sm text-slate-600 max-w-3xl">
            Setiap paket memuat minimal 20 soal bermuatan stimulus nyata (teks berita, pasal UUD 1945, media sosial, tabel, grafik batang, dan diagram lingkaran). Urutan soal dan opsi jawaban diacak otomatis. Nilai tuntas berhak atas Sertifikat Resmi bertanda tangan {state.identity.teacherName}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => {
            const count = state.questions.filter((q) => q.packageId === pkg.id).length;
            const litCount = state.questions.filter((q) => q.packageId === pkg.id && q.litNum === 'Literasi').length;
            const numCount = count - litCount;
            const best = myHistory
              .filter((h) => h.packageId === pkg.id)
              .sort((a, b) => b.totalScore - a.totalScore)[0];

            return (
              <div
                key={pkg.id}
                className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-500 font-mono tabular-nums">
                    {count} Soal · {litCount} Literasi · {numCount} Numerasi
                  </p>
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">{pkg.title}</h2>
                  <p className="text-xs sm:text-sm text-slate-600">{pkg.subtitle}</p>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {best && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Nilai Terbaikmu:</span>
                      <span
                        className={`font-mono font-bold tabular-nums ${
                          best.passed ? 'text-emerald-700' : 'text-amber-700'
                        }`}
                      >
                        {best.totalScore} ({best.kktpLevel})
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => startQuiz(pkg.id)}
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-800 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 transition-colors min-h-[44px]"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Mulai Kuis LITNUM</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quiz History */}
        {myHistory.length > 0 && (
          <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">
                Riwayat Evaluasi {activeStudent.name}
              </h3>
              <span className="text-xs text-slate-500 font-mono tabular-nums">
                {myHistory.length} percobaan
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-4 py-3 font-semibold text-slate-700">Paket</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Tanggal</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Nilai</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Literasi</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Numerasi</th>
                    <th className="px-4 py-3 font-semibold text-slate-700">Level KKTP</th>
                    <th className="px-4 py-3 font-semibold text-slate-700 text-right">Sertifikat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {myHistory.map((h) => (
                    <tr key={h.id} className="hover:bg-slate-50/70">
                      <td className="px-4 py-3 font-medium text-slate-900">{h.packageTitle}</td>
                      <td className="px-4 py-3 text-slate-500 tabular-nums">
                        {new Date(h.timestamp).toLocaleDateString('id-ID')}
                      </td>
                      <td className="px-4 py-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                        {h.totalScore}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 tabular-nums">
                        {h.literasiScore}
                      </td>
                      <td className="px-4 py-3 text-right font-mono text-slate-700 tabular-nums">
                        {h.numerasiScore}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`text-xs font-semibold ${
                            h.passed ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {h.kktpLevel}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {h.certificateEarned ? (
                          <button
                            onClick={() => setCertificateAttempt(h)}
                            className="text-xs font-semibold text-blue-800 hover:underline"
                          >
                            Buka Sertifikat
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400">Belum tuntas</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {certificateAttempt && (
          <CertificateModal
            attempt={certificateAttempt}
            identity={state.identity}
            onClose={() => setCertificateAttempt(null)}
          />
        )}
      </div>
    );
  }

  // ==================== RESULT & EXPLANATION SCREEN ====================
  if (submittedAttempt) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Hasil Evaluasi · {submittedAttempt.studentName} ({submittedAttempt.studentClass})
              </p>
              <h1 className="text-2xl font-bold text-slate-900">{submittedAttempt.packageTitle}</h1>
            </div>
            <div className="flex flex-wrap gap-2">
              {submittedAttempt.certificateEarned && (
                <button
                  onClick={() => setCertificateAttempt(submittedAttempt)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-400 text-slate-950 text-xs sm:text-sm font-bold hover:bg-amber-300 min-h-[44px]"
                >
                  <Award className="w-4 h-4" />
                  <span>Lihat & Cetak Sertifikat</span>
                </button>
              )}
              <button
                onClick={() => startQuiz(activePackage)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis</span>
              </button>
              <button
                onClick={() => setActivePackage(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-200 min-h-[44px]"
              >
                Daftar Paket
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Nilai Akhir</p>
              <p className="text-3xl font-bold font-mono text-blue-900 mt-1 tabular-nums">
                {submittedAttempt.totalScore}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                Benar {submittedAttempt.correctCount} dari {submittedAttempt.totalQuestions} soal
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Skor Literasi</p>
              <p className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {submittedAttempt.literasiScore}
              </p>
              <p className="text-xs text-slate-600 mt-1">Pemahaman & evaluasi teks</p>
            </div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-4">
              <p className="text-xs text-slate-500">Skor Numerasi</p>
              <p className="text-3xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
                {submittedAttempt.numerasiScore}
              </p>
              <p className="text-xs text-slate-600 mt-1">Analisis grafik, tabel & hitung</p>
            </div>
            <div
              className={`rounded-xl border p-4 ${
                submittedAttempt.passed
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200'
              }`}
            >
              <p className="text-xs text-slate-600">Predikat KKTP</p>
              <p
                className={`text-base sm:text-lg font-bold mt-1 ${
                  submittedAttempt.passed ? 'text-emerald-900' : 'text-amber-900'
                }`}
              >
                {submittedAttempt.kktpLevel}
              </p>
              <p className="text-xs text-slate-700 mt-1">
                {submittedAttempt.passed ? 'Tuntas (Lencana & Sertifikat Diraih)' : 'Perlu Penguatan Materi'}
              </p>
            </div>
          </div>

          {submittedAttempt.weakTopics.length > 0 && (
            <div className="rounded-xl bg-amber-50/80 border border-amber-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-amber-900">Rekomendasi Materi Pengulangan:</p>
                <p className="text-xs sm:text-sm text-amber-950 mt-0.5">
                  {submittedAttempt.weakTopics.join(' · ')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('materi')}
                className="px-4 py-2 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 shrink-0 min-h-[40px]"
              >
                Pelajari Kembali
              </button>
            </div>
          )}
        </div>

        {/* Pembahasan Lengkap Setiap Soal */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Pembahasan Soal Lengkap</h2>
          {sessionQuestions.map((q, idx) => {
            const isCorrect = evalDetails[q.id];
            return (
              <div
                key={q.id}
                className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-mono font-bold text-slate-900">Soal {idx + 1}</span>
                    <span>·</span>
                    <span className="font-semibold text-blue-800">{q.litNum}</span>
                    <span>·</span>
                    <span>{q.difficulty}</span>
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 text-xs font-bold ${
                      isCorrect ? 'text-emerald-700' : 'text-red-700'
                    }`}
                  >
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Jawaban Benar</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4" />
                        <span>Perlu Perbaikan</span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-sm font-semibold text-slate-900">{q.prompt}</p>
                <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5 space-y-2 text-xs sm:text-sm text-slate-800">
                  <p>
                    <strong>Pembahasan:</strong> {q.explanation}
                  </p>
                  {q.sampleAnswer && (
                    <p>
                      <strong>Contoh Jawaban Ideal:</strong> {q.sampleAnswer}
                    </p>
                  )}
                  {q.calculationSteps && q.calculationSteps.length > 0 && (
                    <div className="pt-1 space-y-1">
                      <p className="font-semibold text-blue-900">Langkah Hitung Numerasi:</p>
                      <ul className="font-mono text-xs space-y-1 text-slate-700">
                        {q.calculationSteps.map((st, sIdx) => (
                          <li key={sIdx}>• {st}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {certificateAttempt && (
          <CertificateModal
            attempt={certificateAttempt}
            identity={state.identity}
            onClose={() => setCertificateAttempt(null)}
          />
        )}
      </div>
    );
  }

  // ==================== ACTIVE QUIZ RUNNER ====================
  const q = sessionQuestions[currentIdx];
  const currentAnswer = answers[q.id];
  const answeredCount = sessionQuestions.filter((item) => answers[item.id] !== undefined).length;

  const typeLabel: Record<QuizQuestion['type'], string> = {
    pg: 'Pilihan Ganda',
    pg_kompleks: 'Pilihan Ganda Kompleks (Pilih lebih dari 1)',
    benar_salah: 'Benar atau Salah',
    menjodohkan: 'Menjodohkan',
    isian: 'Isian Singkat',
    uraian: 'Uraian Studi Kasus',
  };

  return (
    <div className="space-y-5">
      {/* Top Progress Strip */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs text-slate-500">
            {PACKAGES.find((p) => p.id === activePackage)?.title} ·{' '}
            <span className="font-mono tabular-nums">
              Terjawab {answeredCount}/{sessionQuestions.length}
            </span>
          </p>
          <div className="h-2 w-48 sm:w-64 bg-slate-100 rounded-full overflow-hidden mt-1.5">
            <div
              className="h-full bg-blue-700 transition-all"
              style={{
                width: `${Math.round(((currentIdx + 1) / sessionQuestions.length) * 100)}%`,
              }}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActivePackage(null)}
            className="px-3 py-2 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 min-h-[40px]"
          >
            Keluar Kuis
          </button>
          <button
            onClick={handleFinishQuiz}
            className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 min-h-[40px]"
          >
            Selesai & Nilai Otomatis
          </button>
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 border-b border-slate-100 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono font-bold text-slate-900">
              Soal {currentIdx + 1} / {sessionQuestions.length}
            </span>
            <span>·</span>
            <span className="font-bold text-blue-900">{q.litNum}</span>
            <span>·</span>
            <span>{typeLabel[q.type]}</span>
            <span>·</span>
            <span>Tingkat {q.difficulty}</span>
          </div>
          <span className="text-[11px] text-slate-500">{q.competency}</span>
        </div>

        {/* Stimulus */}
        <StimulusVisual stimulus={q.stimulus} />

        {/* Prompt */}
        <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">{q.prompt}</h2>

        {/* Input by Question Type */}
        {q.type === 'pg' && q.shuffledOptions && (
          <div className="space-y-2.5">
            {q.shuffledOptions.map((opt, idx) => {
              const selected = currentAnswer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                  className={`w-full text-left p-4 rounded-xl border text-sm transition-colors flex items-start gap-3 min-h-[48px] ${
                    selected
                      ? 'bg-blue-900 text-white border-blue-900 font-medium'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="font-mono font-bold shrink-0">
                    {String.fromCharCode(65 + idx)}.
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>
        )}

        {q.type === 'pg_kompleks' && q.shuffledOptions && (
          <div className="space-y-2.5">
            {q.shuffledOptions.map((opt, idx) => {
              const list = Array.isArray(currentAnswer) ? currentAnswer : [];
              const checked = list.includes(idx);
              return (
                <label
                  key={idx}
                  className={`w-full p-4 rounded-xl border text-sm cursor-pointer transition-colors flex items-start gap-3 min-h-[48px] ${
                    checked
                      ? 'bg-blue-50 border-blue-600 text-blue-950 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const next = checked ? list.filter((x) => x !== idx) : [...list, idx];
                      setAnswers((prev) => ({ ...prev, [q.id]: next }));
                    }}
                    className="mt-1 w-4 h-4 accent-blue-800"
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        )}

        {q.type === 'benar_salah' && (
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((val) => {
              const selected = currentAnswer === val;
              return (
                <button
                  key={String(val)}
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: val }))}
                  className={`py-3.5 rounded-xl border font-bold text-sm transition-colors min-h-[48px] ${
                    selected
                      ? 'bg-blue-900 text-white border-blue-900'
                      : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {val ? 'BENAR' : 'SALAH'}
                </button>
              );
            })}
          </div>
        )}

        {q.type === 'menjodohkan' && q.pairs && q.shuffledRightPairs && (
          <div className="space-y-3">
            {q.pairs.map((p) => {
              const map =
                typeof currentAnswer === 'object' && !Array.isArray(currentAnswer)
                  ? (currentAnswer as Record<string, string>)
                  : {};
              return (
                <div
                  key={p.id}
                  className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center p-3.5 rounded-xl bg-slate-50 border border-slate-200"
                >
                  <p className="text-sm font-medium text-slate-900">{p.left}</p>
                  <select
                    value={map[p.id] || ''}
                    onChange={(e) => {
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: { ...map, [p.id]: e.target.value },
                      }));
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm"
                  >
                    <option value="">-- Pilih pasangan tepat --</option>
                    {q.shuffledRightPairs!.map((r, i) => (
                      <option key={i} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              );
            })}
          </div>
        )}

        {q.type === 'isian' && (
          <input
            type="text"
            value={typeof currentAnswer === 'string' ? currentAnswer : ''}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
            placeholder="Ketik jawaban singkatmu di sini..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        )}

        {q.type === 'uraian' && (
          <textarea
            rows={4}
            value={typeof currentAnswer === 'string' ? currentAnswer : ''}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
            placeholder="Tuliskan analisis lengkapmu berdasarkan nilai Pancasila dan konteks kasus di atas..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        )}

        {/* Navigation Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <button
            onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
            disabled={currentIdx === 0}
            className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold disabled:opacity-40 min-h-[44px]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>

          {currentIdx < sessionQuestions.length - 1 ? (
            <button
              onClick={() => setCurrentIdx((i) => Math.min(sessionQuestions.length - 1, i + 1))}
              className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
            >
              <span>Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinishQuiz}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs sm:text-sm font-bold hover:bg-emerald-800 min-h-[44px]"
            >
              Kumpulkan & Lihat Skor
            </button>
          )}
        </div>
      </div>

      {/* Question Navigator Grid */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4">
        <p className="text-xs font-semibold text-slate-600 mb-2.5">Navigasi Nomor Soal</p>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {sessionQuestions.map((item, idx) => {
            const isAnswered = answers[item.id] !== undefined;
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIdx(idx)}
                className={`h-10 rounded-lg font-mono text-xs font-bold border transition-colors tabular-nums ${
                  isCurrent
                    ? 'bg-blue-900 text-white border-blue-900'
                    : isAnswered
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
