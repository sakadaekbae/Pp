import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Compass,
  Edit3,
  FileText,
  FolderKanban,
  Gamepad2,
  Heart,
  HelpCircle,
  LayoutGrid,
  Play,
  Sparkles,
  Target,
  UserCheck,
  UserPlus,
  Video,
} from 'lucide-react';
import { GarudaPancasila } from '../components/icons/GarudaPancasila';
import { Smpn16Logo } from '../components/icons/Smpn16Logo';
import { KELAS_GROUPS } from '../data/chaptersData';
import { useAppStore } from '../store/useAppStore';
import { ChapterId, NavSection } from '../types';

interface DashboardViewProps {
  onNavigate: (section: NavSection, chapterId?: ChapterId) => void;
  showMenus: boolean;
  onShowMenus: () => void;
  onHideMenus: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  showMenus,
  onShowMenus,
  onHideMenus,
}) => {
  const {
    state,
    activeStudent,
    setActiveStudent,
    upsertStudent,
    toggleFavoriteChapter,
  } = useAppStore();

  const [showProfileForm, setShowProfileForm] = useState(false);
  const [nameInput, setNameInput] = useState(activeStudent.name);
  const [kelasInput, setKelasInput] = useState(activeStudent.kelas);
  const [selectedSila, setSelectedSila] = useState<number | null>(null);

  const silaNames: Record<number, { title: string; meaning: string }> = {
    1: {
      title: 'Sila 1 · Bintang Emas',
      meaning: 'Ketuhanan Yang Maha Esa — Iman, takwa, dan saling menghormati kebebasan beragama.',
    },
    2: {
      title: 'Sila 2 · Rantai Emas',
      meaning: 'Kemanusiaan yang Adil dan Beradab — Empati, anti-perundungan, dan kesetaraan martabat manusia.',
    },
    3: {
      title: 'Sila 3 · Pohon Beringin',
      meaning: 'Persatuan Indonesia — Kebersamaan dalam Bhinneka Tunggal Ika dan cinta tanah air.',
    },
    4: {
      title: 'Sila 4 · Kepala Banteng',
      meaning: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan — Musyawarah mufakat dan demokrasi.',
    },
    5: {
      title: 'Sila 5 · Padi dan Kapas',
      meaning: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia — Gotong royong dan keadilan hak serta kewajiban.',
    },
  };

  const completedSecIds = state.completedSections[activeStudent.id] || [];
  const totalSections = state.chapters.reduce((acc, ch) => acc + ch.sections.length, 0);
  const completedActivities = state.completedActivities[activeStudent.id] || [];
  const badges = state.earnedBadges[activeStudent.id] || [];
  const favoriteIds = state.favoriteChapters[activeStudent.id] || [];

  const studentAttempts = state.quizAttempts.filter((a) => a.studentId === activeStudent.id);
  const avgQuizScore =
    studentAttempts.length > 0
      ? Math.round(studentAttempts.reduce((s, a) => s + a.totalScore, 0) / studentAttempts.length)
      : 0;

  const weakTopics = Array.from(
    new Set(studentAttempts.flatMap((a) => a.weakTopics))
  ).slice(0, 3);

  const handleSaveNewOrEditStudent = (e: React.FormEvent, asNew: boolean) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    upsertStudent({
      id: asNew ? undefined : activeStudent.id,
      name: nameInput.trim(),
      kelas: kelasInput,
    });
    setShowProfileForm(false);
  };

  const quickMenuItems: {
    id: NavSection;
    label: string;
    desc: string;
    icon: React.FC<{ className?: string }>;
  }[] = [
    { id: 'tujuan', label: 'Tujuan Pembelajaran', desc: 'Target CP & TP per bab', icon: Target },
    { id: 'peta_konsep', label: 'Peta Konsep', desc: 'Alur keterkaitan 4 bab', icon: Compass },
    { id: 'materi', label: 'Materi Deep Learning', desc: '4 bab kontekstual lengkap', icon: BookOpen },
    { id: 'video', label: 'Video Pembelajaran', desc: 'Slide interaktif & YouTube', icon: Video },
    { id: 'aktivitas', label: 'Aktivitas Interaktif', desc: '8 gim, simulasi & puzzle', icon: Gamepad2 },
    { id: 'studi_kasus', label: 'Studi Kasus', desc: '5 kasus nyata bermuatan nilai', icon: FileText },
    { id: 'proyek', label: 'Proyek Pancasila', desc: '6 proyek PjBL kolaboratif', icon: FolderKanban },
    { id: 'kuis', label: 'Kuis & Evaluasi LITNUM', desc: '120+ soal literasi-numerasi', icon: Award },
    { id: 'refleksi', label: 'Refleksi & Asesmen', desc: 'Diagnostik & jurnal karakter', icon: Sparkles },
    { id: 'glosarium', label: 'Glosarium', desc: 'Kamus istilah & contoh', icon: HelpCircle },
    { id: 'profil', label: 'Profil Pengembang', desc: 'Identitas sekolah & pengembang', icon: UserCheck },
    { id: 'rpm', label: 'RPM 2 Semester', desc: 'Perangkat ajar editable', icon: FileText },
    { id: 'kktp', label: 'KKTP Editable', desc: 'Rubrik ketercapaian TP', icon: Target },
    { id: 'guru', label: 'Dashboard Guru', desc: 'Bank soal, nilai & cadangan', icon: LayoutGrid },
  ];

  const handleMulaiBelajar = () => {
    onShowMenus();
    setTimeout(() => {
      document.getElementById('dashboard-menus')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  };

  return (
    <div className="space-y-6">
      {/* Hero Identity & Welcome Banner */}
      <section className="rounded-2xl bg-gradient-to-br from-[#0F2942] via-[#153A5B] to-[#1E3A8A] text-white p-5 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3.5">
              <Smpn16Logo size={60} className="shrink-0" />
              <div className="min-w-0">
                <p className="text-xs font-medium text-amber-300 tracking-wide uppercase">
                  {state.identity.schoolName} · {state.identity.academicYear}
                </p>
                <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight text-balance">
                  {state.identity.appName}
                </h1>
                <p className="text-xs sm:text-sm text-blue-100">
                  {state.identity.subject} · {state.identity.gradePhase} · {state.identity.curriculum}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-2xl">
                Selamat datang, <strong className="text-white">{activeStudent.name}</strong> ({activeStudent.kelas}).
                Mari belajar dengan pendekatan <span className="text-amber-200 font-medium">{state.identity.approach}</span>{' '}
                yang berkesadaran, bermakna, dan menggembirakan bersama Ibu{' '}
                <strong className="text-white">{state.identity.teacherName}</strong>.
              </p>
              <p className="text-xs text-blue-200">
                Guru Pengampu: <strong className="text-white">{state.identity.teacherName}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleMulaiBelajar}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors min-h-[44px] shadow-sm"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>MULAI BELAJAR</span>
              </button>
              <button
                onClick={() => {
                  setNameInput(activeStudent.name);
                  setKelasInput(activeStudent.kelas);
                  setShowProfileForm((v) => !v);
                }}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm transition-colors min-h-[44px]"
              >
                <Edit3 className="w-4 h-4" />
                <span>Ganti / Isi Nama Siswa</span>
              </button>
            </div>
          </div>

          {/* Interactive Garuda Pancasila Showcase */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center bg-white/10 rounded-2xl p-4 border border-white/15">
            <GarudaPancasila
              size={168}
              highlightedSila={selectedSila}
              onSelectSila={(sila) => setSelectedSila((prev) => (prev === sila ? null : sila))}
            />
            <p className="text-[11px] text-amber-200 font-medium mt-1 text-center">
              {selectedSila ? silaNames[selectedSila].title : 'Klik simbol perisai Garuda untuk melihat makna sila'}
            </p>
            {selectedSila && (
              <p className="text-xs text-blue-50 text-center mt-1 leading-snug">
                {silaNames[selectedSila].meaning}
              </p>
            )}
          </div>
        </div>

        {/* Inline Student Switcher / Editor */}
        {showProfileForm && (
          <div className="mt-5 pt-5 border-t border-white/15 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-amber-200 mb-2">Pilih Profil Murid Tersimpan</p>
              <div className="flex flex-wrap gap-2">
                {state.students.map((stu) => (
                  <button
                    key={stu.id}
                    onClick={() => {
                      setActiveStudent(stu.id);
                      setNameInput(stu.name);
                      setKelasInput(stu.kelas);
                      setShowProfileForm(false);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors min-h-[40px] ${
                      stu.id === activeStudent.id
                        ? 'bg-amber-400 text-slate-950 font-bold'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {stu.name} ({stu.kelas})
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => handleSaveNewOrEditStudent(e, false)}
              className="space-y-2.5 bg-white/10 p-3.5 rounded-xl"
            >
              <p className="text-xs font-semibold text-amber-200">Perbarui atau Tambah Nama Murid</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Nama lengkap siswa"
                  className="sm:col-span-2 px-3 py-2 rounded-lg bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  required
                />
                <select
                  value={kelasInput}
                  onChange={(e) => setKelasInput(e.target.value)}
                  className="px-3 py-2 rounded-lg bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
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
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold hover:bg-amber-300 min-h-[40px]"
                >
                  Simpan ke Profil Aktif
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSaveNewOrEditStudent(e, true)}
                  className="inline-flex items-center gap-1 px-3.5 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 min-h-[40px]"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Tambah Sebagai Siswa Baru</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </section>

      {/* 4 Key Statistics Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Materi Dipelajari</p>
          <p className="text-2xl font-bold font-mono text-slate-900 mt-1 tabular-nums">
            {completedSecIds.length}/{totalSections}
          </p>
          <p className="text-xs text-slate-500 mt-1">Sub-bab selesai dibaca</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Rata-rata Nilai Kuis</p>
          <p className="text-2xl font-bold font-mono text-blue-900 mt-1 tabular-nums">
            {studentAttempts.length > 0 ? avgQuizScore : '—'}
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {studentAttempts.length} kali evaluasi LITNUM
          </p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Aktivitas Selesai</p>
          <p className="text-2xl font-bold font-mono text-emerald-700 mt-1 tabular-nums">
            {completedActivities.length}/8
          </p>
          <p className="text-xs text-slate-500 mt-1">Simulasi, puzzle & gim</p>
        </div>
        <div className="rounded-xl bg-white border border-slate-200 p-4">
          <p className="text-xs text-slate-500">Lencana Prestasi</p>
          <p className="text-2xl font-bold font-mono text-amber-600 mt-1 tabular-nums">
            {badges.length}
          </p>
          <p className="text-xs text-slate-500 mt-1">Penghargaan terkumpul</p>
        </div>
      </section>

      {/* Expandable Menus Below Dashboard (Hidden until Menu / Mulai Belajar / Beranda is clicked) */}
      {showMenus && (
        <div id="dashboard-menus" className="space-y-6 pt-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Menu Pembelajaran & Peta Bab
              </h2>
              <p className="text-xs text-slate-500">
                Pilih bab materi atau jelajahi aktivitas, kuis LITNUM, dan perangkat ajar
              </p>
            </div>
            <button
              onClick={onHideMenus}
              className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-100 min-h-[36px] shrink-0"
            >
              Sembunyikan Menu
            </button>
          </div>

          {/* Progress per Bab (4 Chapters) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                  Peta Kemajuan Belajar per Bab
                </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              4 Bab Pendidikan Pancasila Kelas VIII · Dapat disesuaikan guru dengan ATP sekolah
            </p>
          </div>
          <button
            onClick={() => onNavigate('materi')}
            className="text-xs sm:text-sm font-semibold text-blue-800 hover:underline whitespace-nowrap shrink-0"
          >
            Lihat Semua Materi
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {state.chapters.map((ch) => {
            const doneCount = ch.sections.filter((s) => completedSecIds.includes(s.id)).length;
            const pct = Math.round((doneCount / ch.sections.length) * 100);
            const isFav = favoriteIds.includes(ch.id);
            return (
              <div
                key={ch.id}
                className="rounded-xl bg-white border border-slate-200 p-5 flex flex-col justify-between gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-500">
                      Bab {ch.number} · Semester {ch.semester === 'ganjil' ? 'Ganjil' : 'Genap'} ·{' '}
                      {ch.tpCodes.join(', ')}
                    </span>
                    <button
                      onClick={() => toggleFavoriteChapter(ch.id)}
                      className={`p-2 rounded-lg transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center ${
                        isFav ? 'text-red-600 bg-red-50' : 'text-slate-400 hover:text-slate-600'
                      }`}
                      aria-label={`Tandai favorit Bab ${ch.number}`}
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 text-balance">
                    {ch.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-2">{ch.subtitle}</p>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Progres Membaca</span>
                      <span className="font-mono font-semibold text-slate-900 tabular-nums">
                        {pct}% ({doneCount}/{ch.sections.length})
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-700 rounded-full transition-all duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => onNavigate('materi', ch.id)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors min-h-[40px]"
                    >
                      <span>Buka Bab {ch.number}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onNavigate('kuis')}
                      className="text-xs font-semibold text-blue-800 hover:underline px-2 py-2 min-h-[40px]"
                    >
                      Kuis LITNUM →
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommendations, Badges & Quick Access Menu */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Menu Pintas Belajar */}
        <section className="lg:col-span-2 space-y-3">
          <h2 className="text-lg font-bold text-slate-900">Jelajahi Fitur Pembelajaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickMenuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="text-left rounded-xl bg-white border border-slate-200 p-4 hover:border-blue-400 hover:bg-blue-50/30 transition-colors flex items-center gap-3.5 min-h-[68px]"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-slate-900 truncate">{item.label}</p>
                    <p className="text-xs text-slate-500 truncate">{item.desc}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                </button>
              );
            })}
          </div>
        </section>

        {/* Badges & Recommendations */}
        <section className="space-y-4">
          <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-3">
            <h3 className="text-base font-bold text-slate-900">Rekomendasi Belajar</h3>
            {weakTopics.length > 0 ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-600">
                  Berdasarkan evaluasi terakhirmu, mari perkuat kembali topik berikut:
                </p>
                <ul className="space-y-1.5">
                  {weakTopics.map((topic, i) => (
                    <li
                      key={i}
                      className="text-xs font-medium text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
                    >
                      {topic}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onNavigate('materi')}
                  className="w-full py-2.5 rounded-lg bg-blue-800 text-white text-xs font-semibold hover:bg-blue-900 min-h-[40px]"
                >
                  Pelajari Ulang Materi
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Belum ada catatan remedial. Mulai dengan Asesmen Diagnostik di menu Refleksi atau langsung pelajari Bab 1.
                </p>
                <button
                  onClick={() => onNavigate('refleksi')}
                  className="w-full py-2.5 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 min-h-[40px]"
                >
                  Buka Asesmen Diagnostik
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl bg-white border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900">Lencana & Favorit</h3>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                {badges.length} lencana
              </span>
            </div>

            {badges.length > 0 ? (
              <div className="space-y-2">
                {badges.map((b, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-800 bg-amber-50/70 border border-amber-200 rounded-lg px-3 py-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500">
                Selesaikan aktivitas interaktif atau raih nilai tuntas pada Kuis LITNUM untuk membuka lencana!
              </p>
            )}

            {favoriteIds.length > 0 && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <p className="text-xs font-semibold text-slate-600">Materi Favoritmu:</p>
                {favoriteIds.map((fid) => {
                  const found = state.chapters.find((c) => c.id === fid);
                  if (!found) return null;
                  return (
                    <button
                      key={fid}
                      onClick={() => onNavigate('materi', fid)}
                      className="block w-full text-left text-xs text-blue-800 hover:underline py-1"
                    >
                      ♥ Bab {found.number}: {found.title}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </div>
        </div>
      )}
    </div>
  );
};
