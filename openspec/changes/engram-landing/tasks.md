# Implementation Tasks: engram-landing

**Status**: Pending  
**Created**: 2026-04-08  
**Last Updated**: 2026-04-08

---

## Task Breakdown

### Phase 1: Project Setup

- [ ] **1.1** Initialize Next.js 15 project with TypeScript
  - Run: `npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"`
  - Configure React 19 in package.json
  - Add React Compiler config

- [ ] **1.2** Configure Tailwind CSS 4 with Catppuccin Mocha theme
  - Add CSS variables in globals.css
  - Extend Tailwind config with custom colors
  - Set up font imports (Inter, JetBrains Mono)

- [ ] **1.3** Set up React 19 + React Compiler
  - Install: `react@19`, `react-dom@19`, `@babel/plugin-react-compiler`
  - Configure in `next.config.ts`

- [ ] **1.4** Create project structure
  - Create directories: `app/sections/`, `components/ui/`, `components/canvas/`, `components/layout/`, `hooks/`
  - Add `.gitignore` entries

- [ ] **1.5** Configure ESLint + Prettier
  - Install: `eslint-config-prettier`, `prettier`, `prettier-plugin-tailwindcss`
  - Create `.prettierrc` and `.prettierignore`

---

### Phase 2: Core Components

- [ ] **2.1** Create Container component
  - Max-width wrapper (1280px)
  - Responsive horizontal padding
  - Center alignment

- [ ] **2.2** Create Section component
  - Wrapper with `id` prop for navigation
  - Consistent vertical padding (6rem)
  - Background variant prop (optional)

- [ ] **2.3** Create Button component
  - Variants: `primary`, `secondary`, `ghost`
  - Sizes: `sm`, `md`, `lg`
  - Support `href` for link rendering
  - Hover/focus states

- [ ] **2.4** Create Card component
  - Icon + title + description
  - Hover effect (shadow + scale)
  - Responsive width

- [ ] **2.5** Create CodeBlock component
  - Syntax highlighting (Prism or custom)
  - Copy-to-clipboard button
  - Filename display (optional)
  - Success feedback animation

---

### Phase 3: Neural Network Animation

- [ ] **3.1** Create NeuralNetwork canvas component
  - Canvas element that fills parent container
  - Resize event handling
  - Cleanup on unmount

- [ ] **3.2** Implement useNeuralAnimation hook
  - Node generation (50-80 nodes)
  - Animation loop with `requestAnimationFrame`
  - Cleanup function

- [ ] **3.3** Add node generation
  - Random positions within canvas bounds
  - Random velocities for floating effect
  - Color assignment from Catppuccin palette

- [ ] **3.4** Add connection lines
  - Calculate distance between all node pairs
  - Draw lines for pairs < 150px apart
  - Vary opacity based on distance

- [ ] **3.5** Add floating animation
  - Apply `Math.sin` and `Math.cos` to node positions
  - Smooth, organic movement
  - Edge bouncing

- [ ] **3.6** Add reduced motion support
  - Check `prefers-reduced-motion`
  - Render static nodes if reduced motion preferred
  - Document behavior in comments

- [ ] **3.7** Performance optimization
  - FPS capping at 60fps
  - Skip frames if behind schedule
  - Use `useRef` for animation state (no re-renders)

---

### Phase 4: Hero Section

- [ ] **4.1** Create Hero section component
  - Full viewport height
  - NeuralNetwork as background
  - Centered content overlay

- [ ] **4.2** Add NeuralNetwork as background
  - Position: absolute, full width/height
  - z-index: 0
  - Semi-transparent overlay on top

- [ ] **4.3** Add tagline
  - "Persistent memory for AI agents"
  - Large typography (text-5xl to text-7xl)
  - White text with shadow for contrast

- [ ] **4.4** Add subheadline
  - Brief description of engram
  - "Go binary • SQLite + FTS5 • Agent-agnostic"
  - Muted text color

- [ ] **4.5** Add CTA button
  - "Get Started →"
  - Links to Installation section or GitHub
  - Primary variant, large size

---

### Phase 5: Problem Section

- [ ] **5.1** Create Problem section component
  - Container + Section wrapper
  - Dark background variant

- [ ] **5.2** Add pain points content
  - Headline: "AI agents forget everything"
  - 3-4 bullet points:
    - Lost context between sessions
    - Repeated mistakes and rework
    - No continuity in decision-making
    - Fragmented understanding across projects

- [ ] **5.3** Add illustration/icons
  - Use Lucide icons (Brain, X, RefreshCw, etc.)
  - Responsive layout (stacked mobile, side-by-side desktop)

---

### Phase 6: Solution Section

- [ ] **6.1** Create Solution section component
  - Container + Section wrapper
  - Lighter background variant

- [ ] **6.2** Add engram approach content
  - Headline: "engram connects your memories"
  - Description of how it works
  - Key points: FTS5 search, timeline, session context

- [ ] **6.3** Add architecture diagram (optional)
  - Simple illustration of Agent → Engram → SQLite
  - Or use icons/flowchart

---

### Phase 7: Features Section

- [ ] **7.1** Create Features section component
  - Container + Section wrapper
  - Grid layout (responsive)

- [ ] **7.2** Add 6 feature cards:

  - **CLI & TUI**
    - Icon: Terminal
    - Description: Interactive terminal UI + command-line interface

  - **HTTP API & MCP Server**
    - Icon: Server
    - Description: REST API on port 7437 + MCP stdio transport

  - **Full-Text Search (FTS5)**
    - Icon: Search
    - Description: Search across all memories with type/project filters

  - **Timeline & Context**
    - Icon: Clock
    - Description: Progressive disclosure with chronological context

  - **Git Sync**
    - Icon: GitBranch
    - Description: Share memories through git with chunked sync

  - **Privacy Tags**
    - Icon: Shield
    - Description: Strip sensitive data with `<private>` tags

- [ ] **7.3** Add icons for each feature
  - Install Lucide: `npm install lucide-react`
  - Import and render icons in Card component

---

### Phase 8: Demo Section

- [ ] **8.1** Create Demo section component
  - Container + Section wrapper
  - Two-column layout (code + visual)

- [ ] **8.2** Add memory flow visualization
  - Example: `mem_save` → `mem_search` → `mem_timeline`
  - Use numbered steps or diagram

- [ ] **8.3** Add example code snippets
  - Show MCP tool calls
  - Use CodeBlock component

---

### Phase 9: Installation Section

- [ ] **9.1** Create Installation section component
  - Container + Section wrapper
  - Centered content

- [ ] **9.2** Add installation code blocks
  - Clone repo: `git clone https://github.com/Gentleman-Programming/engram`
  - Build: `go build -o engram ./cmd/engram`
  - Install: `go install ./cmd/engram`
  - Run: `engram serve`

- [ ] **9.3** Add copy-to-clipboard functionality
  - useCopyToClipboard hook
  - Visual feedback (icon change on success)

---

### Phase 10: CTA Section

- [ ] **10.1** Create CTA section component
  - Container + Section wrapper
  - Gradient background

- [ ] **10.2** Add GitHub link
  - Large primary button
  - "Star on GitHub ⭐"
  - Link: `https://github.com/Gentleman-Programming/engram`

- [ ] **10.3** Add community links
  - Secondary links: Docs, Issues, Discord (optional)
  - Horizontal layout

---

### Phase 11: Final Integration

- [ ] **11.1** Assemble all sections in page.tsx
  - Import all section components
  - Render in order: Hero, Problem, Solution, Features, Demo, Installation, CTA

- [ ] **11.2** Add layout.tsx with meta tags
  - Title: "engram — Persistent memory for AI agents"
  - Description: "Agent-agnostic persistent memory system for AI coding agents"
  - Open Graph tags
  - Favicon

- [ ] **11.3** Add globals.css with theme
  - CSS variables for Catppuccin Mocha
  - Tailwind directives
  - Custom animations (optional)

- [ ] **11.4** Test responsive layout
  - Test on mobile (320px, 375px, 414px)
  - Test on tablet (768px)
  - Test on desktop (1024px, 1440px)

- [ ] **11.5** Test accessibility
  - Keyboard navigation
  - Screen reader (VoiceOver/NVDA)
  - Color contrast (axe-core)
  - Reduced motion

- [ ] **11.6** Run Lighthouse audit
  - Performance > 90
  - Accessibility > 95
  - Best Practices > 95
  - SEO > 95

---

### Phase 12: Deployment

- [ ] **12.1** Configure Vercel project
  - Connect GitHub repo
  - Set framework preset: Next.js

- [ ] **12.2** Set environment variables
  - None required for static site

- [ ] **12.3** Deploy to Vercel
  - Trigger deployment from main branch
  - Verify build succeeds

- [ ] **12.4** Verify production build
  - Test all sections
  - Verify animations work
  - Check mobile performance
  - Verify all links work

---

## Task Summary

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1. Setup | 5 | 1h |
| 2. Core Components | 5 | 2h |
| 3. Neural Network | 7 | 3h |
| 4. Hero | 5 | 1.5h |
| 5. Problem | 3 | 1h |
| 6. Solution | 3 | 1h |
| 7. Features | 3 | 1.5h |
| 8. Demo | 3 | 1.5h |
| 9. Installation | 3 | 1h |
| 10. CTA | 3 | 0.5h |
| 11. Integration | 6 | 2h |
| 12. Deployment | 4 | 1h |
| **Total** | **50** | **16h** |

---

## Dependencies Between Tasks

```
1.1 → 1.2 → 1.3 → 1.4 → 1.5
                      ↓
2.1 → 2.2 → 2.3 → 2.4 → 2.5
                      ↓
3.1 → 3.2 → 3.3 → 3.4 → 3.5 → 3.6 → 3.7
                      ↓
4.1 → 4.2 → 4.3 → 4.4 → 4.5
                      ↓
5.1 → 5.2 → 5.3
        ↓
6.1 → 6.2 → 6.3
        ↓
7.1 → 7.2 → 7.3
        ↓
8.1 → 8.2 → 8.3
        ↓
9.1 → 9.2 → 9.3
        ↓
10.1 → 10.2 → 10.3
        ↓
11.1 → 11.2 → 11.3 → 11.4 → 11.5 → 11.6
                            ↓
12.1 → 12.2 → 12.3 → 12.4
```

---

## Progress Tracking

Update this section as tasks are completed:

**Completed**: 0 / 50 (0%)  
**In Progress**: None  
**Blocked**: None  

---

## Notes

- All tasks assume working in `/home/ser/landing-engram` directory
- React 19 with React Compiler removes need for `useMemo`/`useCallback`
- Use `cn()` utility for conditional class names (from Tailwind)
- Prefer CSS variables over inline styles for theming
