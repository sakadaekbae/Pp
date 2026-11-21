import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Compass, Target } from 'lucide-react';
import { useAppStore } from '../store/useAppStore';
import { ChapterId, NavSection } from '../types';

interface CurriculumViewProps {
  onNavigate: (section: NavSection, chapterId?: ChapterId) => void;
}

export const TujuanPembelajaranView: React.FC<CurriculumViewProps> = ({ onNavigate }) => {
  const { state } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2">
        <div className="flex items-center gap-2 text-blue-900">
          <Target className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Kurikulum Merdeka · Fase D Kelas VIII
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Tujuan Pembelajaran (TP)</h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Daftar tujuan pembelajaran Pendidikan Pancasila di {state.identity.schoolName} bersama{' '}
          {state.identity.teacherName} untuk satu tahun ajaran ({state.identity.academicYear}). Pengelompokan bab ini fleksibel dan dapat disesuaikan oleh guru dengan ATP sekolah.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {state.chapters.map((ch) => (
          <div key={ch.id} className="rounded-xl bg-white border border-slate-200 p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Bab {ch.number} · Semester {ch.semester === 'ganjil' ? 'Ganjil' : 'Genap'}
                </p>
                <h2 className="text-lg font-bold text-slate-900">{ch.title}</h2>
              </div>
              <span className="text-xs font-mono font-semibold text-blue-800">
                {ch.tpCodes.join(' · ')}
              </span>
            </div>

            <ul className="space-y-2.5">
              {ch.tujuanPembelajaran.map((tp, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                  <span>{tp}</span>
                </li>
              ))}
            </ul>

            <div className="pt-2 flex items-center justify-between border-t border-slate-100">
              <button
                onClick={() => onNavigate('kktp')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Lihat Kriteria KKTP →
              </button>
              <button
                onClick={() => onNavigate('materi', ch.id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 min-h-[40px]"
              >
                <span>Buka Materi</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const PetaKonsepView: React.FC<CurriculumViewProps> = ({ onNavigate }) => {
  const { state } = useAppStore();
  const [selectedChapter, setSelectedChapter] = useState<ChapterId>('bab1');

  const activeChapter = state.chapters.find((c) => c.id === selectedChapter) || state.chapters[0];

  const conceptNodes: { id: ChapterId; x: number; y: number; short: string; keywords: string[] }[] = [
    {
      id: 'bab1',
      x: 130,
      y: 80,
      short: 'Bab 1 · Pancasila',
      keywords: ['Dasar Negara', 'Pandangan Hidup', 'Ideologi Terbuka'],
    },
    {
      id: 'bab2',
      x: 470,
      y: 80,
      short: 'Bab 2 · UUD NRI 1945',
      keywords: ['Konstitusi', 'Pembukaan UUD', 'Hierarki Hukum'],
    },
    {
      id: 'bab3',
      x: 130,
      y: 250,
      short: 'Bab 3 · Bhinneka Tunggal Ika',
      keywords: ['Keberagaman SARA', 'Toleransi Aktif', 'Anti-Stereotip'],
    },
    {
      id: 'bab4',
      x: 470,
      y: 250,
      short: 'Bab 4 · NKRI & Demokrasi',
      keywords: ['Otonomi Daerah', 'Musyawarah', 'Hak & Kewajiban'],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-2">
        <div className="flex items-center gap-2 text-blue-900">
          <Compass className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Visualisasi Keterkaitan Materi
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Peta Konsep Pembelajaran</h1>
        <p className="text-sm text-slate-600">
          Klik salah satu simpul bab pada diagram di bawah untuk menelusuri hubungan antara nilai dasar Pancasila, konstitusi, kebinekaan, dan keutuhan NKRI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-7 rounded-2xl bg-white border border-slate-200 p-4 sm:p-6">
          <svg viewBox="0 0 600 330" className="w-full h-auto">
            {/* Connector Lines from Center Hub */}
            <line x1="300" y1="165" x2="130" y2="80" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" />
            <line x1="300" y1="165" x2="470" y2="80" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" />
            <line x1="300" y1="165" x2="130" y2="250" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" />
            <line x1="300" y1="165" x2="470" y2="250" stroke="#CBD5E1" strokeWidth="2.5" strokeDasharray="5 4" />
            <line x1="130" y1="80" x2="470" y2="80" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="130" y1="250" x2="470" y2="250" stroke="#93C5FD" strokeWidth="1.5" />

            {/* Center Node */}
            <rect x="210" y="135" width="180" height="60" rx="14" fill="#0F2942" />
            <text x="300" y="160" textAnchor="middle" fill="#FACC15" fontSize="11" fontWeight="700">
              DEEP LEARNING
            </text>
            <text x="300" y="178" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="700">
              Pelajar Pancasila VIII
            </text>

            {/* 4 Chapter Nodes */}
            {conceptNodes.map((node) => {
              const isSelected = node.id === selectedChapter;
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedChapter(node.id)}
                  className="cursor-pointer"
                >
                  <rect
                    x={node.x - 108}
                    y={node.y - 44}
                    width="216"
                    height="88"
                    rx="14"
                    fill={isSelected ? '#1E40AF' : '#F8FAFC'}
                    stroke={isSelected ? '#1E3A8A' : '#CBD5E1'}
                    strokeWidth={isSelected ? '2.5' : '1.5'}
                  />
                  <text
                    x={node.x}
                    y={node.y - 14}
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#0F172A'}
                    fontSize="13"
                    fontWeight="700"
                  >
                    {node.short}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 8}
                    textAnchor="middle"
                    fill={isSelected ? '#DBEAFE' : '#475569'}
                    fontSize="10.5"
                  >
                    {node.keywords.slice(0, 2).join(' · ')}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 24}
                    textAnchor="middle"
                    fill={isSelected ? '#FDE68A' : '#64748B'}
                    fontSize="10"
                  >
                    {node.keywords[2]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className="lg:col-span-5 rounded-2xl bg-white border border-slate-200 p-5 sm:p-6 space-y-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-500">
              Simpul Terpilih · Bab {activeChapter.number}
            </p>
            <h2 className="text-xl font-bold text-slate-900">{activeChapter.title}</h2>
            <p className="text-sm text-slate-600">{activeChapter.subtitle}</p>
          </div>

          <div className="space-y-2 border-t border-slate-100 pt-3">
            <p className="text-xs font-semibold text-slate-700">Gagasan Inti:</p>
            <ul className="space-y-2">
              {activeChapter.rangkuman.map((item, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 leading-relaxed flex gap-2">
                  <span className="font-mono text-blue-800 font-bold">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => onNavigate('materi', activeChapter.id)}
            className="w-full py-3 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 transition-colors min-h-[44px]"
          >
            Pelajari Bab {activeChapter.number} Secara Mendalam
          </button>
        </div>
      </div>
    </div>
  );
};
