---
name: Luminous Scholar Liquid Glass
colors:
  surface: '#0f131c'
  surface-dim: '#0f131c'
  surface-bright: '#353943'
  surface-container-lowest: '#0a0e17'
  surface-container-low: '#181b25'
  surface-container: '#1c1f29'
  surface-container-high: '#262a34'
  surface-container-highest: '#31353f'
  on-surface: '#dfe2ef'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#dfe2ef'
  inverse-on-surface: '#2c303a'
  outline: '#8c909f'
  outline-variant: '#424753'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d4'
  on-secondary-container: '#00424e'
  tertiary: '#d0bcff'
  on-tertiary: '#3c0091'
  tertiary-container: '#a078ff'
  on-tertiary-container: '#340080'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004495'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5424af'
  background: '#0f131c'
  on-background: '#dfe2ef'
  surface-variant: '#31353f'
  canvas-void: '#06090e'
  surface-glass-low: rgba(10, 14, 23, 0.55)
  surface-glass-base: rgba(17, 24, 39, 0.65)
  surface-glass-high: rgba(26, 38, 64, 0.75)
  border-glass-subtle: rgba(255, 255, 255, 0.10)
  border-glass-specular: rgba(255, 255, 255, 0.20)
  border-glass-luminous: rgba(76, 215, 246, 0.35)
  glow-cyan: rgba(76, 215, 246, 0.25)
  glow-indigo: rgba(160, 120, 255, 0.20)
  glow-primary: rgba(77, 142, 255, 0.35)
  success-emerald: '#10b981'
  alert-coral: '#f43f5e'
  alert-amber: '#f59e0b'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-lg: 1.75rem
  margin: 1.25rem
  margin-md: 2rem
  margin-lg: 3.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.25rem
---

## Brand & Style

This design system embodies an elevated academic ecosystem driven by an ultra-modern, luminous liquid glass aesthetic. It merges technical rigor with ethereal visual depth, creating a focused working environment that feels light, fluid, and immersive. 

Targeting researchers, students, and educators engaging in intensive focus sessions, the interface evokes clarity, momentum, and technical refinement. The visual language blends frosted glassmorphism with deep obsidian backdrops, electric atmospheric radial blooms, and pristine typography. Specular micro-borders, deep-depth backdrop blurs (`backdrop-blur-xl` through `backdrop-blur-2xl`), and controlled neon halos provide structural hierarchy while maintaining long-session visual comfort.

## Colors

The chromatic structure relies on a multi-depth dark mode canvas. Deep obsidian-navy backdrops provide the stage for vibrant oceanic and violet illumination, which shines through translucent glass surfaces.

### Application Guidelines
- **Canvas & Backgrounds:** The base substrate is `#06090e` / `#0a0e17`. It must never rely on dead neutral blacks; deep navy slate preserves chromatic presence beneath translucent blurs.
- **Glass Surfaces:** Glass panels use tinted rgba layers (`surface-glass-low`, `surface-glass-base`, `surface-glass-high`) combined with CSS `backdrop-filter: blur(20px)`.
- **Specular Highlights:** Panel borders do not use flat opaque lines. Use linear gradient strokes running from `border-glass-specular` at the top edge to `border-glass-subtle` or transparent at the bottom edge to mimic directional top lighting.
- **Accents:** 
  - `primary` (`#4d8eff`): Used for primary conversions, active filters, and primary button fills.
  - `secondary` (`#4cd7f6`): Cyber cyan for contextual alerts, cursor focus rings, metadata highlights, and verified credentials.
  - `tertiary` (`#a078ff`): Electric violet for specialized resources, past exams, and ambient background radial glow nodes.

## Typography

The typographic hierarchy pairs the contemporary geometric weight of **Plus Jakarta Sans** with the structural, high-density legibility of **Inter**.

- **Editorial Headings:** Display and headline levels feature negative tracking (`-0.01em` to `-0.03em`) to create a tight, architectural optical lockup. Titles must render with high-contrast text (`#ffffff` or `#dfe2ef`) to maintain clarity over blurred backgrounds.
- **Tabular Figures & Metrics:** For ratings, prices, and file metadata counters, apply font-feature-settings `tnum` to avoid horizontal layout jitter during hover transitions and data updates.
- **Labels & Micro-Copy:** All UI labels and badges utilize semibold weights with slight letter tracking (`+0.01em` to `+0.03em`) to maximize crisp edge definition over glowing glass containers.

## Layout & Spacing

The layout model uses a responsive fluid grid system contained within a max-width envelope of `1380px`, structured on an 8pt spatial grid.

### Breakpoints & Adaptive Rhythm
- **Mobile (< 768px):** 4 columns, `margin: 1.25rem`, `gutter: 1.25rem`. Complex resource directories condense into single-column vertical stacks. Horizontal chip sets adopt touch-friendly scroll containers.
- **Tablet (768px – 1024px):** 8 columns, `margin: 2rem`, `gutter: 1.25rem`. Catalogs reflow into 2-column card structures with compact meta sidebars.
- **Desktop (1025px+):** 12 columns, `margin: 3.5rem`, `gutter: 1.75rem`. Full layout includes persistent frosted navigation, sticky left-hand parameter filters (3 columns), and main dynamic card decks (9 columns).
- **Component Padding:** Internal card padding is standardized at `space-lg` (`1.5rem`), while compact inputs and chips use `space-sm` (`0.5rem`) to `space-md` (`1rem`).

## Elevation & Depth

Visual depth is achieved through layered frosted glass tiers, specular light simulation, and ambient back-illumination, avoiding opaque drop shadows.

### Atmospheric Backdrop
The canvas hosts low-opacity (12%–20%), large-radius (400px–600px) radial gradient mesh flares in vibrant cyan (`#4cd7f6`), electric royal blue (`#4d8eff`), and royal violet (`#a078ff`). These atmospheric glow points pass through floating glass layers to produce refractive liquid lighting.

### Translucent Glass Hierarchy
- **Level 0 (Base Navigation & Sidebars):** Background `rgba(10, 14, 23, 0.65)` with `backdrop-filter: blur(16px)` and a subtle `1px` border of `rgba(255, 255, 255, 0.08)`.
- **Level 1 (Standard Cards & Panels):** Background `rgba(17, 24, 39, 0.55)` with `backdrop-filter: blur(24px)`, top edge highlight `rgba(255, 255, 255, 0.18)`, and a soft ambient drop shadow: `0 8px 32px -4px rgba(0, 0, 0, 0.45)`.
- **Level 2 (Hovered Cards & Interactive States):** Background `rgba(26, 38, 64, 0.70)`, border `rgba(76, 215, 246, 0.35)`, with an inner glow `inset 0 1px 1px rgba(255, 255, 255, 0.25)` and a radiant cyan/blue outer bloom `0 12px 36px -6px rgba(77, 142, 255, 0.30)`.
- **Level 3 (Modals & Popovers):** Background `rgba(15, 20, 32, 0.85)` with `backdrop-filter: blur(32px)`, perimeter border `rgba(255, 255, 255, 0.15)`, and a deep projection shadow: `0 24px 64px -12px rgba(0, 0, 0, 0.75)`.

## Shapes

The design system maintains a modern rounded geometry (level `2` base scale) paired with pill-shaped interactive anchors to balance structure and fluidity.

- **Panels, Sheets, and Modals:** Rendered with `1rem` (`16px`) to `1.5rem` (`24px`) radius for large surfaces, softening the technical canvas.
- **Cards & Inner Previews:** Standardized at `0.75rem` (`12px`) to `1rem` (`16px`). Embedded preview media inherits an interior radius of `0.5rem` (`8px`) to maintain concentric alignment.
- **Pills & Status Controls:** Tags, search bars, category filters, and small icon vessels employ fully rounded pill radii (`9999px`), contrasting against square card frames.

## Components

### Buttons
- **Primary Action:** Saturated electric blue (`#4d8eff`) base with an inner top gloss line (`inset 0 1px 0 rgba(255, 255, 255, 0.35)`). Label is crisp white semibold. On hover, triggers a luminous halo: `box-shadow: 0 0 20px rgba(77, 142, 255, 0.45)`.
- **Liquid Glass (Secondary):** Frosted translucent surface (`rgba(255, 255, 255, 0.06)`), `backdrop-filter: blur(12px)`, bordered by `rgba(255, 255, 255, 0.15)`. On hover, the border brightens to `rgba(76, 215, 246, 0.5)` with an inner specular wash.
- **Ghost / Utility:** Transparent fill with `#c2c6d6` typography, transitioning to a light glass surface (`rgba(255, 255, 255, 0.08)`) and pure white text on hover.

### Frosted Navigation Bar
- Positioned as a floating capsule or full-width sticky header. Uses `rgba(10, 14, 23, 0.65)` with `backdrop-filter: blur(20px)` and a bottom specular stroke `rgba(255, 255, 255, 0.10)`. Nav links feature soft cyan underglows on active and hovered states.

### Input Fields & Global Search
- **Search Capsule:** Pill-shaped glass container with an embedded search glyph, slate placeholder text (`#8c909f`), and keyboard shortcut tags (`Cmd+K`). Focus triggers an electric cyan perimeter glow (`0 0 16px rgba(76, 215, 246, 0.3)`) and tightens the border to `#4cd7f6`.
- **Form Controls:** Set on `rgba(10, 14, 23, 0.60)` surfaces, featuring subtle light borders that transition to saturated indigo or cyan on focus.

### Marketplace Cards
- Stacked glass hierarchy featuring a 4:3 document thumbnail preview, floating glass bookmark button, contributor profile row, subject badge, and bottom transaction row. Hover states trigger a `-4px` vertical lift, an intensified cyan/white specular edge, and a soft ambient card glow.

### Badges & Category Chips
- Pill contours with translucent colored tints:
  - *Syllabus/Notes:* Cyan tint (`rgba(76, 215, 246, 0.12)`) with a `1px` border of `rgba(76, 215, 246, 0.3)`.
  - *Past Papers:* Violet tint (`rgba(160, 120, 255, 0.12)`) with a `1px` border of `rgba(160, 120, 255, 0.3)`.
  - *Verified Status:* Emerald tint (`rgba(16, 185, 129, 0.12)`) with an emerald stroke.

### Checkboxes & Radio Controls
- Square (`18px`, `4px` radius) and circular elements with translucent slate fills and `1px` white/cyan specular borders. Checked states shift to solid `#4d8eff` with an inset white micro-glyph and a localized blue glow ring.