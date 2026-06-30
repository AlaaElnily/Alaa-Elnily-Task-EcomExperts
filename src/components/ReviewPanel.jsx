import React, { useState } from 'react';
import QuantityStepper from './QuantityStepper';

const CAT_LABELS = { cameras: 'CAMERAS', sensors: 'SENSORS', protection: 'ACCESSORIES', plan: 'PLAN' };
const CAT_ORDER  = ['cameras', 'sensors', 'protection', 'plan'];

function TruckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/>
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  );
}

// Figma satisfaction badge — dark navy circle
function GuaranteeBadge({ size = 'sm' }) {
  const sz = size === 'lg' ? 'w-[80px] h-[80px]' : 'w-[58px] h-[58px]';
  const pct = size === 'lg' ? 'text-[22px]' : 'text-[16px]';
  const txt = size === 'lg' ? 'text-[7.5px]' : 'text-[6px]';
  return (
    <div className={`${sz} rounded-full bg-[#1A1A5E] border-[3px] border-[#3030AA]
      flex flex-col items-center justify-center flex-shrink-0 text-white leading-tight select-none`}>
      <span className={`${pct} font-black leading-none`}>100%</span>
      <span className={`${txt} font-semibold text-center leading-[1.35] mt-[2px] px-1`}>
        Wyze<br/>satisfaction<br/>guarantee
      </span>
    </div>
  );
}

function LineItems({ grouped, onQuantityChange }) {
  return (
    <>
      {Object.entries(grouped).map(([cat, items]) => (
        <div key={cat} className="px-5 pt-[15px] pb-[10px] border-b border-[#E8E8F2]">
          <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#9898B0] mb-2.5">
            {CAT_LABELS[cat]}
          </p>
          <div className="flex flex-col gap-3">
            {items.map(item => (
              <div key={item.key} className="flex items-center gap-3 w-full">
                <img src={item.image} alt={item.name}
                  className="w-9 h-9 object-contain rounded border border-[#E8E8F2] bg-[#F5F5FA] p-[3px] flex-shrink-0" />
                <div className="flex flex-row justify-between items-center w-full">
                  <p className="text-[11.5px] font-medium text-[#1A1A2E] leading-snug truncate">{item.name}</p>
                    <QuantityStepper
                      value={item.quantity}
                      onChange={val => onQuantityChange(item.variantId ?? item.productId, val)}
                      max={item.productId?.startsWith('plan-') ? 1 : 99}
                      size="review"
                    />
                </div>
                  <div className="flex items-center mt-[3px] gap-2">
                    <div className="flex flex-col items-end leading-tight">
                      {item.comparePrice != null && item.comparePrice > 0 && item.price === 0 && (
                        <span className="text-[9.5px] text-[#9898B0] line-through">
                          ${(item.comparePrice * item.quantity).toFixed(2)}
                        </span>
                      )}
                      {item.price === 0
                        ? <span className="text-[12.5px] font-bold text-[#4B4FD9]">FREE</span>
                        : <span className="text-[12.5px] font-bold text-[#4B4FD9]">
                            ${(item.price * item.quantity).toFixed(2)}{item.priceSuffix ?? ''}
                          </span>
                      }
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

// ── Frame 1735: sticky side panel ──────────────────────────────────────────
export function ReviewPanelF1735({ reviewItems, total, compareTotal, onQuantityChange, onSave, shipping, financing }) {
  const [saved, setSaved]         = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const grouped  = CAT_ORDER.reduce((a, c) => { const i = reviewItems.filter(x => x.category === c); if (i.length) a[c] = i; return a; }, {});
  const savings  = compareTotal - total;
  const hasItems = reviewItems.length > 0;

  return (
    <div className="bg-brand-50 rounded-[10px] flex flex-col lg:min-w-[399px]">
      {/* REVIEW label */}
      <div className="px-5 pt-[15px] pb-0 text-[9px] font-bold tracking-[0.16em] uppercase text-[#9898B0]">REVIEW</div>

      {/* Heading */}
      <div className="px-5 pt-5 pb-[10px] border-b border-[#E8E8F2]">
        <h2 className="text-[19px] font-bold text-[#1A1A2E] tracking-tight leading-tight">Your security system</h2>
        <p className="text-[11px] text-[#9898B0] mt-[5px] leading-snug">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {/* Body */}
      <div className="overflow-y-auto flex-1">
        {!hasItems && (
          <p className="px-5 py-10 text-center text-[12px] text-[#9898B0]">Add products to build your system</p>
        )}

        {hasItems && <LineItems grouped={grouped} onQuantityChange={onQuantityChange} />}

        {hasItems && (
          <>
            {/* Shipping */}
            <div className="px-5 py-3 flex items-center justify-between border-b border-[#E8E8F2]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded bg-[#EEF0FF] flex items-center justify-center text-[#4B4FD9] flex-shrink-0">
                  <TruckIcon />
                </div>
                <span className="text-[12.5px] font-semibold text-[#1A1A2E]">{shipping.label}</span>
              </div>
              <div className="text-right leading-tight">
                {shipping.comparePrice > 0 && (
                  <span className="block text-[10.5px] text-[#9898B0] line-through">${shipping.comparePrice.toFixed(2)}</span>
                )}
                <span className="text-[12.5px] font-bold text-[#4B4FD9]">FREE</span>
              </div>
            </div>

            {/* Guarantee + total */}
            <div className="px-5 py-3.5 flex items-center gap-3 border-b border-[#E8E8F2]">
              <GuaranteeBadge size="sm" />
              <div className="flex flex-col items-end flex-1 gap-1.5">
                <span className="bg-[#EEF0FF] text-[#4B4FD9] text-[10.5px] font-bold px-3 py-[3px] rounded-full whitespace-nowrap">
                  {financing.label}
                </span>
                <div className="flex items-baseline gap-2">
                  {savings > 0 && (
                    <span className="text-[13px] font-medium text-[#9898B0] line-through">${compareTotal.toFixed(2)}</span>
                  )}
                  <span className="text-[26px] font-extrabold text-[#1A1A2E] tracking-tight leading-none">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Savings */}
            {savings > 0 && (
              <div className="px-5 py-2.5 text-center text-[11.5px] font-semibold text-[#1A7A4A] border-b border-[#E8E8F2]">
                Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
              </div>
            )}

            {/* Checkout */}
            <div className="px-5 pt-4 pb-2">
              <button onClick={() => { setCheckedOut(true); setTimeout(() => setCheckedOut(false), 2000); }}
                className="w-full py-[13px] bg-[#4B4FD9] hover:bg-[#3D41C4] active:bg-[#3134A8] text-white font-bold text-[14.5px] rounded-lg transition-colors">
                {checkedOut ? '✓ Order placed!' : 'Checkout'}
              </button>
            </div>

            {/* Save */}
            <div className="px-5 pb-5 text-center">
              <button onClick={() => { onSave(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                className="text-[12px] italic text-[#6B6B80] hover:text-[#4B4FD9] underline underline-offset-2 transition-colors">
                {saved
                  ? <span className="not-italic font-semibold text-[#1A7A4A] no-underline">✓ System saved!</span>
                  : 'Save my system for later'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Frame 1736: full-width panel below the builder ────────────────────────
export function ReviewPanelF1736({ reviewItems, total, compareTotal, onQuantityChange, onSave, shipping, financing }) {
  const [saved, setSaved]           = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);
  const grouped  = CAT_ORDER.reduce((a, c) => { const i = reviewItems.filter(x => x.category === c); if (i.length) a[c] = i; return a; }, {});
  const savings  = compareTotal - total;
  const hasItems = reviewItems.length > 0;

  return (
    <div className="bg-white rounded-xl shadow-[0_2px_20px_rgba(0,0,0,0.09)] overflow-hidden mt-4">
      {/* Heading row */}
      <div className="px-6 pt-5 pb-4 border-b border-[#E8E8F2]">
        <h2 className="text-[20px] font-bold text-[#1A1A2E] tracking-tight">Your security system</h2>
        <p className="text-[12px] text-[#9898B0] mt-1 leading-snug">
          Review your personalized protection system designed to keep what matters most safe.
        </p>
      </div>

      {!hasItems && (
        <p className="px-6 py-10 text-center text-[13px] text-[#9898B0]">Add products to build your system</p>
      )}

      {hasItems && (
        <>
          {/* Line items — horizontal layout */}
          <div className="px-6 py-4 border-b border-[#E8E8F2]">
            <div className="grid grid-cols-1 gap-0 divide-y divide-[#F0F0F8]">
              {Object.entries(grouped).map(([cat, items]) => (
                <div key={cat} className="py-3 first:pt-0 last:pb-0">
                  <p className="text-[9px] font-bold tracking-[0.14em] uppercase text-[#9898B0] mb-2">
                    {CAT_LABELS[cat]}
                  </p>
                  <div className="flex flex-col gap-2">
                    {items.map(item => (
                      <div key={item.key} className="flex items-center gap-3">
                        <img src={item.image} alt={item.name}
                          className="w-9 h-9 object-contain rounded border border-[#E8E8F2] bg-[#F5F5FA] p-[3px] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[12px] font-medium text-[#1A1A2E]">{item.name}</p>
                        </div>
                        <QuantityStepper
                          value={item.quantity}
                          onChange={val => onQuantityChange(item.variantId ?? item.productId, val)}
                          max={item.productId?.startsWith('plan-') ? 1 : 99}
                          size="review"
                        />
                        <div className="flex flex-col items-end leading-tight w-20 flex-shrink-0">
                          {item.comparePrice != null && item.comparePrice > 0 && item.price === 0 && (
                            <span className="text-[9.5px] text-[#9898B0] line-through">
                              ${(item.comparePrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                          {item.price === 0
                            ? <span className="text-[13px] font-bold text-[#4B4FD9]">FREE</span>
                            : <span className="text-[13px] font-bold text-[#4B4FD9]">
                                ${(item.price * item.quantity).toFixed(2)}{item.priceSuffix ?? ''}
                              </span>
                          }
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping */}
          <div className="px-6 py-3 flex items-center justify-between border-b border-[#E8E8F2]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-[#EEF0FF] flex items-center justify-center text-[#4B4FD9] flex-shrink-0">
                <TruckIcon />
              </div>
              <span className="text-[13px] font-semibold text-[#1A1A2E]">{shipping.label}</span>
            </div>
            <div className="flex items-center gap-3 text-right">
              {shipping.comparePrice > 0 && (
                <span className="text-[11px] text-[#9898B0] line-through">${shipping.comparePrice.toFixed(2)}</span>
              )}
              <span className="text-[13px] font-bold text-[#4B4FD9]">FREE</span>
            </div>
          </div>

          {/* Guarantee + 30-day returns + total + CTA — wide layout matching F1736 */}
          <div className="px-6 py-5 flex items-start gap-6">
            {/* Left: guarantee badge + returns text */}
            <div className="flex items-start gap-4 flex-1">
              <GuaranteeBadge size="lg" />
              <div>
                <p className="text-[14px] font-bold text-[#1A1A2E]">30-day hassle-free returns</p>
                <p className="text-[12px] text-[#6B6B80] mt-1 leading-snug max-w-[240px]">
                  If you're not totally in love with the product, we will refund you 100%.
                </p>
              </div>
            </div>

            {/* Right: financing pill + total + savings + checkout + save */}
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="bg-[#EEF0FF] text-[#4B4FD9] text-[11px] font-bold px-3 py-[3px] rounded-full whitespace-nowrap">
                {financing.label}
              </span>
              <div className="flex items-baseline gap-2">
                {savings > 0 && (
                  <span className="text-[14px] font-medium text-[#9898B0] line-through">${compareTotal.toFixed(2)}</span>
                )}
                <span className="text-[30px] font-extrabold text-[#1A1A2E] tracking-tight leading-none">
                  ${total.toFixed(2)}
                </span>
              </div>
              {savings > 0 && (
                <p className="text-[11.5px] font-semibold text-[#1A7A4A]">
                  Congrats! You're saving ${savings.toFixed(2)} on your security bundle!
                </p>
              )}
              <button onClick={() => { setCheckedOut(true); setTimeout(() => setCheckedOut(false), 2000); }}
                className="w-[200px] py-[13px] bg-[#4B4FD9] hover:bg-[#3D41C4] text-white font-bold text-[14.5px] rounded-lg transition-colors">
                {checkedOut ? '✓ Order placed!' : 'Checkout'}
              </button>
              <button onClick={() => { onSave(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
                className="text-[12px] italic text-[#6B6B80] hover:text-[#4B4FD9] underline underline-offset-2 transition-colors">
                {saved
                  ? <span className="not-italic font-semibold text-[#1A7A4A]">✓ System saved!</span>
                  : 'Save my system for later'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Default export = F1735
export default ReviewPanelF1735;
