import React, { useState } from 'react';
import {
  Check,
  Download,
  Edit3,
  Lock,
  Plus,
  Printer,
  SlidersHorizontal,
  Trash2,
  X,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ChapterId, KktpItem, SemesterType } from '../types';
import { downloadKktpPdf } from '../utils/pdfExporter';

export const KktpView: React.FC = () => {
  const { state, isTeacherUnlocked, unlockTeacher, upsertKktp, deleteKktp } = useAppStore();

  const [semester, setSemester] = useState<SemesterType>('ganjil');
  const [draft, setDraft] = useState<KktpItem | null>(null);
  const [showPinBox, setShowPinBox] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const filtered = state.kktpList.filter((k) => k.semester === semester);

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await downloadKktpPdf(filtered, semester, state.identity);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const startEdit = (item: KktpItem) => {
    if (!isTeacherUnlocked) {
      setShowPinBox(true);
      return;
    }
    setDraft(JSON.parse(JSON.stringify(item)));
  };

  const startNewRow = () => {
    if (!isTeacherUnlocked) {
      setShowPinBox(true);
      return;
    }
    setDraft({
      id: `kktp-${Date.now()}`,
      semester,
      chapterId: semester === 'ganjil' ? 'bab1' : 'bab3',
      tpCode: `TP Baru`,
      tujuanPembelajaran: 'Murid mampu...',
      indikator: 'Kriteria indikator ketercapaian...',
      passingScore: 75,
      rubrics: [
        { level: 'Belum Tampak', minScore: 0, maxScore: 54, descriptor: 'Perlu bimbingan khusus.' },
        { level: 'Mulai Berkembang', minScore: 55, maxScore: 74, descriptor: 'Memahami sebagian konsep.' },
        { level: 'Berkembang Sesuai Harapan', minScore: 75, maxScore: 89, descriptor: 'Memenuhi batas tuntas.' },
        { level: 'Sangat Berkembang', minScore: 90, maxScore: 100, descriptor: 'Melampaui target & HOTS.' },
      ],
    });
  };

  const handleSaveDraft = () => {
    if (!draft || !draft.tpCode.trim() || !draft.tujuanPembelajaran.trim()) return;
    upsertKktp(draft);
    setDraft(null);
  };

  const handleDownloadDoc = () => {
    const rowsHtml = filtered
      .map(
        (k) => `
      <tr>
        <td><b>${k.tpCode}</b><br/>${k.tujuanPembelajaran}</td>
        <td>${k.indikator}<br/><i>Batas Tuntas: ${k.passingScore}</i></td>
        ${k.rubrics
          .map(
            (r) => `<td><b>${r.minScore}–${r.maxScore}</b><br/>${r.descriptor}</td>`
          )
          .join('')}
      </tr>`
      )
      .join('');

    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
      <head><meta charset="utf-8"><title>KKTP Pendidikan Pancasila</title></head>
      <body style="font-family: Arial, sans-serif; font-size: 10pt;">
        <h2 style="text-align:center;">KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)</h2>
        <p style="text-align:center;">${state.identity.schoolName} · ${state.identity.subject} · ${state.identity.gradePhase} · Semester ${semester === 'ganjil' ? 'Ganjil' : 'Genap'}</p>
        <p style="text-align:center;">Guru Pengampu: <b>${state.identity.teacherName}</b></p>
        <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse:collapse;">
          <thead>
            <tr style="background:#f1f5f9;">
              <th>Tujuan Pembelajaran</th>
              <th>Kriteria / Indikator</th>
              <th>Belum Tampak</th>
              <th>Mulai Berkembang</th>
              <th>Berkembang Sesuai Harapan</th>
              <th>Sangat Berkembang</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </body></html>
    `;
    const blob = new Blob([html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KKTP-Pancasila-${semester}-SMPN16.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-900">
              <SlidersHorizontal className="w-5 h-5" />
              <p className="text-xs font-semibold uppercase tracking-wide">
                Rubrik Penilaian Terintegrasi Otomatis dengan Hasil Kuis
              </p>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              KKTP (Kriteria Ketercapaian Tujuan Pembelajaran)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Perubahan batas tuntas atau rentang rubrik KKTP langsung dipakai untuk menandai level pencapaian setiap siswa pada Kuis LITNUM dan Laporan Nilai.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isExportingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-700 text-white text-xs font-semibold hover:bg-red-800 disabled:opacity-60 min-h-[40px]"
            >
              <Download className="w-4 h-4" />
              <span>{isExportingPdf ? 'Membuat PDF...' : 'Unduh PDF'}</span>
            </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-50 min-h-[40px]"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>
            <button
              onClick={handleDownloadDoc}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 min-h-[40px]"
            >
              <Download className="w-4 h-4" />
              <span>Word (.doc)</span>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSemester('ganjil')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold min-h-[40px] ${
                semester === 'ganjil'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester Ganjil
            </button>
            <button
              onClick={() => setSemester('genap')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold min-h-[40px] ${
                semester === 'genap'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester Genap
            </button>
          </div>

          {!isTeacherUnlocked ? (
            <button
              onClick={() => setShowPinBox((v) => !v)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-100 text-amber-950 border border-amber-300 text-xs font-semibold min-h-[40px]"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Masuk Mode Edit Guru</span>
            </button>
          ) : (
            <button
              onClick={startNewRow}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 min-h-[40px]"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Baris KKTP</span>
            </button>
          )}
        </div>

        {showPinBox && !isTeacherUnlocked && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-xs text-amber-950 font-medium">
              Masukkan PIN Guru ({state.identity.teacherName}) untuk menyunting KKTP (PIN awal: <span className="font-mono font-bold">160845</span>):
            </p>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError('');
                }}
                placeholder="PIN Guru"
                className="px-3 py-1.5 rounded-lg border border-amber-300 bg-white text-sm w-32"
              />
              <button
                onClick={() => {
                  if (unlockTeacher(pinInput)) {
                    setShowPinBox(false);
                    setPinInput('');
                  } else {
                    setPinError('PIN salah');
                  }
                }}
                className="px-3.5 py-2 rounded-lg bg-blue-900 text-white text-xs font-semibold min-h-[36px]"
              >
                Buka Akses
              </button>
              {pinError && <span className="text-xs text-red-700 font-semibold">{pinError}</span>}
            </div>
          </div>
        )}
      </div>

      {/* KKTP Editor Modal/Panel */}
      {draft && (
        <div className="rounded-2xl bg-white border-2 border-blue-700 p-5 sm:p-6 space-y-4 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-blue-950">Editor Baris KKTP & Rubrik</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold min-h-[40px]"
              >
                <Check className="w-4 h-4" />
                <span>Simpan KKTP</span>
              </button>
              <button
                onClick={() => setDraft(null)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold min-h-[40px]"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Bab</label>
              <select
                value={draft.chapterId}
                onChange={(e) => setDraft({ ...draft, chapterId: e.target.value as ChapterId })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm bg-white"
              >
                <option value="bab1">Bab 1</option>
                <option value="bab2">Bab 2</option>
                <option value="bab3">Bab 3</option>
                <option value="bab4">Bab 4</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Kode TP</label>
              <input
                type="text"
                value={draft.tpCode}
                onChange={(e) => setDraft({ ...draft, tpCode: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Nilai Minimal Tuntas (KKM)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={draft.passingScore}
                onChange={(e) => setDraft({ ...draft, passingScore: Number(e.target.value) })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Tujuan Pembelajaran</label>
              <textarea
                rows={2}
                value={draft.tujuanPembelajaran}
                onChange={(e) => setDraft({ ...draft, tujuanPembelajaran: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Kriteria / Indikator</label>
              <textarea
                rows={2}
                value={draft.indikator}
                onChange={(e) => setDraft({ ...draft, indikator: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {draft.rubrics.map((rub, rIdx) => (
              <div key={rub.level} className="rounded-xl bg-slate-50 border border-slate-200 p-3 space-y-2">
                <p className="text-xs font-bold text-slate-900">{rub.level}</p>
                <div className="flex items-center gap-1.5 text-xs">
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={rub.minScore}
                    onChange={(e) => {
                      const next = [...draft.rubrics];
                      next[rIdx] = { ...rub, minScore: Number(e.target.value) };
                      setDraft({ ...draft, rubrics: next });
                    }}
                    className="w-16 px-2 py-1 rounded border border-slate-300 font-mono bg-white"
                  />
                  <span>s.d.</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={rub.maxScore}
                    onChange={(e) => {
                      const next = [...draft.rubrics];
                      next[rIdx] = { ...rub, maxScore: Number(e.target.value) };
                      setDraft({ ...draft, rubrics: next });
                    }}
                    className="w-16 px-2 py-1 rounded border border-slate-300 font-mono bg-white"
                  />
                </div>
                <textarea
                  rows={2}
                  value={rub.descriptor}
                  onChange={(e) => {
                    const next = [...draft.rubrics];
                    next[rIdx] = { ...rub, descriptor: e.target.value };
                    setDraft({ ...draft, rubrics: next });
                  }}
                  className="w-full px-2 py-1.5 rounded border border-slate-300 text-xs bg-white"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* KKTP Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden print-container">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 font-bold text-slate-800 min-w-[210px]">
                  Tujuan Pembelajaran & Indikator
                </th>
                <th className="px-4 py-3 font-bold text-red-900 min-w-[160px]">Belum Tampak</th>
                <th className="px-4 py-3 font-bold text-amber-900 min-w-[160px]">Mulai Berkembang</th>
                <th className="px-4 py-3 font-bold text-blue-900 min-w-[160px]">
                  Berkembang Sesuai Harapan
                </th>
                <th className="px-4 py-3 font-bold text-emerald-900 min-w-[160px]">
                  Sangat Berkembang
                </th>
                <th className="px-4 py-3 font-bold text-slate-700 text-right no-print">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filtered.map((item) => (
                <tr key={item.id} className="align-top hover:bg-slate-50/50">
                  <td className="px-4 py-3.5 space-y-1">
                    <p className="font-mono text-xs font-bold text-blue-900">
                      {item.tpCode} · {item.chapterId.toUpperCase()} · Batas Tuntas ≥ {item.passingScore}
                    </p>
                    <p className="font-semibold text-slate-900">{item.tujuanPembelajaran}</p>
                    <p className="text-xs text-slate-600">{item.indikator}</p>
                  </td>
                  {item.rubrics.map((r) => (
                    <td key={r.level} className="px-4 py-3.5 space-y-1">
                      <p className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                        {r.minScore}–{r.maxScore}
                      </p>
                      <p className="text-xs text-slate-600 leading-relaxed">{r.descriptor}</p>
                    </td>
                  ))}
                  <td className="px-4 py-3.5 text-right no-print whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100"
                        title="Edit KKTP"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      {isTeacherUnlocked && (
                        <button
                          onClick={() => deleteKktp(item.id)}
                          className="p-2 rounded-lg border border-red-200 text-red-700 hover:bg-red-50"
                          title="Hapus baris"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
