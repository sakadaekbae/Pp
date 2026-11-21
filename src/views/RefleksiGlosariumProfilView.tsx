import React, { useState } from 'react';
import { BookMarked, CheckCircle2, HelpCircle, Save, Search, Sparkles, UserCheck } from 'lucide-react';
import { GarudaPancasila } from '../components/icons/GarudaPancasila';
import { Smpn16Logo } from '../components/icons/Smpn16Logo';
import { DIAGNOSTIC_QUESTIONS } from '../data/activitiesCasesProjectsData';
import { GLOSSARY_DATA } from '../data/chaptersData';
import { useAppStore } from '../store/useAppStore';
import { ChapterId } from '../types';

export const RefleksiView: React.FC = () => {
  const { state, activeStudent, saveReflection, saveDiagnostic } = useAppStore();

  // Diagnostic State
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({});
  const myDiag = state.diagnosticScores[activeStudent.id];

  // Reflection Form State
  const [chapterId, setChapterId] = useState<ChapterId | 'umum'>('bab1');
  const [newLearning, setNewLearning] = useState('');
  const [relevantValues, setRelevantValues] = useState('');
  const [applicationPlan, setApplicationPlan] = useState('');
  const [challenges, setChallenges] = useState('');
  const [improvementPlan, setImprovementPlan] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  const myReflections = state.reflections.filter((r) => r.studentId === activeStudent.id);
  const myObservations = state.attitudeObservations.filter((o) => o.studentId === activeStudent.id);

  const handleDiagnosticSubmit = () => {
    let correct = 0;
    DIAGNOSTIC_QUESTIONS.forEach((dq) => {
      if (diagAnswers[dq.id] === dq.correctIndex) correct += 1;
    });
    const score = Math.round((correct / DIAGNOSTIC_QUESTIONS.length) * 100);
    const readiness =
      score >= 75
        ? 'Siap Eksplorasi Mendalam'
        : score >= 50
        ? 'Perlu Penguatan Konsep Awal'
        : 'Butuh Pendampingan Awal';
    saveDiagnostic(score, readiness);
  };

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLearning.trim() || !applicationPlan.trim()) return;
    saveReflection({
      chapterId,
      newLearning: newLearning.trim(),
      relevantValues: relevantValues.trim(),
      applicationPlan: applicationPlan.trim(),
      challenges: challenges.trim(),
      improvementPlan: improvementPlan.trim(),
    });
    setNewLearning('');
    setRelevantValues('');
    setApplicationPlan('');
    setChallenges('');
    setImprovementPlan('');
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-1">
        <div className="flex items-center gap-2 text-blue-900">
          <Sparkles className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Asesmen Diagnostik, Sikap & Jurnal Refleksi
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Refleksi & Penilaian Diri</h1>
        <p className="text-sm text-slate-600">
          Penilaian Pendidikan Pancasila mencakup kesiapan awal (diagnostik), refleksi pemahaman mendalam, serta pengamatan sikap dan karakter oleh {state.identity.teacherName}.
        </p>
      </div>

      {/* Asesmen Diagnostik Awal */}
      <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Asesmen Diagnostik Awal</h2>
            <p className="text-xs text-slate-500">
              Mengukur kesiapan belajar sebelum memasuki materi inti Deep Learning
            </p>
          </div>
          {myDiag && (
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
              Skor Diagnostik: {myDiag.score} · {myDiag.readiness}
            </span>
          )}
        </div>

        <div className="space-y-4">
          {DIAGNOSTIC_QUESTIONS.map((dq, idx) => (
            <div key={dq.id} className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2.5">
              <p className="text-sm font-semibold text-slate-900">
                {idx + 1}. {dq.question}
              </p>
              <div className="space-y-1.5">
                {dq.options.map((opt, oIdx) => (
                  <label key={oIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 cursor-pointer py-1">
                    <input
                      type="radio"
                      name={dq.id}
                      checked={diagAnswers[dq.id] === oIdx}
                      onChange={() => setDiagAnswers((p) => ({ ...p, [dq.id]: oIdx }))}
                      className="mt-1 accent-blue-800"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleDiagnosticSubmit}
          className="px-5 py-2.5 rounded-xl bg-blue-800 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
        >
          Simpan Hasil Diagnostik Awal
        </button>
      </section>

      {/* Jurnal Refleksi Tersimpan */}
      <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Jurnal Refleksi Belajar</h2>
        <form onSubmit={handleSaveReflection} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Bab / Konteks</label>
              <select
                value={chapterId}
                onChange={(e) => setChapterId(e.target.value as ChapterId | 'umum')}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
              >
                <option value="bab1">Bab 1 · Pancasila dalam Kehidupan</option>
                <option value="bab2">Bab 2 · Pedoman Negaraku (UUD 1945)</option>
                <option value="bab3">Bab 3 · Bhinneka Tunggal Ika</option>
                <option value="bab4">Bab 4 · NKRI, Demokrasi & Hak-Kewajiban</option>
                <option value="umum">Refleksi Umum Semester</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Nilai Pancasila yang Paling Relevan
              </label>
              <input
                type="text"
                value={relevantValues}
                onChange={(e) => setRelevantValues(e.target.value)}
                placeholder="Misal: Sila ke-2 Empati dan Sila ke-4 Musyawarah"
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              1. Hal baru apa yang paling berkesan saya pelajari?
            </label>
            <textarea
              rows={2}
              value={newLearning}
              onChange={(e) => setNewLearning(e.target.value)}
              placeholder="Tuliskan pemahaman barumu..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                2. Cara penerapannya di sekolah/rumah
              </label>
              <textarea
                rows={2}
                value={applicationPlan}
                onChange={(e) => setApplicationPlan(e.target.value)}
                placeholder="Aksi nyataku..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                3. Tantangan yang dihadapi
              </label>
              <textarea
                rows={2}
                value={challenges}
                onChange={(e) => setChallenges(e.target.value)}
                placeholder="Hambatan pribadi..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                4. Rencana perbaikan diri
              </label>
              <textarea
                rows={2}
                value={improvementPlan}
                onChange={(e) => setImprovementPlan(e.target.value)}
                placeholder="Langkah perbaikan..."
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
            >
              <Save className="w-4 h-4" />
              <span>Simpan Jurnal Refleksi</span>
            </button>
            {savedNotice && (
              <span className="text-xs font-semibold text-emerald-700">
                Jurnal refleksi berhasil disimpan!
              </span>
            )}
          </div>
        </form>

        {/* Saved Reflections List */}
        {myReflections.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Riwayat Jurnal Refleksimu</h3>
            {myReflections.map((r) => (
              <div key={r.id} className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1.5 text-sm">
                <p className="text-xs font-semibold text-blue-900">
                  {r.chapterId.toUpperCase()} · {new Date(r.createdAt).toLocaleDateString('id-ID')} · {r.relevantValues}
                </p>
                <p className="text-slate-800">
                  <strong>Hal baru:</strong> {r.newLearning}
                </p>
                <p className="text-slate-700 text-xs sm:text-sm">
                  <strong>Penerapan:</strong> {r.applicationPlan}{' '}
                  {r.improvementPlan && `· Rencana perbaikan: ${r.improvementPlan}`}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Catatan Pengamatan Sikap dari Guru */}
      <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-3">
        <h2 className="text-lg font-bold text-slate-900">
          Catatan Pengamatan Sikap & Keterampilan ({state.identity.teacherName})
        </h2>
        {myObservations.length === 0 ? (
          <p className="text-xs sm:text-sm text-slate-500">
            Belum ada catatan observasi dari guru. Guru dapat menginput penilaian sikap (Berpikir Kritis, Kolaborasi, Komunikasi, Karakter Pancasila) melalui Dashboard Guru.
          </p>
        ) : (
          <div className="space-y-3">
            {myObservations.map((obs) => (
              <div key={obs.id} className="rounded-xl border border-slate-200 p-4 space-y-2">
                <p className="text-xs text-slate-500 font-mono">{obs.date}</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="bg-slate-50 p-2 rounded-lg">
                    Kritis: <strong className="font-mono">{obs.kritis}/4</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    Kolaborasi: <strong className="font-mono">{obs.kolaborasi}/4</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    Komunikasi: <strong className="font-mono">{obs.komunikasi}/4</strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg">
                    Karakter: <strong className="font-mono">{obs.karakterPancasila}/4</strong>
                  </div>
                </div>
                {obs.notes && <p className="text-sm text-slate-700">{obs.notes}</p>}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export const GlosariumView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterChapter, setFilterChapter] = useState<'all' | ChapterId>('all');

  const filtered = GLOSSARY_DATA.filter((item) => {
    const matchChap = filterChapter === 'all' || item.chapterId === filterChapter;
    const q = searchTerm.trim().toLowerCase();
    const matchText =
      !q ||
      item.term.toLowerCase().includes(q) ||
      item.definition.toLowerCase().includes(q) ||
      item.example.toLowerCase().includes(q);
    return matchChap && matchText;
  });

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
        <div className="flex items-center gap-2 text-blue-900">
          <HelpCircle className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Kamus Konsep Kewarganegaraan
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Glosarium Interaktif</h1>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari istilah (misal: konstitusi, toleransi, musyawarah)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(['all', 'bab1', 'bab2', 'bab3', 'bab4'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilterChapter(f)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold min-h-[40px] ${
                  filterChapter === f
                    ? 'bg-blue-900 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {f === 'all' ? 'Semua Bab' : f.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-xl bg-white border border-slate-200 p-5 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-blue-950">{item.term}</h2>
              <span className="text-xs font-mono text-slate-500 uppercase">{item.chapterId}</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{item.definition}</p>
            <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 rounded-lg p-3 border border-slate-100">
              <strong className="text-slate-800">Contoh sederhana:</strong> {item.example}
            </p>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="md:col-span-2 text-center py-10 bg-white rounded-xl border border-slate-200 text-sm text-slate-500">
            Istilah yang dicari tidak ditemukan. Coba kata kunci lain.
          </div>
        )}
      </div>
    </div>
  );
};

export const ProfilPengembangView: React.FC = () => {
  const { state } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-gradient-to-br from-[#0F2942] to-[#1E3A8A] text-white p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6">
        <div className="flex items-center gap-4 shrink-0">
          <Smpn16Logo size={80} />
          <GarudaPancasila size={80} />
        </div>
        <div className="space-y-2 text-center md:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">
            Profil Pengembang & Satuan Pendidikan
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold">{state.identity.appName}</h1>
          <p className="text-sm text-blue-100">
            {state.identity.subject} · {state.identity.gradePhase} · {state.identity.schoolName}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2 text-blue-900">
            <UserCheck className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-900">Identitas Guru & Pengembang Aplikasi</h2>
          </div>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Guru Pengampu</dt>
              <dd className="font-bold text-slate-900 text-right">{state.identity.teacherName}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Pengembang Aplikasi</dt>
              <dd className="font-bold text-blue-900 text-right">{state.identity.developerName}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Satuan Pendidikan</dt>
              <dd className="font-semibold text-slate-900 text-right">{state.identity.schoolName}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-slate-100 pb-2">
              <dt className="text-slate-500">Kurikulum & Pendekatan</dt>
              <dd className="font-semibold text-slate-900 text-right">
                {state.identity.curriculum} · Deep Learning
              </dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-slate-500">Tahun Ajaran Aktif</dt>
              <dd className="font-mono font-bold text-blue-900 text-right">{state.identity.academicYear}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-3">
          <div className="flex items-center gap-2 text-blue-900">
            <BookMarked className="w-5 h-5" />
            <h2 className="text-lg font-bold text-slate-900">Landasan Desain Pembelajaran</h2>
          </div>
          <ul className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span>
                <strong>Berkesadaran (Mindful):</strong> Siswa memahami tujuan belajar dan merefleksikan nilai Pancasila dalam hidupnya.
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span>
                <strong>Bermakna (Meaningful):</strong> Materi dan soal LITNUM terhubung langsung dengan keluarga, sekolah, masyarakat Kota Serang, dan etika media sosial.
              </span>
            </li>
            <li className="flex gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
              <span>
                <strong>Menggembirakan (Joyful):</strong> Dilengkapi simulasi musyawarah, puzzle konstitusi, studi kasus, proyek kolaboratif, lencana, dan sertifikat digital.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
