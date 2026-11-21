import React, { useState } from 'react';
import { CheckCircle2, FileText, FolderKanban, Save } from 'lucide-react';
import { CASE_STUDIES_DATA, PROJECTS_DATA } from '../data/activitiesCasesProjectsData';
import { useAppStore } from '../store/useAppStore';

export const StudiKasusView: React.FC = () => {
  const { activeStudent, state, saveCaseResponse } = useAppStore();
  const [activeCaseId, setActiveCaseId] = useState(CASE_STUDIES_DATA[0].id);

  const currentCase = CASE_STUDIES_DATA.find((c) => c.id === activeCaseId) || CASE_STUDIES_DATA[0];
  const saved = state.caseResponses[activeStudent.id]?.[currentCase.id];

  const [selectedSol, setSelectedSol] = useState<string>(saved?.selectedSolutionId || '');
  const [analysisNotes, setAnalysisNotes] = useState<string>(saved?.analysisNotes || '');
  const [reflectionText, setReflectionText] = useState<string>(saved?.reflectionText || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSelectCase = (id: string) => {
    setActiveCaseId(id);
    const existing = state.caseResponses[activeStudent.id]?.[id];
    setSelectedSol(existing?.selectedSolutionId || '');
    setAnalysisNotes(existing?.analysisNotes || '');
    setReflectionText(existing?.reflectionText || '');
    setSavedNotice(false);
  };

  const chosenObj = currentCase.solutionOptions.find((s) => s.id === selectedSol);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSol) return;
    saveCaseResponse({
      caseId: currentCase.id,
      selectedSolutionId: selectedSol,
      analysisNotes: analysisNotes.trim(),
      reflectionText: reflectionText.trim(),
      completedAt: new Date().toISOString(),
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-900">
          <FileText className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Pembelajaran Berbasis Masalah · 5 Kasus Nyata
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Studi Kasus Pendidikan Pancasila</h1>

        <div className="flex flex-wrap gap-2 pt-1">
          {CASE_STUDIES_DATA.map((cs, idx) => {
            const done = Boolean(state.caseResponses[activeStudent.id]?.[cs.id]);
            return (
              <button
                key={cs.id}
                onClick={() => handleSelectCase(cs.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[40px] ${
                  cs.id === currentCase.id
                    ? 'bg-blue-900 text-white border-blue-900'
                    : done
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Kasus {idx + 1}: {cs.category} {done ? '✓' : ''}
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 space-y-5">
        <div className="space-y-1 border-b border-slate-100 pb-4">
          <p className="text-xs font-medium text-blue-800">
            {currentCase.category} · Terhubung ke {currentCase.chapterId.toUpperCase()}
          </p>
          <h2 className="text-xl font-bold text-slate-900">{currentCase.title}</h2>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Deskripsi Peristiwa</h3>
          <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200">
            {currentCase.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 space-y-1">
            <h3 className="text-xs font-bold text-amber-900 uppercase">Identifikasi Masalah</h3>
            <p className="text-sm text-amber-950 leading-relaxed">{currentCase.problemIdentification}</p>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-1">
            <h3 className="text-xs font-bold text-blue-900 uppercase">Kaitan dengan Nilai Pancasila</h3>
            <p className="text-sm text-blue-950 leading-relaxed">{currentCase.pancasilaConnection}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">Pertanyaan Analisis</h3>
          <ul className="space-y-1.5">
            {currentCase.analysisQuestions.map((q, i) => (
              <li key={i} className="text-sm text-slate-700 flex gap-2">
                <span className="font-mono font-bold text-blue-800">{i + 1}.</span>
                <span>{q}</span>
              </li>
            ))}
          </ul>
          <textarea
            rows={3}
            value={analysisNotes}
            onChange={(e) => setAnalysisNotes(e.target.value)}
            placeholder="Tuliskan hasil analisismu terhadap pertanyaan di atas..."
            className="w-full mt-2 p-3 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-slate-900">Pilih Solusi Terbaik</h3>
          {currentCase.solutionOptions.map((opt) => (
            <button
              type="button"
              key={opt.id}
              onClick={() => setSelectedSol(opt.id)}
              className={`w-full text-left p-4 rounded-xl border text-sm transition-colors min-h-[48px] ${
                selectedSol === opt.id
                  ? opt.isRecommended
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                    : 'bg-red-50 border-red-300 text-red-950 font-semibold'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
              }`}
            >
              {opt.label}
            </button>
          ))}
          {chosenObj && (
            <p className="text-sm text-slate-800 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
              <strong>Umpan Balik:</strong> {chosenObj.feedback}
            </p>
          )}
        </div>

        <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-2">
          <p className="text-xs font-bold text-slate-700 uppercase">Kesimpulan & Refleksi Pribadi</p>
          <p className="text-sm text-slate-800">{currentCase.conclusion}</p>
          <input
            type="text"
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Apa pelajaran penting yang akan kamu terapkan jika menghadapi situasi serupa?"
            className="w-full p-2.5 rounded-lg border border-slate-300 bg-white text-sm"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            disabled={!selectedSol}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 disabled:opacity-50 min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Analisis Studi Kasus</span>
          </button>
          {savedNotice && (
            <span className="text-xs font-semibold text-emerald-700">
              Analisis studi kasus berhasil disimpan!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export const ProyekView: React.FC = () => {
  const { activeStudent, state, saveProjectSubmission } = useAppStore();
  const [activeProjectId, setActiveProjectId] = useState(PROJECTS_DATA[0].id);

  const project = PROJECTS_DATA.find((p) => p.id === activeProjectId) || PROJECTS_DATA[0];
  const saved = state.projectSubmissions[activeStudent.id]?.[project.id];

  const [completedSteps, setCompletedSteps] = useState<number[]>(saved?.completedSteps || []);
  const [assignedRole, setAssignedRole] = useState<string>(saved?.assignedRole || project.roles[0]);
  const [documentationNote, setDocumentationNote] = useState<string>(saved?.documentationNote || '');
  const [reflection, setReflection] = useState<string>(saved?.reflection || '');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    const p = PROJECTS_DATA.find((x) => x.id === id) || PROJECTS_DATA[0];
    const ex = state.projectSubmissions[activeStudent.id]?.[id];
    setCompletedSteps(ex?.completedSteps || []);
    setAssignedRole(ex?.assignedRole || p.roles[0]);
    setDocumentationNote(ex?.documentationNote || '');
    setReflection(ex?.reflection || '');
    setSavedNotice(false);
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) =>
      prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveProjectSubmission({
      projectId: project.id,
      completedSteps,
      assignedRole,
      documentationNote: documentationNote.trim(),
      reflection: reflection.trim(),
      updatedAt: new Date().toISOString(),
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-900">
          <FolderKanban className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Project-Based Learning (PjBL) · 6 Proyek Kolaboratif
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Proyek Pancasila</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {PROJECTS_DATA.map((p) => {
            const sub = state.projectSubmissions[activeStudent.id]?.[p.id];
            const pct = sub ? Math.round((sub.completedSteps.length / p.steps.length) * 100) : 0;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectProject(p.id)}
                className={`text-left p-3 rounded-xl border transition-colors min-h-[56px] ${
                  p.id === project.id
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <p className="text-xs font-bold truncate">{p.title}</p>
                <p className={`text-[11px] mt-0.5 font-mono ${p.id === project.id ? 'text-blue-200' : 'text-slate-500'}`}>
                  Progres: {pct}% · {p.chapterId.toUpperCase()}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSave} className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 space-y-6">
        <div className="space-y-1 border-b border-slate-100 pb-4">
          <p className="text-xs font-medium text-blue-800">
            Produk Utama: {project.expectedProduct}
          </p>
          <h2 className="text-xl font-bold text-slate-900">{project.title}</h2>
          <p className="text-sm text-slate-600">{project.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Tujuan Proyek</h3>
            <ul className="space-y-1.5">
              {project.objectives.map((obj, i) => (
                <li key={i} className="text-sm text-slate-700 flex gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900">Peran & Pembagian Tugasmu</h3>
            <select
              value={assignedRole}
              onChange={(e) => setAssignedRole(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 bg-white text-sm"
            >
              {project.roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <p className="text-xs text-slate-500">
              Pembagian tim lainnya: {project.roles.join(' · ')}
            </p>
          </div>
        </div>

        <div className="space-y-2.5">
          <h3 className="text-sm font-bold text-slate-900">Langkah Kerja Proyek (Centang yang sudah selesai)</h3>
          {project.steps.map((st, idx) => {
            const checked = completedSteps.includes(idx);
            return (
              <label
                key={idx}
                className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                  checked ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleStep(idx)}
                  className="mt-1 w-4 h-4 accent-emerald-600"
                />
                <span className="text-sm text-slate-800">
                  <strong className="font-mono text-xs mr-1.5">Langkah {idx + 1}.</strong>
                  {st}
                </span>
              </label>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Catatan & Dokumentasi Karya Kelompok</label>
            <textarea
              rows={3}
              value={documentationNote}
              onChange={(e) => setDocumentationNote(e.target.value)}
              placeholder="Catat ringkasan hasil produk, lokasi mading/tautan karya, atau tanggal pelaksanaan..."
              className="w-full p-3 rounded-xl border border-slate-300 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Refleksi Kolaborasi & Nilai Pancasila</label>
            <textarea
              rows={3}
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Apa tantangan kerja sama tim dan nilai Pancasila apa yang paling terasa?"
              className="w-full p-3 rounded-xl border border-slate-300 text-sm"
            />
          </div>
        </div>

        {/* Rubrik Penilaian Proyek */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
            Rubrik Penilaian Proyek (Total 100 Poin)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  <th className="px-4 py-2.5 font-semibold text-slate-700">Aspek</th>
                  <th className="px-4 py-2.5 font-semibold text-slate-700">Kriteria Keberhasilan</th>
                  <th className="px-4 py-2.5 font-semibold text-slate-700 text-right">Bobot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {project.rubric.map((r, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2.5 font-medium text-slate-900">{r.aspect}</td>
                    <td className="px-4 py-2.5 text-slate-600">{r.criteria}</td>
                    <td className="px-4 py-2.5 text-right font-mono font-bold text-blue-900 tabular-nums">
                      {r.maxPoints}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Progres Proyek</span>
          </button>
          {savedNotice && (
            <span className="text-xs font-semibold text-emerald-700">
              Progres & dokumentasi proyek tersimpan!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
