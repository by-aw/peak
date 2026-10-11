/**
 * Minimal port of canvas-confetti's single burst (the library bundled in Framer's "Confetti" code component), with the
 * same particle physics and drawing: particles start at `origin` (viewport fractions), fly out within `spread` degrees
 * at 0.5-1.5x `startVelocity`, slow down by `decay` per frame, fall with 3x `gravity`, wobble/tilt and fade out over
 * `ticks` frames. Drawn on a fixed full-viewport canvas (z-index 100) that is removed when the burst ends.
 */
const DEFAULT_COLORS = ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"];

type Particle = {
  x: number;
  y: number;
  wobble: number;
  velocity: number;
  angle2D: number;
  tiltAngle: number;
  color: [number, number, number];
  shape: "circle" | "square";
  tick: number;
  random: number;
  tiltSin: number;
  tiltCos: number;
  wobbleX: number;
  wobbleY: number;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

export function fireConfetti({
  particleCount,
  spread,
  startVelocity,
  decay,
  origin,
  gravity = 1,
  ticks = 200,
  colors = DEFAULT_COLORS,
}: {
  particleCount: number;
  spread: number;
  startVelocity: number;
  decay: number;
  origin: { x: number; y: number };
  gravity?: number;
  ticks?: number;
  colors?: string[];
}) {
  if (typeof window === "undefined" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const canvas = document.createElement("canvas");
  Object.assign(canvas.style, { position: "fixed", top: "0px", left: "0px", pointerEvents: "none", zIndex: "100" });
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas.remove();

  const angle = (90 * Math.PI) / 180;
  const spreadRad = (spread * Math.PI) / 180;
  let particles: Particle[] = Array.from({ length: particleCount }, (_, i) => ({
    x: origin.x * canvas.width,
    y: origin.y * canvas.height,
    wobble: Math.random() * 10,
    velocity: startVelocity * 0.5 + Math.random() * startVelocity,
    angle2D: -angle + (0.5 * spreadRad - Math.random() * spreadRad),
    tiltAngle: Math.random() * Math.PI,
    color: hexToRgb(colors[(particleCount - 1 - i) % colors.length]),
    shape: Math.random() < 0.5 ? "circle" : "square",
    tick: 0,
    random: Math.random() + 5,
    tiltSin: 0,
    tiltCos: 0,
    wobbleX: 0,
    wobbleY: 0,
  }));

  const update = (p: Particle) => {
    p.x += Math.cos(p.angle2D) * p.velocity;
    p.y += Math.sin(p.angle2D) * p.velocity + 3 * gravity;
    p.wobble += 0.1;
    p.velocity *= decay;
    p.tiltAngle += 0.1;
    p.tiltSin = Math.sin(p.tiltAngle);
    p.tiltCos = Math.cos(p.tiltAngle);
    p.random = Math.random() + 5;
    p.wobbleX = p.x + 10 * Math.cos(p.wobble);
    p.wobbleY = p.y + 10 * Math.sin(p.wobble);
    const progress = p.tick++ / ticks;
    const x1 = p.x + p.random * p.tiltCos;
    const y1 = p.y + p.random * p.tiltSin;
    const x2 = p.wobbleX + p.random * p.tiltCos;
    const y2 = p.wobbleY + p.random * p.tiltSin;
    ctx.fillStyle = `rgba(${p.color[0]}, ${p.color[1]}, ${p.color[2]}, ${1 - progress})`;
    ctx.beginPath();
    if (p.shape === "circle") {
      ctx.ellipse(p.x, p.y, Math.abs(x2 - x1) * 0.6, Math.abs(y2 - y1) * 0.6, (Math.PI / 10) * p.wobble, 0, 2 * Math.PI);
    } else {
      ctx.moveTo(Math.floor(p.x), Math.floor(p.y));
      ctx.lineTo(Math.floor(p.wobbleX), Math.floor(y1));
      ctx.lineTo(Math.floor(x2), Math.floor(y2));
      ctx.lineTo(Math.floor(x1), Math.floor(p.wobbleY));
    }
    ctx.closePath();
    ctx.fill();
    return p.tick < ticks;
  };

  const frame = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(update);
    if (particles.length) requestAnimationFrame(frame);
    else canvas.remove();
  };
  requestAnimationFrame(frame);
}
