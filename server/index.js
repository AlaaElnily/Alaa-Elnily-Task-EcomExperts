const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 4000;
const DATA = path.join(__dirname, 'products.json');

app.use(cors());
app.use(express.json());

function readCatalog() {
  return JSON.parse(fs.readFileSync(DATA, 'utf8'));
}

app.get('/api/health',   (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));
app.get('/api/catalog',  (_req, res) => res.json(readCatalog()));
app.get('/api/steps',    (_req, res) => res.json(readCatalog().steps));
app.get('/api/steps/:id', (req, res) => {
  const step = readCatalog().steps.find(s => s.id === req.params.id);
  if (!step) return res.status(404).json({ error: 'Step not found' });
  res.json(step);
});
app.get('/api/products', (_req, res) => {
  const { steps } = readCatalog();
  res.json(steps.flatMap(s => s.products.map(p => ({ ...p, stepId: s.id }))));
});
app.get('/api/products/:id', (req, res) => {
  for (const step of readCatalog().steps) {
    const p = step.products.find(p => p.id === req.params.id);
    if (p) return res.json({ ...p, stepId: step.id });
  }
  res.status(404).json({ error: 'Product not found' });
});
app.get('/api/config', (_req, res) => {
  const { shipping, financing, guarantee } = readCatalog();
  res.json({ shipping, financing, guarantee });
});
app.use((_req, res) => res.status(404).json({ error: 'Route not found' }));

app.listen(PORT, () => console.log(`\n  API → http://localhost:${PORT}/api/catalog\n`));
