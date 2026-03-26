#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const puppeteer = require('C:/GitProd/GTMStack_prod/GTMStack_pro_production/node_modules/puppeteer')

const ROOT = process.cwd()
const MANIFEST_PATH = path.join(ROOT, 'exports', 'gallery-manifest.json')
const VIEWPORT = { width: 1280, height: 720, deviceScaleFactor: 2 }
const DEFAULT_IDS = [
  'marketingai-neural-dashboard-v2',
  'marketingai-intelligence-dashboard-v2',
  'dashboard-tiles-marketingai-neural-dashboard-v2',
  'dashboard-tiles-marketingai-intelligence-dashboard-v2',
  'infracore-deepdive-dashboard-v2',
  'dashboard-tiles-infracore-deepdive-dashboard-v2',
  'agency-performance-console-v2',
  'automotivehero-growth-dashboard-tile-v2',
  'automotivehero-dashboard-component-v2',
  'automotive-hero-dashboard-component-v2',
  'sequence-ladder-analytics-tile-v2',
  'sequenceflow-animated-tile-v2',
  'growthcore-component-extraction-v2',
  'advocacy-loop-dashboard-v2',
  'apex-real-time-dashboard-v2',
]

function parseArgs(argv) {
  const args = {
    apply: false,
    dryRun: true,
    ids: [],
  }

  for (const raw of argv.slice(2)) {
    if (raw === '--apply') {
      args.apply = true
      args.dryRun = false
      continue
    }
    if (raw === '--dry-run') {
      args.apply = false
      args.dryRun = true
      continue
    }
    if (raw.startsWith('--ids=')) {
      args.ids = raw
        .split('=', 2)[1]
        .split(',')
        .map((part) => part.trim())
        .filter(Boolean)
      continue
    }
  }

  if (!args.apply) args.dryRun = true
  if (!args.ids.length) args.ids = DEFAULT_IDS
  return args
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function stripHtml(value) {
  return String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function hashString(value) {
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0
  }
  return hash
}

function paletteFor(item) {
  const base = {
    operations: {
      bg: '#07111f',
      panel: '#0f1d34',
      line: '#1d3154',
      text: '#e9f1ff',
      muted: '#7f95bd',
      accent: '#36d7ff',
      accentAlt: '#6ee7b7',
      glowA: 'rgba(54,215,255,0.30)',
      glowB: 'rgba(110,231,183,0.24)',
    },
    'digital-demand': {
      bg: '#12091d',
      panel: '#1a1029',
      line: '#32204a',
      text: '#f5efff',
      muted: '#b1a1d2',
      accent: '#f472b6',
      accentAlt: '#a78bfa',
      glowA: 'rgba(244,114,182,0.32)',
      glowB: 'rgba(167,139,250,0.26)',
    },
    industries: {
      bg: '#09131a',
      panel: '#10212c',
      line: '#1b3645',
      text: '#ecfbff',
      muted: '#87a9b5',
      accent: '#22d3ee',
      accentAlt: '#facc15',
      glowA: 'rgba(34,211,238,0.28)',
      glowB: 'rgba(250,204,21,0.22)',
    },
    'events-media': {
      bg: '#180c16',
      panel: '#24112a',
      line: '#47214e',
      text: '#fff0fb',
      muted: '#c5a4ca',
      accent: '#f97316',
      accentAlt: '#f472b6',
      glowA: 'rgba(249,115,22,0.28)',
      glowB: 'rgba(244,114,182,0.24)',
    },
    abm: {
      bg: '#0a1120',
      panel: '#101c31',
      line: '#20365a',
      text: '#ebf4ff',
      muted: '#89a0cb',
      accent: '#60a5fa',
      accentAlt: '#38bdf8',
      glowA: 'rgba(96,165,250,0.28)',
      glowB: 'rgba(56,189,248,0.22)',
    },
    fallback: {
      bg: '#0b1020',
      panel: '#121a30',
      line: '#243252',
      text: '#eef3ff',
      muted: '#8e9ab7',
      accent: '#facc15',
      accentAlt: '#60a5fa',
      glowA: 'rgba(250,204,21,0.20)',
      glowB: 'rgba(96,165,250,0.18)',
    },
  }

  return base[item.category] || base.fallback
}

function extractSummary(item) {
  const raw = stripHtml(item.summary || '')
    .replace(/^description\s*/i, '')
    .replace(/^this project is\s*/i, '')
    .replace(/^a high-fidelity\s*/i, 'High-fidelity ')
    .trim()

  if (!raw) {
    return `GTMStack animation for ${item.category.replace(/-/g, ' ')} use cases.`
  }

  return raw.length > 120 ? `${raw.slice(0, 117).trimEnd()}...` : raw
}

function titleWords(title) {
  return String(title || '')
    .split(/\s+/)
    .filter(Boolean)
}

function splitTitle(title) {
  const words = titleWords(title)
  if (words.length <= 2) return [title, '']
  const pivot = Math.ceil(words.length / 2)
  return [words.slice(0, pivot).join(' '), words.slice(pivot).join(' ')]
}

function layoutFor(item) {
  return hashString(item.id) % 3
}

function metricSet(item) {
  const seed = hashString(item.id)
  const pct = 18 + (seed % 57)
  const score = 64 + (seed % 31)
  const volume = 120 + (seed % 880)
  return {
    pct: `+${pct}%`,
    score: `${score}`,
    volume: `${volume}k`,
  }
}

function tagMarkup(item) {
  return (item.tags || [])
    .slice(0, 3)
    .map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`)
    .join('')
}

function sparkPath(seed, width, height) {
  const points = []
  for (let i = 0; i < 7; i += 1) {
    const x = (i / 6) * width
    const y = height - ((hashString(`${seed}-${i}`) % height) * 0.72 + height * 0.14)
    points.push([Math.round(x), Math.max(8, Math.round(y))])
  }
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point[0]} ${point[1]}`).join(' ')
}

function barsMarkup(seed, count) {
  const bars = []
  for (let i = 0; i < count; i += 1) {
    const h = 24 + (hashString(`${seed}:bar:${i}`) % 86)
    bars.push(`<div class="bar"><span style="height:${h}%"></span></div>`)
  }
  return bars.join('')
}

function nodesMarkup(seed, count) {
  const nodes = []
  for (let i = 0; i < count; i += 1) {
    const top = 10 + (hashString(`${seed}:top:${i}`) % 78)
    const left = 8 + (hashString(`${seed}:left:${i}`) % 82)
    const size = 12 + (hashString(`${seed}:size:${i}`) % 12)
    nodes.push(`<span class="node" style="top:${top}%;left:${left}%;width:${size}px;height:${size}px"></span>`)
  }
  return nodes.join('')
}

function renderBody(item, palette) {
  const [titleA, titleB] = splitTitle(item.title)
  const metrics = metricSet(item)
  const layout = layoutFor(item)
  const tags = tagMarkup(item)
  const summary = escapeHtml(extractSummary(item))
  const spark = sparkPath(item.id, 280, 90)
  const spark2 = sparkPath(`${item.id}-alt`, 280, 90)

  if (layout === 0) {
    return `
      <div class="shell layout-split">
        <section class="hero">
          <div class="eyebrow">${escapeHtml(item.category.replace(/-/g, ' '))}</div>
          <h1>${escapeHtml(titleA)}${titleB ? `<span>${escapeHtml(titleB)}</span>` : ''}</h1>
          <p>${summary}</p>
          <div class="chips">${tags}</div>
        </section>
        <section class="panel stack">
          <div class="metric-row">
            <div class="metric-card">
              <span class="label">Lift</span>
              <strong>${metrics.pct}</strong>
            </div>
            <div class="metric-card">
              <span class="label">Score</span>
              <strong>${metrics.score}</strong>
            </div>
            <div class="metric-card">
              <span class="label">Signals</span>
              <strong>${metrics.volume}</strong>
            </div>
          </div>
          <div class="chart-card">
            <svg viewBox="0 0 280 90" class="spark"><path d="${spark}" /></svg>
            <div class="bars">${barsMarkup(item.id, 8)}</div>
          </div>
        </section>
      </div>
    `
  }

  if (layout === 1) {
    return `
      <div class="shell layout-dashboard">
        <section class="panel large-panel">
          <div class="card-head">
            <div>
              <div class="eyebrow">${escapeHtml(item.category.replace(/-/g, ' '))}</div>
              <h1>${escapeHtml(item.title)}</h1>
            </div>
            <div class="score-ring"><span>${metrics.score}</span></div>
          </div>
          <p class="summary">${summary}</p>
          <div class="network">${nodesMarkup(item.id, 11)}</div>
        </section>
        <section class="mini-grid">
          <div class="mini-card">
            <span class="label">Momentum</span>
            <strong>${metrics.pct}</strong>
            <svg viewBox="0 0 280 90" class="spark compact"><path d="${spark2}" /></svg>
          </div>
          <div class="mini-card tags-card">
            <span class="label">Tags</span>
            <div class="chips">${tags}</div>
          </div>
        </section>
      </div>
    `
  }

  return `
    <div class="shell layout-console">
      <section class="panel side-panel">
        <div class="eyebrow">${escapeHtml(item.category.replace(/-/g, ' '))}</div>
        <h1>${escapeHtml(item.title)}</h1>
        <p>${summary}</p>
        <div class="chips">${tags}</div>
      </section>
      <section class="panel main-panel">
        <div class="grid">
          <div class="stats-stack">
            <div class="metric-card wide">
              <span class="label">Pipeline Health</span>
              <strong>${metrics.score}</strong>
            </div>
            <div class="metric-card wide">
              <span class="label">Velocity</span>
              <strong>${metrics.pct}</strong>
            </div>
          </div>
          <div class="bars tall">${barsMarkup(`${item.id}-console`, 6)}</div>
        </div>
        <svg viewBox="0 0 280 90" class="spark"><path d="${spark}" /></svg>
      </section>
    </div>
  `
}

function renderHtml(item) {
  const palette = paletteFor(item)

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; height: 100%; }
    body {
      font-family: Inter, "Segoe UI", Arial, sans-serif;
      color: ${palette.text};
      background:
        radial-gradient(circle at 18% 18%, ${palette.glowA}, transparent 28%),
        radial-gradient(circle at 82% 22%, ${palette.glowB}, transparent 24%),
        linear-gradient(155deg, ${palette.bg} 0%, #060b16 100%);
      overflow: hidden;
    }
    .frame {
      width: 1280px;
      height: 720px;
      padding: 42px;
      position: relative;
      overflow: hidden;
    }
    .frame::before,
    .frame::after {
      content: "";
      position: absolute;
      inset: 18px;
      border-radius: 28px;
      pointer-events: none;
    }
    .frame::before {
      border: 1px solid rgba(255,255,255,0.05);
    }
    .frame::after {
      inset: 34px;
      border: 1px solid ${palette.line};
      opacity: 0.45;
    }
    .brand {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 22px;
      position: relative;
      z-index: 2;
    }
    .brand-mark {
      font-size: 13px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${palette.muted};
    }
    .brand-pill {
      padding: 8px 14px;
      border-radius: 999px;
      border: 1px solid ${palette.line};
      background: rgba(255,255,255,0.03);
      font-size: 12px;
      color: ${palette.text};
    }
    .shell {
      position: relative;
      z-index: 2;
      display: grid;
      gap: 20px;
      height: calc(100% - 58px);
    }
    .layout-split { grid-template-columns: 1.1fr 0.9fr; }
    .layout-dashboard { grid-template-columns: 1fr 0.52fr; }
    .layout-console { grid-template-columns: 0.88fr 1.12fr; }
    .hero, .panel {
      border-radius: 28px;
      border: 1px solid ${palette.line};
      background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02));
      box-shadow: inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.26);
      backdrop-filter: blur(14px);
    }
    .hero, .side-panel { padding: 34px; }
    .panel { padding: 24px; }
    .stack {
      display: grid;
      grid-template-rows: auto 1fr;
      gap: 18px;
    }
    .eyebrow {
      font-size: 12px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: ${palette.muted};
      margin-bottom: 14px;
    }
    h1 {
      margin: 0 0 14px;
      font-size: 52px;
      line-height: 0.96;
      letter-spacing: -0.045em;
      max-width: 560px;
    }
    h1 span {
      display: block;
      color: ${palette.accent};
    }
    p, .summary {
      margin: 0;
      color: ${palette.muted};
      font-size: 20px;
      line-height: 1.45;
      max-width: 560px;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-top: 22px;
    }
    .chip {
      display: inline-flex;
      align-items: center;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid ${palette.line};
      background: rgba(255,255,255,0.04);
      font-size: 13px;
      color: ${palette.text};
    }
    .metric-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 14px;
    }
    .metric-card, .mini-card {
      border-radius: 20px;
      border: 1px solid ${palette.line};
      background: rgba(7, 12, 24, 0.36);
      padding: 18px;
    }
    .metric-card strong, .mini-card strong {
      display: block;
      font-size: 34px;
      letter-spacing: -0.04em;
      margin-top: 6px;
    }
    .label {
      display: block;
      color: ${palette.muted};
      font-size: 12px;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }
    .chart-card {
      border-radius: 24px;
      border: 1px solid ${palette.line};
      background:
        linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)),
        radial-gradient(circle at 85% 15%, ${palette.glowB}, transparent 34%);
      padding: 18px 20px 24px;
      display: grid;
      align-content: space-between;
      min-height: 260px;
    }
    .spark {
      width: 100%;
      height: 120px;
      overflow: visible;
    }
    .spark path {
      fill: none;
      stroke: ${palette.accent};
      stroke-width: 5;
      stroke-linecap: round;
      stroke-linejoin: round;
      filter: drop-shadow(0 0 14px ${palette.glowA});
    }
    .spark.compact {
      height: 88px;
      margin-top: 12px;
    }
    .bars {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      gap: 10px;
      align-items: end;
      height: 110px;
      margin-top: 18px;
    }
    .bars.tall {
      grid-template-columns: repeat(6, 1fr);
      height: 240px;
      padding: 10px 0 0;
    }
    .bar {
      height: 100%;
      display: flex;
      align-items: end;
    }
    .bar span {
      width: 100%;
      border-radius: 999px 999px 10px 10px;
      background: linear-gradient(180deg, ${palette.accent} 0%, ${palette.accentAlt} 100%);
      box-shadow: 0 0 18px ${palette.glowA};
    }
    .large-panel {
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 18px;
      padding: 28px;
    }
    .card-head {
      display: flex;
      align-items: start;
      justify-content: space-between;
      gap: 18px;
    }
    .score-ring {
      width: 118px;
      height: 118px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: 800;
      color: ${palette.text};
      background:
        radial-gradient(circle at center, ${palette.panel} 56%, transparent 58%),
        conic-gradient(${palette.accent} 0 72%, rgba(255,255,255,0.08) 72% 100%);
      box-shadow: inset 0 0 0 1px ${palette.line};
    }
    .network {
      position: relative;
      min-height: 290px;
      border-radius: 22px;
      border: 1px solid ${palette.line};
      background:
        linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)),
        radial-gradient(circle at center, ${palette.glowA}, transparent 38%);
      overflow: hidden;
    }
    .network::before, .network::after {
      content: "";
      position: absolute;
      inset: 16% 14%;
      border-radius: 24px;
      border: 1px dashed rgba(255,255,255,0.10);
    }
    .network::after {
      inset: 28% 24%;
      border-style: solid;
      opacity: 0.6;
    }
    .node {
      position: absolute;
      border-radius: 50%;
      background: linear-gradient(180deg, ${palette.accentAlt}, ${palette.accent});
      box-shadow: 0 0 20px ${palette.glowA};
    }
    .mini-grid {
      display: grid;
      grid-template-rows: 1fr 1fr;
      gap: 20px;
    }
    .tags-card .chips {
      margin-top: 16px;
    }
    .main-panel {
      display: grid;
      grid-template-rows: 1fr auto;
      gap: 18px;
      padding: 24px 24px 18px;
    }
    .grid {
      display: grid;
      grid-template-columns: 0.74fr 1fr;
      gap: 16px;
    }
    .stats-stack {
      display: grid;
      gap: 16px;
    }
    .metric-card.wide strong {
      font-size: 42px;
    }
  </style>
</head>
<body>
  <div class="frame">
    <div class="brand">
      <div class="brand-mark">Animation Registry / GTMStack.pro</div>
      <div class="brand-pill">${escapeHtml(item.id)}</div>
    </div>
    ${renderBody(item, palette)}
  </div>
</body>
</html>`
}

async function main() {
  const args = parseArgs(process.argv)
  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'))
  const requested = new Set(args.ids)
  const items = manifest.filter((item) => requested.has(item.id))

  console.log(`Fallback thumbnail render (${args.apply ? 'APPLY' : 'DRY-RUN'})`)
  console.log(`Requested IDs: ${args.ids.length}`)
  console.log(`Matched items: ${items.length}`)

  if (!items.length) {
    process.exit(1)
  }

  if (args.dryRun) {
    for (const item of items) {
      console.log(`- ${item.id} -> ${item.thumbnailPath}`)
    }
    return
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })

  try {
    const page = await browser.newPage()
    await page.setViewport(VIEWPORT)

    for (const item of items) {
      const outputPath = path.join(ROOT, item.thumbnailPath)
      ensureDir(path.dirname(outputPath))
      await page.setContent(renderHtml(item), { waitUntil: 'load' })
      await page.screenshot({
        path: outputPath,
        type: 'png',
        clip: { x: 0, y: 0, width: 1280, height: 720 },
      })
      console.log(`- wrote ${item.thumbnailPath}`)
    }

    await page.close()
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
