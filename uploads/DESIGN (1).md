# Design System Inspired by Much Better Adventures

## 1. Visual Theme & Atmosphere

Much Better Adventures embodies an adventurous, authentic, and nature-focused design language that celebrates real explorers and genuine outdoor experiences. The visual identity is grounded and approachable, balancing bold clarity with warm, organic storytelling. The design system prioritizes readability and purposeful simplicity, using a restrained color palette that lets breathtaking imagery and compelling narratives take center stage. With strong typographic hierarchy, generous whitespace, and minimal decorative elements, this system communicates confidence and expertise while maintaining an inviting, accessible feel that appeals to both seasoned adventurers and curious explorers.

**Key Characteristics**

- Clean, modern typography with strong hierarchy and generous letterspacing
- Restrained color palette centered on nature-inspired neutrals and a single vibrant accent
- Minimal component styling emphasizing content and imagery
- Large-scale photography as a primary design element
- Accessible, straightforward interactions with clear affordances
- Organic use of whitespace and breathing room between sections
- Focus on authenticity over ornamentation

## 2. Color Palette & Roles

### Primary
- **Brand Accent** (`#A0CC3D`): Primary call-to-action buttons, key interactive elements, highlights, and promotional banners. Derived from natural lime-green representing growth and vitality in outdoor settings.

### Neutral Scale
- **Text Primary** (`#000000`): Main body text, navigation labels, and high-contrast content requiring maximum readability.
- **Text Secondary** (`#2A2D2C`): Secondary headings, navigation items, and supporting text requiring strong emphasis but slightly softer than pure black.
- **Surface Light** (`#FFFFFF`): Card backgrounds, modal surfaces, and container fills requiring maximum contrast against dark overlays.
- **Background Warm** (`#FAFBF4`): Page backgrounds and subtle section dividers creating a warm, natural foundation.
- **Background Subtle** (`#F5F6EF`): Minimal use as an alternative light background for nested sections or subtle visual differentiation.

### Surface & Borders
- **Border Color** (`#2A2D2C`): Used for button outlines, navigation underlines, and functional dividers where definition is required.
- **Overlay Dark** (`rgba(0, 0, 0, 0.87)`): Semi-transparent overlays on imagery, modal backdrops, and depth-creating shadows.

## 3. Typography Rules

### Font Family
**Primary**: Rubik (`__Rubik_c2c3d1`) with fallback stack: `Rubik, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`

**Secondary**: Arial with fallback stack: `Arial, Helvetica, sans-serif`

### Hierarchy

| Role | Font | Size | Weight | Line Height | Letter Spacing | Notes |
|------|------|------|--------|-------------|----------------|-------|
| Display / H1 | Rubik | 32px | 600 | 38px | 0px | Hero headlines, page titles |
| Heading / H2 | Rubik | 20px | 600 | 26px | 0px | Section headings, major subheads |
| Subheading / H3 | Rubik | 16px | 600 | 20px | 0px | Card titles, subsection heads |
| Small Heading / H5 | Rubik | 12px | 600 | 16px | 0px | Labels, tag-like content |
| Label / H6 | Rubik | 12px | 500 | 16px | 0px | Form labels, small emphasis |
| Body | Rubik | 14px | 400 | 24px | 0px | Default paragraph text, descriptions |
| Body Large | Rubik | 16px | 400 | 24px | 0px | Large body text, list items |
| Link | Rubik | 16px | 700 | 24px | 0px | Standalone links, CTAs, navigation items |
| Button | Arial | 13.33px | 400 | normal | 0px | Button text (legacy fallback) |

### Principles

- **Clarity First**: Every font size, weight, and line height is calibrated for maximum readability on mobile and desktop without need for zoom.
- **Weight-Based Hierarchy**: Differentiation relies primarily on font weight (400, 500, 600) rather than excessive size changes, maintaining visual cohesion.
- **Generous Line Height**: All text uses 1.5× or greater line height for accessibility and breathing room, particularly in body copy.
- **Semantic Sizing**: H1–H3 are reserved for structural hierarchy; smaller sizes (H5, H6) handle labels and metadata without diminishing visual weight.
- **Link Distinction**: Links use 700 weight to signal interactivity without color change alone, supporting users with color vision deficiency.

## 4. Component Stylings

### Buttons

#### Primary Button
- **Background**: `#A0CC3D`
- **Text Color**: `#000000`
- **Font**: Rubik, 16px, weight 600
- **Padding**: `12px 24px`
- **Border Radius**: `4px`
- **Border**: None
- **Line Height**: 20px
- **Hover State**: Darken background to `#8FB52D`, increase shadow depth
- **Active State**: Additional `2px` inset shadow with `rgba(0, 0, 0, 0.2)` for tactile feedback
- **Focus State**: Add `2px` outline in `#2A2D2C` with `4px` offset

#### Secondary Button
- **Background**: `transparent`
- **Text Color**: `#2A2D2C`
- **Font**: Rubik, 16px, weight 600
- **Padding**: `12px 24px`
- **Border Radius**: `4px`
- **Border**: `1px solid #2A2D2C`
- **Line Height**: 20px
- **Hover State**: Background becomes `#FAFBF4`, border remains `#2A2D2C`
- **Active State**: Background becomes `#F5F6EF`
- **Focus State**: Add `2px` outline in `#2A2D2C` with `4px` offset

#### Ghost Button
- **Background**: `transparent`
- **Text Color**: `#2A2D2C`
- **Font**: Rubik, 16px, weight 600
- **Padding**: `8px 0px`
- **Border Radius**: `0px`
- **Border**: None
- **Line Height**: 20px
- **Hover State**: Add `2px` bottom border in `#A0CC3D`, text remains `#2A2D2C`
- **Active State**: Text color changes to `#A0CC3D`, bottom border persists
- **Focus State**: Add `2px` outline in `#2A2D2C` with `2px` offset

### Cards & Containers

#### White Card (Content)
- **Background**: `#FFFFFF`
- **Border Radius**: `4px`
- **Border**: None
- **Box Shadow**: `0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)`
- **Padding**: `24px`
- **Text Color**: `#2A2D2C`
- **Font**: Rubik, 14px–16px, weight 400
- **Line Height**: 24px
- **Hover State**: Increase shadow to `0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)`

#### Image Card (Adventure Tile)
- **Background**: Transparent overlay on image
- **Border Radius**: `16px`
- **Border**: None
- **Box Shadow**: None on light backgrounds; `0px 2px 8px rgba(0, 0, 0, 0.25)` when overlaid on dark
- **Padding**: `0px`
- **Image**: Full bleed, border radius `16px` with optional top radius only (`16px 16px 0px 0px`)
- **Text Overlay**: Semi-transparent dark background `rgba(0, 0, 0, 0.4)` with `#FFFFFF` or `#FAFBF4` text
- **Hover State**: Slightly increase outer shadow, darken overlay to `rgba(0, 0, 0, 0.5)` for better text contrast

#### Transparent Container
- **Background**: `transparent` or `rgba(0, 0, 0, 0)`
- **Border Radius**: `4px`
- **Border**: None
- **Box Shadow**: None
- **Padding**: `0px` (content-dependent)
- **Line Height**: 24px
- **Use**: Grouping text and lightweight components without visual enclosure

### Inputs & Forms

#### Text Input
- **Background**: `#FFFFFF`
- **Text Color**: `#2A2D2C`
- **Font**: Rubik, 14px, weight 400
- **Padding**: `12px 16px`
- **Border**: `1px solid #2A2D2C`
- **Border Radius**: `4px`
- **Line Height**: 24px
- **Focus State**: Border becomes `#A0CC3D`, add `2px` outline in `#A0CC3D` with `2px` offset
- **Error State**: Border becomes `#D32F2F`, text color for error message is `#D32F2F`
- **Placeholder**: Color `rgba(42, 45, 44, 0.5)`, font style italic

#### Checkbox
- **Size**: `20px × 20px`
- **Border**: `1px solid #2A2D2C`
- **Border Radius**: `2px`
- **Checked Background**: `#A0CC3D`
- **Checked Border**: `#A0CC3D`
- **Checked Icon**: `#000000` checkmark
- **Focus State**: Add `2px` outline in `#2A2D2C` with `2px` offset

#### Form Label
- **Font**: Rubik, 12px, weight 600
- **Color**: `#2A2D2C`
- **Line Height**: 16px
- **Margin Bottom**: `8px`
- **Required Indicator**: Red asterisk `*` in `#D32F2F` immediately after label text

### Navigation

#### Primary Navigation Bar
- **Background**: `#FFFFFF`
- **Height**: `64px`
- **Padding**: `16px 32px`
- **Border Bottom**: `1px solid rgba(0, 0, 0, 0.1)`
- **Display**: Flexbox, space-between for logo and menu

#### Navigation Link (Horizontal Menu)
- **Font**: Rubik, 16px, weight 600
- **Color**: `#2A2D2C`
- **Padding**: `8px 16px`
- **Border Radius**: `0px`
- **Line Height**: 20px
- **Hover State**: Text color becomes `#A0CC3D`, add `2px` bottom border in `#A0CC3D`
- **Active State**: Text color becomes `#A0CC3D`, persistent `2px` bottom border in `#A0CC3D`
- **Focus State**: Add `2px` outline in `#2A2D2C` with `2px` offset

#### Mobile Navigation Toggle
- **Background**: `transparent`
- **Icon Color**: `#2A2D2C`
- **Size**: `32px × 32px`
- **Border**: None
- **Hover State**: Background becomes `rgba(0, 0, 0, 0.05)`

### Links

#### Inline Link
- **Font**: Rubik, 16px, weight 700
- **Color**: `#2A2D2C`
- **Text Decoration**: Underline by default
- **Hover State**: Color becomes `#A0CC3D`, underline persists
- **Visited State**: Color becomes `#6B5B9C` (inferred accessible visited color)
- **Focus State**: Add `2px` outline in `#2A2D2C` with `2px` offset

#### Link Icon (Small)
- **Font Size**: 16px
- **Color**: `rgba(0, 0, 0, 0.87)`
- **Width/Height**: `24px`
- **Hover State**: Color becomes `#A0CC3D`

## 5. Layout Principles

### Spacing System

Much Better Adventures employs an 8px base unit with a modular scale for consistent, predictable spacing:

- **Base Unit**: `8px`
- **Scale**: `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `48px`, `56px`, `64px` (multiples of 8 where possible)

**Usage Context**:
- `8px`: Tight component spacing (button icon gaps, small form fields)
- `12px`: Label-to-input spacing, dense component layouts
- `16px`: Default padding for cards, inputs, buttons
- `24px`: Spacing between content sections, moderate whitespace
- `32px`: Padding for large containers, section margins
- `40px`: Breathing room between major layout blocks
- `48px`: Substantial section padding, hero spacing
- `56px` and beyond: Full-page section gaps, maximum visual separation

### Grid & Container

- **Max Width**: `1200px` for content containers on desktop
- **Grid Columns**: 12-column responsive grid with flexible gutters
- **Column Strategy**: 
  - **Desktop (1200px+)**: 12 columns with `24px` gutter
  - **Tablet (768px–1199px)**: 8 columns with `20px` gutter
  - **Mobile (< 768px)**: 4 columns with `16px` gutter
- **Section Padding**: `48px` horizontal on desktop, `32px` on tablet, `24px` on mobile
- **Content Sections**: Vertically stack with `56px` gap between major blocks
- **Hero Sections**: Full-width with `64px` top/bottom padding, centered content overlay

### Whitespace Philosophy

Whitespace is treated as an active design element, not negative space. The system advocates for generous breathing room around all content, with clear visual hierarchy achieved through spacing rather than decoration alone. Key principles:

- **Generous Margins**: All major sections include substantial vertical gaps (`40px–56px`) to avoid visual crowding.
- **Padding Consistency**: Card and container padding uses the 8px scale; minimum `16px`, standard `24px`, ample `32px`.
- **Text Breathing**: Body text uses 1.5× or greater line height; paragraph margin-bottom is `24px`.
- **Edge Margins**: Content never extends to viewport edges; minimum `16px` margin on mobile, `32px` on desktop.

### Border Radius Scale

- **Sharp**: `0px` – Navigation underlines, minimal interaction borders, typography accents
- **Subtle**: `4px` – Buttons, inputs, cards, modal backgrounds; default for most UI surfaces
- **Rounded**: `16px` – Image containers, prominent card designs, adventure tiles
- **Full Circle**: `100%` – Profile images, circular icon backgrounds, avatar containers

## 6. Depth & Elevation

| Level | Treatment | Use |
|-------|-----------|-----|
| Flat (L0) | No shadow (`box-shadow: none`) | Backgrounds, typography, borders |
| Raised (L1) | `0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)` | Standard cards, modest elevation |
| Elevated (L2) | `0px 3px 6px rgba(0, 0, 0, 0.16), 0px 3px 6px rgba(0, 0, 0, 0.23)` | Hovered cards, active overlays |
| Prominent (L3) | `0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23)` | Modals, dropdown menus, floating elements |
| Modal Overlay (L4) | `0px 15px 25px rgba(0, 0, 0, 0.25), 0px 15px 10px rgba(0, 0, 0, 0.22)` | Full-page modals, emphasis overlays |

**Shadow Philosophy**: Shadows are subtle and layered, using two-part shadow systems (outer blur for softness, inner shadow for definition). Shadows increase slightly on interaction to signal state change without overwhelming the interface. On dark backgrounds, shadows become lighter and more diffuse to avoid loss of visibility. Shadows serve primarily to communicate hierarchy and clickability; they are never decorative.

## 7. Do's and Don'ts

### Do

- **Use the accent green (`#A0CC3D`) sparingly and intentionally** – Reserve it for primary CTAs, key interactive elements, and moments requiring user attention. Avoid overuse on non-interactive elements.
- **Maintain strong typography contrast** – Pair heavy weights (600) with generous line height and spacing for maximum readability; test all text on both light and dark backgrounds.
- **Respect the 8px spacing scale** – Align all padding, margins, and gaps to multiples of 8px to ensure visual rhythm and grid alignment.
- **Leverage photography as a primary design element** – Let high-quality imagery dominate hero sections and adventure cards; use semi-transparent overlays sparingly to preserve image impact.
- **Provide clear affordances for interactive elements** – Buttons, links, and inputs must have distinct visual or interactive states (hover, focus, active) so users understand interactivity.
- **Use semantic color roles consistently** – `#2A2D2C` for secondary text, `#A0CC3D` for primary actions, `#FFFFFF` for contrast surfaces; never swap roles arbitrarily.
- **Include focus states on all interactive elements** – Use `2px` solid outline in `#2A2D2C` with `2px` offset for keyboard navigation accessibility.
- **Stack sections vertically with consistent gaps** – Use `40px–56px` vertical margins between major content blocks for visual breathing room.

### Don't

- **Avoid using pure black (`#000000`) for body text in large blocks** – Use `#2A2D2C` instead for a slightly softer, less harsh reading experience while maintaining high contrast.
- **Don't apply multiple shadows to a single element** – Choose one shadow level (L0–L4) and stick to it; layered shadows create visual confusion.
- **Avoid decorative border radius on text-only elements** – Reserve `16px+` radius for images and prominent containers; smaller components should use `4px` or `0px`.
- **Don't reduce line height below 1.4× font size** – Cramped leading harms readability; maintain at least `1.5×` for body text (14px text = 21px minimum line height).
- **Avoid nesting more than two levels of card or container depth** – Excessive shadow layering signals poor hierarchy; use spacing and color changes instead.
- **Don't override focus outlines or use custom focus indicators without sufficient contrast** – Maintain the standard `2px` `#2A2D2C` outline or ensure equivalent visual clarity.
- **Avoid placing text directly on uncontrolled images without a semi-transparent overlay** – Always use at minimum `rgba(0, 0, 0, 0.3)` background behind light text or `rgba(255, 255, 255, 0.2)` behind dark text for readability.
- **Don't mix font families unnecessarily** – Rubik is the primary choice; Arial is reserved for legacy button text only. Use weight and size for hierarchy, not font switching.

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|------|-------|-------------|
| Mobile | < 768px | 4-column grid, `16px` gutter, `24px` section padding, single-column layouts, stacked navigation |
| Tablet | 768px–1199px | 8-column grid, `20px` gutter, `32px` section padding, 2-column layouts for cards, condensed navigation |
| Desktop | ≥ 1200px | 12-column grid, `24px` gutter, `48px` section padding, multi-column layouts, full horizontal navigation |
| Large Desktop | ≥ 1600px | Max width constraint to `1200px`, centered content, generous side margins |

### Touch Targets

- **Minimum size**: All interactive elements (buttons, links, form inputs, touch areas) must be at least `48px × 48px` or have `16px` padding in all directions on mobile.
- **Spacing**: Touch targets must have minimum `8px` spacing between them to prevent mis-taps.
- **Mobile buttons**: Default padding should be `16px 24px` (height ≥ 48px), icon buttons `48px × 48px`.
- **Form inputs**: Minimum height `44px` on mobile, `40px` on desktop; padding `12px 16px` inside to ensure clear focus state.

### Collapsing Strategy

- **Navigation**: At `768px` breakpoint, horizontal navigation collapses into a hamburger toggle; show mobile menu as a slide-out sidebar with full-width links and `16px` padding.
- **Cards**: Two-column card grids collapse to single-column on tablet and mobile; maintain consistent `24px` gutter between cards vertically.
- **Images**: Hero images scale responsively with `object-fit: cover` to maintain aspect ratio; text overlays scale with font size reduction (H1: 32px desktop → 24px mobile).
- **Typography**: Heading sizes reduce on mobile (H1: 32px → 24px, H2: 20px → 18px) to maintain proportion; body text remains 14px minimum for readability.
- **Padding & Margins**: Horizontal section padding reduces (48px desktop → 32px tablet → 24px mobile); vertical spacing remains consistent using the 8px scale.
- **Grid Columns**: 12 → 8 → 4 columns; content reflows to fill available space without horizontal scroll.
- **Modal/Overlay**: On mobile, modals expand to full-screen with `16px` padding; reduce font sizes within modals by one step (e.g., H2 → H3 size).

## 9. Agent Prompt Guide

### Quick Color Reference

- **Primary CTA**: Brand Accent (`#A0CC3D`) – Use for main call-to-action buttons, promotional highlights, and key interactive states.
- **Background**: Background Warm (`#FAFBF4`) or Surface Light (`#FFFFFF`) – Use for page backgrounds, card fills, and modal surfaces.
- **Heading Text**: Text Secondary (`#2A2D2C`) – Use for all headings, navigation labels, and strong emphasis; prefer over pure black.
- **Body Text**: Text Primary (`#000000`) – High-contrast body copy; consider `#2A2D2C` for longer reading passages.
- **Borders & Dividers**: Border Color (`#2A2D2C`) – Use for button outlines, input borders, and functional dividers.
- **Overlay**: Overlay Dark (`rgba(0, 0, 0, 0.87)`) – Semi-transparent overlays on images, modal backdrops.

### Iteration Guide

1. **All spacing must follow the 8px scale** – Use `8px`, `12px`, `16px`, `24px`, `32px`, `40px`, `48px`, `56px`. No arbitrary spacing values.

2. **Buttons use `#A0CC3D` for primary actions only** – Secondary and ghost buttons are transparent with `#2A2D2C` text and borders. Ensure contrast ratio ≥ 4.5:1 on all text.

3. **Typography hierarchy is weight-based, not size-based alone** – Use Rubik weights (400, 500, 600) and line height (`1.4×–1.6×`) to create hierarchy; keep sizes within the defined scale (12px–32px).

4. **Cards default to `4px` border radius with light shadows** – Use `0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)` for standard elevation; increase on hover.

5. **All interactive elements require visible focus state** – Apply `2px solid outline` in `#2A2D2C` with `2px` offset for keyboard navigation; never remove or hide outline.

6. **Image cards use `16px` or `100%` border radius** – Adventure tile images should have rounded corners; overlays should be semi-transparent dark with sufficient contrast for text.

7. **Mobile-first responsive strategy** – Design for mobile (`< 768px`) first with 4-column grid; scale up to tablet (8 columns) and desktop (12 columns) with proportional padding adjustments.

8. **Section gaps are `40px–56px` vertically** – Maintain generous whitespace between major content blocks; use `24px–32px` for component-level spacing within sections.

9. **Navigation is horizontal with `16px` link padding on desktop; collapses to hamburger menu on mobile** – Ensure `48px` minimum touch target on mobile; active link shows `#A0CC3D` bottom border.

10. **Form inputs and controls use Rubik 14px with `12px 16px` padding** – Borders are `1px solid #2A2D2C`; focus state shows `2px #A0CC3D` outline; error text is `#D32F2F`.