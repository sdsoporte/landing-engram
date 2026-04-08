'use client';

import { useEffect, useRef, useCallback } from 'react';
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

// Catppuccin Mocha accent colors - bright, visible
const nodeColors = [
  '#cba6f7', // mauve
  '#f5c2e7', // pink
  '#89b4fa', // blue
  '#f38ba8', // red
  '#a6e3a1', // green
  '#fab387', // peach
  '#b4befe', // lavender
];

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const initNodes = useCallback((width: number, height: number) => {
    if (width === 0 || height === 0) return;

    const nodes: Node[] = [];
    // 50-70 nodes distributed across the screen
    const nodeCount = Math.max(50, Math.min(70, Math.floor((width * height) / 12000)));

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        radius: Math.random() * 3 + 3, // Larger nodes (3-6px)
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.02,
      });
    }

    nodesRef.current = nodes;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    const nodes = nodesRef.current;
    // Connection distance scales with screen
    const connectionDistance = Math.min(width, height) * 0.15;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw connections FIRST (behind nodes)
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = 1 - distance / connectionDistance;
          // Pulsing connection effect
          const pulse = Math.sin(time + nodes[i].pulse) * 0.3 + 0.7;
          
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(203, 166, 247, ${opacity * pulse * 0.4})`;
          ctx.lineWidth = opacity * 2;
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    // Draw nodes with glow
    for (const node of nodes) {
      // Update pulse
      node.pulse += node.pulseSpeed;
      const pulseScale = 1 + Math.sin(node.pulse) * 0.2;

      // Outer glow (larger, subtle)
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        node.radius * 4 * pulseScale
      );
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(0.5, node.color + '80'); // 50% opacity
      gradient.addColorStop(1, 'transparent');
      
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 4 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Inner node (solid)
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();

      // Bright center highlight
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 0.4 * pulseScale, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.6;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }, []);

  const update = useCallback((width: number, height: number) => {
    const nodes = nodesRef.current;

    for (const node of nodes) {
      // Gentle movement
      node.x += node.vx;
      node.y += node.vy;

      // Soft bounce off edges
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
  }, []);

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

    const time = Date.now() * 0.001;

    update(width, height);
    draw(ctx, width, height, time);

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
        draw(ctx, canvas.width, canvas.height, 0);
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
