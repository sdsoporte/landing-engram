'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { waveXMotion, viewportWidthMotion } from '@/lib/wave-motion';

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

const CONNECTION_COLOR_RGB = '147, 153, 178';
const MAX_CONNECTIONS_PER_NODE = 3;
const MAIN_NODE_CHANCE = 0.25;

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const waveNodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const waveXRef = useRef<number>(-200);
  const reducedMotion = useReducedMotion();

  function initNodes(width: number, height: number) {
    if (width === 0 || height === 0) return;

    nodesRef.current = [];
    const nodes: Node[] = [];
    const nodeCount = Math.max(40, Math.min(55, Math.floor((width * height) / 12000)));

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const isMain = Math.random() < MAIN_NODE_CHANCE;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        radius: isMain ? Math.random() * 3 + 5 : Math.random() * 2 + 4,
        color: NODE_COLORS[Math.floor(Math.random() * NODE_COLORS.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.08 + Math.random() * 0.03,
        isMain,
      });
    }

    nodesRef.current = nodes;

    const waveNodes: Node[] = [];
    const waveNodeCount = 22;
    for (let i = 0; i < waveNodeCount; i++) {
      waveNodes.push({
        x: -200 - Math.random() * 200,
        y: height * 0.48 + (Math.random() - 0.5) * 100,
        vx: 2.2 + Math.random() * 1.2,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 3 + 5,
        color: COLORS.mauve,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.1 + Math.random() * 0.04,
        isMain: true,
      });
    }
    waveNodesRef.current = waveNodes;
  }

  function drawWave(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const waveNodes = waveNodesRef.current;
    const waveX = waveXRef.current;

    // Glow horizontal intenso detrás de la wave
    const gradient = ctx.createLinearGradient(waveX - 180, 0, waveX + 180, 0);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(0.5, 'rgba(203, 166, 247, 0.18)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.fillRect(waveX - 180, 0, 360, height);

    // Conexiones entre nodos de la wave
    ctx.globalAlpha = 0.85;
    for (let i = 0; i < waveNodes.length; i++) {
      for (let j = i + 1; j < waveNodes.length; j++) {
        const dx = waveNodes[i].x - waveNodes[j].x;
        const dy = waveNodes[i].y - waveNodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < 120) {
          const opacity = (1 - distance / 120);
          ctx.beginPath();
          ctx.moveTo(waveNodes[i].x, waveNodes[i].y);
          ctx.lineTo(waveNodes[j].x, waveNodes[j].y);
          ctx.strokeStyle = `rgba(203, 166, 247, ${opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }
    }

    // Nodos de la wave
    for (const node of waveNodes) {
      node.pulse += node.pulseSpeed;
      const pulseScale = 1 + Math.sin(node.pulse) * 0.3;

      const glow = ctx.createRadialGradient(
        node.x, node.y, 0,
        node.x, node.y, node.radius * 7 * pulseScale
      );
      glow.addColorStop(0, node.color);
      glow.addColorStop(0.3, node.color + 'A0');
      glow.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 7 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.globalAlpha = 1;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.white;
      ctx.globalAlpha = 1;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 0.45 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = 1;
      ctx.fill();
    }

    ctx.globalAlpha = 1;
  }

  function draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const nodes = nodesRef.current;
    const connectionDistance = Math.min(width, height) * 0.14;

    ctx.clearRect(0, 0, width, height);

    drawWave(ctx, width, height);

    ctx.globalAlpha = 0.35;
    for (let i = 0; i < nodes.length; i++) {
      let connectionCount = 0;
      for (let j = i + 1; j < nodes.length && connectionCount < MAX_CONNECTIONS_PER_NODE; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < connectionDistance * 1.5) {
          const opacity = (1 - distance / (connectionDistance * 1.5)) * 0.7;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(${CONNECTION_COLOR_RGB}, ${opacity})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
          connectionCount++;
        }
      }
    }
    ctx.globalAlpha = 1;

    for (const node of nodes) {
      node.pulse += node.pulseSpeed;
      const pulseScale = 1 + Math.sin(node.pulse) * 0.15;

      if (node.isMain) {
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, node.radius * 5 * pulseScale
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(0.3, node.color + '90');
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 5 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.globalAlpha = node.isMain ? 0.9 : 0.75;
      ctx.fill();
      ctx.globalAlpha = 1;

      if (node.isMain) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 0.35 * pulseScale, 0, Math.PI * 2);
        ctx.fillStyle = COLORS.white;
        ctx.globalAlpha = 0.5;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  function update(width: number, height: number) {
    const nodes = nodesRef.current;

    for (const node of nodes) {
      node.x += node.vx;
      node.y += node.vy;
      const padding = 30;
      if (node.x < padding) { node.vx = Math.abs(node.vx) * 0.8; node.x = padding; }
      if (node.x > width - padding) { node.vx = -Math.abs(node.vx) * 0.8; node.x = width - padding; }
      if (node.y < padding) { node.vy = Math.abs(node.vy) * 0.8; node.y = padding; }
      if (node.y > height - padding) { node.vy = -Math.abs(node.vy) * 0.8; node.y = height - padding; }
    }

    const waveNodes = waveNodesRef.current;
    let waveCenterX = 0;
    const now = performance.now();
    for (let i = 0; i < waveNodes.length; i++) {
      const node = waveNodes[i];
      node.x += node.vx;
      node.y += node.vy;
      waveCenterX += node.x;

      const targetY = height * 0.48 + Math.sin(now * 0.001 + i * 0.5) * 40;
      node.vy += (targetY - node.y) * 0.003;
      node.vy *= 0.94;
    }
    waveCenterX /= waveNodes.length;
    waveXRef.current = waveCenterX;

    if (waveCenterX > width + 200) {
      for (let i = 0; i < waveNodes.length; i++) {
        waveNodes[i].x = -200 - Math.random() * 200;
        waveNodes[i].y = height * 0.48 + (Math.random() - 0.5) * 100;
        waveNodes[i].vx = 2.2 + Math.random() * 1.2;
      }
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

    waveXMotion.set(waveXRef.current);
    viewportWidthMotion.set(logicalWidth);

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
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initNodes(width, height);
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    setupCanvas();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
      resizeObserver = new ResizeObserver(() => {
        setupCanvas();
      });
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
        const logicalWidth = canvas.width / dpr;
        const logicalHeight = canvas.height / dpr;
        if (logicalWidth > 0 && logicalHeight > 0) {
          draw(ctx, logicalWidth, logicalHeight);
        }
      }
    }

    return () => {
      if (resizeObserver && canvas.parentElement) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', setupCanvas);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
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
