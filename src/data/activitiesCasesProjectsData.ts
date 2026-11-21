import { CaseStudyItem, ProjectItem } from '../types';

export const CASE_STUDIES_DATA: CaseStudyItem[] = [
  {
    id: 'case-1',
    chapterId: 'bab1',
    category: 'Perundungan (Bullying)',
    title: 'Kasus 1: Julukan Fisik di Grup Chat Kelas VIII',
    description:
      'Raka sering mendapat julukan yang mengejek warna kulit dan bentuk tubuhnya di grup WhatsApp tidak resmi kelas. Beberapa teman ikut mengirim stiker tertawa karena menganggapnya "cuma bercanda", sementara Raka mulai sering izin tidak masuk sekolah.',
    problemIdentification:
      'Terjadi perundungan verbal dan siber (cyberbullying) yang dibungkus alasan candaan sehingga merusak rasa aman dan hak belajar murid.',
    analysisQuestions: [
      'Mengapa alasan "cuma bercanda" tidak membenarkan perundungan terhadap teman?',
      'Sila Pancasila mana yang paling dilanggar dalam peristiwa ini dan apa dampaknya bagi korban?',
      'Apa tindakan aman yang dapat dilakukan siswa saksi mata untuk menghentikan perundungan tersebut?',
    ],
    solutionOptions: [
      {
        id: 'sol-1a',
        label: 'Menegur pembuat julukan secara tegas namun santun, mendukung Raka, dan melapor ke wali kelas/guru BK bila berlanjut.',
        isRecommended: true,
        feedback:
          'Tepat! Tindakan ini mencerminkan Sila ke-2 (Kemanusiaan yang Adil dan Beradab) dan Sila ke-3 (Persatuan) karena membela martabat teman sekaligus memulihkan rasa aman kelas.',
      },
      {
        id: 'sol-1b',
        label: 'Memilih keluar dari grup tanpa melakukan apa-apa agar tidak ikut terlibat masalah.',
        isRecommended: false,
        feedback:
          'Kurang tepat. Diam membiarkan perundungan membuat pelaku merasa tindakannya wajar dan korban tetap merasa sendirian.',
      },
      {
        id: 'sol-1c',
        label: 'Membalas mengejek kekurangan fisik pelaku agar ia merasakan hal yang sama.',
        isRecommended: false,
        feedback:
          'Keliru. Membalas perundungan dengan ejekan baru hanya memperpanjang rantai kekerasan verbal.',
      },
    ],
    pancasilaConnection:
      'Melanggar Sila ke-2 (menghargai harkat dan martabat manusia) serta mengancam Sila ke-3 (kebersamaan di sekolah).',
    conclusion:
      'Candaan yang sehat membuat semua orang ikut tersenyum, bukan membuat satu orang terluka dan takut datang ke sekolah.',
  },
  {
    id: 'case-2',
    chapterId: 'bab4',
    category: 'Konflik Perbedaan Pendapat',
    title: 'Kasus 2: Perdebatan Keras Penentuan Desain Kaos Kelas',
    description:
      'Saat rapat persiapan lomba HUT RI, kelompok A bersikeras memilih warna merah dengan biaya Rp85.000, sedangkan kelompok B menginginkan desain sederhana seharga Rp45.000 karena mempertimbangkan kondisi ekonomi semua teman. Diskusi memanas hingga hampir saling memboikot.',
    problemIdentification:
      'Terjadi kebuntuan komunikasi karena masing-masing kubu memaksakan kehendak tanpa mempertimbangkan keadilan sosial dan kemampuan seluruh anggota kelas.',
    analysisQuestions: [
      'Bagaimana cara mencari titik tengah antara kualitas desain dan keterjangkauan biaya?',
      'Prinsip Demokrasi Pancasila apa yang perlu diterapkan ketua kelas saat rapat mulai memanas?',
    ],
    solutionOptions: [
      {
        id: 'sol-2a',
        label: 'Ketua kelas menenangkan forum, membuka jajak pendapat opsi biaya terjangkau dengan desain bagus, lalu mengambil mufakat atau voting jujur.',
        isRecommended: true,
        feedback:
          'Benar! Mengedepankan musyawarah (Sila ke-4) dan mempertimbangkan kemampuan ekonomi seluruh teman (Sila ke-5) menghasilkan keputusan yang adil.',
      },
      {
        id: 'sol-2b',
        label: 'Ketua kelas langsung memutuskan memakai desain mahal karena didukung teman-teman dekatnya.',
        isRecommended: false,
        feedback:
          'Tidak adil. Keputusan sepihak tanpa musyawarah memberatkan sebagian siswa dan melanggar nilai kerakyatan.',
      },
    ],
    pancasilaConnection:
      'Menuntut penerapan Sila ke-4 (musyawarah yang bijaksana) dan Sila ke-5 (keadilan sosial bagi seluruh anggota kelas).',
    conclusion:
      'Perbedaan pendapat dalam musyawarah wajar terjadi; kuncinya adalah mendengar alasan pihak lain dengan kepala dingin.',
  },
  {
    id: 'case-3',
    chapterId: 'bab3',
    category: 'Intoleransi',
    title: 'Kasus 3: Penolakan Bekerja Kelompok karena Perbedaan Suku & Agama',
    description:
      'Guru membagi kelompok proyek seni secara acak. Seorang siswa meminta pindah kelompok dengan alasan tidak nyaman bekerja sama dengan teman yang berasal dari suku dan agama berbeda.',
    problemIdentification:
      'Muncul sikap eksklusif dan prasangka sosial yang menghambat semangat Bhinneka Tunggal Ika di ruang belajar.',
    analysisQuestions: [
      'Mengapa sekolah menjadi tempat terbaik untuk berlatih bekerja sama dengan orang yang berbeda latar belakang?',
      'Bagaimana langkah persuasif untuk menumbuhkan toleransi aktif dalam kelompok proyek tersebut?',
    ],
    solutionOptions: [
      {
        id: 'sol-3a',
        label: 'Tetap berada di kelompok, berkenalan dengan baik, membagi tugas secara adil sesuai keahlian masing-masing, dan menghormati waktu ibadah anggota.',
        isRecommended: true,
        feedback:
          'Sangat tepat! Ini wujud nyata Bhinneka Tunggal Ika dan toleransi aktif: perbedaan latar belakang justru memperkaya ide proyek kelompok.',
      },
      {
        id: 'sol-3b',
        label: 'Membiarkan siswa hanya berkelompok dengan teman yang sama sukunya sepanjang semester.',
        isRecommended: false,
        feedback:
          'Kurang mendidik. Membiarkan pengelompokan eksklusif memperkuat sekat prasangka dan menjauhkan pelajar dari nilai persatuan.',
      },
    ],
    pancasilaConnection:
      'Berkaitan langsung dengan Sila ke-1 (menghormati keyakinan), Sila ke-3 (Persatuan Indonesia), dan semboyan Bhinneka Tunggal Ika.',
    conclusion:
      'Keragaman akan menjadi kekuatan besar ketika kita mau membuka diri dan menilai teman dari sikap serta karyanya, bukan prasangka.',
  },
  {
    id: 'case-4',
    chapterId: 'bab1',
    category: 'Berita Bohong (Hoaks) Media Sosial',
    title: 'Kasus 4: Broadcast Pesan Palsu Jadwal Libur & Isu Sekolah',
    description:
      'Menjelang ujian, beredar pesan berantai di media sosial yang mengatasnamakan sekolah bahwa besok diliburkan karena gangguan gedung, disertai tautan mencurigakan. Beberapa siswa langsung meneruskannya tanpa konfirmasi sehingga orang tua panik.',
    problemIdentification:
      'Rendahnya literasi verifikasi (tabayyun/cek fakta) dan mudahnya penyebaran disinformasi di ruang digital pelajar.',
    analysisQuestions: [
      'Apa kerugian hukum dan sosial dari meneruskan pesan berantai palsu?',
      'Bagaimana langkah Saring Sebelum Sharing yang selaras dengan Pancasila dan UU ITE?',
    ],
    solutionOptions: [
      {
        id: 'sol-4a',
        label: 'Tidak meneruskan pesan, segera mengecek pengumuman resmi wali kelas atau pihak SMPN 16 Kota Serang, lalu mengklarifikasi di grup.',
        isRecommended: true,
        feedback:
          'Benar sekali! Verifikasi sumber resmi adalah wujud tanggung jawab hukum (Bab 2) dan kejujuran moral Pancasila (Bab 1).',
      },
      {
        id: 'sol-4b',
        label: 'Segera meneruskan ke semua grup sambil menulis "katanya sih libur, cek sendiri ya".',
        isRecommended: false,
        feedback:
          'Keliru. Menambahkan kata "katanya" tetap membuat kita ikut menyebarkan kepanikan dan hoaks.',
      },
    ],
    pancasilaConnection:
      'Menerapkan nilai kemanusiaan yang beradab, menjaga ketertiban umum (Bab 2), dan mencegah perpecahan (Sila ke-3).',
    conclusion:
      'Jempol yang bijak berhenti di verifikasi; satu klik verifikasi menyelamatkan ratusan orang dari berita bohong.',
  },
  {
    id: 'case-5',
    chapterId: 'bab4',
    category: 'Kepedulian Lingkungan',
    title: 'Kasus 5: Sampah Plastik Menumpuk di Selokan Sekitar Sekolah',
    description:
      'Setelah jam istirahat, masih terlihat bungkus jajanan plastik diselipkan di kolong meja dan selokan depan kelas, padahal tempat sampah terpilah sudah tersedia. Saat hujan deras, air selokan meluap ke teras kelas.',
    problemIdentification:
      'Ketidakseimbangan antara menuntut hak menikmati sekolah bersih dengan kelalaian menjalankan kewajiban menjaga lingkungan.',
    analysisQuestions: [
      'Bagaimana hubungan antara kebiasaan membuang sampah sembarangan dengan hak serta kewajiban warga sekolah?',
      'Inisiatif gotong royong apa yang bisa dijalankan siswa kelas VIII untuk mengatasi masalah ini?',
    ],
    solutionOptions: [
      {
        id: 'sol-5a',
        label: 'Menggerakkan piket terpadu, membawa tumbler/kotak makan pribadi untuk mengurangi plastik, dan saling mengingatkan dengan santun.',
        isRecommended: true,
        feedback:
          'Luar biasa! Langkah ini menyatukan kesadaran hak dan kewajiban (Bab 4) dengan nilai gotong royong Pancasila.',
      },
      {
        id: 'sol-5b',
        label: 'Menunggu petugas kebersihan sekolah membersihkan semuanya karena itu tugas mereka.',
        isRecommended: false,
        feedback:
          'Tidak tepat. Petugas kebersihan membantu merawat sekolah, tetapi tanggung jawab menjaga kebersihan adalah kewajiban seluruh warga sekolah.',
      },
    ],
    pancasilaConnection:
      'Wujud keseimbangan hak dan kewajiban (Pasal 28H UUD 1945 tentang lingkungan hidup sehat) serta semangat gotong royong.',
    conclusion:
      'Cinta tanah air dimulai dari merawat ruang kelas dan halaman sekolah kita sendiri setiap hari.',
  },
];

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-1',
    chapterId: 'bab1',
    title: 'Proyek 1: Kampanye Sekolah Aman Antiperundungan',
    summary: 'Merancang aksi kampanye positif di kelas dan mading sekolah untuk menghentikan ejekan verbal maupun perundungan digital.',
    objectives: [
      'Menumbuhkan empati pelajar sesuai nilai Sila ke-2 Pancasila.',
      'Membentuk komitmen kelas bebas perundungan yang ditandatangani bersama.',
    ],
    steps: [
      'Identifikasi bentuk perundungan yang sering dianggap candaan di sekitar sekolah.',
      'Susun ikrar kelas "Teman Aman, Belajar Nyaman" beserta slogan antiperundungan.',
      'Buat poster/kartu pesan empati dan tempel pada sudut kelas atau bagikan secara digital.',
      'Presentasikan komitmen kelas di hadapan guru pembimbing dan catat dampaknya.',
    ],
    roles: ['Ketua Kelompok & Koordinator', 'Penulis Pesan & Ikrar', 'Desainer Poster/Visual', 'Presenter & Dokumentasi'],
    expectedProduct: 'Piagam Ikrar Kelas Antiperundungan + 1 Poster Kampanye Positif',
    rubric: [
      { aspect: 'Ketepatan Pesan Pancasila', criteria: 'Pesan kampanye jelas memuat nilai kemanusiaan dan solusi aman.', maxPoints: 30 },
      { aspect: 'Kreativitas & Kerapian', criteria: 'Desain mudah dibaca, bahasa santun, dan menarik perhatian siswa.', maxPoints: 25 },
      { aspect: 'Kolaborasi Tim', criteria: 'Seluruh anggota menjalankan pembagian tugas secara aktif.', maxPoints: 25 },
      { aspect: 'Refleksi Dampak', criteria: 'Mampu menjelaskan perubahan sikap nyata setelah kampanye.', maxPoints: 20 },
    ],
  },
  {
    id: 'proj-2',
    chapterId: 'bab3',
    title: 'Proyek 2: Gerakan Toleransi & Peta Keberagaman Kelas',
    summary: 'Mendokumentasikan keragaman budaya, bahasa daerah, dan makanan khas keluarga teman sekelas menjadi galeri persatuan.',
    objectives: [
      'Mengenal latar belakang budaya teman tanpa prasangka atau stereotip.',
      'Memperkuat semangat Bhinneka Tunggal Ika di kelas VIII SMPN 16 Kota Serang.',
    ],
    steps: [
      'Wawancarai minimal 4 teman berbeda latar daerah/budaya tentang ungkapan santun dan makanan khasnya.',
      'Susun profil keberagaman tersebut dalam format kartu budaya atau infografis.',
      'Tambahkan daftar kata sopan dalam berbagai bahasa daerah (Sunda, Jawa Serang, Indonesia, dll.).',
      'Bagikan hasil wawancara dalam sesi apresiasi budaya kelas.',
    ],
    roles: ['Pewawancara', 'Pencatat & Penyunting Bahasa', 'Desainer Kartu Budaya', 'Moderator Apresiasi'],
    expectedProduct: 'Katalog Mini / Galeri "Wajah Keberagaman Kelas Kita"',
    rubric: [
      { aspect: 'Kedalaman Wawancara', criteria: 'Memuat data akurat minimal 4 budaya/kebiasaan teman.', maxPoints: 30 },
      { aspect: 'Sikap Menghargai', criteria: 'Bahasa penyajian penuh hormat dan bebas stereotip.', maxPoints: 30 },
      { aspect: 'Visual & Keterbacaan', criteria: 'Tampilan informatif dan mudah dipahami.', maxPoints: 20 },
      { aspect: 'Kerja Sama Kelompok', criteria: 'Tugas terbagi merata antar anggota.', maxPoints: 20 },
    ],
  },
  {
    id: 'proj-3',
    chapterId: 'bab4',
    title: 'Proyek 3: Aksi Gotong Royong Hijaukan Lingkungan Sekolah',
    summary: 'Merancang jadwal kerja bakti cerdas, pemilahan sampah kelas, dan kampanye pengurangan plastik sekali pakai.',
    objectives: [
      'Mempraktikkan keseimbangan hak atas kelas bersih dan kewajiban merawat lingkungan.',
      'Menguatkan budaya gotong royong dan kepedulian ekologis pelajar.',
    ],
    steps: [
      'Audit kondisi tempat sampah dan titik rawan sampah di area kelas.',
      'Rancang sistem pemilahan sampah organik-anorganik serta pengingat membawa botol minum ulang.',
      'Laksanakan kerja bakti bersama selama 30 menit dan dokumentasikan sebelum-sesudah.',
      'Evaluasi kebersihan kelas selama 1 minggu berjalan.',
    ],
    roles: ['Koordinator Audit Kebersihan', 'Pengatur Logistik Alat', 'Pembuat Label Pilah Sampah', 'Dokumentasi & Evaluasi'],
    expectedProduct: 'Laporan Aksi Kebersihan Sebelum–Sesudah & Jadwal Piket Inovatif',
    rubric: [
      { aspect: 'Dampak Nyata Lingkungan', criteria: 'Terjadi peningkatan kebersihan kelas yang terukur.', maxPoints: 35 },
      { aspect: 'Partisipasi Gotong Royong', criteria: 'Semua anggota terlibat aktif tanpa mengandalkan satu orang.', maxPoints: 25 },
      { aspect: 'Keberlanjutan Sistem', criteria: 'Ada aturan/jadwal piket yang jelas untuk minggu berikutnya.', maxPoints: 20 },
      { aspect: 'Refleksi Keterkaitan NKRI', criteria: 'Menjelaskan kaitan aksi dengan kewajiban warga negara.', maxPoints: 20 },
    ],
  },
  {
    id: 'proj-4',
    chapterId: 'bab1',
    title: 'Proyek 4: Poster Digital Penerapan Nilai Pancasila',
    summary: 'Membuat poster edukatif digital yang menerjemahkan satu sila Pancasila ke dalam 3 aksi nyata pelajar SMP.',
    objectives: [
      'Menerjemahkan konsep abstrak Pancasila menjadi kebiasaan konkret remaja.',
      'Melatih kreativitas komunikasi visual yang santun.',
    ],
    steps: [
      'Pilih fokus sila Pancasila beserta tantangan nyatanya di kehidupan remaja.',
      'Rumuskan 3 aksi nyata yang mudah dilakukan setiap hari (di rumah, sekolah, medsos).',
      'Susun tata letak poster dengan judul kuat, ilustrasi sederhana, dan identitas SMPN 16 Kota Serang.',
      'Presentasikan makna poster selama 2 menit di depan kelas.',
    ],
    roles: ['Perumus Konsep Nilai', 'Penulis Copywriting Singkat', 'Desainer Grafis', 'Penyaji Presentasi'],
    expectedProduct: '1 Poster Edukatif Digital Siap Cetak / Publikasi Mading',
    rubric: [
      { aspect: 'Kesesuaian Nilai Sila', criteria: 'Contoh aksi sesuai dengan makna sila Pancasila yang dipilih.', maxPoints: 30 },
      { aspect: 'Daya Tarik Visual', criteria: 'Komposisi warna, huruf, dan pesan mudah ditangkap.', maxPoints: 30 },
      { aspect: 'Orisinalitas', criteria: 'Menggunakan contoh autentik kehidupan pelajar setempat.', maxPoints: 20 },
      { aspect: 'Presentasi', criteria: 'Disampaikan jelas, percaya diri, dan santun.', maxPoints: 20 },
    ],
  },
  {
    id: 'proj-5',
    chapterId: 'bab2',
    title: 'Proyek 5: Video Pendek / Skenario Simulasi Musyawarah Kelas',
    summary: 'Menyusun naskah dan mempraktikkan simulasi rapat musyawarah mufakat menyelesaikan masalah nyata tata tertib kelas.',
    objectives: [
      'Memahami alur musyawarah demokratis sesuai Sila ke-4 dan aturan tata tertib (Bab 2 & Bab 4).',
      'Melatih keterampilan berbicara santun dan mendengar aktif saat berbeda pendapat.',
    ],
    steps: [
      'Tentukan topik musyawarah (misal: penggunaan gawai saat istirahat atau kesepakatan piket).',
      'Bagi peran: pimpinan rapat, notulis, dan 3–4 pembicara dengan sudut pandang berbeda.',
      'Susun naskah berdurasi 3–5 menit yang berakhir dengan kesepakatan adil.',
      'Peragakan atau rekam simulasi untuk ditonton dan diberi tanggapan kelas.',
    ],
    roles: ['Pimpinan Rapat (Moderator)', 'Notulis Kesepakatan', 'Pembicara Pro & Kontra Konstruktif', 'Kameramen / Pengarah'],
    expectedProduct: 'Naskah Skenario + Berita Acara Mufakat / Video Pendek 3 Menit',
    rubric: [
      { aspect: 'Alur Demokrasi Pancasila', criteria: 'Menampilkan dialog terbuka, bebas paksaan, menuju mufakat.', maxPoints: 35 },
      { aspect: 'Etika Komunikasi', criteria: 'Tidak memotong pembicaraan dan memakai bahasa santun.', maxPoints: 25 },
      { aspect: 'Kualitas Solusi', criteria: 'Keputusan akhir adil dan dapat dijalankan.', maxPoints: 20 },
      { aspect: 'Kesiapan & Ekspresi', criteria: 'Peran dimainkan natural dan meyakinkan.', maxPoints: 20 },
    ],
  },
  {
    id: 'proj-6',
    chapterId: 'bab2',
    title: 'Proyek 6: Gerakan Bijak Bermedia Sosial (Saring Sebelum Sharing)',
    summary: 'Membuat panduan cek fakta sederhana dan etika berkomentar bagi pelajar SMP agar terhindar dari hoaks dan pelanggaran hukum siber.',
    objectives: [
      'Meningkatkan kesadaran hukum digital (Bab 2) dan etika kemanusiaan (Bab 1).',
      'Membiasakan pelajar memeriksa sumber sebelum membagikan informasi.',
    ],
    steps: [
      'Kumpulkan 2 contoh informasi meragukan yang sering beredar di kalangan pelajar.',
      'Susun daftar periksa 4 langkah verifikasi berita sebelum dibagikan.',
      'Buat kartu pengingat "3 Detik Sebelum Klik Kirim" untuk grup kelas.',
      'Lakukan simulasi pengecekan berita bersama teman sekelas.',
    ],
    roles: ['Peneliti Contoh Hoaks', 'Penyusun Panduan Cek Fakta', 'Desainer Kartu Pengingat', 'Fasilitator Simulasi'],
    expectedProduct: 'Infografis Panduan Cek Fakta & Etika Komentar Pelajar',
    rubric: [
      { aspect: 'Akurasi Langkah Verifikasi', criteria: 'Langkah cek fakta logis, mudah diikuti, dan akurat.', maxPoints: 35 },
      { aspect: 'Kaitan Hukum & Pancasila', criteria: 'Jelas menautkan etika digital dengan hukum dan nilai kemanusiaan.', maxPoints: 25 },
      { aspect: 'Kepraktisan Panduan', criteria: 'Dapat langsung dipakai siswa saat menggunakan gawai.', maxPoints: 20 },
      { aspect: 'Kerja Tim & Refleksi', criteria: 'Semua anggota berkontribusi dan merefleksikan kebiasaan digitalnya.', maxPoints: 20 },
    ],
  },
];

export const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag-1',
    question: 'Menurut pendapatmu, apa fungsi utama Pancasila bagi kehidupan kita di sekolah?',
    options: [
      'Pedoman sikap saling menghormati, adil, dan kompak dengan sesama teman',
      'Hanya kalimat yang dibaca saat upacara bendera hari Senin',
      'Aturan khusus untuk pejabat pemerintahan saja',
    ],
    correctIndex: 0,
  },
  {
    id: 'diag-2',
    question: 'Jika ada aturan di kelas yang bertentangan dengan hak dasar siswa untuk belajar dengan aman, sikap yang tepat adalah...',
    options: [
      'Mengusulkan perbaikan aturan melalui musyawarah bersama wali kelas secara santun',
      'Membiarkannya saja atau merusak fasilitas kelas sebagai protes',
      'Membuat aturan sendiri tanpa berdiskusi dengan teman',
    ],
    correctIndex: 0,
  },
  {
    id: 'diag-3',
    question: 'Saat teman memiliki logat daerah atau agama yang berbeda dengan kita, tindakan Bhinneka Tunggal Ika yang benar adalah...',
    options: [
      'Menghormati perbedaannya dan mau bekerja sama dalam kegiatan belajar',
      'Menjauhinya agar tidak terjadi salah paham',
      'Menjadikan perbedaannya sebagai bahan lelucon agar akrab',
    ],
    correctIndex: 0,
  },
  {
    id: 'diag-4',
    question: 'Mana pernyataan yang menunjukkan keseimbangan antara hak dan kewajiban pelajar?',
    options: [
      'Menjaga kebersihan ruang kelas agar semua siswa dapat belajar dengan nyaman',
      'Menuntut nilai bagus tanpa pernah mengerjakan tugas dan piket',
      'Hanya menjalankan piket jika diawasi oleh guru piket',
    ],
    correctIndex: 0,
  },
];
