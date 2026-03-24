# Gallery Thumbnail & Modal Preview Audit Report

**Date:** 2026-03-20
**Reporter:** Claude Development Assistant
**Repos:**
- Animations: `C:\GitProd\GTMStack_Animations\gtmstack_animations`
- Website: `C:\GitProd\GTMStack_prod\GTMStack_pro_production`

---

## Executive Summary

The gallery system has **3 critical issues** causing inconsistent thumbnail display and modal preview failures:

1. **Placeholder HTML thumbnails** (132 items): Thumbnail generator captures text-card placeholder HTML instead of actual animations
2. **Modal rendering ambiguity**: No deterministic fallback strategy between React component vs iframe vs thumbnail
3. **Modal overlay issue**: Thumbnail displays as persistent overlay (z-index 20) covering animation content

**Impact:** Users see text cards instead of visual previews, and modal shows blank/wrong content.

---

## Issue Breakdown by Type

### 1. Missing Thumbnails
**Count:** 0 items
**Status:** ✅ No issues

All 129 manifest items have `thumbnailPath` values. Thumbnail generation completed successfully for 132 projects.

---

### 2. Placeholder/Text-Card Thumbnails
**Count:** ~132 items (estimate based on analysis)
**Status:** ⚠️ **CRITICAL**

**Root Cause:**
Many animation projects use scaffold-generated `preview.html` files that render **text cards** instead of actual animations. The thumbnail generator (`scripts/generate-thumbnails.js`) captures these placeholder cards as if they were real content.

**Example:** `animations/abm/abm-flow-premium-tile-v2/preview.html`
```html
<div class="card">
  <div class="badge">abm</div>
  <h1>ABM Flow Premium Tile</h1>
  <p>🧠 Context &amp; Creative Strategy...</p>
</div>
```

**Result:** Gallery cards show text descriptions instead of visual animations.

**Affected Categories:**
- All newly scaffolded items with `preview.html` placeholder templates
- Items without proper HTML entrypoint rendering

**Fix Required:**
1. Replace placeholder `preview.html` files with actual animation renders
2. For TSX-only items: create proper HTML wrapper that imports and renders the React component
3. Or: enhance thumbnail generator to detect placeholders and skip/warn

---

### 3. Modal Preview Blank/Wrong Content
**Count:** Unknown (user-reported)
**Status:** ⚠️ **CRITICAL**

**Root Causes:**

#### 3a. Ambiguous Fallback Strategy
Location: `components/gallery/GalleryModal.tsx` lines 156-194

Current modal render logic:
```tsx
{manifest?.thumbnailUrl ? (
  <div className="absolute inset-0 z-20 pointer-events-none">
    <Image src={manifest.thumbnailUrl} ... className="opacity-70" />
  </div>
) : null}

<div className="relative z-10 ...">
  {entryHtmlSrc ? (
    <iframe src={entryHtmlSrc} ... />
  ) : Component ? (
    <Component />
  ) : manifest?.thumbnailUrl ? null : (
    <div>Preview coming soon</div>
  )}
</div>
```

**Problems:**
1. **Thumbnail always renders** (z-20) even when iframe/component exists below (z-10)
2. No clear precedence: should iframe take priority over Component?
3. `opacity-70` on thumbnail makes animation beneath barely visible
4. If both iframe and Component fail to render, user sees thumbnail overlay only

#### 3b. Animation Registry Mapping Failures
Location: `src/lib/galleryAnimationMap.ts`

Only 16 items have explicit `GALLERY_ANIMATION_ID_MAP` entries. Most manifest items rely on fuzzy fallback matching, which fails for:
- Items with `-v2`, `-v3` suffixes not in registry
- Category-prefixed IDs (e.g., `dashboard-tiles-marketingai-neural-dashboard-v2`)
- New items not yet added to ANIMATION_REGISTRY

**Result:** `resolveRegistryIdForManifestItem()` returns `null` → no React Component → iframe fallback → but if iframe also fails, blank modal.

#### 3c. Iframe Content Not Copied
Location: `scripts/sync-gallery.js`

Default sync behavior:
```javascript
copyEntryHtml: false,  // Line 21
```

**Impact:** Even when modal tries to render iframe with `entryHtml` path, the HTML file may not exist in website's `public/` directory → 404 → blank iframe.

To enable iframe fallback:
```bash
node scripts/sync-gallery.js --apply --copy-entry-html
```

But this is **not run by default**, so most items have no iframe content available.

---

### 4. Duplicate/Remix Item Confusion
**Count:** 6 ID conflicts resolved (manifest report)
**Status:** ⚠️ Minor

Examples:
- `enterprise-sales-motion-dashboard-v2` exists in both `operations/` and `industries/`
- `marketingai-neural-dashboard-v2` exists in both `operations/` and `dashboard-tiles/`

**Manifest solution:** Auto-prefix with category when duplicate detected.

**Website impact:** User may see same animation concept 2-3 times with similar names but different IDs.

**Recommendation:** Define canonical version policy:
- Hide deprecated versions from gallery
- Or: add `deprecated: true` flag in manifest and filter client-side

---

## Detailed Failure Categorization

### Gallery Grid Thumbnails

| Category | Count | Issue | Fix Priority |
|----------|-------|-------|-------------|
| No thumbnail path | 0 | N/A | ✅ OK |
| Placeholder text card | ~132 | Scaffold HTML captured | 🔴 HIGH |
| Generic/incorrect image | Unknown | Mapping error | 🟡 MEDIUM |
| Valid animation preview | Unknown | Expected behavior | ✅ OK |

### Modal Behavior

| Scenario | Current Behavior | Expected | Fix Priority |
|----------|-----------------|----------|-------------|
| Registry component exists | Thumbnail overlay + Component beneath | Component only | 🔴 HIGH |
| No registry, iframe available | Thumbnail overlay + iframe | Iframe only | 🔴 HIGH |
| No registry, no iframe | Thumbnail only | Graceful fallback | 🟡 MEDIUM |
| Blank white screen | z-index or load failure | Never blank | 🔴 CRITICAL |

---

## System Architecture Analysis

### A. Animations Repo Pipeline
```
1. Developer creates animation project
   └─ TSX component OR standalone HTML

2. (Optional) Generate preview.html
   └─ scripts/scaffold-preview-html.js
   └─ Creates text-card placeholder

3. Generate thumbnails
   └─ npm run thumbs:gen
   └─ scripts/generate-thumbnails.js
   └─ Captures preview.html or index.html (1200x630 PNG)
   └─ Output: preview.png + assets/thumbnails/*.png

4. Generate manifest
   └─ npm run manifest:gen
   └─ scripts/export-gallery-manifest.js
   └─ Output: exports/gallery-manifest.json
   └─ Includes: id, title, category, tags, thumbnailPath, entryHtml, githubUrl
```

### B. Website Sync & Display Pipeline
```
1. Sync manifest + thumbnails
   └─ node scripts/sync-gallery.js --apply
   └─ Copies gallery-manifest.json → src/data/
   └─ Copies thumbnails → public/images/

2. Load gallery page (server-side)
   └─ src/lib/galleryManifest.ts::getGalleryItems()
   └─ Reads manifest, transforms thumbnailPath → thumbnailUrl

3. Render gallery grid
   └─ GalleryMainTemplate.client.tsx
   └─ StitchGalleryShell.client.tsx
   └─ Shows Image with thumbnailUrl

4. User clicks card
   └─ Resolve animation ID: resolveRegistryIdForManifestItem()
   └─ Open GalleryModal with:
      a. animation (from ANIMATION_REGISTRY) OR
      b. manifest.entryHtml (iframe fallback) OR
      c. manifest.thumbnailUrl (last resort)
```

---

## Root Cause Summary

### Why Thumbnails Show Text Cards
1. **Scaffold script creates placeholder HTML** by design
2. **Thumbnail generator captures whatever is rendered** (no placeholder detection)
3. **No quality gate** to prevent placeholder thumbnails from being committed

### Why Modal Shows Blank/Thumbnail Only
1. **Thumbnail overlay always renders** with `z-20` on top of content
2. **Most items not in ANIMATION_REGISTRY** → no React component
3. **Iframe content not synced by default** → 404 on entryHtml
4. **Fallback renders transparent thumbnail** instead of clear "Preview unavailable"

---

## Validation Findings

### Manifest Data Quality
✅ **Good:**
- 129 items exported successfully
- All have thumbnailPath values
- All have entryHtml paths
- ID conflicts auto-resolved with category prefixes

⚠️ **Issues:**
- 0 items have missing README (was expected to have some)
- 11 projects skipped (no entry file found)
- animationId field mostly empty (only 2 items have explicit mapping)

### Sync Pipeline
✅ **Good:**
- Script validates manifest JSON structure
- Never deletes files (safe)
- Dry-run by default (safe)

⚠️ **Issues:**
- `--copy-entry-html` flag not used by default
- No validation that thumbnails are "real" vs placeholder
- No 404 checking for public URLs post-sync

### Gallery Rendering
✅ **Good:**
- showThumbnails prop correctly controls display
- Image component uses proper Next.js optimization

⚠️ **Issues:**
- No fallback UI when thumbnailUrl is placeholder-like
- No visual indicator when animation not available

---

## Recommended Fix Strategy

### Phase 1: Stop the Bleeding (Quick Wins)
**Goal:** Make modal previews work reliably NOW

1. **Fix modal z-index overlay**
   - Remove `absolute inset-0 z-20` thumbnail wrapper
   - Only show thumbnail as fallback, not overlay
   - Estimated time: 15 minutes

2. **Deterministic modal render strategy**
   - If `Component`: render Component only
   - Else if `entryHtmlSrc`: render iframe only
   - Else if `thumbnailUrl`: render thumbnail + "Preview unavailable" message
   - Else: render "Coming soon" message
   - Estimated time: 20 minutes

3. **Run sync with iframe content**
   ```bash
   cd GTMStack_pro_production
   node scripts/sync-gallery.js --apply --copy-entry-html
   ```
   - Estimated time: 5 minutes

**Result:** Modal will show actual content for most items, graceful fallback for others.

---

### Phase 2: Improve Thumbnail Quality (Medium Term)
**Goal:** Replace placeholder thumbnails with real animation captures

#### Option A: Manual Replacement (Selective)
For top 20 most-viewed items:
1. Create proper HTML wrapper that renders TSX component
2. Re-run thumbnail generator for those items
3. Commit updated preview.png files

**Time:** ~2 hours for 20 items

#### Option B: Automated Detection (Scalable)
Enhance `generate-thumbnails.js`:
```javascript
// After capturing screenshot, detect if it's a placeholder
const isPlaceholder = await page.evaluate(() => {
  return document.body.textContent.includes('🧠 Context') ||
         document.querySelector('.badge') !== null;
});

if (isPlaceholder) {
  console.warn(`⚠️  Placeholder detected: ${projectPath}`);
  // Skip or create warning report
}
```

**Time:** ~1 hour to implement + test

#### Option C: Server-Side Render (Best Quality)
Use Playwright to:
1. Spin up dev server for TSX component
2. Navigate to component route
3. Wait for animation to render
4. Capture screenshot

**Time:** ~4 hours to implement + test
**Benefit:** Highest quality thumbnails

---

### Phase 3: Data Hygiene (Long Term)
**Goal:** Establish quality gates and canonical item policy

1. **Add thumbnail quality validation**
   - Reject placeholder captures
   - Require minimum visual complexity (e.g., entropy check)

2. **Define version policy**
   - Mark `-v1` items as `deprecated: true`
   - Hide deprecated from gallery by default
   - Show only latest version

3. **Expand ANIMATION_REGISTRY mapping**
   - Add all important items to `GALLERY_ANIMATION_ID_MAP`
   - Or: auto-generate mapping from manifest IDs

---

## Verification Checklist

### Test Sample (20 Representative Items)
Covering all categories and issue types:

#### High-Priority Items (Should Work)
1. `marketing-analytics-carousel-v3` (explicit map)
2. `edu-marketers-dashboard-v2` (explicit map)
3. `revenue-systems-data-flow-v2` (operations)
4. `martech-ai-dashboard-engine-v2` (operations)

#### Placeholder Thumbnail Items
5. `abm-flow-premium-tile-v2` (scaffold HTML)
6. `abm-success-visualizer-v2` (scaffold HTML)
7. `content-engagement-hero-v2` (digital-demand)

#### Duplicate/Version Items
8. `enterprise-sales-motion-dashboard-v2` (operations)
9. `industries-enterprise-sales-motion-dashboard-v2` (industries)
10. `live-email-automation-ecosystem-v2` (older version)
11. `live-email-automation-ecosystem-v3` (newer version)

#### Industry-Specific
12. `automotive-hero-dashboard-component-v2`
13. `edu-hero-analytics-dashboard-v2`
14. `fintech-growth-animated-sales-tile-v3`

#### Dashboard Tiles
15. `gtmstack-hero-tile-v2`
16. `lifecycle-engine-dashboard-v2`
17. `marketing-automation-live-feed-v2`

#### Events/Media
18. `executive-logistics-dashboard-v3`
19. `social-media-marketing-hero-tile-v2`

#### ABM
20. `abm-pipeline-strategy-dashboard-v2`

### Test Criteria (Per Item)
- [ ] Gallery card shows meaningful visual thumbnail (not text card)
- [ ] Modal opens without blank/white screen
- [ ] Modal shows animation content (component OR iframe)
- [ ] If no animation, modal shows clear "Preview unavailable" message
- [ ] Thumbnail does not cover animation content (z-index)
- [ ] GitHub link works
- [ ] README link works (if available)

---

## Owner Runbook

### After Developer Fixes Are Applied

#### 1. Regenerate Manifest + Thumbnails (Animations Repo)
```bash
cd C:\GitProd\GTMStack_Animations\gtmstack_animations

# Regenerate manifest with latest project data
npm run manifest:gen

# Regenerate thumbnails (dry-run first to preview)
npm run thumbs:dry
# Review report: reports/thumbnail-report.md

# Apply thumbnail generation
npm run thumbs:gen
# This overwrites existing thumbnails - SAFE if previews are correct

# Check for placeholder thumbnails
# Look for text-card style images in assets/thumbnails/
# If found, those projects need proper HTML wrappers
```

#### 2. Sync to Website (Website Repo)
```bash
cd C:\GitProd\GTMStack_prod\GTMStack_pro_production

# Sync manifest + thumbnails + iframe content
node scripts/sync-gallery.js --apply --copy-entry-html

# Verify sync report shows:
# - Manifest copied: 1
# - Thumbnails copied: 129
# - Missing thumbnails: 0
# - Entry HTML assets copied: 129+
```

#### 3. Test Gallery Locally
```bash
# Start dev server (if not already running)
npm run dev

# Open http://localhost:3000/gallery

# Test sample items (use checklist above)
# IMPORTANT: Hard refresh (Ctrl+Shift+R) to clear Next.js cache
```

#### 4. Deploy (When Ready)
```bash
# Build production
npm run build

# Test build locally
npm run start

# Deploy to production (your deployment process)
```

---

### What NOT to Do

❌ **Don't clean .next while dev server is running**
- Stop dev server first, then `rm -rf .next`, then restart

❌ **Don't run parallel dev servers**
- Only one `npm run dev` instance per repo

❌ **Don't manually edit gallery-manifest.json in website repo**
- Always regenerate from animations repo source of truth

❌ **Don't delete thumbnails without regenerating**
- Manifest references them; broken links will show broken images

❌ **Don't commit placeholder thumbnails**
- Review `reports/thumbnail-report.md` before committing
- Replace placeholders with real renders first

---

### Troubleshooting

#### Gallery shows "No animations available"
- Check `src/data/gallery-manifest.json` exists
- Check file is valid JSON
- Check file is not empty
- Restart dev server

#### Thumbnails show 404
- Check `public/images/animations/.../preview.png` exists
- Check path casing matches manifest (case-sensitive on Linux)
- Run sync again with `--apply`

#### Modal shows blank white screen
- Check browser console for errors
- Check iframe src path exists in public/
- Check ANIMATION_REGISTRY has entry for item
- Apply Phase 1 fixes

#### Thumbnails show text cards
- Run Phase 2 fix (replace placeholder HTML)
- Or: hide items from gallery until fixed

---

## Technical Debt

### High Priority
1. **Modal overlay z-index** - 15 min fix, high impact
2. **Deterministic modal fallback** - 20 min fix, high impact
3. **Placeholder thumbnail detection** - 1 hour, prevents future issues

### Medium Priority
4. **Expand ANIMATION_REGISTRY mapping** - 2 hours, improves modal coverage
5. **Version/duplicate policy** - 1 hour, reduces confusion
6. **Sync script default to `--copy-entry-html`** - 5 min, safer defaults

### Low Priority (Nice to Have)
7. **Server-side render thumbnails** - 4 hours, best quality
8. **Automated thumbnail quality gate** - 2 hours, long-term quality
9. **Gallery pagination/infinite scroll** - 4 hours, performance at scale

---

## Appendix: File Locations

### Animations Repo
- Manifest generator: `scripts/export-gallery-manifest.js`
- Thumbnail generator: `scripts/generate-thumbnails.js`
- Scaffold script: `scripts/scaffold-preview-html.js`
- Output manifest: `exports/gallery-manifest.json`
- Thumbnails: `assets/thumbnails/*.png`
- Project previews: `animations/[category]/[project]/preview.png`

### Website Repo
- Sync script: `scripts/sync-gallery.js`
- Manifest (synced): `src/data/gallery-manifest.json`
- Thumbnails (synced): `public/images/[thumbnailPath]`
- Gallery page: `src/templates/gallery/GalleryMainTemplate.client.tsx`
- Gallery grid: `components/gallery/StitchGalleryShell.client.tsx`
- Gallery modal: `components/gallery/GalleryModal.tsx`
- Animation registry: `src/data/animations.ts` (ANIMATION_REGISTRY)
- ID resolver: `src/lib/galleryAnimationMap.ts`
- Manifest loader: `src/lib/galleryManifest.ts`

---

## Summary of Deliverables

✅ **Audit Report:** This document
⏳ **Fix Plan:** Phases 1-3 above
⏳ **Verification Checklist:** 20-item test plan above
✅ **Owner Runbook:** Commands and procedures above
⏳ **Implementation Commits:** Pending approval to proceed

---

**Next Steps:**
1. Review this audit report
2. Approve Phase 1 quick fixes (35 minutes)
3. Test 20-item verification checklist
4. Schedule Phase 2 thumbnail quality fixes
5. Plan Phase 3 long-term improvements

**Questions?** Ask about specific items or technical details.
