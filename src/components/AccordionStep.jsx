import React from "react";
import { ProductCardF1735, ProductCardF1736 } from "./ProductCard";

const STEP_ICON_MAP = {
  camera:  '/images/icon-camera.svg',
  shield:  '/images/icon-shield.svg',
  sensor:  '/images/icon-sensor.svg',
  grid:    '/images/icon-grid.svg',
};

function StepIcon({ type }) {
  const src = STEP_ICON_MAP[type] ?? STEP_ICON_MAP.grid;
  return <img src={src} alt="" className="w-[26px] h-[26px] object-contain flex-shrink-0" />;
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
              <span className="text-[12px] font-normal tracking-[0.13em] uppercase text-[#484848] px-[15px]">
                STEP {step.stepNumber} OF 4
              </span>
              <div className="flex justify-between border-t border-black border-t-[0.5px] w-full px-[15px] pt-5">
                <div className="flex items-center gap-2.5">
                  <StepIcon type={step.icon} />
                  <span className="text-[22px] font-normal text-[#0B0D10] tracking-tight">
                    {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {selectedCount > 0 && (
                    <span className="text-[11.5px] font-semibold text-[#4B4FD9]">
                      {selectedCount} selected
                    </span>
                  )}
                  <img src="/images/carrot-up.svg" alt="" className="w-3 h-3 rotate-180" />
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
              <span className="text-[12px] font-normal tracking-[0.13em] uppercase text-[#484848] px-[15px]">
                STEP {step.stepNumber} OF 4
              </span>
              <div className="flex justify-between border-t border-black border-t-[0.5px] w-full px-[15px] pt-5">
                <div className="flex items-center gap-2.5">
                  <StepIcon type={step.icon} />
                  <span className="text-[22px] font-normal text-[#0B0D10] tracking-tight">
                    {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                  {selectedCount > 0 && (
                    <span className="text-[11.5px] font-semibold text-[#4B4FD9]">
                      {selectedCount} selected
                    </span>
                  )}
                  <img src="/images/carrot-up.svg" alt="" className="w-3 h-3" />
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
