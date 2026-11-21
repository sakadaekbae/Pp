import React from 'react';
import { StimulusChartData } from '../types';

interface StimulusVisualProps {
  stimulus: StimulusChartData;
}

export const StimulusVisual: React.FC<StimulusVisualProps> = ({ stimulus }) => {
  if (stimulus.type === 'text' || stimulus.type === 'pasal' || stimulus.type === 'sosmed') {
    const isPasal = stimulus.type === 'pasal';
    const isSosmed = stimulus.type === 'sosmed';
    return (
      <div
        className={`rounded-xl border p-4 ${
          isPasal
            ? 'bg-amber-50/70 border-amber-200'
            : isSosmed
            ? 'bg-slate-50 border-slate-200'
            : 'bg-blue-50/50 border-blue-200'
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            {stimulus.title}
          </p>
          {stimulus.source && (
            <span className="text-xs text-slate-500">{stimulus.source}</span>
          )}
        </div>
        <p className="text-sm sm:text-[15px] leading-relaxed text-slate-800 whitespace-pre-line">
          {stimulus.textContent}
        </p>
      </div>
    );
  }

  if (stimulus.type === 'table' && stimulus.headers && stimulus.rows) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200">
          <p className="text-xs font-semibold text-slate-700">{stimulus.title}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60">
                {stimulus.headers.map((h, i) => (
                  <th key={i} className="px-4 py-2.5 font-semibold text-slate-700">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {stimulus.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50/60">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2.5 text-slate-700 tabular-nums">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (stimulus.type === 'bar' && stimulus.chartItems) {
    const maxVal = Math.max(...stimulus.chartItems.map((c) => c.value), 1);
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold text-slate-700 mb-3">{stimulus.title}</p>
        <div className="space-y-3">
          {stimulus.chartItems.map((item, idx) => {
            const pct = Math.max(4, Math.round((item.value / maxVal) * 100));
            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-slate-700 font-medium">{item.label}</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">
                    {item.value} {stimulus.unit || ''}
                  </span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-md overflow-hidden">
                  <div
                    className="h-full rounded-md transition-all duration-300"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: item.color || '#1E40AF',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (stimulus.type === 'pie' && stimulus.chartItems) {
    const total = stimulus.chartItems.reduce((acc, c) => acc + c.value, 0) || 1;
    let cumulative = 0;
    const radius = 54;
    const circumference = 2 * Math.PI * radius;

    return (
      <div className="rounded-xl border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold text-slate-700 mb-3">{stimulus.title}</p>
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <svg width="144" height="144" viewBox="0 0 144 144" className="shrink-0">
            <g transform="rotate(-90 72 72)">
              {stimulus.chartItems.map((item, idx) => {
                const frac = item.value / total;
                const dashLength = frac * circumference;
                const offset = -cumulative * circumference;
                cumulative += frac;
                return (
                  <circle
                    key={idx}
                    cx="72"
                    cy="72"
                    r={radius}
                    fill="transparent"
                    stroke={item.color || '#1E40AF'}
                    strokeWidth="26"
                    strokeDasharray={`${dashLength} ${circumference}`}
                    strokeDashoffset={offset}
                  />
                );
              })}
            </g>
            <circle cx="72" cy="72" r="28" fill="#FFFFFF" />
            <text
              x="72"
              y="76"
              textAnchor="middle"
              className="fill-slate-800 text-xs font-bold font-mono"
            >
              100%
            </text>
          </svg>
          <div className="grid grid-cols-1 gap-2 w-full">
            {stimulus.chartItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs sm:text-sm gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-3 h-3 rounded-sm shrink-0"
                    style={{ backgroundColor: item.color || '#1E40AF' }}
                  />
                  <span className="text-slate-700 truncate">{item.label}</span>
                </div>
                <span className="font-mono font-semibold text-slate-900 tabular-nums shrink-0">
                  {item.value}
                  {stimulus.unit || '%'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
