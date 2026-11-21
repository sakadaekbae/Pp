import React, { useState } from 'react';

interface Smpn16LogoProps {
  className?: string;
  size?: number;
}

const UPLOADED_SCHOOL_LOGO_SRC = '/assets/aistudio/smpn16_logo_clean.png';

export const Smpn16Logo: React.FC<Smpn16LogoProps> = ({ className = '', size = 64 }) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`rounded-xl bg-blue-900 text-white font-bold flex items-center justify-center text-xs text-center p-1 ${className}`}
        aria-label="Logo SMPN 16 Kota Serang"
      >
        SMPN 16
      </div>
    );
  }

  return (
    <img
      src={UPLOADED_SCHOOL_LOGO_SRC}
      alt="Logo SMPN 16 Kota Serang"
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={`object-contain select-none ${className}`}
      referrerPolicy="no-referrer"
      onError={() => setImgError(true)}
    />
  );
};
