'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface NeuralNetworkProps {
  nodeCount?: number;
  centralNodes?: number;
  className?: string;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  layer: number; // 0 = central, 1 = primary, 2 = secondary, 3 = peripheral
  connections: number[];
}

// Catppuccin Mocha accent colors for nodes
const layerColors = {
  0: ['#f5c2e7', '#f38ba8', '#fab387'], // Central: pink/red/orange (brightest)
  1: ['#cba6f7', '#b4befe', '#89b4fa'], // Primary: mauve/lavender/blue
  2: ['#74c7ec', '#89dceb', '#94e2d5'], // Secondary: sapphire/sky/teal
  3: ['#a6adc8', '#bac2de', '#cdd6f4'], // Peripheral: muted grays
};

const connectionColors = {
  '0-0': 'rgba(245, 194, 231, 0.6)', // central to central
  '0-1': 'rgba(203, 166, 247, 0.4)', // central to primary
  '0-2': 'rgba(116, 199, 236, 0.3)', // central to secondary
  '0-3': 'rgba(166, 173, 200, 0.2)', // central to peripheral
  '1-1': 'rgba(203, 166, 247, 0.25)',
  '1-2': 'rgba(137, 180, 250, 0.2)',
  '2-2': 'rgba(148, 226, 213, 0.15)',
};

export function NeuralNetwork({
  nodeCount = 150,
  centralNodes = 3,
  className,
}: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const initNodes = useCallback(
    (width: number, height: number) => {
      if (width === 0 || height === 0) return;

      const nodes: Node[] = [];
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.min(width, height) * 0.4;

      // Create central nodes (layer 0) - clustered around center
      for (let i = 0; i < centralNodes; i++) {
        const angle = (i / centralNodes) * Math.PI * 2;
        const distance = Math.random() * 50 + 20;
        nodes.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: Math.random() * 3 + 5,
          color: layerColors[0][Math.floor(Math.random() * layerColors[0].length)],
          layer: 0,
          connections: [],
        });
      }

      // Create primary nodes (layer 1) - close to center
      const primaryCount = Math.floor(nodeCount * 0.2);
      for (let i = 0; i < primaryCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * maxRadius * 0.3 + maxRadius * 0.1;
        nodes.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 3,
          color: layerColors[1][Math.floor(Math.random() * layerColors[1].length)],
          layer: 1,
          connections: [],
        });
      }

      // Create secondary nodes (layer 2)
      const secondaryCount = Math.floor(nodeCount * 0.35);
      for (let i = 0; i < secondaryCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * maxRadius * 0.5 + maxRadius * 0.3;
        nodes.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 2,
          color: layerColors[2][Math.floor(Math.random() * layerColors[2].length)],
          layer: 2,
          connections: [],
        });
      }

      // Create peripheral nodes (layer 3) - outer ring
      const peripheralCount = nodeCount - centralNodes - primaryCount - secondaryCount;
      for (let i = 0; i < peripheralCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * maxRadius * 0.3 + maxRadius * 0.7;
        nodes.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 1.5 + 1.5,
          color: layerColors[3][Math.floor(Math.random() * layerColors[3].length)],
          layer: 3,
          connections: [],
        });
      }

      // Build connections - hierarchical structure
      // Central nodes connect to all primary
      for (let i = 0; i < centralNodes; i++) {
        for (let j = centralNodes; j < centralNodes + primaryCount; j++) {
          if (Math.random() > 0.3) { // 70% chance of connection
            nodes[i].connections.push(j);
          }
        }
      }

      // Primary nodes connect to secondary
      for (let i = centralNodes; i < centralNodes + primaryCount; i++) {
        for (let j = centralNodes + primaryCount; j < centralNodes + primaryCount + secondaryCount; j++) {
          if (Math.random() > 0.6) { // 40% chance
            nodes[i].connections.push(j);
          }
        }
      }

      // Secondary nodes connect to peripheral
      for (let i = centralNodes + primaryCount; i < centralNodes + primaryCount + secondaryCount; i++) {
        for (let j = centralNodes + primaryCount + secondaryCount; j < nodes.length; j++) {
          if (Math.random() > 0.7) { // 30% chance
            nodes[i].connections.push(j);
          }
        }
      }

      // Some cross-layer connections for complexity
      // Central to secondary (few)
      for (let i = 0; i < centralNodes; i++) {
        for (let j = centralNodes + primaryCount; j < centralNodes + primaryCount + secondaryCount; j++) {
          if (Math.random() > 0.9) { // 10% chance
            nodes[i].connections.push(j);
          }
        }
      }

      // Peripheral to primary (very few - feedback loops)
      for (let i = centralNodes + primaryCount + secondaryCount; i < nodes.length; i++) {
        for (let j = centralNodes; j < centralNodes + primaryCount; j++) {
          if (Math.random() > 0.95) { // 5% chance
            nodes[i].connections.push(j);
          }
        }
      }

      nodesRef.current = nodes;
    },
    [nodeCount, centralNodes]
  );

  const getConnectionColor = useCallback((fromLayer: number, toLayer: number): string => {
    const key = `${Math.min(fromLayer, toLayer)}-${Math.max(fromLayer, toLayer)}` as keyof typeof connectionColors;
    return connectionColors[key] || 'rgba(166, 173, 200, 0.15)';
  }, []);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const nodes = nodesRef.current;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Draw connections first (behind nodes)
      for (const node of nodes) {
        for (const targetIndex of node.connections) {
          const target = nodes[targetIndex];
          if (!target) continue;

          const dx = target.x - node.x;
          const dy = target.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Pulsing effect based on time
          const pulse = Math.sin(Date.now() * 0.002 + node.x * 0.01) * 0.3 + 0.7;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          const baseColor = getConnectionColor(node.layer, target.layer);
          // Extract rgba values and apply pulse
          const match = baseColor.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
          if (match) {
            const r = match[1];
            const g = match[2];
            const b = match[3];
            const a = parseFloat(match[4]) * pulse;
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${a})`;
          } else {
            ctx.strokeStyle = baseColor;
          }

          ctx.lineWidth = node.layer === 0 ? 2 : 1;
          ctx.stroke();
        }
      }

      // Draw nodes with glow effects
      for (const node of nodes) {
        // Glow effect
        const glowRadius = node.radius * (node.layer === 0 ? 4 : node.layer === 1 ? 3 : 2);
        const gradient = ctx.createRadialGradient(
          node.x,
          node.y,
          0,
          node.x,
          node.y,
          glowRadius
        );
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = node.layer === 0 ? 0.5 : 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Node itself
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Bright center for central nodes
        if (node.layer === 0) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 0.5, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.6;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }
    },
    [getConnectionColor]
  );

  const update = useCallback(
    (width: number, height: number) => {
      const nodes = nodesRef.current;
      const time = Date.now() * 0.001;
      const centerX = width / 2;
      const centerY = height / 2;

      for (const node of nodes) {
        // Floating effect
        const floatX = Math.sin(time + node.x * 0.005) * 0.2;
        const floatY = Math.cos(time + node.y * 0.005) * 0.2;

        node.x += node.vx + floatX;
        node.y += node.vy + floatY;

        // Gravity toward center (stronger for inner layers)
        const gravityStrength = 0.0001 * (4 - node.layer);
        const dx = centerX - node.x;
        const dy = centerY - node.y;
        node.vx += dx * gravityStrength;
        node.vy += dy * gravityStrength;

        // Damping
        node.vx *= 0.999;
        node.vy *= 0.999;

        // Bounce off edges with soft boundary
        const padding = 50;
        if (node.x < padding || node.x > width - padding) {
          node.vx *= -0.8;
          node.x = Math.max(padding, Math.min(width - padding, node.x));
        }
        if (node.y < padding || node.y > height - padding) {
          node.vy *= -0.8;
          node.y = Math.max(padding, Math.min(height - padding, node.y));
        }
      }
    },
    []
  );

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    if (width === 0 || height === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    update(width, height);
    draw(ctx, width, height);

    animationRef.current = requestAnimationFrame(animate);
  }, [draw, update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        if (width > 0 && height > 0) {
          canvas.width = width;
          canvas.height = height;
          initNodes(width, height);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    if (!reducedMotion) {
      animate();
    } else {
      const ctx = canvas.getContext('2d');
      if (ctx && canvas.width > 0 && canvas.height > 0) {
        draw(ctx, canvas.width, canvas.height);
      }
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, draw, initNodes, reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
      aria-hidden="true"
    />
  );
}
