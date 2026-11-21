import React, { useState } from 'react';
import {
  Award,
  BookOpen,
  Compass,
  FileSpreadsheet,
  FileText,
  FolderKanban,
  Gamepad2,
  HelpCircle,
  Home,
  Lock,
  Menu,
  SlidersHorizontal,
  Sparkles,
  Target,
  UserCheck,
  Video,
  X,
} from 'lucide-react';
import { Smpn16Logo } from './components/icons/Smpn16Logo';
import { OfflineIndicator, PWAInstallButton } from './components/PWAStatusAndInstall';
import { AppProvider, useAppStore } from './store/useAppStore';
import { ChapterId, NavSection } from './types';
import { AktivitasView } from './views/AktivitasView';
import { PetaKonsepView, TujuanPembelajaranView } from './views/CurriculumViews';
import { DashboardView } from './views/DashboardView';
import { KktpView } from './views/KktpView';
import { KuisView } from './views/KuisView';
import { MateriView, VideoPembelajaranView } from './views/MateriView';
import {
  GlosariumView,
  ProfilPengembangView,
  RefleksiView,
} from './views/RefleksiGlosariumProfilView';
import { RpmView } from './views/RpmView';
import { SplashScreen } from './views/SplashScreen';
import { ProyekView, StudiKasusView } from './views/StudiKasusProyekView';
import { TeacherDashboardView } from './views/TeacherDashboardView';

const STUDENT_NAV: { id: NavSection; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'beranda', label: 'Beranda', icon: Home },
  { id: 'tujuan', label: 'Tujuan Pembelajaran', icon: Target },
  { id: 'peta_konsep', label: 'Peta Konsep', icon: Compass },
  { id: 'materi', label: 'Materi', icon: BookOpen },
  { id: 'video', label: 'Video Pembelajaran', icon: Video },
  { id: 'aktivitas', label: 'Aktivitas Interaktif', icon: Gamepad2 },
  { id: 'studi_kasus', label: 'Studi Kasus', icon: FileText },
  { id: 'proyek', label: 'Proyek Pancasila', icon: FolderKanban },
  { id: 'kuis', label: 'Kuis & Evaluasi', icon: Award },
  { id: 'refleksi', label: 'Refleksi', icon: Sparkles },
  { id: 'glosarium', label: 'Glosarium', icon: HelpCircle },
  { id: 'profil', label: 'Profil Pengembang', icon: UserCheck },
];

const TEACHER_NAV: { id: NavSection; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'rpm', label: 'RPM 2 Semester', icon: FileSpreadsheet },
  { id: 'kktp', label: 'KKTP Editable', icon: SlidersHorizontal },
  { id: 'guru', label: 'Dashboard Guru', icon: Lock },
];

const AppShell: React.FC = () => {
  const { state, activeStudent, isTeacherUnlocked } = useAppStore();
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState<NavSection>('beranda');
  const [selectedChapterId, setSelectedChapterId] = useState<ChapterId>('bab1');
  const [dashboardMenusOpen, setDashboardMenusOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const isNavVisible = activeSection !== 'beranda' || dashboardMenusOpen;

  const navigate = (section: NavSection, chapterId?: ChapterId) => {
    if (chapterId) setSelectedChapterId(chapterId);
    setActiveSection(section);
    if (section === 'beranda') {
      setDashboardMenusOpen(false);
    }
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleHeaderMenuClick = () => {
    setDashboardMenusOpen(true);
    setMobileDrawerOpen(true);
  };

  const handleHeaderBerandaClick = () => {
    setActiveSection('beranda');
    setDashboardMenusOpen(false);
    setMobileDrawerOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (showSplash) {
    return (
      <>
        <SplashScreen identity={state.identity} onFinish={() => setShowSplash(false)} />
        <OfflineIndicator />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* Desktop Persistent Sidebar (Shown when Menu/Mulai Belajar/Beranda clicked or on sub-pages) */}
      {isNavVisible && (
        <aside className="hidden lg:flex lg:flex-col lg:w-72 lg:fixed lg:inset-y-0 bg-[#0F2942] text-white border-r border-slate-800 no-print">
        <div className="p-5 border-b border-white/10 flex items-center gap-3">
          <Smpn16Logo size={44} className="shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-amber-300 truncate">
              {state.identity.schoolName}
            </p>
            <p className="text-sm font-extrabold text-white truncate">
              Pancasila Smart Learning
            </p>
            <p className="text-[11px] text-blue-200 truncate">
              Guru: {state.identity.teacherName}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          <div>
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-blue-300 mb-2">
              Menu Murid
            </p>
            <nav className="space-y-1">
              {STUDENT_NAV.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                      active
                        ? 'bg-white text-[#0F2942] font-bold shadow-sm'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-2 border-t border-white/10">
            <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-amber-300 mb-2">
              Perangkat Ajar & Guru
            </p>
            <nav className="space-y-1">
              {TEACHER_NAV.map((item) => {
                const Icon = item.icon;
                const active = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-colors text-left ${
                      active
                        ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                        : 'text-blue-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-white/10 text-[11px] text-blue-200 space-y-0.5">
          <p className="font-semibold text-white truncate">
            Siswa: {activeStudent.name} ({activeStudent.kelas})
          </p>
          <p className="truncate">Guru: {state.identity.teacherName}</p>
        </div>
      </aside>
      )}

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen pb-6 ${
          isNavVisible ? 'lg:pl-72' : ''
        }`}
      >
        {/* Compact Top Bar with Menu, Beranda, & Separated Top-Right Developer Credit */}
        <header className="sticky top-0 z-30 h-14 bg-white/95 backdrop-blur-md border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 no-print">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <button
              onClick={handleHeaderMenuClick}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-100 text-xs font-semibold min-h-[38px] shrink-0"
              aria-label="Buka semua menu"
            >
              <Menu className="w-4 h-4" />
              <span>Menu</span>
            </button>

            <button
              onClick={handleHeaderBerandaClick}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg transition-colors min-w-0 min-h-[38px] text-left ${
                activeSection === 'beranda'
                  ? 'bg-blue-50 text-blue-900'
                  : 'hover:bg-slate-100 text-slate-800'
              }`}
              title="Kembali ke Beranda"
            >
              <Home className="w-4 h-4 text-blue-900 shrink-0" />
              <span className="text-xs sm:text-sm font-bold truncate">Beranda</span>
            </button>
          </div>

          <div className="hidden xl:flex items-center gap-3 text-xs text-slate-600 shrink-0">
            <span className="whitespace-nowrap">
              {state.identity.schoolName} · {state.identity.teacherName}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-slate-900 whitespace-nowrap">
              {activeStudent.name} ({activeStudent.kelas})
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <PWAInstallButton compact />
            {isNavVisible && (
              <button
                onClick={() => navigate('guru')}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap min-h-[36px] ${
                  isTeacherUnlocked
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                    : 'bg-slate-900 text-white hover:bg-slate-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>{isTeacherUnlocked ? 'Mode Guru Aktif' : 'Dashboard Guru'}</span>
              </button>
            )}

            {/* Separated Developer Identity in Top-Right Corner */}
            <div className="border-l border-slate-200 pl-2.5 sm:pl-3 text-right shrink-0">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold leading-none">
                Pengembang
              </p>
              <p className="text-xs sm:text-sm font-extrabold text-blue-900 leading-tight mt-0.5">
                {state.identity.developerName}
              </p>
            </div>
          </div>
        </header>

        {/* Active View Content */}
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-5 sm:py-7">
          {activeSection === 'beranda' && (
            <DashboardView
              onNavigate={navigate}
              showMenus={dashboardMenusOpen}
              onShowMenus={() => setDashboardMenusOpen(true)}
              onHideMenus={() => setDashboardMenusOpen(false)}
            />
          )}
          {activeSection === 'tujuan' && <TujuanPembelajaranView onNavigate={navigate} />}
          {activeSection === 'peta_konsep' && <PetaKonsepView onNavigate={navigate} />}
          {activeSection === 'materi' && (
            <MateriView initialChapterId={selectedChapterId} onNavigate={navigate} />
          )}
          {activeSection === 'video' && (
            <VideoPembelajaranView initialChapterId={selectedChapterId} />
          )}
          {activeSection === 'aktivitas' && <AktivitasView />}
          {activeSection === 'studi_kasus' && <StudiKasusView />}
          {activeSection === 'proyek' && <ProyekView />}
          {activeSection === 'kuis' && <KuisView onNavigate={navigate} />}
          {activeSection === 'refleksi' && <RefleksiView />}
          {activeSection === 'glosarium' && <GlosariumView />}
          {activeSection === 'profil' && <ProfilPengembangView />}
          {activeSection === 'rpm' && <RpmView />}
          {activeSection === 'kktp' && <KktpView />}
          {activeSection === 'guru' && <TeacherDashboardView onNavigate={navigate} />}
        </main>

        {/* Clean Footer */}
        <footer className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-4 border-t border-slate-200 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2 no-print">
          <span>
            {state.identity.appName} · {state.identity.schoolName} ({state.identity.gradePhase})
          </span>
          <span>
            Guru Pengampu: <strong className="text-slate-700">{state.identity.teacherName}</strong>
          </span>
        </footer>
      </div>

      {/* Full Menu Bottom Sheet / Drawer (Triggered from top-left Menu button) */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center no-print">
          <div className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl max-h-[85vh] flex flex-col overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Smpn16Logo size={36} />
                <div>
                  <p className="text-sm font-bold text-slate-900">Semua Menu Aplikasi</p>
                  <p className="text-[11px] text-slate-500">
                    {state.identity.schoolName} · {state.identity.teacherName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 min-h-[40px] min-w-[40px] flex items-center justify-center"
                aria-label="Tutup menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto space-y-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Pembelajaran Murid (12 Menu)
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {STUDENT_NAV.map((item) => {
                    const Icon = item.icon;
                    const active = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-semibold min-h-[46px] ${
                          active
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700 mb-2">
                  Perangkat Ajar & Dashboard Guru
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {TEACHER_NAV.map((item) => {
                    const Icon = item.icon;
                    const active = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => navigate(item.id)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left text-xs font-bold min-h-[46px] ${
                          active
                            ? 'bg-amber-400 text-slate-950 border-amber-500'
                            : 'bg-amber-50 text-amber-950 border-amber-200'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center pt-1">
                <PWAInstallButton />
              </div>
            </div>
          </div>
        </div>
      )}

      <OfflineIndicator />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  );
}
