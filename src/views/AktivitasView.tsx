import React, { useState } from 'react';
import {
  CheckCircle2,
  Gamepad2,
  MessageSquare,
  Puzzle,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { GarudaPancasila } from '../components/icons/GarudaPancasila';
import { useAppStore } from '../store/useAppStore';

type ActivityTab =
  | 'misi'
  | 'tebak_sila'
  | 'puzzle'
  | 'benar_salah'
  | 'pilih_sikap'
  | 'musyawarah'
  | 'studi_mini'
  | 'jurnal_karakter';

export const AktivitasView: React.FC = () => {
  const { state, activeStudent, completeActivity, addCharacterJournal } = useAppStore();
  const [activeTab, setActiveTab] = useState<ActivityTab>('misi');

  const completed = state.completedActivities[activeStudent.id] || [];

  // 1. Misi Pancasila State
  const [misiStep, setMisiStep] = useState(0);
  const [misiFeedback, setMisiFeedback] = useState<string | null>(null);
  const misiList = [
    {
      title: 'Misi 1: Menghentikan Candaan Fisik',
      situation:
        'Di koridor sekolah, dua siswa menertawakan tinggi badan adik kelas hingga adik kelas itu menunduk sedih.',
      choices: [
        {
          text: 'Menegur dengan santun dan mengajak adik kelas itu pergi bersama ke kelasnya.',
          ok: true,
          fb: 'Misi berhasil! Kamu mengamalkan Sila ke-2 (melindungi martabat sesama manusia).',
        },
        {
          text: 'Ikut tertawa pelan agar dianggap gaul.',
          ok: false,
          fb: 'Kurang tepat. Diam atau ikut tertawa memperburuk rasa sakit hati korban.',
        },
      ],
    },
    {
      title: 'Misi 2: Menjaga Amanah Piket Kelas',
      situation:
        'Giliran piketmu hari Rabu, tetapi teman satu regumu mengajak langsung pulang bermain futsal.',
      choices: [
        {
          text: 'Menyelesaikan piket kelas dulu selama 10 menit baru pergi bermain.',
          ok: true,
          fb: 'Hebat! Kamu menunaikan kewajiban sebelum bersenang-senang (Keadilan & Tanggung Jawab).',
        },
        {
          text: 'Langsung pulang dan berharap regu hari Kamis yang membersihkan.',
          ok: false,
          fb: 'Belum tepat. Mengabaikan jadwal piket membebani hak teman lain.',
        },
      ],
    },
    {
      title: 'Misi 3: Saring Berita Grup Kelas',
      situation:
        'Muncul pesan berantai bahwa besok sekolah libur mendadak tanpa surat resmi dari sekolah.',
      choices: [
        {
          text: 'Menahan diri tidak meneruskan pesan dan mengonfirmasi ke wali kelas terlebih dahulu.',
          ok: true,
          fb: 'Sempurna! Semua 3 Misi Pancasila tuntas kamu selesaikan.',
        },
        {
          text: 'Langsung meneruskan ke seluruh grup teman sekelas.',
          ok: false,
          fb: 'Hati-hati, meneruskan kabar belum terverifikasi bisa menyebarkan hoaks!',
        },
      ],
    },
  ];

  // 2. Tebak Sila State
  const [silaTarget, setSilaTarget] = useState(0);
  const [silaFeedback, setSilaFeedback] = useState<string | null>(null);
  const tebakSilaItems = [
    {
      clue: 'Menghormati teman yang sedang berdoa sebelum ujian tanpa berisik.',
      answerSila: 1,
      explain: 'Bintang Emas (Sila ke-1): Ketuhanan Yang Maha Esa.',
    },
    {
      clue: 'Menjenguk teman yang sakit dan menolak segala bentuk perundungan.',
      answerSila: 2,
      explain: 'Rantai Emas (Sila ke-2): Kemanusiaan yang Adil dan Beradab.',
    },
    {
      clue: 'Kompak membersihkan lapangan sekolah lintas kelompok pertemanan.',
      answerSila: 3,
      explain: 'Pohon Beringin (Sila ke-3): Persatuan Indonesia.',
    },
    {
      clue: 'Menentukan tema pentas seni kelas lewat diskusi terbuka tanpa memaksakan kehendak.',
      answerSila: 4,
      explain: 'Kepala Banteng (Sila ke-4): Kerakyatan melalui Permusyawaratan.',
    },
    {
      clue: 'Membagi tugas kelompok dan dana iuran sosial secara merata dan adil.',
      answerSila: 5,
      explain: 'Padi dan Kapas (Sila ke-5): Keadilan Sosial bagi Seluruh Rakyat Indonesia.',
    },
  ];

  // 3. Puzzle Pancasila State (Ordering Hierarchy of Indonesian Law)
  const correctOrder = [
    'UUD NRI Tahun 1945',
    'Ketetapan MPR',
    'Undang-Undang / Perppu',
    'Peraturan Pemerintah (PP)',
    'Peraturan Presiden (Perpres)',
    'Peraturan Daerah (Perda)',
  ];
  const [puzzlePool, setPuzzlePool] = useState<string[]>([
    'Peraturan Daerah (Perda)',
    'Undang-Undang / Perppu',
    'UUD NRI Tahun 1945',
    'Peraturan Presiden (Perpres)',
    'Ketetapan MPR',
    'Peraturan Pemerintah (PP)',
  ]);
  const [puzzlePlaced, setPuzzlePlaced] = useState<string[]>([]);
  const [puzzleChecked, setPuzzleChecked] = useState<boolean | null>(null);

  // 4. Benar atau Salah State
  const [bsIdx, setBsIdx] = useState(0);
  const [bsScore, setBsScore] = useState(0);
  const [bsFeedback, setBsFeedback] = useState<string | null>(null);
  const bsQuestions = [
    {
      stmt: 'Peraturan Daerah Kota Serang boleh bertentangan dengan Undang-Undang asalkan disetujui seluruh warga kota.',
      ans: false,
      explain: 'Salah. Asas hierarki hukum melarang peraturan daerah bertentangan dengan aturan di atasnya.',
    },
    {
      stmt: 'Toleransi aktif berarti kita tidak hanya diam, tetapi juga mau bekerja sama dan membela teman yang didiskriminasi.',
      ans: true,
      explain: 'Benar! Toleransi aktif menghadirkan empati dan kerja sama nyata.',
    },
    {
      stmt: 'Dalam Demokrasi Pancasila, pendapat minoritas tetap wajib didengar secara santun selama musyawarah.',
      ans: true,
      explain: 'Benar! Musyawarah menghargai setiap suara sebelum mengambil mufakat.',
    },
    {
      stmt: 'Hak belajar di kelas yang nyaman tidak ada hubungannya dengan kewajiban piket kebersihan.',
      ans: false,
      explain: 'Salah. Kelas nyaman adalah hak siswa yang terwujud karena kewajiban piket dijalankan.',
    },
  ];

  // 5. Pilih Sikap State
  const [sikapSelected, setSikapSelected] = useState<number | null>(null);
  const sikapOptions = [
    {
      label: 'A. Ikut menyebarkan meme wajah teman tanpa izin supaya grup kelas ramai.',
      ok: false,
      explain: 'Tidak mencerminkan etika Pancasila; menyebarkan foto tanpa izin melanggar privasi dan Sila ke-2.',
    },
    {
      label: 'B. Memilih tidak menyebarkan meme, menegur pengirim secara pribadi, dan menghibur teman yang menjadi bahan candaan.',
      ok: true,
      explain: 'Pilihan terbaik! Menjaga martabat sesama di ruang digital adalah wujud pelajar Pancasila.',
    },
    {
      label: 'C. Membalas membuat meme yang lebih memalukan terhadap pengirim pertama.',
      ok: false,
      explain: 'Membalas ejekan dengan ejekan justru memperpanjang konflik siber.',
    },
  ];

  // 6. Simulasi Musyawarah State
  const [musyawarahVotes, setMusyawarahVotes] = useState<Record<string, number>>({
    'Taman Baca Kelas': 14,
    'Pemilahan Sampah & Tanaman': 15,
    'Papan Apresiasi Kebinekaan': 9,
  });
  const [studentVoted, setStudentVoted] = useState<string | null>(null);
  const [musyawarahConsensus, setMusyawarahConsensus] = useState<string | null>(null);

  // 7. Studi Kasus Mini State
  const [miniChoice, setMiniChoice] = useState<number | null>(null);

  // 8. Jurnal Karakter State
  const [jurnalSila, setJurnalSila] = useState('Sila 2 · Kemanusiaan');
  const [jurnalAction, setJurnalAction] = useState('');
  const [jurnalSavedMsg, setJurnalSavedMsg] = useState(false);

  const tabs: { id: ActivityTab; actId: string; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'misi', actId: 'act-misi', label: 'Misi Pancasila', icon: ShieldCheck },
    { id: 'tebak_sila', actId: 'act-tebak-sila', label: 'Tebak Sila', icon: Gamepad2 },
    { id: 'puzzle', actId: 'act-puzzle', label: 'Puzzle Hierarki', icon: Puzzle },
    { id: 'benar_salah', actId: 'act-benar-salah', label: 'Benar / Salah', icon: CheckCircle2 },
    { id: 'pilih_sikap', actId: 'act-pilih-sikap', label: 'Pilih Sikap', icon: Sparkles },
    { id: 'musyawarah', actId: 'act-musyawarah', label: 'Simulasi Musyawarah', icon: Users },
    { id: 'studi_mini', actId: 'act-studi-mini', label: 'Tantangan Kasus', icon: MessageSquare },
    { id: 'jurnal_karakter', actId: 'act-jurnal', label: 'Jurnal Karakter', icon: Gamepad2 },
  ];

  const myCharacterLogs = state.characterJournal[activeStudent.id] || [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Joyful Learning · Umpan Balik Langsung & Lencana
            </p>
            <h1 className="text-2xl font-bold text-slate-900">Aktivitas Interaktif (8 Wahana)</h1>
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg tabular-nums self-start">
            Selesai: {completed.length}/8 aktivitas
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isDone = completed.includes(t.actId);
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold border transition-colors min-h-[40px] ${
                  active
                    ? 'bg-blue-900 text-white border-blue-900'
                    : isDone
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{t.label}</span>
                {isDone && <span>✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. MISI PANCASILA */}
      {activeTab === 'misi' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{misiList[misiStep].title}</h2>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              Misi {misiStep + 1} / {misiList.length}
            </span>
          </div>
          <p className="text-sm sm:text-base text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {misiList[misiStep].situation}
          </p>
          <div className="space-y-2.5">
            {misiList[misiStep].choices.map((c, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setMisiFeedback(c.fb);
                  if (c.ok && misiStep === misiList.length - 1) {
                    completeActivity('act-misi', 'Ksatria Misi Pancasila');
                  }
                }}
                className="w-full text-left p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/40 text-sm text-slate-800 transition-colors min-h-[48px]"
              >
                {c.text}
              </button>
            ))}
          </div>
          {misiFeedback && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-sm text-amber-950 font-medium">{misiFeedback}</p>
              {misiStep < misiList.length - 1 ? (
                <button
                  onClick={() => {
                    setMisiStep((s) => s + 1);
                    setMisiFeedback(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-800 text-white text-xs font-semibold min-h-[40px] shrink-0"
                >
                  Lanjut Misi Berikutnya
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMisiStep(0);
                    setMisiFeedback(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold min-h-[40px] shrink-0"
                >
                  Ulangi Misi
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. TEBAK SILA INTERACTIVE GARUDA SHIELD */}
      {activeTab === 'tebak_sila' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-5 flex flex-col items-center bg-slate-50 rounded-xl p-4 border border-slate-200">
            <GarudaPancasila
              size={220}
              highlightedSila={tebakSilaItems[silaTarget].answerSila && silaFeedback ? tebakSilaItems[silaTarget].answerSila : null}
              onSelectSila={(sila) => {
                const current = tebakSilaItems[silaTarget];
                if (sila === current.answerSila) {
                  setSilaFeedback(`Tepat! ${current.explain}`);
                  if (silaTarget === tebakSilaItems.length - 1) {
                    completeActivity('act-tebak-sila', 'Ahli Simbol Garuda');
                  }
                } else {
                  setSilaFeedback(`Belum tepat (kamu memilih Sila ke-${sila}). Coba klik simbol perisai yang lain!`);
                }
              }}
            />
            <p className="text-xs text-slate-500 mt-2 text-center">
              Klik langsung simbol pada perisai Garuda atau pilih tombol sila di samping.
            </p>
          </div>
          <div className="md:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Tebak Simbol Sila pada Perisai Garuda</h2>
              <span className="text-xs font-mono text-slate-500 tabular-nums">
                Soal {silaTarget + 1}/{tebakSilaItems.length}
              </span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 bg-blue-50/70 border border-blue-200 p-4 rounded-xl">
              "{tebakSilaItems[silaTarget].clue}"
            </p>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    const current = tebakSilaItems[silaTarget];
                    if (num === current.answerSila) {
                      setSilaFeedback(`Tepat! ${current.explain}`);
                      if (silaTarget === tebakSilaItems.length - 1) {
                        completeActivity('act-tebak-sila', 'Ahli Simbol Garuda');
                      }
                    } else {
                      setSilaFeedback(`Belum tepat (kamu memilih Sila ke-${num}). Coba lagi!`);
                    }
                  }}
                  className="py-2.5 rounded-lg border border-slate-200 bg-white hover:bg-blue-50 text-xs sm:text-sm font-bold text-slate-800 min-h-[44px]"
                >
                  Sila {num}
                </button>
              ))}
            </div>
            {silaFeedback && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-2">
                <p className="text-sm text-emerald-950 font-medium">{silaFeedback}</p>
                {silaTarget < tebakSilaItems.length - 1 && (
                  <button
                    onClick={() => {
                      setSilaTarget((t) => t + 1);
                      setSilaFeedback(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-emerald-700 text-white text-xs font-semibold min-h-[40px]"
                  >
                    Soal Berikutnya →
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. PUZZLE PANCASILA & HIERARKI */}
      {activeTab === 'puzzle' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Puzzle Urutan Peraturan Perundang-undangan RI
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Klik kartu di bawah secara berurutan dari peraturan tertinggi (peringkat 1) hingga terendah!
              </p>
            </div>
            <button
              onClick={() => {
                setPuzzlePlaced([]);
                setPuzzleChecked(null);
              }}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold min-h-[40px]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600">Pilihan Kartu Peraturan (Klik untuk menyusun):</p>
              <div className="space-y-2">
                {puzzlePool.map((item) => {
                  const used = puzzlePlaced.includes(item);
                  return (
                    <button
                      key={item}
                      disabled={used}
                      onClick={() => {
                        setPuzzlePlaced((prev) => [...prev, item]);
                        setPuzzleChecked(null);
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-colors min-h-[44px] ${
                        used
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          : 'bg-white text-slate-800 border-slate-300 hover:border-blue-600 hover:bg-blue-50/40'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600">Susunan Jawabanmu (1 = Tertinggi):</p>
              <div className="space-y-2 min-h-[240px] rounded-xl bg-slate-50 border border-slate-200 p-3">
                {puzzlePlaced.length === 0 && (
                  <p className="text-xs text-slate-400 text-center py-12">
                    Belum ada kartu dipilih. Mulailah dari hukum dasar tertinggi.
                  </p>
                )}
                {puzzlePlaced.map((item, i) => (
                  <div
                    key={item}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-white border border-slate-200 text-sm"
                  >
                    <span>
                      <strong className="font-mono text-blue-800 mr-2">{i + 1}.</strong>
                      {item}
                    </span>
                    <button
                      onClick={() => {
                        setPuzzlePlaced((prev) => prev.filter((x) => x !== item));
                        setPuzzleChecked(null);
                      }}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
              {puzzlePlaced.length === correctOrder.length && (
                <button
                  onClick={() => {
                    const ok = puzzlePlaced.every((val, idx) => val === correctOrder[idx]);
                    setPuzzleChecked(ok);
                    if (ok) completeActivity('act-puzzle', 'Arsitek Konstitusi');
                  }}
                  className="w-full py-3 rounded-xl bg-blue-800 text-white text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
                >
                  Periksa Susunan Puzzle
                </button>
              )}
              {puzzleChecked !== null && (
                <p
                  className={`text-xs sm:text-sm p-3 rounded-lg font-medium ${
                    puzzleChecked
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-red-50 text-red-900 border border-red-200'
                  }`}
                >
                  {puzzleChecked
                    ? 'Sempurna! Urutan hierarki UU No. 12 Tahun 2011 milikmu 100% tepat.'
                    : 'Urutannya masih tertukar. Ingat puncak piramida adalah UUD NRI Tahun 1945 dan paling bawah Perda.'}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. BENAR ATAU SALAH */}
      {activeTab === 'benar_salah' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Tantangan Cepat Benar atau Salah</h2>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              {bsIdx + 1}/{bsQuestions.length} · Skor {bsScore}
            </span>
          </div>
          <p className="text-base text-slate-800 bg-slate-50 p-5 rounded-xl border border-slate-200">
            {bsQuestions[bsIdx].stmt}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[true, false].map((val) => (
              <button
                key={String(val)}
                onClick={() => {
                  const cur = bsQuestions[bsIdx];
                  const isOk = cur.ans === val;
                  if (isOk) setBsScore((s) => s + 25);
                  setBsFeedback(
                    `${isOk ? 'Benar!' : 'Kurang tepat.'} ${cur.explain}`
                  );
                  if (bsIdx === bsQuestions.length - 1) {
                    completeActivity('act-benar-salah');
                  }
                }}
                className="py-3.5 rounded-xl border border-slate-300 bg-white hover:bg-blue-50 font-bold text-sm text-slate-900 min-h-[48px]"
              >
                {val ? 'BENAR' : 'SALAH'}
              </button>
            ))}
          </div>
          {bsFeedback && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-sm text-slate-800">{bsFeedback}</p>
              {bsIdx < bsQuestions.length - 1 ? (
                <button
                  onClick={() => {
                    setBsIdx((i) => i + 1);
                    setBsFeedback(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-blue-800 text-white text-xs font-semibold min-h-[40px] shrink-0"
                >
                  Lanjut →
                </button>
              ) : (
                <button
                  onClick={() => {
                    setBsIdx(0);
                    setBsScore(0);
                    setBsFeedback(null);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-white text-xs font-semibold min-h-[40px] shrink-0"
                >
                  Main Lagi
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* 5. PILIH SIKAP */}
      {activeTab === 'pilih_sikap' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Pilih Sikap: Dilema Ruang Digital Kelas</h2>
          <p className="text-sm sm:text-base text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            Seseorang mengirim foto wajah temanmu yang sedang tertidur di kelas dan menjadikannya stiker ejekan di grup obrolan. Sikap mana yang kamu pilih?
          </p>
          <div className="space-y-2.5">
            {sikapOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSikapSelected(idx);
                  if (opt.ok) completeActivity('act-pilih-sikap');
                }}
                className={`w-full text-left p-4 rounded-xl border text-sm transition-colors min-h-[48px] ${
                  sikapSelected === idx
                    ? opt.ok
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold'
                      : 'bg-red-50 border-red-300 text-red-950 font-semibold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-800'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {sikapSelected !== null && (
            <p className="text-sm text-slate-800 bg-amber-50 border border-amber-200 p-4 rounded-xl">
              {sikapOptions[sikapSelected].explain}
            </p>
          )}
        </div>
      )}

      {/* 6. SIMULASI MUSYAWARAH */}
      {activeTab === 'musyawarah' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Simulasi Musyawarah Kelas VIII SMPN 16 Kota Serang
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Tema Rapat: <strong>Memilih Program Utama Kebersihan & Literasi Semester Ini</strong>. Dengarkan aspirasi, beri suaramu, lalu pilih solusi mufakat yang merangkul semua pihak!
            </p>
          </div>

          <div className="space-y-3">
            {Object.entries(musyawarahVotes).map(([option, votes]) => {
              const total = Object.values(musyawarahVotes).reduce((a, b) => a + b, 0);
              const pct = Math.round((votes / total) * 100);
              const votedThis = studentVoted === option;
              return (
                <div key={option} className="rounded-xl border border-slate-200 p-4 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900">{option}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-slate-700 tabular-nums">
                        {votes} suara ({pct}%)
                      </span>
                      <button
                        disabled={Boolean(studentVoted)}
                        onClick={() => {
                          setStudentVoted(option);
                          setMusyawarahVotes((prev) => ({
                            ...prev,
                            [option]: prev[option] + 1,
                          }));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold min-h-[36px] ${
                          votedThis
                            ? 'bg-emerald-600 text-white'
                            : studentVoted
                            ? 'bg-slate-100 text-slate-400'
                            : 'bg-blue-800 text-white hover:bg-blue-900'
                        }`}
                      >
                        {votedThis ? 'Pilihanmu' : 'Berikan Suara'}
                      </button>
                    </div>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-700 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>

          {studentVoted && (
            <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 space-y-3">
              <p className="text-sm font-bold text-blue-950">
                Langkah Mufakat (Sila ke-4): Hasil suara masih bersaing tipis! Sebagai pimpinan rapat, keputusan musyawarah terbaik apa yang kamu usulkan?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={() => {
                    setMusyawarahConsensus(
                      'Mufakat tercapai! Menggabungkan pemilahan sampah sebagai program utama bulan ini sekaligus membuat sudut baca & papan kebinekaan secara bertahap.'
                    );
                    completeActivity('act-musyawarah', 'Moderator Musyawarah');
                  }}
                  className="text-left p-3.5 rounded-lg bg-white border border-blue-200 hover:bg-blue-100 text-xs sm:text-sm font-medium text-slate-800 min-h-[44px]"
                >
                  Mengakomodasi suara terbanyak sambil menggabungkan ide taman baca dan papan kebinekaan agar semua aspirasi terwakili.
                </button>
                <button
                  onClick={() => {
                    setMusyawarahConsensus(
                      'Kurang mencerminkan semangat mufakat. Memaksakan satu pilihan tanpa berdialog membuat kelompok lain kecewa.'
                    );
                  }}
                  className="text-left p-3.5 rounded-lg bg-white border border-blue-200 hover:bg-blue-100 text-xs sm:text-sm font-medium text-slate-800 min-h-[44px]"
                >
                  Mengabaikan suara pilihan lainnya dan melarang pendukungnya ikut rapat berikutnya.
                </button>
              </div>
              {musyawarahConsensus && (
                <p className="text-sm font-medium text-emerald-900 bg-white p-3 rounded-lg border border-emerald-200">
                  {musyawarahConsensus}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 7. STUDI KASUS MINI */}
      {activeTab === 'studi_mini' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4">
          <h2 className="text-lg font-bold text-slate-900">Tantangan Kasus Cepat: Antre Kantin Sekolah</h2>
          <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            Saat istirahat kedua hanya tersisa 5 menit, seorang kakak kelas menyerobot antrean di depanmu dan temanmu. Apa respons yang paling bijak dan beradab?
          </p>
          <div className="space-y-2.5">
            {[
              {
                text: 'Menegur dengan senyum dan kalimat sopan: "Permisi kak, kami juga sedang antre karena sebentar lagi bel masuk."',
                ok: true,
                fb: 'Tepat! Menegakkan keadilan dan aturan antre (Bab 2 & Sila ke-5) dengan bahasa santun tanpa memicu keributan.',
              },
              {
                text: 'Mendorong bahunya sambil berteriak agar dilihat seluruh kantin.',
                ok: false,
                fb: 'Tindakan emosional bisa memicu konflik fisik di sekolah.',
              },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => {
                  setMiniChoice(i);
                  if (item.ok) completeActivity('act-studi-mini');
                }}
                className={`w-full text-left p-4 rounded-xl border text-sm min-h-[44px] ${
                  miniChoice === i
                    ? item.ok
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                      : 'bg-red-50 border-red-300 text-red-950 font-semibold'
                    : 'bg-white border-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.text}
              </button>
            ))}
          </div>
          {miniChoice !== null && (
            <p className="text-sm text-slate-800 bg-blue-50 border border-blue-200 p-3.5 rounded-xl">
              {miniChoice === 0
                ? 'Tepat! Menegakkan keadilan dan aturan antre (Bab 2 & Sila ke-5) dengan bahasa santun tanpa memicu keributan.'
                : 'Tindakan emosional bisa memicu konflik fisik di sekolah. Gunakan teguran santun terlebih dahulu.'}
            </p>
          )}
        </div>
      )}

      {/* 8. JURNAL KARAKTER */}
      {activeTab === 'jurnal_karakter' && (
        <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-5">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Jurnal Karakter Harian Pelajar Pancasila</h2>
            <p className="text-sm text-slate-600">
              Catat satu kebaikan nyata yang kamu lakukan hari ini di rumah, kelas, atau media sosial. Catatan tersimpan di profilmu ({activeStudent.name}).
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!jurnalAction.trim()) return;
              addCharacterJournal(jurnalSila, jurnalAction.trim());
              completeActivity('act-jurnal', 'Pelajar Berkarakter');
              setJurnalAction('');
              setJurnalSavedMsg(true);
              setTimeout(() => setJurnalSavedMsg(false), 3000);
            }}
            className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={jurnalSila}
                onChange={(e) => setJurnalSila(e.target.value)}
                className="px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm"
              >
                <option>Sila 1 · Ketuhanan & Toleransi</option>
                <option>Sila 2 · Kemanusiaan & Empati</option>
                <option>Sila 3 · Persatuan & Gotong Royong</option>
                <option>Sila 4 · Musyawarah & Demokrasi</option>
                <option>Sila 5 · Keadilan & Kepedulian</option>
              </select>
              <input
                type="text"
                value={jurnalAction}
                onChange={(e) => setJurnalAction(e.target.value)}
                placeholder="Contoh: Membantu teman pindahan memahami jadwal piket kelas..."
                className="sm:col-span-2 px-3 py-2.5 rounded-lg border border-slate-300 bg-white text-sm"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-800 text-white text-xs sm:text-sm font-semibold hover:bg-blue-900 min-h-[44px]"
              >
                Simpan ke Jurnal Karakter
              </button>
              {jurnalSavedMsg && (
                <span className="text-xs font-semibold text-emerald-700">
                  Berhasil dicatat & aktivitas ditandai selesai!
                </span>
              )}
            </div>
          </form>

          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-800">Riwayat Catatan Karaktermu</h3>
            {myCharacterLogs.length === 0 ? (
              <p className="text-xs text-slate-500">Belum ada catatan hari ini. Yuk tulis aksi baik pertamamu!</p>
            ) : (
              <div className="space-y-2">
                {myCharacterLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 p-3.5 rounded-xl border border-slate-200 bg-white text-sm"
                  >
                    <div>
                      <p className="text-xs font-semibold text-blue-800">
                        {log.sila} · {log.date}
                      </p>
                      <p className="text-slate-800 mt-0.5">{log.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
