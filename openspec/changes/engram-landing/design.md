# Technical Design: engram-landing

**Version**: 1.0  
**Status**: Draft  
**Last Updated**: 2026-04-08

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Next.js 15 App Router                    │
├─────────────────────────────────────────────────────────────┤
│  app/                                                        │
│  ├── page.tsx          (Main landing page)                  │
│  ├── layout.tsx        (Root layout with meta)              │
│  ├── globals.css       (Tailwind + CSS variables)           │
│  └── sections/                                              │
│      ├── Hero.tsx                                           │
│      ├── Problem.tsx                                        │
│      ├── Solution.tsx                                       │
│      ├── Features.tsx                                       │
│      ├── Demo.tsx                                           │
│      ├── Installation.tsx                                   │
│      └── CTA.tsx                                            │
├─────────────────────────────────────────────────────────────┤
│  components/                                                 │
│  ├── ui/                                                     │
│  │   ├── Button.tsx                                         │
│  │   ├── Card.tsx                                           │
│  │   └── CodeBlock.tsx                                      │
│  ├── canvas/                                                 │
│  │   └── NeuralNetwork.tsx                                  │
│  └── layout/                                                 │
│      ├── Container.tsx                                      │
│      └── Section.tsx                                        │
├─────────────────────────────────────────────────────────────┤
│  hooks/                                                      │
│  ├── useNeuralAnimation.ts                                  │
│  ├── useReducedMotion.ts                                    │
│  └── useCopyToClipboard.ts                                  │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Design

### Core Layout Components

#### Container
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Max-width: 1280px, centered, responsive padding
```

#### Section
```typescript
interface SectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

// Wrapper with id for navigation, consistent vertical padding
```

---

### Neural Network Animation

#### NeuralNetwork Component
```typescript
interface NeuralNetworkProps {
  nodeCount?: number;        // Default: 60
  connectionDistance?: number; // Default: 150px
  speed?: number;            // Animation speed multiplier
  colors?: {
    node: string[];
    connection: string;
  };
}

// Responsibilities:
// 1. Render Canvas element
// 2. Handle resize events
// 3. Manage animation loop
// 4. Clean up on unmount
```

#### useNeuralAnimation Hook
```typescript
interface Node {
  x: number;
  y: number;
  vx: number;  // Velocity X
  vy: number;  // Velocity Y
  radius: number;
  color: string;
}

// Hook responsibilities:
// 1. Initialize nodes array
// 2. Animation loop with requestAnimationFrame
// 3. Node position updates (floating effect)
// 4. Connection line drawing
// 5. Performance optimization (FPS capping)
```

**Animation Algorithm**:
```
1. Generate N nodes with random positions and velocities
2. On each frame:
   a. Clear canvas
   b. Update node positions (x += vx, y += vy)
   c. Apply floating effect (Math.sin/cos)
   d. Bounce off edges
   e. Draw connections between nearby nodes
   f. Draw nodes
3. Request next frame
```

---

### UI Components

#### Button
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

// Primary: Background accent color, white text
// Secondary: Border accent color, accent text
// Ghost: Transparent background, accent text
```

#### Card
```typescript
interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

// Used in Features section
// Hover effect: subtle shadow + scale
```

#### CodeBlock
```typescript
interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
}

// Syntax highlighting (Prism or custom)
// Copy button with icon
// Success feedback animation
```

---

## Styling Strategy

### CSS Variables (globals.css)
```css
:root {
  /* Catppuccin Mocha */
  --color-base: #1e1e2e;
  --color-mantle: #181825;
  --color-crust: #11111b;
  
  --color-text: #cdd6f4;
  --color-subtext0: #a6adc8;
  --color-subtext1: #bac2de;
  
  --color-surface0: #313244;
  --color-surface1: #45475a;
  --color-surface2: #585b70;
  
  --color-overlay0: #6c7086;
  --color-overlay1: #7f849c;
  --color-overlay2: #9399b2;
  
  --color-blue: #89b4fa;
  --color-lavender: #b4befe;
  --color-sapphire: #74c7ec;
  --color-sky: #89dceb;
  --color-teal: #94e2d5;
  --color-green: #a6e3a1;
  --color-yellow: #f9e2af;
  --color-peach: #fab387;
  --color-maroon: #eba0ac;
  --color-red: #f38ba8;
  --color-mauve: #cba6f7;
  --color-pink: #f5c2e7;
  --color-flamingo: #f2cdcd;
  --color-rosewater: #f5e0dc;
  
  /* Typography */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Spacing */
  --section-padding: 6rem;
  --container-max: 1280px;
}
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Map CSS variables to Tailwind utilities
        base: 'var(--color-base)',
        mantle: 'var(--color-mantle)',
        // ... etc
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
      },
    },
  },
};
```

---

## Data Flow

```
[Static Content]
      ↓
[Section Components] ← [UI Components] ← [CSS Variables]
      ↓
[page.tsx] ← [layout.tsx]
      ↓
[Static HTML] → [Vercel Edge Cache]
      ↓
[User Browser]
```

---

## Performance Optimization

### Neural Network Animation
- **FPS Capping**: Limit to 60fps, skip frames if behind
- **Node Pooling**: Reuse node objects instead of creating new
- **Viewport Culling**: Only render visible area (optional)
- **Web Worker**: Offload physics calculations (if needed)

### Code Splitting
```typescript
// Lazy load heavy components
const CodeBlock = lazy(() => import('@/components/ui/CodeBlock'));

// Dynamic imports for syntax highlighter
const Prism = await import('prismjs');
```

### Image Optimization
- Use Next.js `<Image>` component
- Provide width/height to prevent CLS
- Use WebP format with fallbacks

---

## Accessibility Considerations

### Reduced Motion
```typescript
const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);
  
  return reducedMotion;
};

// Usage in NeuralNetwork:
const reducedMotion = useReducedMotion();
if (reducedMotion) {
  // Render static nodes, no animation
}
```

### Focus Management
- Visible focus rings on all interactive elements
- Logical tab order through sections
- Skip-to-content link at top

---

## Deployment Architecture

```
GitHub Repository (landing-engram)
        ↓
[Vercel Build] → Static Export
        ↓
[Vercel Edge Network] → Global CDN
        ↓
User Browser (cached HTML/CSS/JS)
```

### Vercel Configuration
```json
{
  "buildCommand": "next build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1", "sfo1", "fra1"]
}
```

---

## File Structure (Final)

```
landing-engram/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── sections/
│       ├── Hero.tsx
│       ├── Problem.tsx
│       ├── Solution.tsx
│       ├── Features.tsx
│       ├── Demo.tsx
│       ├── Installation.tsx
│       └── CTA.tsx
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── CodeBlock.tsx
│   ├── canvas/
│   │   └── NeuralNetwork.tsx
│   └── layout/
│       ├── Container.tsx
│       └── Section.tsx
├── hooks/
│   ├── useNeuralAnimation.ts
│   ├── useReducedMotion.ts
│   └── useCopyToClipboard.ts
├── public/
│   ├── favicon.ico
│   └── og-image.png
├── openspec/
│   └── changes/
│       └── engram-landing/
│           ├── proposal.md
│           ├── spec.md
│           ├── design.md
│           └── tasks.md
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```
