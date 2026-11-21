import React, { useState } from 'react';
import {
  Check,
  Download,
  Edit3,
  FileText,
  Lock,
  Plus,
  Printer,
  Trash2,
  X,
} from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ChapterId, RpmMeeting, SemesterType } from '../types';
import { downloadRpmPdf } from '../utils/pdfExporter';

export const RpmView: React.FC = () => {
  const {
    state,
    isTeacherUnlocked,
    unlockTeacher,
    updateAcademicYear,
    upsertRpm,
    deleteRpm,
  } = useAppStore();

  const [semester, setSemester] = useState<SemesterType>('ganjil');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<RpmMeeting | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPinBox, setShowPinBox] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const filtered = state.rpmList.filter((r) => r.semester === semester);

  const handleDownloadPdf = async () => {
    setIsExportingPdf(true);
    try {
      await downloadRpmPdf(filtered, semester, state.identity);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const startEdit = (item: RpmMeeting) => {
    if (!isTeacherUnlocked) {
      setShowPinBox(true);
      return;
    }
    setEditingId(item.id);
    setDraft(JSON.parse(JSON.stringify(item)));
  };

  const startNewMeeting = () => {
    if (!isTeacherUnlocked) {
      setShowPinBox(true);
      return;
    }
    const newItem: RpmMeeting = {
      id: `rpm-${Date.now()}`,
      semester,
      chapterId: semester === 'ganjil' ? 'bab1' : 'bab3',
      pertemuanKe: `Pertemuan Baru (${filtered.length + 1})`,
      materiPokok: 'Materi Pokok Baru (Sesuai ATP Sekolah)',
      alokasiWaktu: '2 × 3 JP (240 menit)',
      cp: 'Murid memahami dan menerapkan nilai-nilai Pancasila dalam kehidupan bermasyarakat, berbangsa, dan bernegara.',
      tp: 'Tujuan pembelajaran baru...',
      dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Kolaborasi'],
      pemahamanBermakna: 'Pemahaman bermakna untuk murid kelas VIII...',
      pertanyaanPemantik: 'Pertanyaan pemantik awal pertemuan...',
      praktikPedagogis: 'Pembelajaran Berbasis Masalah / Proyek dan Diskusi Kelompok.',
      lingkunganKemitraan: 'Ruang kelas VIII SMPN 16 Kota Serang dan lingkungan keluarga.',
      pengalamanBelajar: {
        memahami: 'Berkesadaran & Bermakna: Mengeksplorasi konsep inti...',
        mengaplikasi: 'Bermakna & Menggembirakan: Menerapkan konsep melalui simulasi/kasus...',
        merefleksi: 'Berkesadaran: Menulis refleksi pembelajaran dan rencana aksi...',
      },
      asesmen: {
        awal: 'Tanya jawab pemantik awal.',
        proses: 'Observasi diskusi dan aktivitas interaktif.',
        akhir: 'Latihan soal LITNUM.',
      },
      mediaSumber: 'Aplikasi Pancasila Smart Learning SMPN 16 Kota Serang.',
    };
    setEditingId(newItem.id);
    setDraft(newItem);
  };

  const handleSaveDraft = () => {
    if (!draft) return;
    if (!draft.materiPokok.trim() || !draft.tp.trim()) return;
    upsertRpm(draft);
    setEditingId(null);
    setDraft(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setDraft(null);
  };

  const handleDownloadDoc = () => {
    const htmlRows = filtered
      .map(
        (r, i) => `
      <div style="margin-bottom:24px; border:1px solid #cbd5e1; padding:16px;">
        <h3 style="margin:0 0 8px 0;">${i + 1}. ${r.pertemuanKe} — ${r.materiPokok}</h3>
        <p><b>Identitas:</b> ${state.identity.schoolName} | Mapel: ${state.identity.subject} | ${state.identity.gradePhase} | Semester ${semester === 'ganjil' ? 'Ganjil' : 'Genap'} | Tahun Ajaran ${state.identity.academicYear} | Guru: ${state.identity.teacherName} | Alokasi: ${r.alokasiWaktu}</p>
        <p><b>CP:</b> ${r.cp}</p>
        <p><b>TP:</b> ${r.tp}</p>
        <p><b>Dimensi Profil Lulusan:</b> ${r.dimensiProfilLulusan.join(', ')}</p>
        <p><b>Pemahaman Bermakna:</b> ${r.pemahamanBermakna}</p>
        <p><b>Pertanyaan Pemantik:</b> ${r.pertanyaanPemantik}</p>
        <p><b>Praktik Pedagogis:</b> ${r.praktikPedagogis}</p>
        <p><b>Lingkungan & Kemitraan:</b> ${r.lingkunganKemitraan}</p>
        <p><b>Pengalaman Belajar:</b><br/>- Memahami: ${r.pengalamanBelajar.memahami}<br/>- Mengaplikasi: ${r.pengalamanBelajar.mengaplikasi}<br/>- Merefleksi: ${r.pengalamanBelajar.merefleksi}</p>
        <p><b>Asesmen:</b> Awal: ${r.asesmen.awal} | Proses: ${r.asesmen.proses} | Akhir: ${r.asesmen.akhir}</p>
        <p><b>Media & Sumber Belajar:</b> ${r.mediaSumber}</p>
      </div>`
      )
      .join('');

    const docHtml = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word">
      <head><meta charset="utf-8"><title>RPM Pendidikan Pancasila</title></head>
      <body style="font-family: Arial, sans-serif; font-size: 11pt;">
        <h2 style="text-align:center;">RENCANA PEMBELAJARAN MENDALAM (RPM)</h2>
        <p style="text-align:center;">${state.identity.schoolName} · Semester ${semester === 'ganjil' ? 'Ganjil' : 'Genap'} · Tahun Ajaran ${state.identity.academicYear}</p>
        <p style="text-align:center;">Guru Pengampu: <b>${state.identity.teacherName}</b></p>
        <hr/>
        ${htmlRows}
      </body></html>
    `;
    const blob = new Blob([docHtml], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `RPM-Pancasila-${semester}-SMPN16-${state.identity.academicYear.replace('/', '-')}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 no-print">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-blue-900">
              <FileText className="w-5 h-5" />
              <p className="text-xs font-semibold uppercase tracking-wide">
                Perangkat Ajar Kurikulum Merdeka · Pendekatan Deep Learning
              </p>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">
              RPM (Rencana Pembelajaran Mendalam) Dua Semester
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              {state.identity.schoolName} · Guru Pengampu: <strong>{state.identity.teacherName}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <label className="text-xs font-semibold text-slate-600">Tahun Ajaran:</label>
            <input
              type="text"
              value={state.identity.academicYear}
              disabled={!isTeacherUnlocked}
              onChange={(e) => updateAcademicYear(e.target.value)}
              className="w-28 px-2.5 py-1.5 rounded-lg border border-slate-300 font-mono text-xs font-bold text-slate-900 disabled:bg-slate-50"
            />
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

        {/* Semester Tabs & Teacher Unlock */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setSemester('ganjil')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors min-h-[40px] ${
                semester === 'ganjil'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester Ganjil (Bab 1 & 2)
            </button>
            <button
              onClick={() => setSemester('genap')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors min-h-[40px] ${
                semester === 'genap'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Semester Genap (Bab 3 & 4)
            </button>
          </div>

          <div className="flex items-center gap-2">
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
                onClick={startNewMeeting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 min-h-[40px]"
              >
                <Plus className="w-4 h-4" />
                <span>Tambah Pertemuan RPM</span>
              </button>
            )}
          </div>
        </div>

        {showPinBox && !isTeacherUnlocked && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="text-xs text-amber-950 font-medium">
              Masukkan PIN Guru ({state.identity.teacherName}) untuk mengedit/menambah RPM (PIN awal: <span className="font-mono font-bold">160845</span>):
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

      {/* Print Header */}
      <div className="hidden print-only border-b-2 border-slate-900 pb-3 mb-4 text-center">
        <h2 className="text-lg font-bold">RENCANA PEMBELAJARAN MENDALAM (RPM)</h2>
        <p className="text-xs">
          {state.identity.schoolName} · {state.identity.subject} · {state.identity.gradePhase} · Semester{' '}
          {semester === 'ganjil' ? 'Ganjil' : 'Genap'} · TA {state.identity.academicYear}
        </p>
        <p className="text-xs">
          Guru Pengampu: {state.identity.teacherName}
        </p>
      </div>

      {/* Draft Form for New / Editing RPM */}
      {draft && (
        <div className="rounded-2xl bg-white border-2 border-blue-700 p-5 sm:p-6 space-y-4 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-lg font-bold text-blue-950">Editor Komponen RPM</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveDraft}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 min-h-[40px]"
              >
                <Check className="w-4 h-4" />
                <span>Simpan</span>
              </button>
              <button
                onClick={handleCancel}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-slate-200 text-slate-800 text-xs font-semibold hover:bg-slate-300 min-h-[40px]"
              >
                <X className="w-4 h-4" />
                <span>Batal</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Bab Terkait</label>
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
              <label className="text-xs font-semibold text-slate-700">Pertemuan</label>
              <input
                type="text"
                value={draft.pertemuanKe}
                onChange={(e) => setDraft({ ...draft, pertemuanKe: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Alokasi Waktu</label>
              <input
                type="text"
                value={draft.alokasiWaktu}
                onChange={(e) => setDraft({ ...draft, alokasiWaktu: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700">Materi Pokok</label>
            <input
              type="text"
              value={draft.materiPokok}
              onChange={(e) => setDraft({ ...draft, materiPokok: e.target.value })}
              className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Capaian Pembelajaran (CP)</label>
              <textarea
                rows={2}
                value={draft.cp}
                onChange={(e) => setDraft({ ...draft, cp: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Tujuan Pembelajaran (TP)</label>
              <textarea
                rows={2}
                value={draft.tp}
                onChange={(e) => setDraft({ ...draft, tp: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Dimensi Profil Lulusan (pisahkan koma)</label>
              <input
                type="text"
                value={draft.dimensiProfilLulusan.join(', ')}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    dimensiProfilLulusan: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Praktik Pedagogis</label>
              <input
                type="text"
                value={draft.praktikPedagogis}
                onChange={(e) => setDraft({ ...draft, praktikPedagogis: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Pemahaman Bermakna</label>
              <textarea
                rows={2}
                value={draft.pemahamanBermakna}
                onChange={(e) => setDraft({ ...draft, pemahamanBermakna: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Pertanyaan Pemantik</label>
              <textarea
                rows={2}
                value={draft.pertanyaanPemantik}
                onChange={(e) => setDraft({ ...draft, pertanyaanPemantik: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Pengalaman: Memahami</label>
              <textarea
                rows={2}
                value={draft.pengalamanBelajar.memahami}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    pengalamanBelajar: { ...draft.pengalamanBelajar, memahami: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Pengalaman: Mengaplikasi</label>
              <textarea
                rows={2}
                value={draft.pengalamanBelajar.mengaplikasi}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    pengalamanBelajar: { ...draft.pengalamanBelajar, mengaplikasi: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Pengalaman: Merefleksi</label>
              <textarea
                rows={2}
                value={draft.pengalamanBelajar.merefleksi}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    pengalamanBelajar: { ...draft.pengalamanBelajar, merefleksi: e.target.value },
                  })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Asesmen Awal</label>
              <input
                type="text"
                value={draft.asesmen.awal}
                onChange={(e) =>
                  setDraft({ ...draft, asesmen: { ...draft.asesmen, awal: e.target.value } })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Asesmen Proses</label>
              <input
                type="text"
                value={draft.asesmen.proses}
                onChange={(e) =>
                  setDraft({ ...draft, asesmen: { ...draft.asesmen, proses: e.target.value } })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Asesmen Akhir</label>
              <input
                type="text"
                value={draft.asesmen.akhir}
                onChange={(e) =>
                  setDraft({ ...draft, asesmen: { ...draft.asesmen, akhir: e.target.value } })
                }
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700">Lingkungan & Kemitraan</label>
              <input
                type="text"
                value={draft.lingkunganKemitraan}
                onChange={(e) => setDraft({ ...draft, lingkunganKemitraan: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700">Media & Sumber Belajar</label>
              <input
                type="text"
                value={draft.mediaSumber}
                onChange={(e) => setDraft({ ...draft, mediaSumber: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-300 text-sm"
              />
            </div>
          </div>
        </div>
      )}

      {/* RPM Cards List */}
      <div className="space-y-5">
        {filtered.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4 print-container"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <p className="text-xs font-medium text-blue-800">
                  {r.pertemuanKe} · {r.chapterId.toUpperCase()} · Alokasi {r.alokasiWaktu}
                </p>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-0.5">
                  {r.materiPokok}
                </h2>
              </div>
              <div className="flex items-center gap-2 no-print shrink-0">
                <button
                  onClick={() => startEdit(r)}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 min-h-[38px]"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>{editingId === r.id ? 'Sedang Diedit' : 'Edit'}</span>
                </button>
                {isTeacherUnlocked && (
                  <button
                    onClick={() => deleteRpm(r.id)}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-red-200 text-xs font-semibold text-red-700 hover:bg-red-50 min-h-[38px]"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Hapus</span>
                  </button>
                )}
              </div>
            </div>

            {/* 9 Components Structured Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">1. Identitas Pertemuan</p>
                <p className="text-slate-700">
                  {state.identity.schoolName} · {state.identity.subject} · {state.identity.gradePhase} · Semester{' '}
                  {r.semester === 'ganjil' ? 'Ganjil' : 'Genap'} ({state.identity.academicYear}) · Guru:{' '}
                  <strong>{state.identity.teacherName}</strong>
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">3. Dimensi Profil Lulusan</p>
                <p className="text-slate-700">{r.dimensiProfilLulusan.join(' · ')}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">2a. Capaian Pembelajaran (CP)</p>
                <p className="text-slate-700 leading-relaxed">{r.cp}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">2b. Tujuan Pembelajaran (TP)</p>
                <p className="text-slate-700 leading-relaxed">{r.tp}</p>
              </div>
              <div className="rounded-xl bg-blue-50/50 p-3.5 border border-blue-100 space-y-1">
                <p className="font-bold text-blue-950">4a. Pemahaman Bermakna</p>
                <p className="text-slate-700 leading-relaxed">{r.pemahamanBermakna}</p>
              </div>
              <div className="rounded-xl bg-blue-50/50 p-3.5 border border-blue-100 space-y-1">
                <p className="font-bold text-blue-950">4b. Pertanyaan Pemantik</p>
                <p className="text-slate-700 leading-relaxed">{r.pertanyaanPemantik}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">5. Praktik Pedagogis</p>
                <p className="text-slate-700">{r.praktikPedagogis}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">6. Lingkungan & Kemitraan Pembelajaran</p>
                <p className="text-slate-700">{r.lingkunganKemitraan}</p>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 p-4 space-y-2 text-xs sm:text-sm">
              <p className="font-bold text-slate-900">
                7. Pengalaman Belajar (Berkesadaran · Bermakna · Menggembirakan)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-blue-900 mb-1">Memahami</p>
                  <p className="text-slate-700 leading-relaxed">{r.pengalamanBelajar.memahami}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-emerald-800 mb-1">Mengaplikasi</p>
                  <p className="text-slate-700 leading-relaxed">{r.pengalamanBelajar.mengaplikasi}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="font-semibold text-amber-800 mb-1">Merefleksi</p>
                  <p className="text-slate-700 leading-relaxed">{r.pengalamanBelajar.merefleksi}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">8. Asesmen (Awal · Proses · Akhir)</p>
                <p className="text-slate-700">
                  <strong>Awal:</strong> {r.asesmen.awal} · <strong>Proses:</strong> {r.asesmen.proses} ·{' '}
                  <strong>Akhir:</strong> {r.asesmen.akhir}
                </p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200 space-y-1">
                <p className="font-bold text-slate-900">9. Media & Sumber Belajar</p>
                <p className="text-slate-700">{r.mediaSumber}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
