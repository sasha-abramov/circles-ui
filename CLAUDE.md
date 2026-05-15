# FamSync v3 — Project Guide

## Stack
- React 18 (in-browser Babel, no build step) — JSX inline styles only, no CSS modules
- All pages are standalone `.html` files loading shared JS via `<script type="text/babel" src="...">`
- Shared files: `js/data.js`, `js/components.js`, `js/navigation.js`, `js/page-shell.js`
- Each screen has its own file: `js/screen-map.js`, `js/screen-chat.js`, `js/screen-circles.js`, etc.
- **When editing a shared file, bump its `?v=N` version in every HTML file that loads it** to bust the cache

---

## Design System Reference → `Design.html` / `js/screen-design.js`

Always check this file before building new screens. Below is the full spec.

---

### Colors (`colors_and_type.css` CSS variables)

| Role | Hex | CSS var |
|---|---|---|
| Primary | `#0F6EFF` | `--color-primary` |
| Primary Hover | `#0D60E0` | `--color-primary-hover` |
| Primary Light | `#EBF2FF` | `--color-primary-light` |
| Text Primary | `#1B1E28` | `--color-text-primary` |
| Text Secondary | `#6B7280` | `--color-text-secondary` |
| Text Tertiary | `#9CA3AF` | `--color-text-tertiary` |
| Text Disabled | `#C5CBD7` | `--color-text-disabled` |
| White | `#FFFFFF` | `--color-white` |
| Surface | `#F5F7FA` | `--color-surface` |
| Border | `#E2E6EF` | `--color-border` |
| Divider | `#F0F2F7` | `--color-divider` |
| Dark | `#1B1E28` | `--color-dark` |
| Success | `#34C55A` | `--color-success` |
| Error | `#FF3B30` | `--color-error` |
| Warning | `#FF9500` | `--color-warning` |

#### Avatar Gradients (135deg)
| Name | From | To |
|---|---|---|
| Ocean (default/Sasha) | `#0F6EFF` | `#00C7BE` |
| Rose | `#F857A6` | `#FF5858` |
| Violet | `#9B87F5` | `#7EC8E3` |
| Sunrise | `#F0922A` | `#EFC03A` |
| Mint | `#2DD16A` | `#1EDEC2` |
| Dusk | `#A18CD1` | `#FBC2EB` |
| Indigo | `#4F5BD5` | `#A44FD5` |
| Coral | `#FF6B6B` | `#FFA552` |

---

### Typography (Google Sans Variable, 100–900)

| Style | Size | Weight | Line-height | Color | Class |
|---|---|---|---|---|---|
| H1 | 32px | 700 | 40px | `#1B1E28` | `.fs-h1` |
| H2 | 24px | 700 | 32px | `#1B1E28` | `.fs-h2` |
| H3 | 20px | 500 | 28px | `#1B1E28` | `.fs-h3` |
| Headline | 17px | 500 | 20px | `#1B1E28` | `.fs-headline` |
| Body | 16px | 400 | 24px | `#1B1E28` | `.fs-body` |
| Body Bold | 16px | 700 | 24px | `#1B1E28` | `.fs-body-bold` |
| Caption | 14px | 400 | 20px | `#6B7280` | `.fs-caption` |
| Caption Bold | 14px | 700 | 20px | `#6B7280` | `.fs-caption-bold` |
| Footnote | 11px | 500 | 16px | `#9CA3AF` | `.fs-footnote` |
| Footnote Bold | 11px | 700 | 16px | `#9CA3AF` | `.fs-footnote-bold` |

---

### Buttons

**Primary button** — use for main actions:
```jsx
// height 44, borderRadius 100, padding 0 24px, fontSize 16, fontWeight 700
<button style={{
  height: 44, borderRadius: 100, padding: "0 24px",
  background: hov ? "#2563EB" : "#0F6EFF",
  border: "none", color: "#fff",
  fontSize: 16, fontWeight: 700, cursor: "pointer",
  transition: "background 0.15s",
  fontFamily: '"Google Sans", sans-serif',
}}>Label</button>
```

**Secondary / Outline button:**
```jsx
<button style={{
  height: 44, borderRadius: 100, padding: "0 24px",
  background: hov ? "#F0F2F7" : "#fff",
  border: "1px solid #E2E6EF", color: "#1B1E28",
  fontSize: 16, fontWeight: 700, cursor: "pointer",
  transition: "background 0.15s",
  fontFamily: '"Google Sans", sans-serif',
}}>Label</button>
```

**Danger button:**
```jsx
// Destructive: bg #FF3B30 → hover #E0322A, color #fff
// Soft danger: bg #FFF0F0 → hover #FFE0DF, color #FF3B30
```

**Reusable component** (`screen-settings.js`): `<SBtn>`, `<SBtn outline>`, `<SBtn danger>` — height 44, borderRadius 100, fontSize 15 ⚠️ *(note: DS spec says 16px, SBtn uses 15px — use 16px for new components)*

---

### Input Field — `DSInputField` (`components.js`)

```jsx
<DSInputField placeholder="..." iconSrc="assets/icons/search.svg" />
// Props: placeholder, defaultValue, iconSrc, disabled, error, errorMsg, autoFocusDemo
```

Spec:
- height: 44, borderRadius: 12, padding: 0 12px
- border: `1px solid #E2E6EF` default → `1px solid #0F6EFF` on hover/focus → `1px solid #FF3B30` on error
- bg: `#fff` default, `#F5F7FA` disabled
- fontSize: 14, color: `#1B1E28`
- Icon: 20×20, color `#9CA3AF` → `#0F6EFF` on focus

---

### Dropdown Menu (DS style)

```jsx
<div style={{
  borderRadius: 14,
  boxShadow: "0 4px 24px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
  background: "#fff", overflow: "hidden", minWidth: 200,
}}>
  // Items: height 44, padding 0 16px, borderTop: "1px solid #F0F2F7" (skip first)
  // Hover bg: #F5F7FA, fontSize 15, fontWeight 500, color #1B1E28
</div>
```

---

### Cards (`SCard` in `screen-settings.js`)

```jsx
<SCard title="Section title">…content…</SCard>
// white bg, borderRadius 16, boxShadow "0 1px 4px rgba(0,0,0,0.06)"
// title bar: 14px padding, fontSize 17, fontWeight 500, borderBottom "1px solid #F0F2F7"
```

---

### Member Avatars

Sizes: **72 · 56 · 48 · 40 · 32 · 24** px — always circular (`borderRadius: "50%"`)  
Font size inside: `Math.round(size * 0.38)`  
Border when stacked: `2px solid #F5F7FA`

---

### Circle Avatars — `CircleAvatar` (`components.js`)

```jsx
<CircleAvatar gradient="linear-gradient(135deg,#0F6EFF,#00C7BE)" icon="assets/icons/circles/heart 1.svg" size={56} />
```
Sizes: **72 · 56 · 48 · 40**

---

### Toggle

```jsx
// width 44, height 26, borderRadius 100
// On: bg #0F6EFF; Off: bg #E2E6EF
// Knob: width 20, height 20, white circle, left: on ? 21 : 3
```

---

### Checkbox & Radio

Checkbox: 20×20, borderRadius 5  
Radio: 20×20, borderRadius 50%  
Active color: `#0F6EFF` (fill for checkbox, dot for radio)  
Hover border: `1px solid #0F6EFF`, bg `#F0F5FF`  
Label fontSize: 15

---

### Icons

All icons live in `assets/icons/` as SVGs.  
Rendered via `<Icon src="assets/icons/NAME.svg" size={N} color="#HEX" />` (CSS filter tinting).  
Standard icon size: **24×24** in nav/buttons, **20×20** in inputs, **18×18** in compact UI.

Available icons: `map`, `circles`, `places`, `chat`, `history`, `settings`, `search`, `chevron-right`, `chevron-down`, `filter`, `close`, `bell-filled`, `location-arrow`, `plus`, `minus`, `send`, `route`, `drop`

---

### Navigation

**Desktop**: `SidebarNav` (80px wide, left side)  
**Mobile**: `BottomTabBar` (58px tall, fixed bottom) — hidden via `setHideTabBar(true)` when entering sub-screens  
Active color: `#0F6EFF`; inactive: `#9CA3AF`

---

### Page Shell

```jsx
<PageShell>
  {(isMobile, setHideTabBar) => <YourScreen isMobile={isMobile} setHideTabBar={setHideTabBar} />}
</PageShell>
// isMobile = window.innerWidth < 768
```

---

## Key Patterns

### Mobile vs Desktop layout
- Mobile: full-width stack, bottom tab bar, back button in header
- Desktop: sidebar + content panel side-by-side

### Modals
- Desktop: `<ModalBackdrop onClose={...}><YourModal /></ModalBackdrop>`
- Mobile: full-screen overlay (`position: fixed, inset: 0`) with header + scrollable body

### Flex height containment
Always add `minHeight: 0` to flex children that need to scroll internally.

### iOS Safari zoom fix
All HTML files have `maximum-scale=1` in viewport to prevent auto-zoom on input focus.

### Version bumping
When editing a JS file, increment `?v=N` in the corresponding HTML `<script>` tags.

---

## Deployment

```bash
netlify deploy --prod
# Site: https://circles-v3.netlify.app
# Project: circles-v3 (Netlify account: sasha@heartify.io)
```
Deploy only when explicitly asked.
