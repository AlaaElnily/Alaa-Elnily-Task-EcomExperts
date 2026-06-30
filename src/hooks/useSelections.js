import { useState, useCallback, useRef } from 'react';

const STORAGE_KEY = 'bundle_builder_system';

function buildInitialQuantities(steps) {
  const q = {};
  steps.forEach(step => {
    step.products.forEach(product => {
      if (product.variants?.length > 0) {
        product.variants.forEach(v => { q[v.id] = 0; });
      } else {
        q[product.id] = product.initialQuantity ?? 0;
      }
    });
  });
  return q;
}

function buildInitialActiveVariants(steps) {
  const a = {};
  steps.forEach(step => {
    step.products.forEach(product => {
      if (product.variants?.length > 0) a[product.id] = product.variants[0].id;
    });
  });
  return a;
}

function loadSaved() {
  try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : null; }
  catch { return null; }
}

export function useSelections(catalog) {
  const seededRef = useRef(false);
  const saved = loadSaved();

  const [quantities,     setQuantities]     = useState(saved?.quantities     ?? {});
  const [activeVariants, setActiveVariants] = useState(saved?.activeVariants ?? {});

  // Seed state once catalog loads (only if nothing was saved)
  if (catalog && !seededRef.current) {
    seededRef.current = true;
    if (!saved) {
      setQuantities(buildInitialQuantities(catalog.steps));
      setActiveVariants(buildInitialActiveVariants(catalog.steps));
    }
  }

  const setQuantity = useCallback((key, value) => {
    setQuantities(prev => ({ ...prev, [key]: Math.max(0, value) }));
  }, []);

  const setVariant = useCallback((productId, variantId) => {
    setActiveVariants(prev => ({ ...prev, [productId]: variantId }));
  }, []);

  const getProductQuantity = useCallback((product) => {
    if (product.variants?.length > 0) {
      return quantities[activeVariants[product.id] ?? product.variants[0].id] ?? 0;
    }
    return quantities[product.id] ?? 0;
  }, [quantities, activeVariants]);

  const getActiveVariantId = useCallback((product) => {
    if (!product.variants?.length) return null;
    return activeVariants[product.id] ?? product.variants[0].id;
  }, [activeVariants]);

  const stepSelectedCount = useCallback((step) => {
    return step.products.reduce((count, product) => {
      if (product.variants?.length > 0)
        return count + (product.variants.some(v => (quantities[v.id] ?? 0) > 0) ? 1 : 0);
      return count + ((quantities[product.id] ?? 0) > 0 ? 1 : 0);
    }, 0);
  }, [quantities]);

  const getReviewItems = useCallback(() => {
    if (!catalog) return [];
    const items = [];
    catalog.steps.forEach(step => {
      step.products.forEach(product => {
        if (product.variants?.length > 0) {
          product.variants.forEach(variant => {
            const qty = quantities[variant.id] ?? 0;
            if (qty > 0) items.push({
              key: variant.id, productId: product.id, variantId: variant.id,
              name: `${product.name} — ${variant.label}`,
              price: product.price, comparePrice: product.comparePrice,
              priceSuffix: product.priceSuffix, priceLabel: product.priceLabel,
              image: product.image, category: step.id, quantity: qty,
            });
          });
        } else {
          const qty = quantities[product.id] ?? 0;
          if (qty > 0) items.push({
            key: product.id, productId: product.id, variantId: null,
            name: product.name,
            price: product.price, comparePrice: product.comparePrice,
            priceSuffix: product.priceSuffix, priceLabel: product.priceLabel,
            image: product.image, category: step.id, quantity: qty,
          });
        }
      });
    });
    return items;
  }, [quantities, catalog]);

  const getTotal = useCallback(() => {
    if (!catalog) return 0;
    let t = 0;
    catalog.steps.forEach(step => {
      step.products.forEach(product => {
        if (product.variants?.length > 0)
          product.variants.forEach(v => { t += product.price * (quantities[v.id] ?? 0); });
        else t += product.price * (quantities[product.id] ?? 0);
      });
    });
    return t;
  }, [quantities, catalog]);

  const getCompareTotal = useCallback(() => {
    if (!catalog) return 0;
    let t = 0;
    catalog.steps.forEach(step => {
      step.products.forEach(product => {
        const cp = product.comparePrice ?? product.price;
        if (product.variants?.length > 0)
          product.variants.forEach(v => { t += cp * (quantities[v.id] ?? 0); });
        else t += cp * (quantities[product.id] ?? 0);
      });
    });
    return t;
  }, [quantities, catalog]);

  const saveSystem = useCallback(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ quantities, activeVariants })); }
    catch {}
  }, [quantities, activeVariants]);

  return {
    quantities, activeVariants,
    setQuantity, setVariant,
    getProductQuantity, getActiveVariantId,
    stepSelectedCount, getReviewItems, getTotal, getCompareTotal,
    saveSystem,
  };
}
