import { KktpItem, RpmMeeting } from '../types';

export const DEFAULT_RPM_DATA: RpmMeeting[] = [
  {
    id: 'rpm-g1-1',
    semester: 'ganjil',
    chapterId: 'bab1',
    pertemuanKe: 'Pertemuan 1–2 (Bab 1)',
    materiPokok: 'Kedudukan Pancasila sebagai Dasar Negara dan Pandangan Hidup Bangsa',
    alokasiWaktu: '2 × 3 JP (240 menit)',
    cp: 'Murid memahami sejarah kelahiran Pancasila, memahami kedudukan Pancasila sebagai dasar negara, pandangan hidup bangsa, dan ideologi negara serta menerapkan nilai-nilai Pancasila dalam kehidupan sehari-hari.',
    tp: 'TP 1.1: Menjelaskan kedudukan dan fungsi Pancasila sebagai dasar negara dan pandangan hidup bangsa dengan argumen logis serta contoh nyata.',
    dimensiProfilLulusan: ['Keimanan & Ketakwaan', 'Penalaran Kritis', 'Kewargaan', 'Komunikasi'],
    pemahamanBermakna:
      'Pancasila bukan sekadar hafalan lima sila, melainkan fondasi hukum negara sekaligus kompas sikap pelajar dalam keluarga, sekolah, dan ruang digital.',
    pertanyaanPemantik:
      'Mengapa bangsa Indonesia yang majemuk membutuhkan satu dasar negara yang sama? Apa dampaknya jika tata tertib kelas dibuat tanpa nilai Pancasila?',
    praktikPedagogis: 'Pembelajaran Berbasis Masalah (Problem-Based Learning), diskusi kelompok kecil, dan analisis perbandingan kasus nyata.',
    lingkunganKemitraan: 'Ruang kelas VIII SMPN 16 Kota Serang, lingkungan keluarga murid, dan kolaborasi dengan pengurus OSIS.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran & Bermakna: Siswa menjawab pertanyaan pemantik dan membandingkan fungsi dasar negara (yuridis) vs pandangan hidup (etis) melalui peta konsep interaktif dan presentasi slide.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Siswa menganalisis kasus pelanggaran tata tertib dan etika media sosial, lalu memainkannya dalam aktivitas Tebak Sila dan Pilih Sikap.',
      merefleksi:
        'Berkesadaran: Siswa menuliskan satu kebiasaan baik yang ingin diperbaiki di rumah atau kelas dalam Jurnal Refleksi.',
    },
    asesmen: {
      awal: 'Asesmen diagnostik singkat 5 pertanyaan pengetahuan awal tentang arti dasar negara.',
      proses: 'Observasi diskusi kelompok, keaktifan aktivitas Pilih Sikap, dan ketepatan argumen.',
      akhir: 'Latihan soal literasi-numerasi (LITNUM) sub-topik Bab 1.',
    },
    mediaSumber: 'Aplikasi Pancasila Smart Learning SMPN 16 Kota Serang, Buku Siswa Pendidikan Pancasila Kelas VIII Kemendikbudristek, Infografis Nilai Pancasila.',
  },
  {
    id: 'rpm-g1-2',
    semester: 'ganjil',
    chapterId: 'bab1',
    pertemuanKe: 'Pertemuan 3–4 (Bab 1)',
    materiPokok: 'Pancasila sebagai Sumber Hukum & Ideologi Terbuka di Era Digital',
    alokasiWaktu: '2 × 3 JP (240 menit)',
    cp: 'Murid memahami kedudukan Pancasila sebagai ideologi negara serta mengidentifikasi penerapan nilai Pancasila dalam menghadapi tantangan era digital.',
    tp: 'TP 1.2 & TP 1.3: Menganalisis Pancasila sebagai ideologi terbuka dan menerapkan kelima sila sebagai satu kesatuan utuh di sekolah dan media sosial.',
    dimensiProfilLulusan: ['Penalaran Kritis', 'Kreativitas', 'Kolaborasi', 'Kewargaan'],
    pemahamanBermakna:
      'Sebagai ideologi terbuka, nilai dasar Pancasila tetap kokoh sementara penerapannya mampu menjawab tantangan modern seperti hoaks dan perundungan siber.',
    pertanyaanPemantik:
      'Bagaimana cara pelajar kelas VIII mengamalkan Pancasila saat menggunakan WhatsApp, TikTok, atau Instagram?',
    praktikPedagogis: 'Studi Kasus kontekstual dan Proyek Kampanye Poster Digital Nilai Pancasila.',
    lingkunganKemitraan: 'Perpustakaan sekolah, wali kelas, dan tim literasi digital sekolah.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Mengkaji struktur hierarkis-piramidal kelima sila serta perbedaan ideologi terbuka vs tertutup.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Memecahkan Studi Kasus berita bohong di media sosial dan menyelesaikan Misi Pancasila.',
      merefleksi:
        'Berkesadaran: Merefleksikan jejak digital pribadi selama satu minggu terakhir.',
    },
    asesmen: {
      awal: 'Tanya jawab pemantik tentang pengalaman melihat informasi palsu di media sosial.',
      proses: 'Penilaian produk mind-map dan skor aktivitas Misi Pancasila.',
      akhir: 'Paket Kuis LITNUM Bab 1 (20 soal terukur KKTP).',
    },
    mediaSumber: 'Aplikasi Pancasila Smart Learning, UU No. 12 Tahun 2011, studi kasus literasi digital.',
  },
  {
    id: 'rpm-g1-3',
    semester: 'ganjil',
    chapterId: 'bab2',
    pertemuanKe: 'Pertemuan 5–7 (Bab 2)',
    materiPokok: 'Konstitusi, Makna Pembukaan & Kedudukan UUD NRI Tahun 1945',
    alokasiWaktu: '3 × 3 JP (360 menit)',
    cp: 'Murid memahami makna dan fungsi konstitusi, hubungan Pembukaan UUD NRI Tahun 1945 dengan Pancasila, serta tata urutan peraturan perundang-undangan.',
    tp: 'TP 2.1: Menjelaskan makna konstitusi tertulis dan tidak tertulis serta fungsi UUD NRI Tahun 1945 sebagai pelindung hak warga negara.',
    dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Kemandirian'],
    pemahamanBermakna:
      'Konstitusi membatasi kekuasaan agar berjalan adil dan menjamin hak dasar pelajar seperti hak atas pendidikan dan perlindungan anak.',
    pertanyaanPemantik:
      'Apa jadinya sebuah pertandingan atau negara apabila aturan tertinggi bisa diubah sepihak tanpa kesepakatan bersama?',
    praktikPedagogis: 'Discovery Learning dan Analisis Teks Pembukaan UUD NRI Tahun 1945.',
    lingkunganKemitraan: 'Ruang kelas, tata tertib SMPN 16 Kota Serang, dan tokoh masyarakat/komite sekolah.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Mengamati analogi aturan olahraga vs konstitusi negara dan membaca makna 4 alinea Pembukaan UUD 1945.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Menyusun kartu pasangan alinea Pembukaan UUD dengan maknanya pada Puzzle Pancasila & Benar/Salah.',
      merefleksi:
        'Berkesadaran: Mengidentifikasi hak yang sudah diterima siswa berdasarkan Pasal 31 UUD 1945.',
    },
    asesmen: {
      awal: 'Kuis pemanasan tentang perbedaan aturan tertulis dan kebiasaan.',
      proses: 'Lembar identifikasi pasal UUD dan skor aktivitas interaktif.',
      akhir: 'Penilaian harian literasi teks pasal UUD.',
    },
    mediaSumber: 'Naskah UUD NRI Tahun 1945, Modul Bab 2 Pancasila Smart Learning.',
  },
  {
    id: 'rpm-g1-4',
    semester: 'ganjil',
    chapterId: 'bab2',
    pertemuanKe: 'Pertemuan 8–10 (Bab 2)',
    materiPokok: 'Tata Urutan Peraturan Perundang-undangan & Budaya Sadar Hukum',
    alokasiWaktu: '3 × 3 JP (360 menit)',
    cp: 'Murid menerapkan norma dan aturan hukum secara konsisten sesuai tata urutan peraturan perundang-undangan di Indonesia.',
    tp: 'TP 2.2 & TP 2.3: Menganalisis hierarki peraturan menurut UU No. 12 Tahun 2011 dan menampilkan perilaku sadar hukum di sekolah dan jalan raya.',
    dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Komunikasi'],
    pemahamanBermakna:
      'Setiap peraturan di daerah seperti Perda Kota Serang hingga tata tertib sekolah bersumber dari aturan di atasnya untuk menciptakan ketertiban bersama.',
    pertanyaanPemantik:
      'Mengapa pelajar SMP belum diperbolehkan mengendarai sepeda motor di jalan raya meskipun sudah merasa mahir?',
    praktikPedagogis: 'Simulasi Musyawarah penyusunan kesepakatan kelas dan Analisis Data pelanggaran tata tertib.',
    lingkunganKemitraan: 'Guru BK, Wakasek Kesiswaan SMPN 16 Kota Serang, dan orang tua siswa.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Mempelajari piramida 7 jenjang peraturan dan asas Lex Superior Derogat Legi Inferiori.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Melakukan Simulasi Musyawarah merumuskan kesepakatan kelas anti-terlambat dan anti-sampah.',
      merefleksi:
        'Berkesadaran: Mengisi komitmen sadar hukum pribadi dan persiapan Asesmen Akhir Semester Ganjil.',
    },
    asesmen: {
      awal: 'Cek pemahaman urutan peraturan perundang-undangan.',
      proses: 'Rubrik partisipasi Simulasi Musyawarah dan sikap disiplin kelas.',
      akhir: 'Paket Kuis LITNUM Bab 2 dan Asesmen Akhir Semester Ganjil (20 soal).',
    },
    mediaSumber: 'Infografis Hierarki Hukum, Buku Tata Tertib SMPN 16 Kota Serang, Kuis LITNUM Semester Ganjil.',
  },
  {
    id: 'rpm-g2-1',
    semester: 'genap',
    chapterId: 'bab3',
    pertemuanKe: 'Pertemuan 1–3 (Bab 3)',
    materiPokok: 'Faktor Keberagaman Masyarakat Indonesia & Semboyan Bhinneka Tunggal Ika',
    alokasiWaktu: '3 × 3 JP (360 menit)',
    cp: 'Murid mengidentifikasi keberagaman suku, agama, ras, dan antargolongan dalam bingkai Bhinneka Tunggal Ika serta bersikap toleran dan gotong royong.',
    tp: 'TP 3.1: Mengidentifikasi faktor geografis dan historis keberagaman Indonesia sebagai kekayaan yang disatukan oleh Bhinneka Tunggal Ika.',
    dimensiProfilLulusan: ['Keimanan & Ketakwaan', 'Kewargaan', 'Kolaborasi'],
    pemahamanBermakna:
      'Keberagaman Indonesia merupakan anugerah sejarah dan geografi yang memperkaya identitas nasional apabila dikelola dengan rasa saling menghormati.',
    pertanyaanPemantik:
      'Bagaimana cara menyatukan ratusan bahasa daerah dan suku di ribuan pulau tanpa menghilangkan ciri khas masing-masing?',
    praktikPedagogis: 'Pembelajaran Kontekstual dan Eksplorasi Peta Budaya Kelas.',
    lingkunganKemitraan: 'Lingkungan keluarga multi-latar belakang Kota Serang dan ekstrakurikuler seni budaya sekolah.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Menelusuri asal bahasa dan budaya keluarga teman sekelas serta membedah makna historis kitab Sutasoma.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Membaca data statistik keragaman Indonesia melalui Infografis dan kuis interaktif.',
      merefleksi:
        'Berkesadaran: Menuliskan hal menarik yang dipelajari dari budaya teman yang berbeda daerah.',
    },
    asesmen: {
      awal: 'Survei kecil keberagaman bahasa/daerah asal di kelas.',
      proses: 'Ketepatan analisis faktor penyebab keberagaman.',
      akhir: 'Latihan soal literasi dan numerasi data keragaman.',
    },
    mediaSumber: 'Modul Bab 3 Pancasila Smart Learning, Infografis Keragaman Nusantara.',
  },
  {
    id: 'rpm-g2-2',
    semester: 'genap',
    chapterId: 'bab3',
    pertemuanKe: 'Pertemuan 4–6 (Bab 3)',
    materiPokok: 'Mencegah Stereotip, Perundungan, dan Membangun Toleransi Aktif',
    alokasiWaktu: '3 × 3 JP (360 menit)',
    cp: 'Murid mampu menolak praktik intoleransi, diskriminasi, dan perundungan serta menginisiasi kolaborasi gotong royong lintas perbedaan.',
    tp: 'TP 3.2 & TP 3.3: Menganalisis bahaya stereotip/etnosentrisme dan mempraktikkan toleransi aktif melalui proyek antiperundungan dan gerakan toleransi.',
    dimensiProfilLulusan: ['Kewargaan', 'Kolaborasi', 'Kreativitas', 'Komunikasi'],
    pemahamanBermakna:
      'Toleransi aktif berarti tidak diam saat melihat diskriminasi, melainkan hadir membela dan berkolaborasi lintas perbedaan.',
    pertanyaanPemantik:
      'Apa bedanya bercanda yang menyehatkan dengan lelucon yang menyakiti latar belakang teman?',
    praktikPedagogis: 'Project-Based Learning (PjBL): Kampanye Antiperundungan & Gerakan Toleransi di SMPN 16 Kota Serang.',
    lingkunganKemitraan: 'Guru BK, OSIS, dan kelompok kerja siswa lintas kelas.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Membedakan toleransi pasif dan toleransi aktif serta mengidentifikasi akar perundungan pada Studi Kasus.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Merancang produk Proyek Pancasila (poster/kampanye toleransi) dengan pembagian peran tim.',
      merefleksi:
        'Berkesadaran: Mengisi Jurnal Karakter setelah menyelesaikan langkah kerja proyek.',
    },
    asesmen: {
      awal: 'Refleksi kasus perundungan dan intoleransi.',
      proses: 'Rubrik kerja tim proyek dan presentasi analisis studi kasus.',
      akhir: 'Paket Kuis LITNUM Bab 3 (20 soal terukur KKTP).',
    },
    mediaSumber: 'Studi Kasus Intoleransi & Perundungan, Modul Proyek Pancasila.',
  },
  {
    id: 'rpm-g2-3',
    semester: 'genap',
    chapterId: 'bab4',
    pertemuanKe: 'Pertemuan 7–9 (Bab 4)',
    materiPokok: 'Bentuk Negara Kesatuan (NKRI), Otonomi Daerah, dan Demokrasi Pancasila',
    alokasiWaktu: '3 × 3 JP (360 menit)',
    cp: 'Murid memahami bentuk Negara Kesatuan Republik Indonesia, prinsip otonomi daerah, dan pelaksanaan demokrasi Pancasila.',
    tp: 'TP 4.1 & TP 4.2: Menjelaskan prinsip NKRI dan otonomi daerah serta mempraktikkan musyawarah mufakat dalam Demokrasi Pancasila.',
    dimensiProfilLulusan: ['Penalaran Kritis', 'Kewargaan', 'Komunikasi'],
    pemahamanBermakna:
      'Otonomi daerah melayani kebutuhan warga lokal seperti Kota Serang lebih cepat dalam satu kesatuan NKRI, sementara demokrasi Pancasila menjamin suara rakyat dihargai secara bermartabat.',
    pertanyaanPemantik:
      'Bagaimana kita mengelola perbedaan pilihan saat pemilihan Ketua OSIS agar tidak menimbulkan permusuhan antar-kelas?',
    praktikPedagogis: 'Role-play / Simulasi Musyawarah dan Pemilihan Demokratis.',
    lingkunganKemitraan: 'Pembina OSIS SMPN 16 Kota Serang dan simulasi majelis kelas.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Mempelajari Pasal 1 UUD 1945 dan prinsip asas pemilu LUBER JURDIL.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Mengikuti Simulasi Musyawarah interaktif menghitung suara dan mengambil keputusan berbasis data.',
      merefleksi:
        'Berkesadaran: Mengevaluasi sikap menghargai hasil keputusan bersama.',
    },
    asesmen: {
      awal: 'Diskusi pengalaman memilih pengurus kelas atau OSIS.',
      proses: 'Simulasi voting dan musyawarah mufakat.',
      akhir: 'Latihan soal numerasi data hasil pemungutan suara.',
    },
    mediaSumber: 'Modul Bab 4, Simulasi Musyawarah Pancasila Smart Learning.',
  },
  {
    id: 'rpm-g2-4',
    semester: 'genap',
    chapterId: 'bab4',
    pertemuanKe: 'Pertemuan 10–12 (Bab 4)',
    materiPokok: 'Keseimbangan Hak & Kewajiban serta Bela Negara Pelajar untuk Keutuhan NKRI',
    alokasiWaktu: '3 × 3 JP (360 menit)',
    cp: 'Murid mengidentifikasi hak dan kewajiban warga negara serta menunjukkan komitmen menjaga keutuhan NKRI melalui proyek kepedulian lingkungan dan sosial.',
    tp: 'TP 4.3: Menyeimbangkan pemenuhan hak dan pelaksanaan kewajiban di sekolah serta berkontribusi menjaga keutuhan NKRI lewat proyek gotong royong.',
    dimensiProfilLulusan: ['Kemandirian', 'Kolaborasi', 'Kewargaan', 'Kesehatan'],
    pemahamanBermakna:
      'Keutuhan NKRI dijaga pelajar masa kini melalui keseimbangan hak dan kewajiban, disiplin belajar, serta aksi nyata merawat lingkungan sekolah.',
    pertanyaanPemantik:
      'Mengapa menjaga kebersihan taman sekolah dan bijak bermedia sosial termasuk bentuk bela negara bagi pelajar SMP?',
    praktikPedagogis: 'Project-Based Learning: Gotong Royong Lingkungan & Gerakan Bijak Bermedia Sosial.',
    lingkunganKemitraan: 'Seluruh warga SMPN 16 Kota Serang dan orang tua murid.',
    pengalamanBelajar: {
      memahami:
        'Berkesadaran: Membandingkan daftar hak dan kewajiban siswa serta hak konstitusional warga negara.',
      mengaplikasi:
        'Bermakna & Menggembirakan: Melaksanakan aksi proyek gotong royong lingkungan dan mengevaluasi rubriknya.',
      merefleksi:
        'Berkesadaran: Menulis refleksi akhir tahun ajaran dan mempersiapkan Asesmen Akhir Semester Genap.',
    },
    asesmen: {
      awal: 'Cek pemahaman perbedaan hak dan kewajiban.',
      proses: 'Penilaian sikap gotong royong, dokumentasi proyek, dan jurnal refleksi.',
      akhir: 'Paket Kuis LITNUM Bab 4 dan Asesmen Akhir Semester Genap (20 soal).',
    },
    mediaSumber: 'Aplikasi Pancasila Smart Learning SMPN 16 Kota Serang, Rubrik Proyek PjBL, Kuis LITNUM Semester Genap.',
  },
];

const makeDefaultRubrics = (passingScore: number) => [
  {
    level: 'Belum Tampak' as const,
    minScore: 0,
    maxScore: Math.max(0, passingScore - 21),
    descriptor: 'Memerlukan bimbingan intensif untuk memahami konsep dasar dan menghubungkannya dengan contoh nyata.',
  },
  {
    level: 'Mulai Berkembang' as const,
    minScore: Math.max(1, passingScore - 20),
    maxScore: passingScore - 1,
    descriptor: 'Mampu mengenali konsep inti secara terbatas, namun perlu penguatan pada penalaran literasi-numerasi.',
  },
  {
    level: 'Berkembang Sesuai Harapan' as const,
    minScore: passingScore,
    maxScore: Math.min(99, passingScore + 14),
    descriptor: 'Memahami konsep secara utuh, mampu menafsirkan stimulus nyata, dan menerapkannya sesuai tujuan pembelajaran.',
  },
  {
    level: 'Sangat Berkembang' as const,
    minScore: Math.min(100, passingScore + 15),
    maxScore: 100,
    descriptor: 'Menguasai penalaran HOTS, menganalisis data literasi-numerasi secara akurat, serta menjadi teladan sikap Pancasila.',
  },
];

export const DEFAULT_KKTP_DATA: KktpItem[] = [
  {
    id: 'kktp-1-1',
    semester: 'ganjil',
    chapterId: 'bab1',
    tpCode: 'TP 1.1',
    tujuanPembelajaran: 'Menjelaskan kedudukan Pancasila sebagai dasar negara dan pandangan hidup bangsa dengan argumen logis.',
    indikator: 'Mampu membedakan fungsi yuridis dasar negara dan fungsi moral pandangan hidup pada kasus sekolah serta masyarakat.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-1-2',
    semester: 'ganjil',
    chapterId: 'bab1',
    tpCode: 'TP 1.2',
    tujuanPembelajaran: 'Menganalisis Pancasila sebagai sumber segala sumber hukum dan ideologi terbuka.',
    indikator: 'Mampu menjelaskan keterpaduan kelima sila dan contoh penerapan nilai praksis Pancasila di era digital.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-2-1',
    semester: 'ganjil',
    chapterId: 'bab2',
    tpCode: 'TP 2.1',
    tujuanPembelajaran: 'Menjelaskan makna konstitusi dan kedudukan UUD NRI Tahun 1945 sebagai hukum dasar tertinggi.',
    indikator: 'Mampu menafsirkan makna alinea Pembukaan UUD 1945 serta pasal perlindungan hak pendidikan warga negara.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-2-2',
    semester: 'ganjil',
    chapterId: 'bab2',
    tpCode: 'TP 2.2',
    tujuanPembelajaran: 'Menganalisis tata urutan peraturan perundang-undangan dan kesadaran hukum pelajar.',
    indikator: 'Mampu mengurutkan hierarki peraturan UU No. 12/2011 dan mengambil keputusan berbasis data pelanggaran tata tertib.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-3-1',
    semester: 'genap',
    chapterId: 'bab3',
    tpCode: 'TP 3.1',
    tujuanPembelajaran: 'Mengidentifikasi keberagaman masyarakat Indonesia dalam bingkai Bhinneka Tunggal Ika.',
    indikator: 'Mampu membaca data keragaman Nusantara serta menjelaskan faktor penyebab keragaman suku, bahasa, dan budaya.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-3-2',
    semester: 'genap',
    chapterId: 'bab3',
    tpCode: 'TP 3.2',
    tujuanPembelajaran: 'Menganalisis pencegahan stereotip/intoleransi dan mempraktikkan toleransi aktif.',
    indikator: 'Mampu merumuskan solusi damai dan empatik terhadap konflik perbedaan serta perundungan di sekolah.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-4-1',
    semester: 'genap',
    chapterId: 'bab4',
    tpCode: 'TP 4.1',
    tujuanPembelajaran: 'Menjelaskan bentuk NKRI, otonomi daerah, dan praktik Demokrasi Pancasila.',
    indikator: 'Mampu menganalisis data pemungutan suara musyawarah serta prinsip pemerintahan daerah dalam bingkai NKRI.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
  {
    id: 'kktp-4-2',
    semester: 'genap',
    chapterId: 'bab4',
    tpCode: 'TP 4.2',
    tujuanPembelajaran: 'Menyeimbangkan pelaksanaan hak dan kewajiban sebagai pelajar dan warga negara.',
    indikator: 'Mampu mengevaluasi keseimbangan hak dan kewajiban di sekolah serta berkontribusi menjaga keutuhan NKRI.',
    passingScore: 75,
    rubrics: makeDefaultRubrics(75),
  },
];
