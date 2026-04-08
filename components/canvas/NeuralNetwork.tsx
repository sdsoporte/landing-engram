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
  baseX: number;
  baseY: number;
}

// Catppuccin Mocha accent colors
const nodeColors = [
  '#cba6f7', // mauve
  '#89b4fa', // blue
  '#f5c2e7', // pink
  '#b4befe', // lavender
  '#74c7ec', // sapphire
  '#a6e3a1', // green
  '#f38ba8', // red
];

export function NeuralNetwork({ className }: NeuralNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animationRef = useRef<number | null>(null);
  const reducedMotion = useReducedMotion();

  const initNodes = useCallback((width: number, height: number) => {
    if (width === 0 || height === 0) return;

    const nodes: Node[] = [];
    // Distribute nodes across the ENTIRE canvas, not just center
    const nodeCount = Math.min(80, Math.floor((width * height) / 8000)); // Scale with screen size

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.15, // Much slower movement
        vy: (Math.random() - 0.5) * 0.15,
        radius: Math.random() * 2 + 2,
        color: nodeColors[Math.floor(Math.random() * nodeColors.length)],
        baseX: x,
        baseY: y,
      });
    }

    nodesRef.current = nodes;
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    const nodes = nodesRef.current;
    const connectionDistance = Math.min(width, height) * 0.12; // Scale connections with screen

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.25;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(203, 166, 247, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    // Draw nodes with subtle glow
    for (const node of nodes) {
      // Glow
      const gradient = ctx.createRadialGradient(
        node.x,
        node.y,
        0,
        node.x,
        node.y,
        node.radius * 3
      );
      gradient.addColorStop(0, node.color);
      gradient.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * 3, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.globalAlpha = 0.15;
      ctx.fill();
      ctx.globalAlpha = 1;

      // Node
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fillStyle = node.color;
      ctx.fill();
    }
  }, []);

  const update = useCallback((width: number, height: number) => {
    const nodes = nodesRef.current;
    const time = Date.now() * 0.0003; // Much slower time factor

    for (const node of nodes) {
      // Gentle floating motion around base position
      const floatRadius = 20;
      const floatX = Math.sin(time + node.baseX * 0.01) * floatRadius * 0.5;
      const floatY = Math.cos(time + node.baseY * 0.01) * floatRadius * 0.5;

      // Apply movement
      node.x = node.baseX + floatX;
      node.y = node.baseY + floatY;

      // Slow drift in velocity direction (for variety)
      node.baseX += node.vx;
      node.baseY += node.vy;

      // Wrap around edges (infinite canvas feel)
      if (node.baseX < -50) node.baseX = width + 50;
      if (node.baseX > width + 50) node.baseX = -50;
      if (node.baseY < -50) node.baseY = height + 50;
      if (node.baseY > height + 50) node.baseY = -50;
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
