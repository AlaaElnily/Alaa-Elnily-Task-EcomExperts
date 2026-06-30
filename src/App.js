import React, { useState } from 'react';
import AccordionStep from './components/AccordionStep';
import { ReviewPanelF1735, ReviewPanelF1736 } from './components/ReviewPanel';
import ViewSwitcher from './components/ViewSwitcher';
import { useCatalog } from './hooks/useCatalog';
import { useSelections } from './hooks/useSelections';

export default function App() {
  const [openStep, setOpenStep]   = useState(0);
  const [viewMode, setViewMode]   = useState('f1735'); // 'f1735' | 'f1736'
  const { catalog, loading, usingFallback } = useCatalog();
  const sel = useSelections(catalog);

  function handleToggle(idx) { setOpenStep(prev => prev === idx ? -1 : idx); }
  function handleNext(idx) {
    if (!catalog || idx >= catalog.steps.length - 1) return;
    setOpenStep(idx + 1);
    setTimeout(() => document.getElementById(`step-${idx + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  const reviewItems  = sel.getReviewItems();
  const total        = sel.getTotal();
  const compareTotal = sel.getCompareTotal();

  const reviewProps = {
    reviewItems, total, compareTotal,
    onQuantityChange: sel.setQuantity,
    onSave: sel.saveSystem,
    shipping:   catalog?.shipping,
    financing:  catalog?.financing,
    guarantee:  catalog?.guarantee,
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEEEF5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-[#9898B0]">
          <svg className="animate-spin" width="26" height="26" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
          </svg>
          <span className="text-[13px] font-medium">Loading catalog…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">

      {/* API fallback banner */}
      {usingFallback && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-[11.5px] text-amber-700">
          Using local data — run <code className="font-mono bg-amber-100 px-1 rounded text-[11px]">cd server && npm start</code> to enable the live API.
        </div>
      )}

      {/* ── View switcher ── */}
      <ViewSwitcher current={viewMode} onChange={setViewMode} />

      {/* ── Frame 1735: two-column ── */}
      {viewMode === 'f1735' && (
        <main className="container m-auto">
          <div className='max-w-[1196px] pb-16 grid lg:grid-cols-[1fr_400px] gap-6 m-auto'>
          {/* Builder */}
          <section className="flex flex-col min-w-0 max-w-[100vw]">
            {catalog.steps.map((step, idx) => (
              <div key={step.id} id={`step-${idx}`}>
                <AccordionStep
                  step={step} isOpen={openStep === idx}
                  selectedCount={sel.stepSelectedCount(step)}
                  onToggle={() => handleToggle(idx)}
                  onNext={() => handleNext(idx)}
                  products={step.products}
                  getProductQuantity={sel.getProductQuantity}
                  getActiveVariantId={sel.getActiveVariantId}
                  onQuantityChange={sel.setQuantity}
                  onVariantChange={sel.setVariant}
                  viewMode="f1735"
                />
              </div>
            ))}
          </section>

          {/* Side review panel */}
          <aside className="max-w-[100vw]">
            <ReviewPanelF1735 {...reviewProps} />
          </aside>
          </div>
        </main>
      )}

      {/* ── Frame 1736: single-column wide ── */}
      {viewMode === 'f1736' && (
        <main className="max-w-[1200px] mx-auto px-6 pb-16">
          {/* Builder — full width, cards in 5-col row */}
          <section className="flex flex-col min-w-0 max-w-[100vw]">
            {catalog.steps.map((step, idx) => (
              <div key={step.id} id={`step-${idx}`}>
                <AccordionStep
                  step={step} isOpen={openStep === idx}
                  selectedCount={sel.stepSelectedCount(step)}
                  onToggle={() => handleToggle(idx)}
                  onNext={() => handleNext(idx)}
                  products={step.products}
                  getProductQuantity={sel.getProductQuantity}
                  getActiveVariantId={sel.getActiveVariantId}
                  onQuantityChange={sel.setQuantity}
                  onVariantChange={sel.setVariant}
                  viewMode="f1736"
                />
              </div>
            ))}
          </section>

          {/* Full-width review panel below */}
          <ReviewPanelF1736 {...reviewProps} />
        </main>
      )}

      {/* ── Mobile sticky bar (both views) ── */}
      {/* {reviewItems.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E2E2EC]
          px-5 py-3 flex items-center justify-between gap-3 shadow-[0_-4px_16px_rgba(0,0,0,0.10)] z-50">
          <div>
            <p className="text-[10.5px] text-[#9898B0] font-medium">{reviewItems.length} item{reviewItems.length !== 1 ? 's' : ''}</p>
            <p className="text-[17px] font-bold text-[#1A1A2E] tracking-tight">${total.toFixed(2)}</p>
          </div>
          <button className="px-5 py-2.5 bg-[#4B4FD9] text-white font-semibold text-[13.5px] rounded-lg">
            Review system →
          </button>
        </div>
      )} */}
    </div>
  );
}
