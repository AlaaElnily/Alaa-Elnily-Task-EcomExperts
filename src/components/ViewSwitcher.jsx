import React from 'react';

export default function ViewSwitcher({ current, onChange }) {
  return (
    <div className="flex items-center justify-center py-4 px-6">
      <div className="inline-flex items-center gap-1 bg-white border border-[#E2E2EC] rounded-lg p-1 shadow-sm">
        <span className="text-[11px] font-semibold text-[#9898B0] uppercase tracking-[0.1em] px-2">View:</span>

        <button
          onClick={() => onChange('f1735')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all
            ${current === 'f1735'
              ? 'bg-[#4B4FD9] text-white shadow-sm'
              : 'text-[#6B6B80] hover:text-[#1A1A2E] hover:bg-[#F5F5FA]'
            }`}
        >
          {/* Two-column icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="12" rx="1" fill="currentColor" opacity="0.8"/>
            <rect x="8" y="1" width="5" height="12" rx="1" fill="currentColor" opacity="0.4"/>
          </svg>
          Frame 1735
        </button>

        <button
          onClick={() => onChange('f1736')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold transition-all
            ${current === 'f1736'
              ? 'bg-[#4B4FD9] text-white shadow-sm'
              : 'text-[#6B6B80] hover:text-[#1A1A2E] hover:bg-[#F5F5FA]'
            }`}
        >
          {/* Single wide column icon */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="12" height="12" rx="1" fill="currentColor" opacity="0.8"/>
          </svg>
          Frame 1736
        </button>
      </div>
    </div>
  );
}
