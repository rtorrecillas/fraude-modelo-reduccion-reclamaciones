import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  opacity: number;
  color: string;
}

export default function BackgroundParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];

    const palette = ['43,202,149', '71,235,221'];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.floor((width * height) / 8500);
      particles = Array.from({ length: count }, () => {
        const radius = Math.random() > 0.92 ? Math.random() * 3 + 1.2 : Math.random() * 1.6 + 0.5;

        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          dx: (Math.random() - 0.5) * 0.35,
          dy: (Math.random() - 0.5) * 0.35,
          opacity: Math.random() * 0.38 + 0.12,
          color: palette[Math.floor(Math.random() * palette.length)]!,
        };
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((particle, index) => {
        particle.x += particle.dx;
        particle.y += particle.dy;

        if (particle.x < -5) particle.x = width + 5;
        if (particle.x > width + 5) particle.x = -5;
        if (particle.y < -5) particle.y = height + 5;
        if (particle.y > height + 5) particle.y = -5;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particle.color}, ${particle.opacity})`;
        ctx.fill();

        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next]!;
          const dist = Math.hypot(particle.x - other.x, particle.y - other.y);

          if (dist < 160) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particle.color}, ${0.16 * (1 - dist / 160)})`;
            ctx.lineWidth = 0.7;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }
      });

      frame = requestAnimationFrame(animate);
    };

    init();
    animate();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', init);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-80" />;
}
