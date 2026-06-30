import React from 'react';

// size="card"   → plain text buttons (no circle border) — used on product cards
// size="review" → small circle buttons — used in review panel
export default function QuantityStepper({ value, onChange, min = 0, max = 99, size = 'card' }) {
  const dec = () => value > min && onChange(value - 1);
  const inc = () => value < max && onChange(value + 1);

  if (size === 'review') {
    return (
      <div className="inline-flex items-center gap-[7px]">
        <button onClick={dec} disabled={value <= min} aria-label="Decrease"
          className="w-[22px] h-[22px] rounded-[5px] border border-[#E2E2EC] bg-white flex items-center justify-center
          text-[14px] leading-none text-[#1A1A2E] hover:border-[#4B4FD9] hover:text-[#4B4FD9]
          disabled:text-[#C8C8D8] disabled:border-[#ECECF2] disabled:cursor-not-allowed transition-colors"
        >−</button>
        <span className="text-[16px] font-normal text-[#1A1A2E] w-4 text-center select-none">{value}</span>
        <button onClick={inc} disabled={value >= max} aria-label="Increase"
          className="w-[22px] h-[22px] rounded-[5px] border border-[#E2E2EC] bg-white flex items-center justify-center
          text-[14px] leading-none text-[#1A1A2E] hover:border-[#4B4FD9] hover:text-[#4B4FD9]
          disabled:text-[#C8C8D8] disabled:border-[#ECECF2] disabled:cursor-not-allowed transition-colors"
        >+</button>
      </div>
    );
  }

  // card size — matches Figma exactly: plain − N + text
  return (
    <div className="inline-flex items-center gap-0">
      <button onClick={dec} disabled={value <= min} aria-label="Decrease"
        className="w-5 h-5 rounded-[4px] border border-grey-200 bg-grey-200 flex items-center justify-center
        text-[13px] leading-none text-grey-700 hover:border-[#4B4FD9] hover:text-[#4B4FD9] border-[2px]
        disabled:text-grey-400 disabled:border-grey-300 disabled:bg-white disabled:cursor-not-allowed transition-colors"
      >−</button>
      <span className="text-[16px] font-normal text-[#1A1A2E] w-5 text-center select-none">{value}</span>
      <button onClick={inc} disabled={value >= max} aria-label="Increase"
        className="w-5 h-5 rounded-[4px] border border-grey-200 bg-grey-200 flex items-center justify-center
        text-[13px] leading-none text-grey-700 hover:border-[#4B4FD9] hover:text-[#4B4FD9] border-[2px]
        disabled:text-grey-400 disabled:border-grey-300 disabled:bg-white disabled:cursor-not-allowed transition-colors"
      >+</button>
    </div>
  );
}
