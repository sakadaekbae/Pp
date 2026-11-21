import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Video,
  WifiOff,
} from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';
import { useAppStore } from '../store/useAppStore';
import { ChapterId, NavSection } from '../types';

interface MateriViewProps {
  initialChapterId?: ChapterId;
  onNavigate: (section: NavSection, chapterId?: ChapterId) => void;
}

export const MateriView: React.FC<MateriViewProps> = ({
  initialChapterId = 'bab1',
  onNavigate,
}) => {
  const {
    state,
    activeStudent,
    toggleSectionComplete,
    toggleFavoriteChapter,
    completeActivity,
  } = useAppStore();

  const [selectedChapterId, setSelectedChapterId] = useState<ChapterId>(initialChapterId);
  const [mindfulNotes, setMindfulNotes] = useState<Record<string, string>>({});
  const [joyfulChoice, setJoyfulChoice] = useState<number | null>(null);

  const chapter = state.chapters.find((c) => c.id === selectedChapterId) || state.chapters[0];
  const completedSecIds = state.completedSections[activeStudent.id] || [];
  const isFavorite = (state.favoriteChapters[activeStudent.id] || []).includes(chapter.id);

  const handleSelectChapter = (id: ChapterId) => {
    setSelectedChapterId(id);
    setJoyfulChoice(null);
  };

  return (
    <div className="space-y-6">
      {/* Chapter Selector Tabs */}
      <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Pendekatan Deep Learning · Mindful · Meaningful · Joyful
            </p>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900">Materi Pembelajaran</h1>
          </div>
          <button
            onClick={() => toggleFavoriteChapter(chapter.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[40px] self-start sm:self-auto ${
              isFavorite
                ? 'bg-red-50 border-red-200 text-red-700'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? 'Materi Favorit' : 'Simpan ke Favorit'}</span>
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {state.chapters.map((ch) => {
            const active = ch.id === chapter.id;
            const done = ch.sections.filter((s) => completedSecIds.includes(s.id)).length;
            return (
              <button
                key={ch.id}
                onClick={() => handleSelectChapter(ch.id)}
                className={`text-left px-3.5 py-2.5 rounded-xl border transition-colors min-h-[56px] ${
                  active
                    ? 'bg-blue-900 border-blue-900 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] opacity-80">
                  <span>Bab {ch.number}</span>
                  <span className="font-mono tabular-nums">
                    {done}/{ch.sections.length}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold truncate mt-0.5">{ch.title}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chapter Header & Apersepsi */}
      <article className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-7 space-y-6">
        <div className="space-y-2 border-b border-slate-100 pb-5">
          <p className="text-xs font-medium text-blue-800">
            Bab {chapter.number} · Semester {chapter.semester === 'ganjil' ? 'Ganjil' : 'Genap'} ·{' '}
            {chapter.tpCodes.join(' · ')}
          </p>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 text-balance">
            {chapter.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600">{chapter.subtitle}</p>
        </div>

        {/* 1. Mindful Learning Zone */}
        <section className="rounded-xl bg-blue-50/60 border border-blue-200 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2 text-blue-900">
            <Sparkles className="w-4 h-4" />
            <h3 className="text-sm sm:text-base font-bold">
              Tahap 1 · Mindful Learning (Berkesadaran & Apersepsi)
            </h3>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{chapter.apersepsi}</p>

          <div className="pt-2 space-y-2">
            <p className="text-xs font-semibold text-blue-950">Pertanyaan Pemantik & Refleksi Awal:</p>
            <ul className="space-y-1.5">
              {chapter.pertanyaanPemantik.map((q, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-700 flex gap-2">
                  <span className="font-mono font-bold text-blue-800">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {chapter.mindfulPrompts.map((prompt, idx) => {
              const key = `${chapter.id}-m-${idx}`;
              return (
                <div key={key} className="bg-white rounded-lg border border-blue-100 p-3 space-y-2">
                  <p className="text-xs font-medium text-slate-700">{prompt}</p>
                  <input
                    type="text"
                    value={mindfulNotes[key] || ''}
                    onChange={(e) =>
                      setMindfulNotes((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    placeholder="Tulis pikiran awalmu..."
                    className="w-full px-2.5 py-1.5 text-xs rounded-md border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              );
            })}
          </div>
        </section>

        {/* 2. Meaningful Learning Sections */}
        <section className="space-y-6">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Tahap 2 · Meaningful Learning (Materi Inti & Contoh Nyata)
          </h3>

          {chapter.sections.map((sec) => {
            const isDone = completedSecIds.includes(sec.id);
            return (
              <div
                key={sec.id}
                className="rounded-xl border border-slate-200 p-4 sm:p-6 space-y-4 bg-slate-50/40"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="text-base sm:text-lg font-bold text-slate-900">{sec.title}</h4>
                  <button
                    onClick={() => toggleSectionComplete(sec.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors min-h-[40px] self-start ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Sudah Dipelajari' : 'Tandai Selesai'}</span>
                  </button>
                </div>

                <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed">
                  {sec.conceptExplanation}
                </p>

                <div className="rounded-lg bg-amber-50/70 border border-amber-200 p-3.5">
                  <p className="text-xs font-bold text-amber-900 mb-1">Mengapa Ini Penting?</p>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                    {sec.whyItMatters}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {sec.realLifeExamples.map((ex, i) => (
                    <div key={i} className="rounded-lg bg-white border border-slate-200 p-3.5 space-y-1">
                      <p className="text-xs font-bold text-blue-900">{ex.context}</p>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{ex.detail}</p>
                    </div>
                  ))}
                </div>

                {sec.comparison && (
                  <div className="rounded-xl bg-white border border-slate-200 overflow-hidden">
                    <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-800">
                      {sec.comparison.title}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                      <div className="p-4 space-y-2">
                        <p className="text-xs font-bold text-blue-900">{sec.comparison.leftLabel}</p>
                        <ul className="space-y-1.5">
                          {sec.comparison.leftPoints.map((pt, i) => (
                            <li key={i} className="text-xs sm:text-sm text-slate-700 flex gap-2">
                              <span className="text-blue-700 font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="p-4 space-y-2">
                        <p className="text-xs font-bold text-emerald-800">{sec.comparison.rightLabel}</p>
                        <ul className="space-y-1.5">
                          {sec.comparison.rightPoints.map((pt, i) => (
                            <li key={i} className="text-xs sm:text-sm text-slate-700 flex gap-2">
                              <span className="text-emerald-700 font-bold">•</span>
                              <span>{pt}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>

        {/* Infographic Data Visual */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500">Infografis Data Kontekstual</p>
            <h4 className="text-base font-bold text-slate-900">{chapter.infographic.title}</h4>
            <p className="text-xs text-slate-500">{chapter.infographic.subtitle}</p>
          </div>
          <div className="space-y-3">
            {chapter.infographic.metrics.map((m, idx) => {
              const barPct = m.unit === '%' ? m.value : Math.min(100, Math.max(18, Math.round((idx === 0 ? 100 : 100 - idx * 14))));
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                    <span className="font-semibold text-slate-800">{m.label}</span>
                    <span className="font-mono font-bold text-blue-900 tabular-nums shrink-0">
                      {m.value.toLocaleString('id-ID')} {m.unit}
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-700 rounded-full"
                      style={{ width: `${barPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500">{m.note}</p>
                </div>
              );
            })}
          </div>
          <p className="text-xs font-medium text-slate-700 bg-slate-50 rounded-lg p-3 border border-slate-100">
            Intisari Infografis: {chapter.infographic.takeaway}
          </p>
        </section>

        {/* Rangkuman */}
        <section className="rounded-xl border border-slate-200 bg-slate-50 p-5 space-y-2.5">
          <h4 className="text-sm sm:text-base font-bold text-slate-900">Rangkuman Bab {chapter.number}</h4>
          <ul className="space-y-1.5">
            {chapter.rangkuman.map((r, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700 flex gap-2">
                <span className="font-mono font-bold text-blue-800">{idx + 1}.</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 3. Joyful Learning Quick Check */}
        <section className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
          <h3 className="text-sm sm:text-base font-bold text-emerald-950">
            Tahap 3 · Joyful Learning (Cek Cepat Pemahaman)
          </h3>
          <p className="text-sm font-medium text-slate-800">{chapter.joyfulCheck.question}</p>
          <div className="space-y-2">
            {chapter.joyfulCheck.options.map((opt, idx) => {
              const selected = joyfulChoice === idx;
              const isCorrect = idx === chapter.joyfulCheck.correctIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setJoyfulChoice(idx);
                    if (isCorrect) {
                      completeActivity(`joyful-${chapter.id}`);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs sm:text-sm transition-colors min-h-[44px] ${
                    selected
                      ? isCorrect
                        ? 'bg-emerald-600 text-white border-emerald-700 font-semibold'
                        : 'bg-red-600 text-white border-red-700 font-semibold'
                      : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {joyfulChoice !== null && (
            <p className="text-xs sm:text-sm text-slate-800 bg-white rounded-lg p-3 border border-emerald-200">
              {chapter.joyfulCheck.explanation}
            </p>
          )}
        </section>

        {/* Next Step CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <button
            onClick={() => onNavigate('video', chapter.id)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-800 text-xs sm:text-sm font-semibold hover:bg-slate-200 min-h-[44px]"
          >
            <Video className="w-4 h-4" />
            <span>Tonton Video Slide Bab {chapter.number}</span>
          </button>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onNavigate('aktivitas')}
              className="px-4 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold hover:bg-amber-400 min-h-[44px]"
            >
              Mainkan Aktivitas
            </button>
            <button
              onClick={() => onNavigate('kuis')}
              className="px-4 py-2.5 rounded-xl bg-blue-800 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
            >
              Kerjakan Kuis LITNUM
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

interface VideoPembelajaranViewProps {
  initialChapterId?: ChapterId;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export const VideoPembelajaranView: React.FC<VideoPembelajaranViewProps> = ({
  initialChapterId = 'bab1',
}) => {
  const { state } = useAppStore();
  const isOnline = useOnlineStatus();
  const [selectedChapterId, setSelectedChapterId] = useState<ChapterId>(initialChapterId);
  const [slideIdx, setSlideIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const chapter = state.chapters.find((c) => c.id === selectedChapterId) || state.chapters[0];
  const slides = chapter.videoSlides;
  const activeSlide = slides[slideIdx] || slides[0];
  const ytId = extractYouTubeId(chapter.youtubeUrl);

  React.useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setSlideIdx((prev) => {
        if (prev + 1 >= slides.length) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlaying, slides.length]);

  const handleSelectChapter = (id: ChapterId) => {
    setSelectedChapterId(id);
    setSlideIdx(0);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="flex items-center gap-2 text-blue-900">
          <Video className="w-5 h-5" />
          <p className="text-xs font-semibold uppercase tracking-wide">
            Media Audio-Visual & Presentasi Interaktif
          </p>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Video Pembelajaran</h1>
        <p className="text-sm text-slate-600">
          Putar presentasi visual interaktif bawaan untuk setiap bab (berjalan penuh tanpa kuota) atau tonton tautan YouTube yang diatur oleh Ibu {state.identity.teacherName}.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {state.chapters.map((ch) => (
            <button
              key={ch.id}
              onClick={() => handleSelectChapter(ch.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors min-h-[40px] ${
                ch.id === chapter.id
                  ? 'bg-blue-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Bab {ch.number}: {ch.title}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Presentation Player */}
      <div className="rounded-2xl bg-[#0F2942] text-white p-5 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between text-xs text-blue-200">
          <span>
            Bab {chapter.number} · {activeSlide.visualTag}
          </span>
          <span className="font-mono tabular-nums">
            Slide {slideIdx + 1} / {slides.length}
          </span>
        </div>

        <div className="min-h-[220px] flex flex-col justify-center space-y-4 py-2">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-300">{activeSlide.title}</h2>
          <p className="text-sm sm:text-base text-blue-50 leading-relaxed max-w-3xl">
            {activeSlide.narration}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            {activeSlide.keyPoints.map((kp, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/10 border border-white/15 p-3 text-xs sm:text-sm text-white"
              >
                <span className="font-mono text-amber-300 font-bold mr-1.5">0{i + 1}.</span>
                {kp}
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar & Controls */}
        <div className="space-y-3 pt-3 border-t border-white/15">
          <div className="grid grid-cols-4 gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlideIdx(i)}
                className={`h-2 rounded-full transition-colors ${
                  i <= slideIdx ? 'bg-amber-400' : 'bg-white/20'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs hover:bg-amber-300 min-h-[40px]"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{isPlaying ? 'Jeda Otomatis' : 'Putar Otomatis'}</span>
              </button>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setSlideIdx(0);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-medium hover:bg-white/20 min-h-[40px]"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSlideIdx((p) => Math.max(0, p - 1))}
                disabled={slideIdx === 0}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-medium disabled:opacity-40 min-h-[40px]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
              <button
                onClick={() => setSlideIdx((p) => Math.min(slides.length - 1, p + 1))}
                disabled={slideIdx === slides.length - 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-white/10 text-white text-xs font-medium disabled:opacity-40 min-h-[40px]"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional YouTube Embed Configured by Teacher */}
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-base font-bold text-slate-900">
            Tautan Video YouTube Tambahan (Diatur Guru)
          </h3>
          <BookOpen className="w-4 h-4 text-slate-400" />
        </div>
        {ytId ? (
          isOnline ? (
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-900">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${ytId}`}
                title={`Video Pembelajaran Bab ${chapter.number}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex items-start gap-3 text-xs sm:text-sm text-amber-950">
              <WifiOff className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Video YouTube Memerlukan Koneksi Internet</p>
                <p className="mt-1 text-amber-900">
                  Anda sedang berada dalam mode offline. Silakan gunakan pemutar <strong>Presentasi Visual Interaktif</strong> di atas yang tetap berjalan penuh tanpa koneksi internet.
                </p>
              </div>
            </div>
          )
        ) : (
          <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 rounded-xl p-4 border border-slate-200">
            Belum ada tautan YouTube khusus yang disematkan guru untuk Bab {chapter.number}. Guru dapat menambahkan URL video YouTube kapan saja melalui menu <strong>Dashboard Guru</strong>.
          </p>
        )}
      </div>
    </div>
  );
};
