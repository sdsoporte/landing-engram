'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NeuralNetworkProps {
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulse: number;
  pulseSpeed: number;
}

// Catppuccin Mocha accent colors - extracted as named constants
const COLORS = {
  mauve: '#cba6f7',
  pink: '#f5c2e7',
  blue: '#89b4fa',
  red: '#f38ba8',
  green: '#a6e3a1',
  peach: '#fab387',
  lavender: '#b4befe',
  white: '#ffffff',
};

const NODE_COLORS = [
  COLORS.mauve,
  COLORS.pink,
  COLORS.blue,
  COLORS.red,
  COLORS.green,
  COLORS.peach,
  COLORS.lavender,
];

const CONNECTION_COLOR_RGB = '203, 166, 247'; // mauve RGB for rgba()
const MAX_CONNECTIONS_PER_NODE = 4; // Limit to avoid O(n²) explosion

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  function initNodes(width: number, height: number) {
    if (width === 0 || height === 0) return;

    // Clear existing nodes to prevent memory leak on resize
    nodesRef.current = [];

    const nodes: Node[] = [];
    // Reduced from 50-70 to 35-45 for better performance
    const nodeCount = Math.max(35, Math.min(45, Math.floor((width * height) / 15000)));

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        radius: Math.random() * 3 + 3,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    nodesRef.current = nodes;
  }

  function draw(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
    const nodes = nodesRef.current;
    const connectionDistance = Math.min(width, height) * 0.15;

    ctx.clearRect(0, 0, width, height);

    // Draw connections with early exit optimization
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < nodes.length; i++) {
      let connectionCount = 0;
      for (let j = i + 1; j < nodes.length && connectionCount < MAX_CONNECTIONS_PER_NODE; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          const pulse = Math.sin(time + nodes[i].pulse) * 0.3 + 0.7;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${CONNECTION_COLOR_RGB}, ${opacity * pulse * 0.4})`;
          ctx.lineWidth = opacity * 2;
          ctx.stroke();
          connectionCount++;
        }
      }
    }
    ctx.globalAlpha = 1;

    // Draw nodes with glow
    for (const node of nodes) {
      node.pulse += node.pulseSpeed;
      const pulseScale = 1 + Math.sin(node.pulse) * 0.2;

      // Outer glow
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        node.radius * 4 * pulseScale
      );
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(0.5, node.color + '80');
      gradient.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 4 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Bright center
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 0.4 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.white;
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function update(width: number, height: number) {
    const nodes = nodesRef.current;

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;

      const padding = 50;
      if (node.x < padding) {
        node.vx = Math.abs(node.vx) * 0.8;
        node.x = padding;
      }
      if (node.x > width - padding) {
        node.vx = -Math.abs(node.vx) * 0.8;
        node.x = width - padding;
      }
      if (node.y < padding) {
        node.vy = Math.abs(node.vy) * 0.8;
        node.y = padding;
      }
      if (node.y > height - padding) {
        node.vy = -Math.abs(node.vy) * 0.8;
        node.y = height - padding;
      }
    }
  }

  function animate() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Use logical dimensions (CSS pixels) for consistency with handleResize
    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    if (logicalWidth === 0 || logicalHeight === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const time = performance.now() * 0.001;

    update(logicalWidth, logicalHeight);
    draw(ctx, logicalWidth, logicalHeight, time);

    animationRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        if (width > 0 && height > 0) {
          // DPR handling for sharp rendering on Retina displays
          const dpr = window.devicePixelRatio || 1;
          canvas.width = width * dpr;
          canvas.height = height * dpr;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;

          const ctx = canvas.getContext('2d', { alpha: true });
          if (ctx) {
            ctx.scale(dpr, dpr);
          }

          initNodes(width, height);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

  if (!reducedMotion) {
    animate();
  } else {
    const ctx = canvas.getContext('2d', { alpha: true });
    if (ctx) {
      // DPR was already handled in handleResize, just draw
      const dpr = window.devicePixelRatio || 1;
      const logicalWidth = canvas.width / dpr;
      const logicalHeight = canvas.height / dpr;
      if (logicalWidth > 0 && logicalHeight > 0) {
        draw(ctx, logicalWidth, logicalHeight, 0);
      }
    }
  }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
