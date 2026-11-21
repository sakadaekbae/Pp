import { ChapterData, GlossaryItem, SchoolIdentity, StudentProfile } from '../types';

export const DEFAULT_IDENTITY: SchoolIdentity = {
  appName: 'Pancasila Smart Learning',
  schoolName: 'SMPN 16 Kota Serang',
  subject: 'Pendidikan Pancasila',
  gradePhase: 'Kelas VIII · Fase D',
  curriculum: 'Kurikulum Merdeka',
  approach: 'Deep Learning (Pembelajaran Mendalam)',
  teacherName: 'Unayah, S.Pd',
  developerName: '@UjeTea',
  academicYear: '2026/2027',
  teacherPin: '160845',
};

export const DEFAULT_STUDENTS: StudentProfile[] = [
  { id: 'stu-1', name: 'Nadia Putri Pratama', kelas: 'VIII-A', nisn: '0124881001' },
  { id: 'stu-2', name: 'Rizky Maulana Hakim', kelas: 'VIII-A', nisn: '0124881002' },
  { id: 'stu-3', name: 'Siti Aisyah Rahmawati', kelas: 'VIII-B', nisn: '0124881003' },
  { id: 'stu-4', name: 'Bagas Aditya Nugroho', kelas: 'VIII-C', nisn: '0124881004' },
];

const ROMAN_GRADES = ['III', 'IV', 'V', 'VI', 'VII', 'VIII'] as const;
const CLASS_SECTIONS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'] as const;

export const KELAS_GROUPS: { grade: string; options: string[] }[] = ROMAN_GRADES.map((grade) => ({
  grade,
  options: CLASS_SECTIONS.map((sec) => `${grade}-${sec}`),
}));

export const KELAS_OPTIONS: string[] = KELAS_GROUPS.flatMap((g) => g.options);

export const CHAPTERS_DATA: ChapterData[] = [
  {
    id: 'bab1',
    number: 1,
    semester: 'ganjil',
    title: 'Pancasila dalam Kehidupan Bangsaku',
    subtitle: 'Kedudukan Pancasila sebagai Dasar Negara, Pandangan Hidup, dan Ideologi Bangsa',
    tpCodes: ['TP 1.1', 'TP 1.2', 'TP 1.3'],
    tujuanPembelajaran: [
      'Menjelaskan kedudukan dan fungsi Pancasila sebagai dasar negara dan pandangan hidup bangsa Indonesia dengan argumen logis.',
      'Menganalisis Pancasila sebagai sumber dari segala sumber hukum dan ideologi terbuka dalam menghadapi tantangan zaman.',
      'Menerapkan nilai-nilai kelima sila Pancasila secara konsisten di lingkungan keluarga, sekolah, masyarakat, dan ruang digital.',
    ],
    pertanyaanPemantik: [
      'Mengapa bangsa Indonesia yang memiliki ratusan suku dan bahasa tetap membutuhkan satu dasar yang sama untuk hidup berdampingan?',
      'Apa yang terjadi jika aturan sekolah atau aturan media sosial kita bertentangan dengan nilai kemanusiaan dan keadilan?',
    ],
    apersepsi:
      'Bayangkan sebuah rumah besar yang dihuni keluarga dari berbagai daerah dengan kebiasaan berbeda. Tanpa fondasi yang kuat dan kesepakatan bersama, rumah itu mudah retak saat diterpa badai. Bagi Indonesia, Pancasila bukan sekadar lima kalimat yang dibaca saat upacara Senin di lapangan SMPN 16 Kota Serang, melainkan fondasi dan kompas perilaku kita sehari-hari.',
    mindfulPrompts: [
      'Apa yang sudah saya ketahui tentang peran Pancasila di luar teks upacara bendera?',
      'Apa yang ingin saya pelajari tentang cara menerapkan Pancasila di pergaulan remaja dan media sosial?',
      'Mengapa memahami nilai Pancasila penting bagi masa depan saya sebagai warga Kota Serang?',
    ],
    sections: [
      {
        id: 'bab1-sec1',
        title: '1. Pancasila sebagai Dasar Negara dan Pandangan Hidup',
        conceptExplanation:
          'Sebagai Dasar Negara (Philosophische Grondslag), Pancasila menjadi fondasi berdirinya Negara Kesatuan Republik Indonesia dan sumber dari segala sumber hukum nasional (UU No. 12 Tahun 2011). Artinya, seluruh undang-undang hingga tata tertib sekolah tidak boleh bertentangan dengan nilai Pancasila. Sementara itu, sebagai Pandangan Hidup Bangsa (Way of Life), Pancasila berfungsi sebagai pedoman moral dan petunjuk arah warga negara dalam berpikir, bersikap, dan mengambil keputusan setiap hari.',
        whyItMatters:
          'Tanpa dasar negara yang disepakati, peraturan akan dibuat semena-mena oleh kelompok terkuat. Tanpa pandangan hidup bersama, masyarakat mudah terpecah oleh egoisme, perundungan, dan hoaks.',
        realLifeExamples: [
          {
            context: 'Di Sekolah (SMPN 16 Kota Serang)',
            detail:
              'Menyusun tata tertib kelas melalui musyawarah wali kelas dan pengurus OSIS mencerminkan Pancasila sebagai dasar aturan yang adil, sedangkan menghormati teman yang berbeda agama saat beribadah merupakan wujud pandangan hidup.',
          },
          {
            context: 'Di Media Sosial',
            detail:
              'Memeriksa kebenaran berita sebelum membagikan ke grup WhatsApp kelas menerapkan Sila ke-2 (tidak menyakiti martabat orang lain) dan Sila ke-3 (menjaga persatuan).',
          },
        ],
        comparison: {
          title: 'Perbandingan Kedudukan Pancasila',
          leftLabel: 'Sebagai Dasar Negara',
          leftPoints: [
            'Bersifat yuridis-konstitusional (mengikat secara hukum)',
            'Menjadi sumber penyusunan UUD NRI 1945 dan peraturan di bawahnya',
            'Mengatur penyelenggaraan pemerintahan dan lembaga negara',
          ],
          rightLabel: 'Sebagai Pandangan Hidup',
          rightPoints: [
            'Bersifat etis dan moral dalam kehidupan sehari-hari',
            'Menjadi pedoman sikap keluarga, pelajar, dan masyarakat',
            'Membentuk karakter gotong royong, toleransi, dan keadilan sosial',
          ],
        },
      },
      {
        id: 'bab1-sec2',
        title: '2. Pancasila sebagai Ideologi Terbuka & Satu Kesatuan Utuh',
        conceptExplanation:
          'Kelima sila Pancasila bersifat hierarkis-piramidal dan saling menjiwai: Sila pertama menjiwai sila kedua hingga kelima, dan sila kelima dijiwai oleh sila-sila sebelumnya. Sebagai ideologi terbuka, nilai dasar Pancasila (Ketuhanan, Kemanusiaan, Persatuan, Kerakyatan, Keadilan) bersifat tetap, namun nilai praksisnya dapat menyesuaikan perkembangan teknologi, seperti etika kecerdasan buatan dan literasi digital.',
        whyItMatters:
          'Ideologi terbuka membuat Pancasila tidak kaku tertinggal zaman, melainkan relevan membimbing pelajar menghadapi tantangan abad ke-21 tanpa kehilangan jati diri bangsa.',
        realLifeExamples: [
          {
            context: 'Di Lingkungan Keluarga',
            detail:
              'Membagi jadwal pekerjaan rumah secara adil antara anak laki-laki dan perempuan sambil tetap saling menyayangi menunjukkan keterpaduan Sila ke-2 dan Sila ke-5.',
          },
          {
            context: 'Gotong Royong Masyarakat Kota Serang',
            detail:
              'Menggalang donasi digital (QRIS) atau kerja bakti membersihkan selokan warga menjelang musim hujan adalah adaptasi nilai gotong royong di era modern.',
          },
        ],
      },
    ],
    infographic: {
      title: 'Peta Penerapan Nilai Pancasila Pelajar Kelas VIII',
      subtitle: 'Simulasi indeks kebiasaan positif warga kelas dalam 1 semester',
      metrics: [
        { label: 'Berdoa & Toleransi (Sila 1)', value: 92, unit: '%', note: 'Menghormati ibadah teman berbeda agama' },
        { label: 'Anti-Perundungan (Sila 2)', value: 88, unit: '%', note: 'Menjaga ucapan lisan & komentar medsos' },
        { label: 'Gotong Royong Piket (Sila 3)', value: 85, unit: '%', note: 'Kompak menjaga kebersihan kelas' },
        { label: 'Musyawarah Kelas (Sila 4)', value: 90, unit: '%', note: 'Mengutamakan mufakat daripada ego' },
        { label: 'Keadilan Tugas (Sila 5)', value: 87, unit: '%', note: 'Pembagian peran kelompok merata' },
      ],
      takeaway: 'Kelima sila bekerja bersama sebagai satu sistem nilai yang menjaga iklim sekolah aman dan inklusif.',
    },
    videoSlides: [
      {
        id: 'b1-v1',
        title: 'Mengapa Bangsa Butuh Fondasi?',
        narration:
          'Sama seperti bangunan sekolah yang berdiri kokoh karena fondasi beton di bawah tanah, negara Indonesia berdiri di atas dasar negara Pancasila yang disepakati para pendiri bangsa pada 18 Agustus 1945.',
        keyPoints: ['Fondasi hukum nasional', 'Disepakati secara mufakat oleh para pendiri bangsa', 'Melindungi seluruh rakyat Indonesia'],
        visualTag: 'Dasar Negara',
      },
      {
        id: 'b1-v2',
        title: 'Dasar Negara vs Pandangan Hidup',
        narration:
          'Sebagai Dasar Negara, Pancasila mengatur undang-undang dan lembaga negara. Sebagai Pandangan Hidup, Pancasila menuntun cara kita berbicara dengan orang tua, guru, dan teman sebaya.',
        keyPoints: ['Yuridis: aturan resmi negara', 'Etis: kebiasaan baik harian', 'Saling melengkapi dalam kehidupan bermasyarakat'],
        visualTag: 'Dua Peran Utama',
      },
      {
        id: 'b1-v3',
        title: 'Lima Sila yang Saling Menguatkan',
        narration:
          'Tidak ada sila yang berdiri sendiri. Seseorang yang rajin beribadah (Sila 1) seharusnya juga sopan kepada sesama (Sila 2), menjaga persatuan (Sila 3), mau bermusyawarah (Sila 4), dan bersikap adil (Sila 5).',
        keyPoints: ['Hierarkis & sistematis', 'Iman melahirkan empati', 'Musyawarah melahirkan keadilan'],
        visualTag: 'Kesatuan Sila',
      },
      {
        id: 'b1-v4',
        title: 'Pancasila di Era Digital',
        narration:
          'Sebagai ideologi terbuka, Pancasila tetap relevan saat kita memakai gawai. Menghindari komentar kebencian, tidak menyebar hoaks, dan memakai internet untuk karya positif adalah wujud nyata Pancasila masa kini.',
        keyPoints: ['Saring sebelum sharing', 'Hormati privasi teman', 'Gunakan media sosial untuk kolaborasi'],
        visualTag: 'Ideologi Terbuka',
      },
    ],
    youtubeUrl: '',
    rangkuman: [
      'Pancasila sebagai dasar negara merupakan sumber dari segala sumber hukum negara Indonesia.',
      'Pancasila sebagai pandangan hidup menjadi pedoman moral warga negara dalam keluarga, sekolah, masyarakat, dan ruang digital.',
      'Kelima sila Pancasila merupakan satu kesatuan utuh yang saling menjiwai.',
      'Sebagai ideologi terbuka, nilai praksis Pancasila dapat menyesuaikan perkembangan zaman tanpa mengubah nilai dasarnya.',
    ],
    joyfulCheck: {
      question: 'Ketika ketua kelas memutuskan tujuan study tour melalui musyawarah yang adil dan semua anggota menerima hasilnya dengan lapang dada, sila apa saja yang tampak berpadu?',
      options: [
        'Sila ke-3 (Persatuan) dan Sila ke-4 (Kerakyatan/Musyawarah)',
        'Hanya Sila ke-1 tanpa keterkaitan sila lain',
        'Keinginan pribadi kelompok mayoritas semata',
      ],
      correctIndex: 0,
      explanation:
        'Tepat! Musyawarah mencerminkan Sila ke-4, sedangkan menerima hasil demi menjaga kekompakan kelas mencerminkan Sila ke-3.',
    },
  },
  {
    id: 'bab2',
    number: 2,
    semester: 'ganjil',
    title: 'Pedoman Negaraku',
    subtitle: 'Konstitusi, Sejarah Perumusan & Tata Urutan UUD NRI Tahun 1945',
    tpCodes: ['TP 2.1', 'TP 2.2', 'TP 2.3'],
    tujuanPembelajaran: [
      'Menjelaskan makna konstitusi serta kedudukan UUD NRI Tahun 1945 sebagai hukum dasar tertulis tertinggi di Indonesia.',
      'Menganalisis makna alinea Pembukaan UUD NRI Tahun 1945 dan hubungannya dengan tata urutan peraturan perundang-undangan.',
      'Menunjukkan sikap sadar hukum dan disiplin terhadap norma serta tata tertib dalam kehidupan sekolah dan bermasyarakat.',
    ],
    pertanyaanPemantik: [
      'Mengapa permainan sepak bola tidak akan berjalan lancar tanpa wasit dan buku aturan resmi?',
      'Bagaimana cara memastikan aturan OSIS atau Peraturan Daerah tidak melanggar hak dasar warga negara?',
    ],
    apersepsi:
      'Setiap pertandingan olahraga membutuhkan aturan main yang jelas agar semua pemain diperlakukan adil. Negara juga membutuhkan konstitusi sebagai aturan dasar tertinggi yang membatasi kekuasaan pejabat sekaligus melindungi hak setiap warga negara, termasuk hak kalian untuk memperoleh pendidikan yang bermutu.',
    mindfulPrompts: [
      'Aturan apa saja yang setiap hari saya patuhi di rumah dan di SMPN 16 Kota Serang?',
      'Apa perbedaan antara aturan tertulis negara dengan kebiasaan sopan santun di masyarakat?',
      'Mengapa saya perlu mengenal isi UUD NRI Tahun 1945 sejak duduk di bangku SMP?',
    ],
    sections: [
      {
        id: 'bab2-sec1',
        title: '1. Makna Konstitusi dan Fungsi UUD NRI Tahun 1945',
        conceptExplanation:
          'Konstitusi adalah hukum dasar yang menjadi pegangan dalam penyelenggaraan suatu negara. Konstitusi terbagi menjadi konstitusi tertulis (Undang-Undang Dasar) dan konstitusi tidak tertulis (konvensi/kebiasaan ketatanegaraan). Di Indonesia, UUD NRI Tahun 1945 berfungsi sebagai pembatas kekuasaan agar tidak sewenang-wenang, pengatur hubungan antarlembaga negara (MPR, DPR, Presiden, MA, MK, BPK), serta pelindung hak asasi warga negara.',
        whyItMatters:
          'Tanpa konstitusi, penguasa bisa mengubah aturan sesuka hati dan hak warga untuk bersekolah, beribadah, atau berpendapat tidak memiliki jaminan hukum.',
        realLifeExamples: [
          {
            context: 'Pasal 31 UUD NRI Tahun 1945',
            detail:
              'Setiap warga negara berhak mendapat pendidikan, dan pemerintah wajib membiayainya. Program wajib belajar dan dana BOS di sekolah adalah wujud pelaksanaan pasal ini.',
          },
          {
            context: 'Konvensi Ketatanegaraan',
            detail:
              'Pidato kenegaraan Presiden setiap tanggal 16 Agustus di hadapan DPR/MPR merupakan contoh konstitusi tidak tertulis yang selalu dipraktikkan.',
          },
        ],
        comparison: {
          title: 'Konstitusi Tertulis vs Tidak Tertulis',
          leftLabel: 'Konstitusi Tertulis (UUD 1945)',
          leftPoints: [
            'Dituangkan dalam naskah resmi yang disahkan oleh lembaga berwenang',
            'Memiliki pasal-pasal yang jelas dan mengikat secara formal',
            'Perubahannya (amandemen) mengikuti prosedur khusus Pasal 37',
          ],
          rightLabel: 'Konstitusi Tidak Tertulis (Konvensi)',
          rightPoints: [
            'Berupa kebiasaan ketatanegaraan yang berlangsung berulang-ulang',
            'Tidak tercantum eksplisit dalam pasal UUD, namun ditaati',
            'Tidak boleh bertentangan dengan isi UUD NRI Tahun 1945',
          ],
        },
      },
      {
        id: 'bab2-sec2',
        title: '2. Tata Urutan Peraturan Perundang-undangan (UU No. 12 Tahun 2011)',
        conceptExplanation:
          'Peraturan di Indonesia disusun secara berjenjang (hierarkis) menurut asas Lex Superior Derogat Legi Inferiori—aturan yang lebih rendah tidak boleh bertentangan dengan aturan yang lebih tinggi. Urutannya dari tertinggi ke terendah adalah: (1) UUD NRI Tahun 1945, (2) Ketetapan MPR, (3) UU/Perppu, (4) Peraturan Pemerintah, (5) Peraturan Presiden, (6) Perda Provinsi, dan (7) Perda Kabupaten/Kota.',
        whyItMatters:
          'Hierarki hukum memastikan aturan lalu lintas di Kota Serang, aturan kebersihan kota, hingga kebijakan sekolah selaras dengan tujuan negara dalam Pembukaan UUD 1945.',
        realLifeExamples: [
          {
            context: 'Kepatuhan Berlalu Lintas di Kota Serang',
            detail:
              'Memakai helm SNI dan tidak mengendarai motor sebelum memiliki SIM (usia 17 tahun) adalah kepatuhan terhadap UU Lalu Lintas dan Angkutan Jalan.',
          },
          {
            context: 'Tata Tertib Sekolah',
            detail:
              'Aturan disiplin berpakaian, jam masuk kelas, dan larangan perundungan di SMPN 16 Kota Serang disusun selaras dengan UU Perlindungan Anak dan Permendikbud.',
          },
        ],
      },
    ],
    infographic: {
      title: 'Piramida Tata Urutan Peraturan Perundang-undangan RI',
      subtitle: 'Berdasarkan Pasal 7 Ayat (1) UU Nomor 12 Tahun 2011 jo. UU No. 13 Tahun 2022',
      metrics: [
        { label: 'Tingkat 1: UUD NRI Tahun 1945', value: 100, unit: 'Tertinggi', note: 'Hukum dasar tertulis negara' },
        { label: 'Tingkat 2: Ketetapan MPR', value: 85, unit: 'Tingkat 2', note: 'Tap MPR yang masih berlaku' },
        { label: 'Tingkat 3: UU / Perppu', value: 72, unit: 'Tingkat 3', note: 'Dibentuk DPR bersama Presiden' },
        { label: 'Tingkat 4-5: PP & Perpres', value: 58, unit: 'Tingkat 4-5', note: 'Aturan pelaksana undang-undang' },
        { label: 'Tingkat 6-7: Perda Provinsi & Kab/Kota', value: 45, unit: 'Tingkat 6-7', note: 'Contoh: Perda Kota Serang' },
      ],
      takeaway: 'Peraturan di tingkat bawah wajib bersumber dan tidak boleh bertentangan dengan aturan di atasnya.',
    },
    videoSlides: [
      {
        id: 'b2-v1',
        title: 'Mengapa Negara Membutuhkan Konstitusi?',
        narration:
          'Konstitusi berfungsi sebagai kontrak bersama antara rakyat dan pemimpin. Dengan UUD NRI Tahun 1945, kekuasaan pemerintah dibatasi dan hak rakyat seperti hak bersekolah dijamin.',
        keyPoints: ['Membatasi kekuasaan pejabat', 'Menjamin hak asasi manusia', 'Menjaga ketertiban nasional'],
        visualTag: 'Fungsi Konstitusi',
      },
      {
        id: 'b2-v2',
        title: 'Empat Alinea Pembukaan UUD 1945',
        narration:
          'Pembukaan UUD 1945 memuat alasan kemerdekaan (menolak penjajahan), cita-cita negara (merdeka, bersatu, berdaulat, adil, makmur), pernyataan kemerdekaan atas rahmat Tuhan, dan empat tujuan negara beserta Pancasila.',
        keyPoints: ['Menolak segala bentuk penjajahan', 'Cita-cita keadilan & kemakmuran', 'Memuat rumusan resmi Pancasila'],
        visualTag: 'Pembukaan UUD',
      },
      {
        id: 'b2-v3',
        title: 'Hierarki Aturan Hukum Indonesia',
        narration:
          'Bayangkan tangga bertingkat dari UUD 1945 di puncak hingga Perda Kota Serang di tingkat daerah. Peraturan daerah tidak boleh melanggar UU maupun UUD.',
        keyPoints: ['Asas aturan tinggi mengalahkan aturan rendah', '7 jenjang resmi UU No. 12/2011', 'Uji materi dilakukan oleh MK dan MA'],
        visualTag: 'Hierarki Hukum',
      },
      {
        id: 'b2-v4',
        title: 'Budaya Sadar Hukum Pelajar',
        narration:
          'Sadar hukum bukan karena takut dihukum guru piket, melainkan kesadaran bahwa antre di kantin, memakai helm, dan jujur saat ulangan membuat semua warga sekolah merasa aman.',
        keyPoints: ['Disiplin dari kesadaran diri', 'Menghormati hak teman lain', 'Berani melaporkan pelanggaran secara santun'],
        visualTag: 'Sadar Hukum',
      },
    ],
    youtubeUrl: '',
    rangkuman: [
      'UUD NRI Tahun 1945 adalah konstitusi tertulis dan hukum dasar tertinggi negara Republik Indonesia.',
      'Pembukaan UUD NRI Tahun 1945 terdiri atas 4 alinea yang tidak dapat diubah karena memuat dasar negara Pancasila dan tujuan bernegara.',
      'Tata urutan peraturan perundang-undangan menjamin kepastian hukum dari tingkat pusat hingga daerah (Perda Kota/Kabupaten).',
      'Pelajar menunjukkan kesadaran konstitusi dengan menaati tata tertib sekolah dan aturan hukum dengan penuh tanggung jawab.',
    ],
    joyfulCheck: {
      question: 'Apabila sebuah Peraturan Daerah (Perda) terbukti bertentangan dengan Undang-Undang di atasnya, asas hukum apa yang berlaku?',
      options: [
        'Aturan yang lebih tinggi mengesampingkan aturan yang lebih rendah',
        'Perda tetap menang karena dibuat paling akhir',
        'Kedua aturan dihapus bersamaan tanpa kajian',
      ],
      correctIndex: 0,
      explanation:
        'Benar! Sesuai asas Lex Superior Derogat Legi Inferiori, peraturan yang lebih rendah tidak boleh bertentangan dengan peraturan yang lebih tinggi.',
    },
  },
  {
    id: 'bab3',
    number: 3,
    semester: 'genap',
    title: 'Bhinneka Tunggal Ika',
    subtitle: 'Keberagaman Masyarakat, Toleransi Aktif, dan Harmoni dalam Persatuan',
    tpCodes: ['TP 3.1', 'TP 3.2', 'TP 3.3'],
    tujuanPembelajaran: [
      'Mengidentifikasi faktor penyebab keberagaman suku, agama, ras, dan antargolongan (SARA) di Indonesia sebagai kekayaan bangsa.',
      'Menganalisis potensi konflik akibat stereotip dan intoleransi serta merumuskan strategi pencegahannya.',
      'Mempraktikkan sikap toleransi aktif, empati, dan kolaborasi lintas perbedaan di sekolah dan lingkungan sekitar.',
    ],
    pertanyaanPemantik: [
      'Mengapa pelangi terlihat indah justru karena tersusun dari warna-warna yang berbeda, bukan satu warna saja?',
      'Bagaimana cara menyikapi teman yang memiliki logat daerah, selera musik, atau keyakinan agama berbeda dengan kita?',
    ],
    apersepsi:
      'Semboyan Bhinneka Tunggal Ika diambil dari kitab Sutasoma karya Mpu Tantular yang berarti "Berbeda-beda tetapi tetap satu jua". Di kelas VIII SMPN 16 Kota Serang sendiri, teman-teman kita bisa berasal dari latar belakang suku Sunda, Jawa Serang (Jaseng), Betawi, Minang, Batak, hingga beragam kebiasaan keluarga. Perbedaan itu bukan penghalang, melainkan kekuatan untuk saling belajar.',
    mindfulPrompts: [
      'Keberagaman apa saja yang paling sering saya temui di kelas dan lingkungan tempat tinggal saya?',
      'Pernahkah saya tanpa sadar menilai teman hanya dari stereotip atau prasangka?',
      'Bagaimana cara saya menciptakan suasana kelas yang ramah bagi siapa pun?',
    ],
    sections: [
      {
        id: 'bab3-sec1',
        title: '1. Mengapa Indonesia Sangat Beragam?',
        conceptExplanation:
          'Keberagaman Indonesia dipengaruhi oleh letak strategis di antara dua benua dan dua samudra, kondisi negara kepulauan (lebih dari 17.000 pulau) yang membentuk budaya lokal unik, perbedaan kondisi alam (pesisir, pegunungan, dataran rendah), sejarah perdagangan internasional yang membawa ragam agama dan budaya, serta keterbukaan masyarakat terhadap perubahan.',
        whyItMatters:
          'Memahami sebab geografis dan historis membuat kita menyadari bahwa perbedaan adalah fakta alami bangsa Indonesia, bukan kesalahan yang harus diseragamkan.',
        realLifeExamples: [
          {
            context: 'Bahasa & Budaya Lokal di Kota Serang',
            detail:
              'Di Kota Serang berdampingan penutur bahasa Jawa Serang, Sunda Banten, dan bahasa Indonesia dari berbagai daerah perantau dalam satu ruang sekolah yang harmonis.',
          },
          {
            context: 'Festival Budaya Sekolah',
            detail:
              'Pameran kuliner tradisional dan pakaian adat Nusantara saat peringatan Hari Kartini atau Sumpah Pemuda memperkaya wawasan siswa tanpa memandang satu budaya lebih unggul.',
          },
        ],
      },
      {
        id: 'bab3-sec2',
        title: '2. Melampaui Etnosentrisme Menuju Toleransi Aktif',
        conceptExplanation:
          'Konflik sering muncul bukan karena perbedaan itu sendiri, melainkan karena prasangka (prejudice), stereotip (pelabelan sepihak), dan etnosentrisme (menganggap budayanya paling hebat). Lawannya adalah toleransi aktif: bukan sekadar diam membiarkan, tetapi aktif menghormati, bekerja sama, dan melindungi teman yang berbeda agar tidak dirundung atau dikucilkan.',
        whyItMatters:
          'Pelajar SMP berada pada fase membangun persahabatan; kemampuan mengelola perbedaan tanpa mengejek fisik, suku, atau keyakinan mencegah perundungan dan perpecahan.',
        realLifeExamples: [
          {
            context: 'Kerja Kelompok Lintas Latar Belakang',
            detail:
              'Membagi kelompok belajar secara acak (tidak melulu satu geng) melatih siswa berkomunikasi efektif dengan teman dari latar belakang berbeda.',
          },
          {
            context: 'Sopan Santun di Grup Chat Kelas',
            detail:
              'Tidak membuat stiker atau lelucon yang merendahkan logat daerah, warna kulit, atau ibadah agama teman lain.',
          },
        ],
        comparison: {
          title: 'Toleransi Pasif vs Toleransi Aktif',
          leftLabel: 'Toleransi Pasif',
          leftPoints: [
            'Sekadar tidak mengganggu orang yang berbeda',
            'Cenderung menjaga jarak dan kurang mau berdialog',
            'Diam saja ketika ada teman minoritas diejek',
          ],
          rightLabel: 'Toleransi Aktif (Yang Kita Bangun)',
          rightPoints: [
            'Mau mengenal, berdialog, dan bekerja sama lintas perbedaan',
            'Memberi ruang dan dukungan saat teman menjalankan ibadah/tradisi',
            'Berani membela dan menegur jika terjadi diskriminasi atau perundungan',
          ],
        },
      },
    ],
    infographic: {
      title: 'Potret Keragaman & Kunci Harmoni Indonesia',
      subtitle: 'Data perkiraan kekayaan sosial-budaya Nusantara sebagai modal persatuan',
      metrics: [
        { label: 'Kelompok Suku & Subsuku', value: 1340, unit: 'suku', note: 'Menurut sensus BPS' },
        { label: 'Bahasa Daerah Nusantara', value: 718, unit: 'bahasa', note: 'Terhubung oleh Bahasa Indonesia' },
        { label: 'Pulau di Nusantara', value: 17001, unit: 'pulau', note: 'Disatukan semangat NKRI' },
        { label: 'Agama Resmi Dilindungi', value: 6, unit: 'agama', note: 'Plus penghayat kepercayaan (UUD 1945)' },
      ],
      takeaway: 'Bahasa Indonesia, Pancasila, dan Bhinneka Tunggal Ika menjadi jembatan yang menyatukan seluruh keragaman tersebut.',
    },
    videoSlides: [
      {
        id: 'b3-v1',
        title: 'Arti Sesungguhnya Bhinneka Tunggal Ika',
        narration:
          'Semboyan Bhinneka Tunggal Ika tidak menuntut semua orang menjadi seragam, melainkan menyatukan perbedaan dalam tujuan bersama: Indonesia yang damai dan adil.',
        keyPoints: ['Dari Kitab Sutasoma karya Mpu Tantular', 'Berbeda bukan berarti bermusuhan', 'Persatuan di atas keragaman'],
        visualTag: 'Makna Semboyan',
      },
      {
        id: 'b3-v2',
        title: 'Bahaya Stereotip & Etnosentrisme',
        narration:
          'Menilai seluruh kelompok hanya dari satu kejadian buruk adalah stereotip. Jika dibiarkan, stereotip berubah menjadi ejekan dan perundungan di sekolah.',
        keyPoints: ['Kenali individu, bukan labelnya', 'Tolak candaan berbau SARA', 'Cek fakta sebelum menilai'],
        visualTag: 'Cegah Konflik',
      },
      {
        id: 'b3-v3',
        title: 'Mempraktikkan Toleransi Aktif di Sekolah',
        narration:
          'Toleransi aktif tampak saat kita mau duduk dan berdiskusi bersama siapa saja, menjaga ketenangan saat teman berdoa, dan menghargai tradisi budaya teman.',
        keyPoints: ['Berempati pada teman', 'Bekerja sama dalam proyek', 'Berani berkata tidak pada diskriminasi'],
        visualTag: 'Toleransi Aktif',
      },
      {
        id: 'b3-v4',
        title: 'Gotong Royong sebagai Perekat Bangsa',
        narration:
          'Saat kerja bakti membersihkan kelas atau membantu korban bencana, semua perbedaan latar belakang melebur menjadi satu kekuatan kemanusiaan.',
        keyPoints: ['Ringan sama dijinjing', 'Menumbuhkan empati sosial', 'Memperkuat ikatan kebangsaan'],
        visualTag: 'Gotong Royong',
      },
    ],
    youtubeUrl: '',
    rangkuman: [
      'Keberagaman Indonesia lahir dari faktor geografis kepulauan, letak strategis, sejarah, dan kondisi alam.',
      'Bhinneka Tunggal Ika menegaskan bahwa persatuan tidak menghilangkan identitas budaya lokal, melainkan menghargainya.',
      'Etnosentrisme dan stereotip adalah penghambat persatuan yang harus dicegah melalui literasi dan dialog.',
      'Toleransi aktif berarti saling menghormati, berempati, dan bekerja sama dalam kebaikan tanpa memandang perbedaan.',
    ],
    joyfulCheck: {
      question: 'Ketika ada siswa pindahan dengan logat daerah yang khas dan mulai diejek di kelas, tindakan apa yang paling mencerminkan toleransi aktif?',
      options: [
        'Menyambutnya, mengajak mengobrol dan bergabung dalam kelompok, serta mengingatkan teman lain agar berhenti mengejek',
        'Ikut tertawa sebentar lalu diam agar tidak dianggap ikut campur',
        'Memintanya segera menghilangkan logat daerahnya supaya tidak diejek',
      ],
      correctIndex: 0,
      explanation:
        'Hebat! Toleransi aktif melindungi teman dari perundungan sekaligus merangkul perbedaan secara ramah.',
    },
  },
  {
    id: 'bab4',
    number: 4,
    semester: 'genap',
    title: 'Negara Kesatuan Republik Indonesia',
    subtitle: 'Keutuhan NKRI, Demokrasi Pancasila, serta Keseimbangan Hak dan Kewajiban',
    tpCodes: ['TP 4.1', 'TP 4.2', 'TP 4.3'],
    tujuanPembelajaran: [
      'Menjelaskan bentuk Negara Kesatuan Republik Indonesia (NKRI) dan sistem pemerintahan daerah dalam kerangka persatuan nasional.',
      'Menganalisis praktik demokrasi Pancasila melalui musyawarah mufakat dan pemilihan umum yang jujur dan adil.',
      'Menyeimbangkan pelaksanaan hak dan kewajiban sebagai murid serta warga negara yang bertanggung jawab.',
    ],
    pertanyaanPemantik: [
      'Mengapa hak untuk menyampaikan pendapat di sekolah tetap harus disertai kewajiban menghormati orang lain?',
      'Bagaimana cara pelajar SMP ikut menjaga keutuhan NKRI di zaman sekarang tanpa harus memanggul senjata?',
    ],
    apersepsi:
      'Indonesia bukan gabungan negara-negara kecil yang terpisah, melainkan satu kesatuan wilayah dari Sabang sampai Merauke, dari Miangas sampai Pulau Rote. Dalam satu negara kesatuan itu, setiap daerah seperti Kota Serang memiliki pemerintahan daerah untuk melayani warganya, sementara suara kita sebagai warga dihargai melalui demokrasi Pancasila.',
    mindfulPrompts: [
      'Hak apa saja yang sudah saya terima sebagai siswa SMPN 16 Kota Serang, dan kewajiban apa yang menyertainya?',
      'Bagaimana pengalaman saya mengikuti pemilihan ketua OSIS atau musyawarah kelas?',
      'Apa kontribusi nyata yang bisa saya lakukan untuk menjaga nama baik sekolah dan bangsa?',
    ],
    sections: [
      {
        id: 'bab4-sec1',
        title: '1. Makna NKRI dan Otonomi Daerah',
        conceptExplanation:
          'Pasal 1 Ayat (1) UUD NRI Tahun 1945 menegaskan bahwa "Negara Indonesia ialah Negara Kesatuan, yang berbentuk Republik." Artinya, kedaulatan berada di satu pemerintahan pusat yang membawahi provinsi dan kabupaten/kota. Melalui otonomi daerah, Pemerintah Kota Serang diberi kewenangan mengatur urusan lokal seperti kebersihan kota, pendidikan dasar, dan layanan publik agar pembangunan lebih cepat dan tepat sasaran tanpa memisahkan diri dari NKRI.',
        whyItMatters:
          'Otonomi daerah dalam bingkai NKRI menjamin suara masyarakat daerah didengar dan kebutuhan lokal terlayani secara adil sekaligus menjaga persatuan nasional.',
        realLifeExamples: [
          {
            context: 'Pelayanan Pendidikan Daerah',
            detail:
              'Dinas Pendidikan Kota Serang mendukung sarana belajar SMPN 16 Kota Serang mengikuti standar kurikulum nasional.',
          },
          {
            context: 'Menjaga Ruang Publik & Lingkungan',
            detail:
              'Membuang sampah pada tempatnya, merawat fasilitas taman kota, dan mencintai produk lokal UMKM Banten merupakan wujud bela negara non-militer.',
          },
        ],
      },
      {
        id: 'bab4-sec2',
        title: '2. Demokrasi Pancasila, Hak, dan Kewajiban Warga Negara',
        conceptExplanation:
          'Demokrasi adalah pemerintahan dari rakyat, oleh rakyat, dan untuk rakyat. Di Indonesia, demokrasi dijiwai nilai Pancasila: mengutamakan musyawarah untuk mufakat, menghargai perbedaan pendapat tanpa anarkisme, dan melaksanakan pemungutan suara (voting) yang jujur serta adil apabila mufakat belum tercapai. Demokrasi yang sehat selalu menuntut keseimbangan antara hak (sesuatu yang layak diterima) dan kewajiban (tanggung jawab yang harus ditunaikan).',
        whyItMatters:
          'Menuntut hak tanpa menjalankan kewajiban melahirkan kekacauan, sedangkan hanya menuntut kewajiban tanpa memenuhi hak melahirkan ketidakadilan.',
        realLifeExamples: [
          {
            context: 'Pemilihan Ketua OSIS SMPN 16 Kota Serang',
            detail:
              'Setiap siswa berhak memilih dan dipilih secara LUBER JURDIL (Langsung, Umum, Bebas, Rahasia, Jujur, Adil), serta berkewajiban mendukung program pengurus terpilih.',
          },
          {
            context: 'Hak dan Kewajiban di Kelas',
            detail:
              'Siswa berhak belajar di kelas yang bersih dan tenang (Pasal 31 UUD 1945) dan berkewajiban ikut jadwal piket serta tidak membuat gaduh saat teman belajar.',
          },
        ],
        comparison: {
          title: 'Keseimbangan Hak dan Kewajiban Pelajar',
          leftLabel: 'Hak Murid',
          leftPoints: [
            'Memperoleh pengajaran dan bimbingan guru secara adil',
            'Menggunakan fasilitas perpustakaan dan laboratorium sekolah',
            'Menyampaikan pendapat dan aspirasi dengan cara yang santun',
          ],
          rightLabel: 'Kewajiban Murid',
          rightPoints: [
            'Belajar sungguh-sungguh dan menghormati guru serta tenaga kependidikan',
            'Menjaga kebersihan dan keutuhan sarana sekolah',
            'Mendengarkan pendapat teman lain dan menaati kesepakatan kelas',
          ],
        },
      },
    ],
    infographic: {
      title: 'Pilar Demokrasi Sekolah & Bela Negara Pelajar',
      subtitle: 'Indikator partisipasi aktif pelajar dalam kehidupan berdemokrasi',
      metrics: [
        { label: 'Partisipasi Pemilihan OSIS', value: 95, unit: '%', note: 'Target suara sah siswa' },
        { label: 'Penyelesaian Masalah via Musyawarah', value: 89, unit: '%', note: 'Dialog sebelum voting' },
        { label: 'Kepatuhan Piket & Fasilitas', value: 86, unit: '%', note: 'Kewajiban menjaga lingkungan belajar' },
        { label: 'Etika Berpendapat Santun', value: 91, unit: '%', note: 'Tanpa ujaran kebencian' },
      ],
      takeaway: 'Keutuhan NKRI dimulai dari kebiasaan berdemokrasi yang jujur dan seimbang antara hak serta kewajiban di sekolah.',
    },
    videoSlides: [
      {
        id: 'b4-v1',
        title: 'Mengapa Bentuk Negara Kita NKRI?',
        narration:
          'Pasal 1 Ayat (1) UUD NRI 1945 menegaskan Indonesia adalah Negara Kesatuan berbentuk Republik. Pemerintah daerah seperti Pemkot Serang mengelola urusan lokal untuk memajukan warga dalam satu kesatuan nasional.',
        keyPoints: ['Satu kedaulatan negara', 'Otonomi daerah melayani masyarakat lebih dekat', 'Bersatu dari Sabang hingga Merauke'],
        visualTag: 'Bentuk Negara',
      },
      {
        id: 'b4-v2',
        title: 'Demokrasi Pancasila di Sekolah',
        narration:
          'Dalam Demokrasi Pancasila, kita berdiskusi mencari mufakat terbaik bersama. Jika pendapat tetap berbeda, barulah voting dilakukan secara jujur, rahasia, dan tanpa paksaan.',
        keyPoints: ['Utamakan musyawarah mufakat', 'Menghargai suara minoritas', 'Menerima hasil bersama dengan dewasa'],
        visualTag: 'Demokrasi',
      },
      {
        id: 'b4-v3',
        title: 'Hak dan Kewajiban Harus Seimbang',
        narration:
          'Setiap hak kita dibatasi oleh hak orang lain. Ketika kita menuntut kelas yang nyaman sebagai hak, maka membersihkan kelas sesuai jadwal piket adalah kewajiban kita bersama.',
        keyPoints: ['Jalankan kewajiban dengan tulus', 'Peroleh hak secara adil', 'Jaga fasilitas bersama'],
        visualTag: 'Hak & Kewajiban',
      },
      {
        id: 'b4-v4',
        title: 'Bela Negara Versi Pelajar SMP',
        narration:
          'Pelajar membela negara lewat prestasi belajar, menjaga kelestarian lingkungan, bangga produk dalam negeri, serta menolak hoaks dan narkoba.',
        keyPoints: ['Disiplin dan berprestasi', 'Cinta produk lokal Nusantara', 'Menjaga nama baik sekolah dan bangsa'],
        visualTag: 'Bela Negara',
      },
    ],
    youtubeUrl: '',
    rangkuman: [
      'Indonesia adalah Negara Kesatuan berbentuk Republik (Pasal 1 Ayat 1 UUD NRI Tahun 1945) yang menerapkan otonomi daerah.',
      'Demokrasi Pancasila menekankan musyawarah mufakat serta pemilu yang langsung, umum, bebas, rahasia, jujur, dan adil.',
      'Hak dan kewajiban warga negara harus berjalan beriringan agar tercipta keadilan dan ketertiban bersama.',
      'Pelajar dapat berkontribusi menjaga keutuhan NKRI melalui prestasi, kepedulian lingkungan, dan etika berdemokrasi.',
    ],
    joyfulCheck: {
      question: 'Dalam pemilihan ketua kelas, 2 calon memperoleh suara hampir imbang. Langkah terbaik sesuai Demokrasi Pancasila setelah pemilihan selesai adalah...',
      options: [
        'Kedua calon saling bersalaman, yang terpilih merangkul semua teman, dan seluruh kelas mendukung program kerja bersama',
        'Pendukung calon yang kalah memboikot seluruh kegiatan piket dan lomba kelas',
        'Mengulang pemilihan terus-menerus hingga calon favorit sendiri menang',
      ],
      correctIndex: 0,
      explanation:
        'Tepat sekali! Demokrasi Pancasila tidak berhenti di kotak suara, melainkan dilanjutkan dengan persatuan dan kerja sama.',
    },
  },
];

export const GLOSSARY_DATA: GlossaryItem[] = [
  {
    id: 'glo-1',
    term: 'Pancasila',
    chapterId: 'bab1',
    definition: 'Lima sila dasar negara Republik Indonesia sekaligus pandangan hidup dan ideologi bangsa.',
    example: 'Membantu teman tanpa membeda-bedakan suku adalah pengamalan sila kedua dan ketiga Pancasila.',
  },
  {
    id: 'glo-2',
    term: 'Dasar Negara',
    chapterId: 'bab1',
    definition: 'Fondasi hukum dan nilai tertinggi yang menjadi sumber bagi seluruh penyelenggaraan pemerintahan serta peraturan negara.',
    example: 'Semua undang-undang dan peraturan sekolah tidak boleh bertentangan dengan nilai Pancasila.',
  },
  {
    id: 'glo-3',
    term: 'Pandangan Hidup Bangsa',
    chapterId: 'bab1',
    definition: 'Pedoman moral, cara berpikir, dan kompas perilaku sehari-hari warga negara dalam kehidupan pribadi maupun sosial.',
    example: 'Kebiasaan bermusyawarah saat memilih jadwal piket kelas adalah Pancasila sebagai pandangan hidup.',
  },
  {
    id: 'glo-4',
    term: 'Ideologi Terbuka',
    chapterId: 'bab1',
    definition: 'Sistem gagasan yang nilai dasarnya tetap, tetapi nilai penerapannya mampu menyesuaikan perkembangan zaman secara dinamis.',
    example: 'Penerapan etika bermedia sosial dan anti-hoaks merupakan wujud keterbukaan nilai praksis Pancasila.',
  },
  {
    id: 'glo-5',
    term: 'Konstitusi',
    chapterId: 'bab2',
    definition: 'Hukum dasar tertulis maupun tidak tertulis yang menjadi aturan main tertinggi dalam menyelenggarakan negara.',
    example: 'UUD NRI Tahun 1945 merupakan konstitusi tertulis negara Indonesia.',
  },
  {
    id: 'glo-6',
    term: 'UUD NRI Tahun 1945',
    chapterId: 'bab2',
    definition: 'Undang-Undang Dasar Negara Republik Indonesia Tahun 1945 sebagai hukum dasar tertulis dan peraturan tertinggi di Indonesia.',
    example: 'Pasal 31 UUD NRI 1945 menjamin hak setiap warga negara Indonesia untuk memperoleh pendidikan.',
  },
  {
    id: 'glo-7',
    term: 'Konvensi',
    chapterId: 'bab2',
    definition: 'Kebiasaan ketatanegaraan yang dilakukan berulang kali dan ditaati meskipun tidak tertulis dalam pasal UUD.',
    example: 'Pidato kenegaraan Presiden setiap tanggal 16 Agustus di sidang tahunan DPR/MPR.',
  },
  {
    id: 'glo-8',
    term: 'Hierarki Peraturan',
    chapterId: 'bab2',
    definition: 'Penjenjangan peraturan perundang-undangan dari tingkat tertinggi (UUD 1945) hingga daerah (Perda) di mana aturan bawah tunduk pada aturan atas.',
    example: 'Peraturan Daerah Kota Serang harus sejalan dengan Undang-Undang dan UUD NRI Tahun 1945.',
  },
  {
    id: 'glo-9',
    term: 'Norma',
    chapterId: 'bab2',
    definition: 'Aturan atau kaidah yang menjadi pedoman tingkah laku manusia dalam masyarakat agar tercipta ketertiban.',
    example: 'Norma kesopanan melarang berkata kasar kepada orang tua dan guru.',
  },
  {
    id: 'glo-10',
    term: 'Bhinneka Tunggal Ika',
    chapterId: 'bab3',
    definition: 'Semboyan negara Indonesia dari kitab Sutasoma yang berarti "Berbeda-beda tetapi tetap satu jua".',
    example: 'Siswa dengan latar bahasa Sunda, Jawa Serang, dan daerah lain belajar kompak dalam satu tim.',
  },
  {
    id: 'glo-11',
    term: 'Toleransi',
    chapterId: 'bab3',
    definition: 'Sikap saling menghargai, menghormati, dan memberi ruang bagi perbedaan keyakinan, suku, budaya, dan pendapat.',
    example: 'Menjaga ketenangan saat teman yang berbeda agama melaksanakan doa atau ibadah.',
  },
  {
    id: 'glo-12',
    term: 'Gotong Royong',
    chapterId: 'bab3',
    definition: 'Kerja sama sukarela dan bahu-membahu demi mencapai kepentingan bersama tanpa pamrih.',
    example: 'Kerja bakti membersihkan lingkungan SMPN 16 Kota Serang menjelang acara sekolah.',
  },
  {
    id: 'glo-13',
    term: 'Stereotip',
    chapterId: 'bab3',
    definition: 'Pelabelan atau penilaian seragam terhadap suatu kelompok tertentu secara sepihak tanpa mengenal individunya.',
    example: 'Menganggap semua orang dari daerah tertentu pasti berwatak keras adalah contoh stereotip yang keliru.',
  },
  {
    id: 'glo-14',
    term: 'Etnosentrisme',
    chapterId: 'bab3',
    definition: 'Sikap menganggap budaya atau sukunya sendiri paling tinggi dan merendahkan budaya kelompok lain.',
    example: 'Menolak berteman dengan siswa pindahan karena menganggap logat daerah sendiri lebih baik.',
  },
  {
    id: 'glo-15',
    term: 'NKRI',
    chapterId: 'bab4',
    definition: 'Negara Kesatuan Republik Indonesia yang menegaskan satu kedaulatan utuh dari Sabang hingga Merauke.',
    example: 'Pemerintah daerah dan pemerintah pusat bekerja dalam satu kesatuan hukum NKRI.',
  },
  {
    id: 'glo-16',
    term: 'Demokrasi',
    chapterId: 'bab4',
    definition: 'Sistem pemerintahan di mana kedaulatan tertinggi berada di tangan rakyat yang dilaksanakan berdasarkan hukum dan musyawarah.',
    example: 'Pemilihan Ketua OSIS secara langsung, umum, bebas, rahasia, jujur, dan adil.',
  },
  {
    id: 'glo-17',
    term: 'Musyawarah',
    chapterId: 'bab4',
    definition: 'Pembahasan bersama secara terbuka dan saling menghormati untuk mencapai kesepakatan (mufakat).',
    example: 'Berdiskusi menentukan tema proyek P5 atau tujuan kegiatan kelas.',
  },
  {
    id: 'glo-18',
    term: 'Hak',
    chapterId: 'bab4',
    definition: 'Segala sesuatu yang pantas dan mutlak diterima oleh seseorang sesuai aturan dan martabat kemanusiaan.',
    example: 'Hak siswa mendapatkan penilaian objektif dari guru dan lingkungan kelas bebas perundungan.',
  },
  {
    id: 'glo-19',
    term: 'Kewajiban',
    chapterId: 'bab4',
    definition: 'Tugas dan tanggung jawab yang harus dilaksanakan seseorang dengan penuh kesadaran.',
    example: 'Kewajiban siswa menjaga kebersihan kelas, belajar tekun, dan menaati tata tertib sekolah.',
  },
  {
    id: 'glo-20',
    term: 'Nasionalisme',
    chapterId: 'bab4',
    definition: 'Kesadaran dan rasa cinta tanah air untuk menjaga kedaulatan, persatuan, dan kemajuan bangsa tanpa merendahkan bangsa lain.',
    example: 'Bangga menggunakan produk UMKM lokal Kota Serang dan berprestasi di tingkat nasional.',
  },
  {
    id: 'glo-21',
    term: 'Kedaulatan',
    chapterId: 'bab4',
    definition: 'Kekuasaan tertinggi dalam suatu negara untuk mengatur urusan dalam negeri maupun menjalin hubungan luar negeri.',
    example: 'Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD (Pasal 1 Ayat 2 UUD 1945).',
  },
];
