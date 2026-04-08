# Change Proposal: engram-landing

**Status**: Proposed  
**Created**: 2026-04-08  
**Project**: engram-landing  

---

## Intent

Create a marketing landing page for **engram** — a persistent memory system for AI coding agents. The page will communicate the product's value proposition through visual storytelling using an animated neural network metaphor (nodes = memories, connections = relationships).

---

## Scope

**In Scope**:
- Single landing page with 7 sections
- Animated neural network hero background (Canvas-based)
- Responsive design (mobile-first)
- Vercel deployment configuration
- Open source repository setup

**Out of Scope**:
- Backend functionality
- User authentication
- Interactive demos requiring API calls
- Blog/documentation pages

---

## Approach

### Technology Stack
- **Framework**: Next.js 15 App Router
- **UI**: React 19 with React Compiler
- **Styling**: Tailwind CSS 4
- **Animation**: Canvas API (no heavy 3D libraries)
- **Deployment**: Vercel

### Design System
- **Color Palette**: Catppuccin Mocha (matches engram TUI branding)
  - Background: #1e1e2e (base)
  - Nodes: #cba6f7 (mauve), #89b4fa (blue), #f5c2e7 (pink)
  - Accent: #f38ba8 (red), #a6e3a1 (green)
  - Text: #cdd6f4 (text), #a6adc8 (subtext0)

- **Typography**: Inter (headings) + JetBrains Mono (code)

### Page Sections (in order)
1. **Hero** — Neural network animation + tagline "Persistent memory for AI agents"
2. **Problem** — Why AI agents forget between sessions
3. **Solution** — How engram connects memories across time
4. **Features** — 6 key capabilities with icons
5. **Demo** — Visual example of memory connection flow
6. **Installation** — Quick start code blocks
7. **CTA** — GitHub link + community call-to-action

---

## Architecture Decisions

### ADR-001: Canvas API over Three.js
**Decision**: Use Canvas API for neural network animation  
**Rationale**: Lighter weight, better performance on mobile, no dependency overhead  
**Consequences**: Need to implement particle system manually, but more control

### ADR-002: Static Generation
**Decision**: Use Next.js static generation (no server components)  
**Rationale**: Landing page has no dynamic data, faster TTFB, better SEO  
**Consequences**: All content hardcoded, updates require redeployment

### ADR-003: Mobile-First Responsive
**Decision**: Design for mobile first, then enhance for desktop  
**Rationale**: Target audience (developers) often browse on mobile/tablet  
**Consequences**: Need careful animation performance tuning for mobile

---

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Canvas animation performance on low-end devices | High | Reduced motion fallback, lazy load below fold |
| Lighthouse score impact from animations | Medium | Use CSS containment, optimize render loop |
| Color accessibility contrast ratios | Medium | Test all text against background colors |
| Large bundle size from syntax highlighting | Low | Use lightweight highlighter (Prism async) |

---

## Success Criteria

1. Lighthouse Performance > 90
2. First Contentful Paint < 1.5s
3. Time to Interactive < 3.5s
4. Zero accessibility violations (axe-core)
5. Visual metaphor clearly communicates "memory connection"
6. Clear path to GitHub repo from landing page

---

## Dependencies

- Node.js 18+ (for Next.js 15)
- Vercel account for deployment
- GitHub repository access

---

## Timeline Estimate

- **Phase 1-2** (Setup + Core Components): 2-3 hours
- **Phase 3-4** (Animation + Hero): 3-4 hours
- **Phase 5-10** (Sections): 4-5 hours
- **Phase 11-12** (Integration + Deploy): 2-3 hours

**Total**: ~12-15 hours

---

## Next Steps

1. Review and approve proposal
2. Initialize Next.js project
3. Begin Phase 1 tasks
