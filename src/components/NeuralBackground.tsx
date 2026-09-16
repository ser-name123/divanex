"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  baseAlpha: number;
}

interface Pulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
}

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates relative to viewport
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180, // Mouse connection proximity
    };

    // Calculate node count based on screen width
    const nodeCount = Math.min(65, Math.floor((width * height) / 22000));
    const nodes: Node[] = [];
    const pulses: Pulse[] = [];

    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.2,
        pulsePhase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.4 + 0.3,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    // Periodically spawn AI synaptic signal pulses along active connections
    const pulseInterval = setInterval(() => {
      if (nodes.length < 2) return;
      const i = Math.floor(Math.random() * nodes.length);
      // Find a close neighbor
      for (let j = 0; j < nodes.length; j++) {
        if (i === j) continue;
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          pulses.push({
            fromNode: i,
            toNode: j,
            progress: 0,
            speed: Math.random() * 0.02 + 0.015,
          });
          break;
        }
      }
      // Limit active pulse count
      if (pulses.length > 15) pulses.shift();
    }, 450);

    // Main render loop
    let lastTime = performance.now();
    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // 1. Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move nodes
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off canvas edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Slight mouse gravitational drift
        const dxMouse = mouse.x - node.x;
        const dyMouse = mouse.y - node.y;
        const mouseDist = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (mouseDist < mouse.radius) {
          const force = (1 - mouseDist / mouse.radius) * 0.2;
          node.x += (dxMouse / mouseDist) * force * 12 * delta;
          node.y += (dyMouse / mouseDist) * force * 12 * delta;
        }

        // Draw node core & subtle glow for light mode
        node.pulsePhase += delta * 2;
        const currentAlpha = node.baseAlpha + Math.sin(node.pulsePhase) * 0.2;

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(15, 118, 112, ${Math.max(0.2, currentAlpha * 0.7)})`;
        ctx.fill();

        // Outer synaptic glow halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(24, 154, 145, ${Math.max(0.04, currentAlpha * 0.15)})`;
        ctx.fill();
      }

      // 2. Draw synaptic connection lines between close nodes
      const maxDistance = 140;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(15, 118, 112, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Connect node to mouse cursor if within range
        const dxM = mouse.x - nodes[i].x;
        const dyM = mouse.y - nodes[i].y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);

        if (distM < mouse.radius) {
          const mouseOpacity = (1 - distM / mouse.radius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(24, 154, 145, ${mouseOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // 3. Draw active synaptic electrical pulses traveling across connections
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const nodeA = nodes[pulse.fromNode];
        const nodeB = nodes[pulse.toNode];
        if (!nodeA || !nodeB) continue;

        const px = nodeA.x + (nodeB.x - nodeA.x) * pulse.progress;
        const py = nodeA.y + (nodeB.y - nodeA.y) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "#0f7670";
        ctx.shadowColor = "#35b5ac";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // Reset blur for performance
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85 transition-opacity duration-1000"
      aria-hidden="true"
    />
  );
}
