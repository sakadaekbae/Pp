import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { GarudaPancasila } from '../components/icons/GarudaPancasila';
import { Smpn16Logo } from '../components/icons/Smpn16Logo';
import { SchoolIdentity } from '../types';

interface SplashScreenProps {
  identity: SchoolIdentity;
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ identity, onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2400);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 bg-[#0F2942] text-white flex flex-col items-center justify-center p-6">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 border border-white/20 bg-white/10 backdrop-blur-sm rounded-xl px-3.5 py-2 text-right">
        <p className="text-[10px] uppercase tracking-wider text-blue-200 font-semibold leading-none">
          Pengembang
        </p>
        <p className="text-xs sm:text-sm font-extrabold text-amber-300 mt-0.5">
          {identity.developerName}
        </p>
      </div>

      <div className="max-w-lg w-full text-center space-y-6">
        <div className="flex items-center justify-center gap-6">
          <Smpn16Logo size={92} />
          <GarudaPancasila size={92} />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium tracking-widest uppercase text-amber-300">
            {identity.schoolName}
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            PANCASILA SMART LEARNING
          </h1>
          <p className="text-sm sm:text-base text-blue-100">
            {identity.subject} · {identity.gradePhase} · {identity.curriculum}
          </p>
        </div>

        <div className="border-t border-white/15 pt-4 text-xs sm:text-sm text-blue-100">
          <p>
            Guru Pengampu: <span className="font-semibold text-white">{identity.teacherName}</span>
          </p>
        </div>

        <div className="pt-2">
          <button
            onClick={onFinish}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-colors min-h-[44px]"
          >
            <span>Masuk ke Beranda</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
