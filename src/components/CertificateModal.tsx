import React, { useState } from 'react';
import { Award, Download, Printer, X } from 'lucide-react';
import { QuizAttempt, SchoolIdentity } from '../types';
import { downloadCertificatePdf } from '../utils/pdfExporter';
import { GarudaPancasila } from './icons/GarudaPancasila';
import { Smpn16Logo } from './icons/Smpn16Logo';

interface CertificateModalProps {
  attempt: QuizAttempt;
  identity: SchoolIdentity;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  attempt,
  identity,
  onClose,
}) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      await downloadCertificatePdf(attempt, identity);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden print-container">
        <div className="no-print flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-slate-800 font-semibold text-sm">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Sertifikat & Lencana Pencapaian LITNUM</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 disabled:opacity-60 transition-colors min-h-[40px]"
            >
              <Download className="w-4 h-4" />
              <span>{isExporting ? 'Membuat PDF...' : 'Unduh PDF'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-xs font-semibold hover:bg-slate-100 transition-colors min-h-[40px]"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-200/70 min-h-[40px] min-w-[40px] flex items-center justify-center"
              aria-label="Tutup sertifikat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Body */}
        <div className="p-6 sm:p-10 bg-white">
          <div className="border-4 border-double border-amber-600/80 rounded-xl p-6 sm:p-8 bg-gradient-to-b from-slate-50/70 via-white to-amber-50/30">
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-6">
              <Smpn16Logo size={64} />
              <div className="text-center flex-1">
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-900">
                  {identity.schoolName}
                </p>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  SERTIFIKAT PENCAPAIAN BELAJAR
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  {identity.appName} · {identity.subject} · {identity.gradePhase}
                </p>
              </div>
              <GarudaPancasila size={64} />
            </div>

            <div className="text-center space-y-3 py-2">
              <p className="text-sm text-slate-600">Diberikan dengan bangga kepada murid:</p>
              <p className="text-2xl sm:text-3xl font-bold text-blue-950 font-display">
                {attempt.studentName}
              </p>
              <p className="text-sm font-medium text-slate-700">
                Kelas {attempt.studentClass} · {identity.schoolName}
              </p>

              <p className="text-sm text-slate-600 max-w-xl mx-auto pt-2 leading-relaxed">
                Telah menyelesaikan evaluasi Literasi–Numerasi pada paket{' '}
                <strong className="text-slate-900">{attempt.packageTitle}</strong> dengan predikat ketercapaian KKTP:{' '}
                <strong className="text-emerald-700">{attempt.kktpLevel}</strong>.
              </p>

              <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto pt-4">
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-[11px] text-slate-500">Nilai Akhir</p>
                  <p className="text-xl font-bold font-mono text-blue-900 tabular-nums">
                    {attempt.totalScore}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-[11px] text-slate-500">Skor Literasi</p>
                  <p className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {attempt.literasiScore}
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-[11px] text-slate-500">Skor Numerasi</p>
                  <p className="text-xl font-bold font-mono text-slate-900 tabular-nums">
                    {attempt.numerasiScore}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 mt-8 pt-6 border-t border-slate-200 text-xs sm:text-sm text-slate-700">
              <div className="text-center sm:text-left text-xs text-slate-500">
                <p>Pengembang Aplikasi: <strong className="text-slate-700">{identity.developerName}</strong></p>
                <p>{identity.schoolName}</p>
              </div>
              <div className="text-center">
                <p className="text-slate-500">
                  Kota Serang, {new Date(attempt.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
                <p className="text-slate-500">Guru Mata Pelajaran</p>
                <div className="h-8" />
                <p className="font-bold text-slate-900 underline decoration-slate-300 underline-offset-4">
                  {identity.teacherName}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">Pengampu {identity.subject}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
