'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { getNeuralTargets, setNeuralTargetDistance } from '@/lib/neural-targets';

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
  isMain: boolean;
}

const COLORS = {
  mauve: '#cba6f7',
  pink: '#f5c2e7',
  blue: '#89b4fa',
  lavender: '#b4befe',
  white: '#ffffff',
};

const NODE_COLORS = [
  COLORS.mauve,
  COLORS.blue,
  COLORS.lavender,
  COLORS.pink,
];

const CONNECTION_COLOR_RGB = '180, 190, 220';
const MAX_CONNECTIONS_PER_NODE = 4;
const MAIN_NODE_CHANCE = 0.3;

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  function initNodes(width: number, height: number) {
    if (width === 0 || height === 0) return;

    const isMobile = width < 768;
    const nodes: Node[] = [];
    const baseDensity = isMobile ? 12000 : 8500;
    const maxNodes = isMobile ? 70 : 130;
    const minNodes = isMobile ? 45 : 100;
    const nodeCount = Math.max(minNodes, Math.min(maxNodes, Math.floor((width * height) / baseDensity)));

    for (let i = 0; i < nodeCount; i++) {
      const isMain = Math.random() < MAIN_NODE_CHANCE;
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.3,
        vy: (Math.random() - 0.5) * 1.3,
        radius: isMain ? Math.random() * (isMobile ? 3 : 4) + (isMobile ? 5 : 7) : Math.random() * (isMobile ? 2.5 : 3) + (isMobile ? 3 : 4),
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.06 + Math.random() * 0.04,
        isMain,
      });
    }

    nodesRef.current = nodes;
  }

  function draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const nodes = nodesRef.current;
    const isMobile = Math.min(width, height) < 768;
    const connectionDistance = Math.min(width, height) * (isMobile ? 0.14 : 0.16);

    ctx.clearRect(0, 0, width, height);

    // Conexiones
    ctx.globalAlpha = 0.45;
    for (let i = 0; i < nodes.length; i++) {
      let connectionCount = 0;
      for (let j = i + 1; j < nodes.length && connectionCount < MAX_CONNECTIONS_PER_NODE; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.8;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${CONNECTION_COLOR_RGB}, ${opacity})`;
          ctx.lineWidth = 1.3;
          ctx.stroke();
          connectionCount++;
        }
      }
    }
    ctx.globalAlpha = 1;

    // Nodos
    for (const node of nodes) {
      node.pulse += node.pulseSpeed;
      const pulseScale = 1 + Math.sin(node.pulse) * 0.18;

      if (node.isMain) {
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 6 * pulseScale
        );
        gradient.addColorStop(0, node.color + '80');
        gradient.addColorStop(0.4, node.color + '30');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 6 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.isMain ? 1 : 0.85;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (node.isMain) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.4 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.white;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  function update(width: number, height: number) {
    const nodes = nodesRef.current;
    const targets = getNeuralTargets();

    for (const node of nodes) {
      // Fuerza de repulsión de los targets (DOM elements)
      let fx = 0;
      let fy = 0;

      for (const target of targets) {
        const dx = node.x - target.x;
        const dy = node.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < target.range && dist > 0.1) {
          const force = (1 - dist / target.range) * 5.5; // fuerza max ~5.5
          fx += (dx / dist) * force;
          fy += (dy / dist) * force;
        }
      }

      node.vx += fx * 0.18;
      node.vy += fy * 0.18;

      // Amortiguación suave para no acelerar indefinidamente
      node.vx *= 0.992;
      node.vy *= 0.992;

      // Velocidad mínima para mantener vida
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed < 0.25) {
        node.vx *= 1.02;
        node.vy *= 1.02;
      }

      node.x += node.vx;
      node.y += node.vy;

      const padding = Math.min(width, height) < 768 ? 12 : 20;
      if (node.x < padding) {
        node.vx = Math.abs(node.vx) * 0.9 + 0.2;
        node.x = padding;
      }
      if (node.x > width - padding) {
        node.vx = -Math.abs(node.vx) * 0.9 - 0.2;
        node.x = width - padding;
      }
      if (node.y < padding) {
        node.vy = Math.abs(node.vy) * 0.9 + 0.2;
        node.y = padding;
      }
      if (node.y > height - padding) {
        node.vy = -Math.abs(node.vy) * 0.9 - 0.2;
        node.y = height - padding;
      }
    }

    // Actualizar distancias de targets (sin React re-renders)
    for (const target of targets) {
      let closest = Infinity;
      for (const node of nodes) {
        const dx = node.x - target.x;
        const dy = node.y - target.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < closest) closest = dist;
      }
      setNeuralTargetDistance(target.id, closest);
    }
  }

  function animate() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;

    if (logicalWidth === 0 || logicalHeight === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    update(logicalWidth, logicalHeight);
    draw(ctx, logicalWidth, logicalHeight);

    animationRef.current = requestAnimationFrame(animate);
  }

  function setupCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const width = parent.clientWidth;
    const height = parent.clientHeight;
    if (width > 0 && height > 0) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (ctx) ctx.scale(dpr, dpr);

      initNodes(width, height);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setupCanvas();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => setupCanvas());
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', setupCanvas);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      } else if (!reducedMotion) {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (!reducedMotion) {
      animate();
    } else {
      const ctx = canvas.getContext('2d', { alpha: true });
      if (ctx) {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width / dpr;
        const h = canvas.height / dpr;
        if (w > 0 && h > 0) draw(ctx, w, h);
      }
    }

    return () => {
      if (resizeObserver && canvas.parentElement) resizeObserver.disconnect();
      else window.removeEventListener('resize', setupCanvas);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
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
