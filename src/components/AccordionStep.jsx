import React from "react";
import { ProductCardF1735, ProductCardF1736 } from "./ProductCard";

function StepIcon({ type }) {
  if (type === "camera")
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M23 7l-7 5 7 5V7z" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
      </svg>
    );
  if (type === "shield")
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
  if (type === "sensor")
    return (
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    );
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}

export default function AccordionStep({
  step,
  isOpen,
  selectedCount,
  onToggle,
  onNext,
  products,
  getProductQuantity,
  getActiveVariantId,
  onQuantityChange,
  onVariantChange,
  viewMode = "f1735", // 'f1735' | 'f1736'
}) {
  const ProductCard =
    viewMode === "f1736" ? ProductCardF1736 : ProductCardF1735;
  const gridCls =
    viewMode === "f1736"
      ? "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 items-stretch"
      : "grid md:grid-cols-2 gap-3 items-stretch";

  return (
    <div>
      {/* ── Collapsed header: flat row with top border ── */}
      {!isOpen && (
        <div className="border-b border-black border-b-[0.5px]">
          
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between py-[15px] text-left"
          >
            <div className="flex flex-col gap-[5px] w-full">
              <span className="text-[9.5px] font-semibold tracking-[0.13em] uppercase text-[#9898B0] px-[15px]">
                STEP {step.stepNumber} OF 4
              </span>
              <div className="flex justify-between border-t-[0.5px] border-t border-black w-full px-[15px] pt-5">
                <div className="flex items-center gap-2.5">

                <span className="w-7 h-7 rounded bg-white border border-[#D8D9F9] flex items-center justify-center text-[#4B4FD9] flex-shrink-0">
                  <StepIcon type={step.icon} />
                </span>
                <span className="text-[22px] font-bold text-[#1A1A2E] tracking-tight">
                  {step.title}
                </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {selectedCount > 0 && (
                    <span className="text-[11.5px] font-semibold text-[#4B4FD9]">
                      {selectedCount} selected
                    </span>
                  )}
                 <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4B4FD9"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* ── Open: white card ── */}
      {isOpen && (
        <div className="bg-brand-50 rounded-[10px] overflow-hidden not-first:mt-4">
          {/* Open header */}
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-between py-[15px] text-left"
          >
            <div className="flex flex-col gap-[5px] w-full">
              <span className="text-[9.5px] font-semibold tracking-[0.13em] uppercase text-[#9898B0] px-[15px]">
                STEP {step.stepNumber} OF 4
              </span>
              <div className="flex justify-between border-t-[0.5px] border-t border-black w-full px-[15px] pt-5">
                <div className="flex items-center gap-2.5">

                <span className="w-7 h-7 rounded bg-white border border-[#D8D9F9] flex items-center justify-center text-[#4B4FD9] flex-shrink-0">
                  <StepIcon type={step.icon} />
                </span>
                <span className="text-[22px] font-bold text-[#1A1A2E] tracking-tight">
                  {step.title}
                </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {selectedCount > 0 && (
                    <span className="text-[11.5px] font-semibold text-[#4B4FD9]">
                      {selectedCount} selected
                    </span>
                  )}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4B4FD9"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </div>
              </div>
            </div>
          </button>

          {/* Product grid */}
          <div className="p-5 flex flex-col gap-4">
            <div className={gridCls}>
              {products.map((product, i) => {
                const qty = getProductQuantity(product);
                const activeVariantId = getActiveVariantId(product);
                const qKey =
                  product.variants?.length > 0 ? activeVariantId : product.id;
                const isLastOdd =
                  viewMode === "f1735" &&
                  i === products.length - 1 &&
                  products.length % 2 !== 0;
                return (
                  <div
                    key={product.id}
                    className={
                      isLastOdd ? "sm:col-span-2 flex justify-center" : "flex"
                    }
                  >
                    <div
                      className={
                        isLastOdd ? "sm:w-[calc(50%-6px)]" : "w-full"
                      }
                    >
                      <ProductCard
                        product={product}
                        quantity={qty}
                        activeVariantId={activeVariantId}
                        onQuantityChange={(val) => onQuantityChange(qKey, val)}
                        onVariantChange={onVariantChange}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {step.nextLabel && (
              <button
                onClick={onNext}
                className="w-full py-[11px] border border-[#C8C8D8] rounded-lg text-[13.5px] font-semibold
                  text-[#1A1A2E] bg-white hover:border-[#4B4FD9] hover:text-[#4B4FD9] transition-colors"
              >
                Next: {step.nextLabel}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
