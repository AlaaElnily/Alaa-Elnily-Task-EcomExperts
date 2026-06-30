import { useState, useEffect } from 'react';
import localCatalog from '../data/products.json';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export function useCatalog() {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/catalog`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) { setCatalog(data); setLoading(false); }
      } catch (err) {
        console.warn('API unreachable, using local fallback:', err.message);
        if (!cancelled) { setCatalog(localCatalog); setUsingFallback(true); setLoading(false); }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { catalog, loading, usingFallback };
}
