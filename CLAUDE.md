# aem-boilerplate-xwalk — CLAUDE.md

## What This Is

Official Adobe EDS (Edge Delivery Services) boilerplate for **WYSIWYG (xwalk) authoring**. This is a **reference/template repo** — it is the target structure that Aemigrate generates blocks into.

Source: `@adobe/aem-boilerplate` v1.3.0

---

## Block Structure (The Pattern Aemigrate Generates)

Every block follows the same 3-file pattern:

```
blocks/<block-name>/
├── <block-name>.js       # decorate(block) function — manipulates EDS DOM
├── <block-name>.css      # block styles
└── _<block-name>.json    # block model (definitions + models + filters)
```

The `_<block-name>.json` contains:
```json
{
  "definitions": [{ "title": "...", "id": "...", "plugins": { "xwalk": { "page": { "resourceType": "...", "template": {} } } } }],
  "models": [{ "id": "...", "fields": [...] }],
  "filters": [{ "id": "...", "components": [...] }]
}
```

---

## Root JSON Files (Merged)

| File | Source | How Built |
|------|--------|-----------|
| `component-definition.json` | Merged from `models/_component-definition.json` + all `blocks/**/_*.json` | `npm run build:json:definitions` |
| `component-models.json` | Merged from `models/_component-models.json` + all `blocks/**/_*.json` | `npm run build:json:models` |
| `component-filters.json` | Merged from `models/_component-filters.json` + all `blocks/**/_*.json` | `npm run build:json:filters` |

**Always run `npm run build:json` after adding or modifying a block's `_<name>.json`.** This merges all per-block JSONs into the root files that AEM reads.

---

## Key Files

| File | Purpose |
|------|---------|
| `scripts/aem.js` | Core EDS runtime — `createOptimizedPicture`, `decorateBlock`, etc. |
| `scripts/scripts.js` | Page-level decoration and lazy loading |
| `scripts/editor-support.js` | WYSIWYG editor integration |
| `styles/styles.css` | Global styles |
| `fstab.yaml` | Mount point config — points to AEM Cloud author for content |
| `helix-query.yaml` | Search/query index config |
| `helix-sitemap.yaml` | Sitemap config |
| `paths.json` | Path mappings |
| `models/` | Base model JSON files (merged into root JSONs) |

---

## Available Blocks (Reference)

These are blocks that already exist and can be used as reference when writing new ones:

`banner-carousel`, `cards`, `carousel`, `columns`, `footer`, `fragment`, `header`, `hero`, `herocarousel`, `text`, `why-us`, and many more.

---

## Block JS Pattern

```javascript
// blocks/example/example.js
export default function decorate(block) {
  // block = <div class="example"> ... </div>
  // EDS passes the block DOM element — manipulate it here
  // Use createOptimizedPicture from '../../scripts/aem.js' for images
}
```

Key rules for `decorate()`:
- The function receives the actual block DOM node
- EDS creates a table-based structure: each row = `<div>`, each cell = `<div>`
- Import helpers: `import { createOptimizedPicture } from '../../scripts/aem.js'`
- The **synthetic block HTML** Aemigrate generates reflects this DOM structure exactly

---

## npm Scripts

```bash
npm run build:json    # Merge all per-block JSONs into root component-*.json files
npm run lint          # Lint JS + CSS
npm run lint:fix      # Auto-fix lint issues
```

---

## Relationship to Aemigrate

Aemigrate's Go server generates blocks in this exact format:
1. `/generate-eds-block` → returns `BlockConfig { blockName, blockJson, blockJs }`
2. Plugin server writes to `blocks/<blockName>/` with the 3-file structure above
3. After all blocks are written, `/push-block` commits and pushes to this repo's branch

The `fstab.yaml` mount point connects this repo to an AEM Cloud instance for WYSIWYG authoring.
