import React, { useEffect, useState } from 'react';
import { CheckCircle2, Download, Share, Smartphone, WifiOff, X } from 'lucide-react';
import { useOnlineStatus, usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        onClick={install}
        className={`inline-flex items-center gap-1.5 rounded-lg bg-blue-900 text-white font-semibold shadow-sm hover:bg-blue-800 transition-colors shrink-0 ${
          compact ? 'px-2.5 py-1.5 text-xs min-h-[36px]' : 'px-3.5 py-2 text-xs sm:text-sm min-h-[40px]'
        }`}
        title="Pasang aplikasi agar bisa dibuka langsung dan digunakan secara offline"
      >
        <Download className="w-3.5 h-3.5 shrink-0" />
        <span>Pasang Aplikasi</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className={`inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 text-blue-900 font-semibold hover:bg-blue-100 transition-colors shrink-0 ${
            compact ? 'px-2.5 py-1.5 text-xs min-h-[36px]' : 'px-3.5 py-2 text-xs sm:text-sm min-h-[40px]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5 shrink-0" />
          <span>Pasang di iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 no-print">
            <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl border border-slate-200 space-y-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Pasang di iPhone / iPad
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Agar aplikasi dapat dibuka langsung dan berjalan offline
                  </p>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                  aria-label="Tutup panduan"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-blue-900">1.</span>
                  <span>
                    Ketuk tombol <strong className="inline-flex items-center gap-1"><Share className="w-3.5 h-3.5 inline" /> Bagikan (Share)</strong> pada bilah Safari.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-blue-900">2.</span>
                  <span>
                    Gulir ke bawah lalu pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-mono font-bold text-blue-900">3.</span>
                  <span>
                    Ketuk <strong>Tambah (Add)</strong> di pojok kanan atas.
                  </span>
                </li>
              </ol>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-blue-900 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-blue-800"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const [offlineReadyBanner, setOfflineReadyBanner] = useState(false);

  useEffect(() => {
    const onOfflineReady = () => {
      setOfflineReadyBanner(true);
    };
    window.addEventListener('pwa:offline-ready', onOfflineReady);
    return () => window.removeEventListener('pwa:offline-ready', onOfflineReady);
  }, []);

  useEffect(() => {
    if (!offlineReadyBanner) return;
    const timer = setTimeout(() => setOfflineReadyBanner(false), 6000);
    return () => clearTimeout(timer);
  }, [offlineReadyBanner]);

  return (
    <>
      {!isOnline && (
        <div
          role="status"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-amber-600 px-3.5 py-2 text-xs font-semibold text-white shadow-lg no-print"
        >
          <WifiOff className="w-4 h-4 shrink-0" />
          <span>Mode Offline — Materi, kuis, & data tersimpan tetap aktif.</span>
        </div>
      )}

      {isOnline && offlineReadyBanner && (
        <div
          role="status"
          className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white shadow-lg no-print"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Aplikasi siap digunakan secara offline.</span>
          <button
            onClick={() => setOfflineReadyBanner(false)}
            className="ml-1 p-0.5 rounded hover:bg-white/20"
            aria-label="Tutup pemberitahuan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </>
  );
};
