Master Recovery Document
Project: GTMStack Animation Gallery
Repos:

Animations source: C:\GitProd\GTMStack_Animations\gtmstack_animations
Website: C:\GitProd\GTMStack_prod\GTMStack_pro_production
Goal: Stable gallery cards + deterministic modal previews with no blank states.
1) Problem Statement
The /gallery experience is inconsistent and unreliable across both thumbnail and modal preview layers.

Observed Symptoms
Grid thumbnail issues

Missing thumbnails on some cards
Placeholder/text-like thumbnails instead of meaningful visuals
Wrong-looking or generic previews for some items
Modal preview issues

Blank white or black preview state
Thumbnail-only display where animation is expected
Wrong content appears for selected item
Cropping/overlay behavior obscures content
Workflow instability

Dev-only Next.js cache/manifest errors caused noisy troubleshooting
Multiple moving parts caused hard-to-isolate regressions:
manifest generation
thumbnail generation
asset sync
website rendering logic
modal content strategy
2) Root Cause Summary (Likely Combined Causes)
A. Thumbnail generation quality (animations repo)
Some projects produce placeholder-style preview.png (often scaffold/static fallback).
Duplicated/remixed project folders likely resulted in non-canonical capture sources.
Not all generated previews represent actual animation output.
B. Modal content strategy mismatch (website repo)
Modal behavior depends on mapping from manifest item -> live component or fallback.
Many manifest IDs are not guaranteed to map to existing ANIMATION_REGISTRY components.
If mapping misses or over-matches, modal can show wrong/blank content.
C. Sync/pathing complexity
Manifest, thumbnails, and (optionally) entry HTML all require correct copy/path preservation.
Any mismatch between manifest paths and website public paths causes broken previews.
D. Dev environment noise
Next.js dev cache/manifest file corruption (prerender-manifest JSON) created misleading failures.
This can block confidence in UI fixes but is not the same as gallery logic defects.
3) Expected End State (Acceptance Criteria)
For every gallery item:

Card thumbnail is visible and meaningful.
Clicking card opens modal with deterministic behavior:
either correct live animation
or clear/intentional fallback (iframe/thumbnail), never blank white/black
No obvious wrong-item mismatch.
Thumbnail/entry URLs return 200 for tested items.
UX consistency across categories.
4) Recommended Solution Strategy
Phase 1 — Stabilize Data + Assets
Rebuild manifest in animations repo.
Regenerate thumbnails with quality checks.
Enforce canonical source per item (handle duplicate/remix clutter).
Sync to website and verify path integrity.
Phase 2 — Normalize Website Rendering
Ensure grid actually renders thumbnails from thumbnailUrl.
Define modal precedence rule and implement consistently:
(example) entryHtml iframe > mapped live component > thumbnail fallback > “coming soon”
Fix layering/cropping styles.
Phase 3 — Mapping + QA Hardening
Explicitly map high-priority items where live component is expected.
Add regression QA pack (20-item set + 6-item quick smoke retest).
Document operator runbook and “what not to do”.
5) What the Owner Must Do (Non-Developer Checklist)
Keep one canonical source folder per animation (or agree version policy: latest only vs all visible).
Do not run multiple next dev instances in parallel.
Do not delete .next while dev server is running.
Run regeneration/sync in sequence only:
Animations: manifest + thumbnails
Website: sync + verify
Maintain a known “priority 20” item list for QA repeatability.
6) Prompts
Prompt A — Developer Fix Prompt (Code + Pipeline)
You are fixing the GTMStack gallery system across two repos:
1) C:\GitProd\GTMStack_Animations\gtmstack_animations
2) C:\GitProd\GTMStack_prod\GTMStack_pro_production
Objective:
Make /gallery deterministic and production-usable:
- card thumbnails correct and visible
- modal previews never blank
- correct content per selected item
Tasks:
1. Audit current failure modes:
   - missing/placeholder/wrong thumbnails
   - modal blank/white/black
   - wrong-item preview mapping
   - major crop/overlay defects
2. In animations repo:
   - validate manifest entries and thumbnail quality
   - regenerate/correct non-meaningful preview.png files
   - enforce canonical item/version policy
3. In website repo:
   - verify sync path correctness for manifest + thumbnails (+ optional entryHtml assets)
   - enforce modal rendering precedence rule (document in code)
   - fix grid thumbnail rendering and modal layering/cropping
4. Add/adjust mapping logic so expected live items resolve correctly.
5. Return:
   - changed files list
   - root causes fixed
   - remaining known limitations
Acceptance:
- 20-item validation pass criteria met
- no blank modal blockers
- clear owner runbook for regenerate/sync/test
Prompt B — Browser QA Master Prompt (No Code Changes)
You are a browser QA + triage agent validating http://localhost:3000/gallery.
Do not edit code. Test/report only.
Test 20 items across:
abm, operations, industries, digital-demand, dashboard-tiles.
Include if present:
- nonprofithero-impact-visualization-v2
- abm-pipeline-strategy-dashboard-v2
- infracore-deepdive-dashboard-v2
- apex-real-time-dashboard-v2
- sequence-ladder-analytics-tile-v2
Per item capture:
A) Grid:
- card found
- thumbnail visible
- quality: good / placeholder / blank / wrong
B) Modal:
- opened
- state: live / iframe / thumbnail-only / blank-white / blank-black / wrong-content
- major cropping (Y/N)
- overlay blocking content (Y/N)
C) Network:
- thumbnail URL request + status
- iframe/html request + status (if applicable)
- 404/500 errors tied to item
Output:
1) Executive summary (pass/fail counts + top 3 failures)
2) 20-item table:
id/title | category | grid | modal | network | visual quality | overall | notes
3) Failure buckets:
- missing assets
- UI hidden/layering
- iframe/html route failures
- mapping mismatch
- crop/layout defects
4) Priority recommendations P0/P1/P2
5) 6-item retest pack (3 bad + 3 control)
Prompt C — Owner Verification Prompt (Quick Smoke Test)
Run a quick smoke test on /gallery for 6 items:
- 3 known previous failures
- 3 known controls
For each:
1) thumbnail visible on grid?
2) modal opens without blank white/black?
3) content appears correct for selected card?
4) major crop/overlay issue present?
Return pass/fail and whether release is:
- GO
- GO with known limitations
- NO-GO
7) 20-Item QA Template (Manual or AI)
For each row record:

id/title
category
thumbnailPath
entryHtml (if present)
grid_thumbnail_visible (Y/N)
grid_thumbnail_quality (good/placeholder/blank/wrong)
modal_state (live/iframe/thumbnail-only/blank-white/blank-black/wrong-content)
thumbnail_url_status (200/404/etc)
entry_html_url_status (200/404/etc or n/a)
cropping_major (Y/N)
overlay_blocking (Y/N)
overall (pass/fail)
notes
8) Risk Register (Keep in Repo Docs)
Duplicate/remix item drift
Same concept across multiple folders causes wrong capture/source confusion.

Placeholder preview contamination
Scaffold preview.html can produce technically valid but visually low-value thumbnails.

Mapping ambiguity
Manifest IDs may not correspond to website registry IDs.

Dev cache confusion
Next dev .next state issues can mimic app logic failures.

9) “Do Not Repeat” Rules
Don’t run parallel next dev instances.
Don’t clean/delete .next while dev is active.
Don’t run large apply scripts before reviewing dry-run output.
Don’t mix multiple rendering strategies without an explicit precedence rule.
Don’t accept placeholder thumbnails for production gallery unless intentional.
10) Final Sign-off Criteria
Release ready only when:

20-item QA report exists and passes agreed thresholds.
No P0 issues remain.
Owner runbook is documented and reproducible.
Developer confirms exact command sequence for regenerate/sync/retest.
If you want, next I can provide this same document in a “ticket-ready” format split into:

Epic
3 implementation tickets
1 QA ticket
1 owner handoff ticket.