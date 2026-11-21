import React from 'react';

interface GarudaPancasilaProps {
  className?: string;
  size?: number;
  highlightedSila?: number | null;
  onSelectSila?: (sila: number) => void;
}

/**
 * Lambang Negara Republik Indonesia: Garuda Pancasila (UU No. 24 Tahun 2009)
 * - Kepala menoleh lurus ke sebelah kanan Garuda (kiri pengamat)
 * - 17 helai bulu sayap masing-masing sisi, 8 helai bulu ekor, 19 helai bulu pangkal ekor, 45 helai bulu leher
 * - Perisai dada bersimbol 5 sila dengan garis khatulistiwa hitam
 * - Cakar mencengkeram pita putih bertuliskan BHINNEKA TUNGGAL IKA
 */
export const GarudaPancasila: React.FC<GarudaPancasilaProps> = ({
  className = '',
  size = 200,
  highlightedSila = null,
  onSelectSila,
}) => {
  const isInteractive = Boolean(onSelectSila);

  // 17 primary wing feathers per side with realistic sweeping curve & graduation (longest at top shoulder)
  const primaryWings = Array.from({ length: 17 }, (_, i) => {
    const t = i / 16;
    const angle = 36 - t * 94; // +36 deg (upward/outward) down to -58 deg (lower flank)
    const len = 132 - Math.pow(t, 1.2) * 56;
    const width = 7.4 - t * 2.1;
    return { angle, len, width, i };
  });

  // Secondary & tertiary covert feathers (11 per wing) for authentic layered plumage
  const secondaryWings = Array.from({ length: 11 }, (_, i) => {
    const t = i / 10;
    const angle = 32 - t * 86;
    const len = 86 - t * 32;
    return { angle, len, i };
  });

  // 8 tail feathers fanned below base
  const tailFeathers = Array.from({ length: 8 }, (_, i) => {
    const offset = i - 3.5;
    const angle = offset * 6.8;
    const len = 64 - Math.abs(offset) * 2.2;
    return { angle, len, i };
  });

  // 19 base-of-tail feathers (2 arcs: 9 upper + 10 lower = 19)
  const baseTailUpper = Array.from({ length: 9 }, (_, i) => (i - 4) * 7.2);
  const baseTailLower = Array.from({ length: 10 }, (_, i) => (i - 4.5) * 6.8);

  // 45 neck feathers arranged in 5 staggered rows (7 + 8 + 9 + 10 + 11 = 45)
  const neckRows = [
    { y: 74, count: 7, spread: 19 },
    { y: 82, count: 8, spread: 24 },
    { y: 90, count: 9, spread: 29 },
    { y: 98, count: 10, spread: 34 },
    { y: 106, count: 11, spread: 39 },
  ];

  const getSilaOpacity = (sila: number) => {
    if (!highlightedSila) return 1;
    return highlightedSila === sila ? 1 : 0.35;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 360 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Lambang Negara Republik Indonesia Garuda Pancasila"
    >
      <defs>
        <linearGradient id="gpGoldLight" x1="180" y1="20" x2="180" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="35%" stopColor="#FACC15" />
          <stop offset="75%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="gpGoldDeep" x1="180" y1="50" x2="180" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EAB308" />
          <stop offset="60%" stopColor="#A16207" />
          <stop offset="100%" stopColor="#713F12" />
        </linearGradient>
        <linearGradient id="gpBeak" x1="140" y1="45" x2="170" y2="65" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <clipPath id="gpShieldInnerClip">
          <path d="M 134 118 L 226 118 L 226 174 C 226 208 200 232 180 242 C 160 232 134 208 134 174 Z" />
        </clipPath>
      </defs>

      {/* === 8 TAIL FEATHERS (8 HELAI BULU EKOR) === */}
      <g transform="translate(180, 242)">
        {tailFeathers.map(({ angle, len, i }) => (
          <g key={`tail-${i}`} transform={`rotate(${angle})`}>
            <path
              d={`M -6.2 0 L -7.4 ${len - 12} Q 0 ${len + 8} 7.4 ${len - 12} L 6.2 0 Z`}
              fill="url(#gpGoldLight)"
              stroke="#78350F"
              strokeWidth="1.2"
            />
            <line x1="0" y1="4" x2="0" y2={len - 6} stroke="#92400E" strokeWidth="0.9" />
          </g>
        ))}
      </g>

      {/* === WINGS: 17 PRIMARY FEATHERS PER SIDE + LAYERED COVERTS === */}
      {/* Left Wing (Viewer Left) */}
      <g transform="translate(142, 134)">
        {primaryWings.map(({ angle, len, width, i }) => (
          <g key={`lw-p-${i}`} transform={`rotate(${angle})`}>
            <path
              d={`M 0 ${-width * 0.65} L ${-len + 16} ${-width * 0.9} Q ${-len - 8} 0 ${-len + 16} ${width * 0.9} L 0 ${width * 0.65} Z`}
              fill="url(#gpGoldLight)"
              stroke="#78350F"
              strokeWidth="1.15"
            />
            <line x1="-12" y1="0" x2={-len + 12} y2="0" stroke="#92400E" strokeWidth="0.7" />
          </g>
        ))}
        {/* Secondary Coverts */}
        {secondaryWings.map(({ angle, len, i }) => (
          <g key={`lw-s-${i}`} transform={`rotate(${angle})`}>
            <path
              d={`M 2 -4.5 L ${-len + 10} -6 Q ${-len - 5} 0 ${-len + 10} 6 L 2 4.5 Z`}
              fill="url(#gpGoldDeep)"
              stroke="#713F12"
              strokeWidth="1"
            />
          </g>
        ))}
        {/* Upper Wing Shoulder Mantle */}
        <path
          d="M 8 -28 C -26 -54, -64 -50, -82 -26 C -54 -14, -22 -4, 6 6 Z"
          fill="url(#gpGoldLight)"
          stroke="#78350F"
          strokeWidth="1.3"
        />
      </g>

      {/* Right Wing (Viewer Right) */}
      <g transform="translate(218, 134)">
        {primaryWings.map(({ angle, len, width, i }) => (
          <g key={`rw-p-${i}`} transform={`rotate(${-angle})`}>
            <path
              d={`M 0 ${-width * 0.65} L ${len - 16} ${-width * 0.9} Q ${len + 8} 0 ${len - 16} ${width * 0.9} L 0 ${width * 0.65} Z`}
              fill="url(#gpGoldLight)"
              stroke="#78350F"
              strokeWidth="1.15"
            />
            <line x1="12" y1="0" x2={len - 12} y2="0" stroke="#92400E" strokeWidth="0.7" />
          </g>
        ))}
        {secondaryWings.map(({ angle, len, i }) => (
          <g key={`rw-s-${i}`} transform={`rotate(${-angle})`}>
            <path
              d={`M -2 -4.5 L ${len - 10} -6 Q ${len + 5} 0 ${len - 10} 6 L -2 4.5 Z`}
              fill="url(#gpGoldDeep)"
              stroke="#713F12"
              strokeWidth="1"
            />
          </g>
        ))}
        <path
          d="M -8 -28 C 26 -54, 64 -50, 82 -26 C 54 -14, 22 -4, -6 6 Z"
          fill="url(#gpGoldLight)"
          stroke="#78350F"
          strokeWidth="1.3"
        />
      </g>

      {/* === NECK & HEAD (KEPALA MENOLEH KE KANAN GARUDA / KIRI PENGAMAT) === */}
      {/* Neck Contour */}
      <path
        d="M 154 120 C 154 90, 160 66, 170 52 C 186 52, 198 70, 206 120 Z"
        fill="url(#gpGoldLight)"
        stroke="#78350F"
        strokeWidth="1.4"
      />

      {/* 45 Neck Feathers (7+8+9+10+11 = 45) */}
      {neckRows.map((row, rIdx) =>
        Array.from({ length: row.count }).map((_, idx) => {
          const x =
            180 +
            ((idx - (row.count - 1) / 2) * row.spread) / Math.max(1, (row.count - 1) / 2);
          return (
            <path
              key={`neck-${rIdx}-${idx}`}
              d={`M ${x - 3.3} ${row.y} Q ${x} ${row.y + 7.5} ${x + 3.3} ${row.y} Z`}
              fill="#FDE047"
              stroke="#854D0E"
              strokeWidth="0.8"
            />
          );
        })
      )}

      {/* Sculpted Garuda Head & Crest */}
      <g>
        {/* Crest / Jambul (sweeping plumes back) */}
        <path
          d="M 184 36 C 196 24, 210 24, 215 32 C 204 36, 201 41, 210 45 C 200 47, 195 50, 203 55 C 194 56, 188 57, 185 62 Z"
          fill="url(#gpGoldLight)"
          stroke="#78350F"
          strokeWidth="1.3"
          strokeLinejoin="round"
        />
        {/* Head Crown & Cheek */}
        <path
          d="M 160 52 C 160 36, 175 30, 189 37 C 196 42, 196 58, 188 67 L 164 67 Z"
          fill="url(#gpGoldLight)"
          stroke="#78350F"
          strokeWidth="1.4"
        />
        {/* Sharp Hooked Upper Beak */}
        <path
          d="M 163 43 C 148 43, 138 49, 135 59 C 141 55, 147 55, 154 57 L 164 57 Z"
          fill="url(#gpBeak)"
          stroke="#78350F"
          strokeWidth="1.35"
          strokeLinejoin="round"
        />
        {/* Lower Beak */}
        <path
          d="M 163 57 L 147 57 C 151 62, 158 63, 165 62 Z"
          fill="#CA8A04"
          stroke="#78350F"
          strokeWidth="1.2"
        />
        {/* Supraorbital Brow Ridge & Fierce Eye */}
        <path d="M 162 41 Q 171 38 179 42" stroke="#78350F" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="170" cy="46.5" r="3" fill="#0F172A" />
        <circle cx="169" cy="45.5" r="1" fill="#FFFFFF" />
      </g>

      {/* === 19 BASE-OF-TAIL FEATHERS (19 HELAI PANGKAL EKOR) === */}
      <g transform="translate(180, 228)">
        {baseTailLower.map((angle, i) => (
          <g key={`btl-${i}`} transform={`rotate(${angle})`}>
            <path d="M -3.8 0 Q 0 24 3.8 0 Z" fill="#EAB308" stroke="#78350F" strokeWidth="0.9" />
          </g>
        ))}
        {baseTailUpper.map((angle, i) => (
          <g key={`btu-${i}`} transform={`rotate(${angle})`}>
            <path d="M -3.8 -4 Q 0 17 3.8 -4 Z" fill="#FDE047" stroke="#78350F" strokeWidth="0.9" />
          </g>
        ))}
      </g>

      {/* === MUSCULAR FEATHERED LEGS & SCALED TALONS === */}
      {/* Left Thigh & Shank */}
      <path
        d="M 150 218 C 136 226, 130 242, 134 256 L 148 258 C 150 244, 156 232, 164 224 Z"
        fill="url(#gpGoldDeep)"
        stroke="#78350F"
        strokeWidth="1.3"
      />
      <path d="M 135 256 L 128 274 L 142 276 L 146 258 Z" fill="#EAB308" stroke="#78350F" strokeWidth="1.2" />

      {/* Right Thigh & Shank */}
      <path
        d="M 210 218 C 224 226, 230 242, 226 256 L 212 258 C 210 244, 204 232, 196 224 Z"
        fill="url(#gpGoldDeep)"
        stroke="#78350F"
        strokeWidth="1.3"
      />
      <path d="M 225 256 L 232 274 L 218 276 L 214 258 Z" fill="#EAB308" stroke="#78350F" strokeWidth="1.2" />

      {/* === WHITE RIBBON: BHINNEKA TUNGGAL IKA === */}
      <g>
        {/* Ribbon Swallow-tail Ends */}
        <path d="M 74 266 L 102 271 L 96 294 L 66 287 L 78 277 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.3" />
        <path d="M 286 266 L 258 271 L 264 294 L 294 287 L 282 277 Z" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.3" />
        {/* Main Curved White Scroll */}
        <path
          d="M 92 264 Q 180 294 268 264 L 263 290 Q 180 320 97 290 Z"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path id="gpBhinnekaCurve" d="M 100 282 Q 180 310 260 282" fill="none" />
        <text
          fill="#0F172A"
          fontSize="11.5"
          fontWeight="800"
          letterSpacing="1.4"
          fontFamily="'Plus Jakarta Sans', Georgia, serif"
        >
          <textPath href="#gpBhinnekaCurve" startOffset="50%" textAnchor="middle">
            BHINNEKA TUNGGAL IKA
          </textPath>
        </text>
      </g>

      {/* Gripping Talons Over Ribbon */}
      <g fill="#FACC15" stroke="#78350F" strokeWidth="1.2">
        <path d="M 125 270 Q 123 282 128 286 Q 132 280 132 271 Z" />
        <path d="M 134 272 Q 133 284 138 288 Q 142 281 141 272 Z" />
        <path d="M 143 273 Q 143 284 148 287 Q 151 280 149 272 Z" />

        <path d="M 235 270 Q 237 282 232 286 Q 228 280 228 271 Z" />
        <path d="M 226 272 Q 227 284 222 288 Q 218 281 219 272 Z" />
        <path d="M 217 273 Q 217 284 212 287 Q 209 280 211 272 Z" />
      </g>

      {/* === PERISAI DADA RESMI === */}
      {/* Outer Gold Shield Border */}
      <path
        d="M 129 113 L 231 113 L 231 175 C 231 212 203 238 180 248 C 157 238 129 212 129 175 Z"
        fill="url(#gpGoldLight)"
        stroke="#78350F"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      <g clipPath="url(#gpShieldInnerClip)">
        {/* SILA 4 (Top-Left Viewer): Kepala Banteng on Crimson Red */}
        <g
          opacity={getSilaOpacity(4)}
          onClick={() => onSelectSila?.(4)}
          className={isInteractive ? 'cursor-pointer transition-opacity' : ''}
        >
          <rect x="132" y="116" width="48" height="58" fill="#DC2626" />
          {/* Curved Horns & Bull Head */}
          <path
            d="M 141 139 C 136 131, 137 123, 144 122 C 143 128, 148 131, 156 131 C 164 131, 169 128, 168 122 C 175 123, 176 131, 171 139 L 166 155 C 161 159, 151 159, 146 155 Z"
            fill="#111827"
            stroke="#F8FAFC"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          <circle cx="150" cy="142" r="1.6" fill="#FFFFFF" />
          <circle cx="162" cy="142" r="1.6" fill="#FFFFFF" />
          <path d="M 152 153 Q 156 155 160 153" stroke="#9CA3AF" strokeWidth="1.2" fill="none" />
        </g>

        {/* SILA 3 (Top-Right Viewer): Pohon Beringin on White */}
        <g
          opacity={getSilaOpacity(3)}
          onClick={() => onSelectSila?.(3)}
          className={isInteractive ? 'cursor-pointer transition-opacity' : ''}
        >
          <rect x="180" y="116" width="48" height="58" fill="#FFFFFF" />
          {/* Trunk & Aerial Roots */}
          <path d="M 199 144 L 207 144 L 209 162 L 197 162 Z" fill="#78350F" />
          <line x1="191" y1="142" x2="191" y2="160" stroke="#78350F" strokeWidth="1.1" />
          <line x1="195" y1="142" x2="194" y2="161" stroke="#78350F" strokeWidth="0.9" />
          <line x1="211" y1="142" x2="212" y2="161" stroke="#78350F" strokeWidth="0.9" />
          <line x1="215" y1="142" x2="215" y2="160" stroke="#78350F" strokeWidth="1.1" />
          {/* Lush Canopy */}
          <path
            d="M 186 143 C 181 136, 187 127, 194 127 C 197 120, 209 120, 212 127 C 219 127, 225 136, 220 143 Z"
            fill="#15803D"
            stroke="#052E16"
            strokeWidth="1"
          />
        </g>

        {/* SILA 5 (Bottom-Left Viewer): Padi dan Kapas on White */}
        <g
          opacity={getSilaOpacity(5)}
          onClick={() => onSelectSila?.(5)}
          className={isInteractive ? 'cursor-pointer transition-opacity' : ''}
        >
          <rect x="132" y="174" width="48" height="70" fill="#FFFFFF" />
          {/* Golden Rice Stalk */}
          <path d="M 155 218 Q 142 198 150 180" stroke="#CA8A04" strokeWidth="1.6" fill="none" />
          {[183, 189, 195, 201, 207].map((y, idx) => (
            <ellipse
              key={idx}
              cx={145 + idx * 1.3}
              cy={y}
              rx="3.4"
              ry="1.9"
              transform={`rotate(-28 ${145 + idx * 1.3} ${y})`}
              fill="#EAB308"
              stroke="#92400E"
              strokeWidth="0.4"
            />
          ))}
          {/* Green & White Cotton */}
          <path d="M 161 218 Q 172 198 166 180" stroke="#15803D" strokeWidth="1.6" fill="none" />
          {[183, 193, 203, 212].map((y, idx) => (
            <g key={idx}>
              <circle
                cx={169 - idx * 1.5}
                cy={y}
                r="3.8"
                fill="#FFFFFF"
                stroke="#16A34A"
                strokeWidth="1.2"
              />
            </g>
          ))}
        </g>

        {/* SILA 2 (Bottom-Right Viewer): Rantai Emas (Kotak & Bulat) on Crimson Red */}
        <g
          opacity={getSilaOpacity(2)}
          onClick={() => onSelectSila?.(2)}
          className={isInteractive ? 'cursor-pointer transition-opacity' : ''}
        >
          <rect x="180" y="174" width="48" height="70" fill="#DC2626" />
          {/* Interlocking Square & Circle Chain Links */}
          <circle cx="204" cy="199" r="14" fill="none" stroke="#FACC15" strokeWidth="2.4" />
          <rect x="193" y="185" width="7" height="7" rx="1" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />
          <circle cx="211" cy="189" r="3.6" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />
          <rect x="211" y="199" width="7" height="7" rx="1" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />
          <circle cx="204" cy="211" r="3.6" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />
          <rect x="191" y="201" width="7" height="7" rx="1" fill="#FDE047" stroke="#92400E" strokeWidth="0.8" />
        </g>

        {/* Vertical Inner Divider & Thick Black Khatulistiwa Line */}
        <line x1="180" y1="116" x2="180" y2="244" stroke="#78350F" strokeWidth="2.8" />
        <line x1="132" y1="174" x2="228" y2="174" stroke="#0F172A" strokeWidth="6" />
      </g>

      {/* Inner Shield Contour */}
      <path
        d="M 134 118 L 226 118 L 226 174 C 226 208 200 232 180 242 C 160 232 134 208 134 174 Z"
        fill="none"
        stroke="#451A03"
        strokeWidth="2.4"
      />

      {/* SILA 1 (Center Escutcheon): Black Shield + 5-Pointed Gold Star */}
      <g
        opacity={getSilaOpacity(1)}
        onClick={() => onSelectSila?.(1)}
        className={isInteractive ? 'cursor-pointer transition-opacity' : ''}
      >
        <path
          d="M 162 155 L 198 155 L 198 176 C 198 188 188 196 180 200 C 172 196 162 188 162 176 Z"
          fill="#0F172A"
          stroke="#FACC15"
          strokeWidth="2.2"
        />
        <polygon
          points="180,161 183.7,171 194,171.3 185.8,177.5 188.7,187.5 180,181.6 171.3,187.5 174.2,177.5 166,171.3 176.3,171"
          fill="#FDE047"
          stroke="#CA8A04"
          strokeWidth="0.7"
        />
      </g>
    </svg>
  );
};
