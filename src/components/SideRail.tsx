import { useEffect, useRef } from 'react';

interface SideRailProps {
  activeIdx: number;
  totalPhases: number;
}

export default function SideRail({ activeIdx, totalPhases }: SideRailProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let frame = 0;
    let time = 0;

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect();

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.55;
      const amplitude = 34;
      const frequency = 0.012;
      const count = 180;
      const activeY = ((activeIdx + 0.5) / totalPhases) * height;

      time += 0.02;

      for (let index = 0; index < count; index += 1) {
        const y = (index / (count - 1)) * height;
        const progress = Math.max(0, 1 - Math.abs(y - activeY) / 180);
        const sin = Math.sin(y * frequency + time);
        const cos = Math.cos(y * frequency + time);

        const leftX = centerX + sin * amplitude;
        const rightX = centerX - sin * amplitude;
        const radius = 1.2 + (cos + 1) * 0.9;
        const alpha = 0.1 + progress * 0.65;

        ctx.beginPath();
        ctx.arc(leftX, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(43, 202, 149, ${alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(rightX, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(71, 235, 221, ${alpha})`;
        ctx.fill();

        if (index % 6 === 0) {
          ctx.beginPath();
          ctx.moveTo(leftX, y);
          ctx.lineTo(rightX, y);
          ctx.strokeStyle = `rgba(71, 235, 221, ${0.04 + progress * 0.18})`;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      frame = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(frame);
  }, [activeIdx, totalPhases]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />;
}
