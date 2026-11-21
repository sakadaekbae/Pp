import { jsPDF } from 'jspdf';
import { KktpItem, QuizAttempt, RpmMeeting, SchoolIdentity, SemesterType } from '../types';
import { resolveKktpStatus } from '../store/useAppStore';

const SCHOOL_LOGO_URL = '/assets/aistudio/smpn16_logo_clean.png';

async function loadImageAsDataUrl(url: string): Promise<string | null> {
  try {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Image load failed'));
      img.src = url;
    });
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth || 240;
    canvas.height = img.naturalHeight || 240;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    return canvas.toDataURL('image/png');
  } catch {
    return null;
  }
}

function addWrappedBlock(
  doc: jsPDF,
  label: string,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  pageHeight: number
): number {
  let curY = y;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  const labelLines = doc.splitTextToSize(label, maxWidth);
  if (curY + labelLines.length * 4.5 > pageHeight - 16) {
    doc.addPage();
    curY = 18;
  }
  doc.text(labelLines, x, curY);
  curY += labelLines.length * 4.5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  const textLines = doc.splitTextToSize(text || '-', maxWidth);
  for (const line of textLines) {
    if (curY > pageHeight - 16) {
      doc.addPage();
      curY = 18;
    }
    doc.text(line, x, curY);
    curY += 4.5;
  }
  return curY + 2;
}

export async function downloadRpmPdf(
  meetings: RpmMeeting[],
  semester: SemesterType,
  identity: SchoolIdentity
): Promise<void> {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const maxWidth = pageWidth - margin * 2;

  const logoData = await loadImageAsDataUrl(SCHOOL_LOGO_URL);
  if (logoData) {
    doc.addImage(logoData, 'PNG', margin, 12, 18, 18);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('RENCANA PEMBELAJARAN MENDALAM (RPM)', pageWidth / 2, 17, { align: 'center' });
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    `${identity.schoolName} · ${identity.subject} · ${identity.gradePhase}`,
    pageWidth / 2,
    23,
    { align: 'center' }
  );
  doc.text(
    `Semester ${semester === 'ganjil' ? 'Ganjil' : 'Genap'} · Tahun Ajaran ${identity.academicYear} · Guru: ${identity.teacherName}`,
    pageWidth / 2,
    28.5,
    { align: 'center' }
  );
  doc.line(margin, 33, pageWidth - margin, 33);

  let y = 40;
  meetings.forEach((r, idx) => {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 18;
    }
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y - 4, maxWidth, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.text(`${idx + 1}. ${r.pertemuanKe} — ${r.materiPokok}`, margin + 2, y + 1.5);
    y += 10;

    y = addWrappedBlock(
      doc,
      'Identitas & Alokasi:',
      `${identity.schoolName} | ${identity.gradePhase} | Guru: ${identity.teacherName} | Alokasi: ${r.alokasiWaktu}`,
      margin,
      y,
      maxWidth,
      pageHeight
    );
    y = addWrappedBlock(doc, 'Capaian Pembelajaran (CP):', r.cp, margin, y, maxWidth, pageHeight);
    y = addWrappedBlock(doc, 'Tujuan Pembelajaran (TP):', r.tp, margin, y, maxWidth, pageHeight);
    y = addWrappedBlock(
      doc,
      'Dimensi Profil Lulusan:',
      r.dimensiProfilLulusan.join(', '),
      margin,
      y,
      maxWidth,
      pageHeight
    );
    y = addWrappedBlock(doc, 'Pemahaman Bermakna:', r.pemahamanBermakna, margin, y, maxWidth, pageHeight);
    y = addWrappedBlock(doc, 'Pertanyaan Pemantik:', r.pertanyaanPemantik, margin, y, maxWidth, pageHeight);
    y = addWrappedBlock(doc, 'Praktik Pedagogis:', r.praktikPedagogis, margin, y, maxWidth, pageHeight);
    y = addWrappedBlock(doc, 'Lingkungan & Kemitraan:', r.lingkunganKemitraan, margin, y, maxWidth, pageHeight);
    y = addWrappedBlock(
      doc,
      'Pengalaman Belajar:',
      `Memahami: ${r.pengalamanBelajar.memahami}\nMengaplikasi: ${r.pengalamanBelajar.mengaplikasi}\nMerefleksi: ${r.pengalamanBelajar.merefleksi}`,
      margin,
      y,
      maxWidth,
      pageHeight
    );
    y = addWrappedBlock(
      doc,
      'Asesmen (Awal, Proses, Akhir):',
      `Awal: ${r.asesmen.awal} | Proses: ${r.asesmen.proses} | Akhir: ${r.asesmen.akhir}`,
      margin,
      y,
      maxWidth,
      pageHeight
    );
    y = addWrappedBlock(doc, 'Media & Sumber Belajar:', r.mediaSumber, margin, y, maxWidth, pageHeight);
    y += 4;
  });

  doc.save(`RPM-Pancasila-${semester}-SMPN16-${identity.academicYear.replace('/', '-')}.pdf`);
}

export async function downloadKktpPdf(
  items: KktpItem[],
  semester: SemesterType,
  identity: SchoolIdentity
): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const maxWidth = pageWidth - margin * 2;

  const logoData = await loadImageAsDataUrl(SCHOOL_LOGO_URL);
  if (logoData) {
    doc.addImage(logoData, 'PNG', margin, 10, 16, 16);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('KRITERIA KETERCAPAIAN TUJUAN PEMBELAJARAN (KKTP)', pageWidth / 2, 16, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    `${identity.schoolName} · ${identity.subject} · ${identity.gradePhase} · Semester ${semester === 'ganjil' ? 'Ganjil' : 'Genap'} · Guru: ${identity.teacherName}`,
    pageWidth / 2,
    22,
    { align: 'center' }
  );
  doc.line(margin, 28, pageWidth - margin, 28);

  let y = 34;
  items.forEach((k) => {
    if (y > pageHeight - 40) {
      doc.addPage();
      y = 18;
    }
    doc.setFillColor(241, 245, 249);
    doc.rect(margin, y - 4, maxWidth, 7.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`${k.tpCode} (${k.chapterId.toUpperCase()}) · Batas Minimal Tuntas: ${k.passingScore}`, margin + 2, y + 1);
    y += 8;

    y = addWrappedBlock(
      doc,
      'Tujuan Pembelajaran & Indikator:',
      `${k.tujuanPembelajaran}\nIndikator: ${k.indikator}`,
      margin,
      y,
      maxWidth,
      pageHeight
    );

    const rubText = k.rubrics
      .map((r) => `• ${r.level} (${r.minScore}–${r.maxScore}): ${r.descriptor}`)
      .join('\n');
    y = addWrappedBlock(doc, 'Rubrik 4 Level Ketercapaian:', rubText, margin, y, maxWidth, pageHeight);
    y += 3;
  });

  doc.save(`KKTP-Pancasila-${semester}-SMPN16.pdf`);
}

export async function downloadCertificatePdf(
  attempt: QuizAttempt,
  identity: SchoolIdentity
): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  // Outer Decorative Border
  doc.setDrawColor(180, 83, 9);
  doc.setLineWidth(1.5);
  doc.rect(12, 12, pageWidth - 24, pageHeight - 24);
  doc.setDrawColor(30, 58, 138);
  doc.setLineWidth(0.5);
  doc.rect(15, 15, pageWidth - 30, pageHeight - 30);

  const logoData = await loadImageAsDataUrl(SCHOOL_LOGO_URL);
  if (logoData) {
    doc.addImage(logoData, 'PNG', 24, 22, 24, 24);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(30, 58, 138);
  doc.text(identity.schoolName.toUpperCase(), pageWidth / 2, 28, { align: 'center' });

  doc.setFontSize(22);
  doc.setTextColor(15, 23, 42);
  doc.text('SERTIFIKAT PENCAPAIAN BELAJAR', pageWidth / 2, 40, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(71, 85, 105);
  doc.text(
    `${identity.appName} · ${identity.subject} · ${identity.gradePhase}`,
    pageWidth / 2,
    47,
    { align: 'center' }
  );

  doc.line(30, 54, pageWidth - 30, 54);

  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  doc.text('Diberikan dengan bangga kepada murid:', pageWidth / 2, 68, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(15, 41, 66);
  doc.text(attempt.studentName, pageWidth / 2, 82, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(51, 65, 85);
  doc.text(`Kelas ${attempt.studentClass} · ${identity.schoolName}`, pageWidth / 2, 91, {
    align: 'center',
  });

  const desc = `Telah menyelesaikan evaluasi Literasi–Numerasi pada paket ${attempt.packageTitle} dengan predikat ketercapaian KKTP: ${attempt.kktpLevel}.`;
  const descLines = doc.splitTextToSize(desc, 200);
  doc.text(descLines, pageWidth / 2, 103, { align: 'center' });

  // Score Boxes
  const boxW = 54;
  const boxY = 120;
  const startX = pageWidth / 2 - (boxW * 3 + 16) / 2;
  const metrics = [
    { label: 'Nilai Akhir', val: String(attempt.totalScore) },
    { label: 'Skor Literasi', val: String(attempt.literasiScore) },
    { label: 'Skor Numerasi', val: String(attempt.numerasiScore) },
  ];
  metrics.forEach((m, i) => {
    const bx = startX + i * (boxW + 8);
    doc.setDrawColor(203, 213, 225);
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(bx, boxY, boxW, 22, 2, 2, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(m.label, bx + boxW / 2, boxY + 7, { align: 'center' });
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(15);
    doc.setTextColor(30, 58, 138);
    doc.text(m.val, bx + boxW / 2, boxY + 17, { align: 'center' });
  });

  // Signature Block (Guru Pengampu only - Principal removed)
  const dateStr = new Date(attempt.timestamp).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const sigX = pageWidth - 72;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(51, 65, 85);
  doc.text(`Kota Serang, ${dateStr}`, sigX, 160, { align: 'center' });
  doc.text(`Guru Mata Pelajaran`, sigX, 166, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text(identity.teacherName, sigX, 185, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.text(`${identity.schoolName}`, sigX, 190, { align: 'center' });

  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Pengembang Aplikasi: ${identity.developerName}`, 24, 190);

  doc.save(`Sertifikat-${attempt.studentName.replace(/\s+/g, '_')}-${attempt.packageId}.pdf`);
}

export async function downloadGradesReportPdf(
  attempts: QuizAttempt[],
  kktpList: KktpItem[],
  identity: SchoolIdentity
): Promise<void> {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;

  const logoData = await loadImageAsDataUrl(SCHOOL_LOGO_URL);
  if (logoData) {
    doc.addImage(logoData, 'PNG', margin, 10, 16, 16);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text('LAPORAN HASIL EVALUASI LITERASI–NUMERASI (LITNUM)', pageWidth / 2, 16, {
    align: 'center',
  });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    `${identity.schoolName} · ${identity.subject} · Guru Pengampu: ${identity.teacherName}`,
    pageWidth / 2,
    22,
    { align: 'center' }
  );
  doc.line(margin, 28, pageWidth - margin, 28);

  let y = 35;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text('No', margin, y);
  doc.text('Nama Murid', margin + 10, y);
  doc.text('Kelas', margin + 70, y);
  doc.text('Paket Evaluasi', margin + 92, y);
  doc.text('Nilai', margin + 165, y);
  doc.text('Lit', margin + 182, y);
  doc.text('Num', margin + 196, y);
  doc.text('Predikat KKTP', margin + 212, y);
  y += 3;
  doc.line(margin, y, pageWidth - margin, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  if (attempts.length === 0) {
    doc.text('Belum ada riwayat evaluasi murid.', margin, y);
  } else {
    attempts.forEach((a, idx) => {
      if (y > pageHeight - 18) {
        doc.addPage();
        y = 18;
      }
      const kktpLive = resolveKktpStatus(a.totalScore, kktpList);
      doc.text(String(idx + 1), margin, y);
      doc.text(a.studentName.slice(0, 30), margin + 10, y);
      doc.text(a.studentClass, margin + 70, y);
      doc.text(a.packageTitle.slice(0, 35), margin + 92, y);
      doc.text(String(a.totalScore), margin + 165, y);
      doc.text(String(a.literasiScore), margin + 182, y);
      doc.text(String(a.numerasiScore), margin + 196, y);
      doc.text(`${kktpLive.level} (${kktpLive.passed ? 'Tuntas' : 'Penguatan'})`, margin + 212, y);
      y += 6.5;
    });
  }

  doc.save(`Laporan-Nilai-Pancasila-SMPN16-${new Date().toISOString().slice(0, 10)}.pdf`);
}
