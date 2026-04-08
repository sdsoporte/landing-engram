# Specification: engram-landing

**Version**: 1.0  
**Status**: Draft  
**Last Updated**: 2026-04-08

---

## Functional Requirements

### FR-001: Hero Section with Neural Network Animation
**Priority**: P0  
**Description**: The hero section must display an animated neural network background with floating nodes and connecting lines.  
**Acceptance Criteria**:
- [ ] Canvas element renders at full viewport height
- [ ] 50-80 nodes (particles) with random positions
- [ ] Lines connect nodes within 150px distance
- [ ] Nodes float with subtle Math.sin/cos animation
- [ ] Animation respects `prefers-reduced-motion`
- [ ] No memory leaks on unmount

### FR-002: Problem Section
**Priority**: P0  
**Description**: Explain the problem engram solves — AI agents forgetting context between sessions.  
**Acceptance Criteria**:
- [ ] Clear headline explaining the pain point
- [ ] 3-4 bullet points with concrete examples
- [ ] Responsive layout (stacked on mobile, grid on desktop)

### FR-003: Solution Section
**Priority**: P0  
**Description**: Present engram's approach to persistent memory.  
**Acceptance Criteria**:
- [ ] Clear explanation of engram's value proposition
- [ ] Visual diagram or illustration (optional)
- [ ] Links to relevant features

### FR-004: Features Section
**Priority**: P0  
**Description**: Grid of 6 key features with icons and descriptions.  
**Acceptance Criteria**:
- [ ] Feature 1: CLI & TUI
- [ ] Feature 2: HTTP API & MCP Server
- [ ] Feature 3: Full-Text Search (FTS5)
- [ ] Feature 4: Timeline & Context
- [ ] Feature 5: Git Sync
- [ ] Feature 6: Privacy Tags
- [ ] Each card has icon, title, description
- [ ] Responsive: 1 col mobile, 2 col tablet, 3 col desktop

### FR-005: Demo Section
**Priority**: P1  
**Description**: Visual example of memory connection flow.  
**Acceptance Criteria**:
- [ ] Illustration of how engram connects memories
- [ ] Example code snippets showing usage
- [ ] Clear visual hierarchy

### FR-006: Installation Section
**Priority**: P0  
**Description**: Quick start installation instructions with copyable code blocks.  
**Acceptance Criteria**:
- [ ] Code block with installation command
- [ ] Copy-to-clipboard button
- [ ] Visual feedback on copy success

### FR-007: CTA Section
**Priority**: P0  
**Description**: Call-to-action linking to GitHub and community resources.  
**Acceptance Criteria**:
- [ ] Primary CTA button linking to GitHub repo
- [ ] Secondary links to docs, Discord/Twitter (optional)
- [ ] Open source badge/indicator

---

## Non-Functional Requirements

### NFR-001: Performance
**Priority**: P0  
**Metrics**:
- First Contentful Paint (FCP) < 1.5s
- Time to Interactive (TTI) < 3.5s
- Cumulative Layout Shift (CLS) < 0.1
- Lighthouse Performance Score > 90

### NFR-002: Accessibility
**Priority**: P0  
**Requirements**:
- All images have alt text
- Color contrast ratio ≥ 4.5:1 for text
- Keyboard navigable (Tab, Enter, Escape)
- Screen reader compatible
- `prefers-reduced-motion` respected
- Focus visible on all interactive elements

### NFR-003: Responsiveness
**Priority**: P0  
**Breakpoints**:
- Mobile: 320px - 639px
- Tablet: 640px - 1023px
- Desktop: 1024px+

**Requirements**:
- All sections render correctly at all breakpoints
- Touch-friendly targets (min 44px height)
- No horizontal scroll on mobile

### NFR-004: SEO
**Priority**: P1  
**Requirements**:
- Meta title, description
- Open Graph tags
- Structured data (JSON-LD)
- Semantic HTML

### NFR-005: Browser Compatibility
**Priority**: P0  
**Supported Browsers**:
- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+

---

## Technical Requirements

### TR-001: Framework
- Next.js 15.x with App Router
- React 19.x with React Compiler
- TypeScript 5.x

### TR-002: Styling
- Tailwind CSS 4.x
- CSS variables for theming
- No inline styles (React Compiler optimized)

### TR-003: Animation
- Canvas API for neural network
- requestAnimationFrame for render loop
- Cancel animation on component unmount
- Reduced motion fallback

### TR-004: Code Quality
- ESLint with Next.js config
- Prettier for formatting
- TypeScript strict mode

---

## User Scenarios

### US-001: First-time Visitor
**Actor**: Developer interested in AI tools  
**Flow**:
1. Lands on page → sees animated neural network
2. Reads tagline → understands product concept
3. Scrolls to features → evaluates capabilities
4. Clicks GitHub link → navigates to repo

### US-002: Mobile User
**Actor**: Developer browsing on phone  
**Flow**:
1. Opens page on mobile device
2. Sees responsive layout
3. Scrolls through all sections
4. Taps GitHub CTA → opens in new tab

### US-003: Accessibility User
**Actor**: Developer using screen reader  
**Flow**:
1. Navigates page with keyboard
2. Hears section headings announced
3. Interacts with code copy button
4. Successfully copies installation code

---

## Constraints

1. No backend API required (static content)
2. No authentication required
3. Must work without JavaScript (graceful degradation)
4. Must not use third-party analytics without consent

---

## Assumptions

1. Content (text) will be provided or derived from engram DOCS.md
2. Icons will use Lucide or Heroicons (React icon libraries)
3. Deployment will be via Vercel
4. Repo is public (no secrets required)
