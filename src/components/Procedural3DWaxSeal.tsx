import React, { useEffect, useRef } from 'react';

interface Procedural3DWaxSealProps {
  monogram?: string;
  isBreaking?: boolean;
  lightAngleDeg?: number;
  onClick?: () => void;
  className?: string;
}

/**
 * Renders a physically lit 3D Champagne-Gold & Bronze Wax Seal using a procedural
 * heightmap + per-pixel surface normal (dH/dx, dH/dy) Lambertian & Phong specular shader
 * on an HTML5 2D Canvas, mounted on a 3D extruded disc.
 */
export const Procedural3DWaxSeal: React.FC<Procedural3DWaxSealProps> = ({
  monogram = 'A&K',
  isBreaking = false,
  lightAngleDeg = -45,
  onClick,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const size = 220;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Step 1: Build an offscreen heightmap canvas for the 3D wax stamp relief
    const hCanvas = document.createElement('canvas');
    hCanvas.width = size;
    hCanvas.height = size;
    const hCtx = hCanvas.getContext('2d');
    if (!hCtx) return;

    const cx = size / 2;
    const cy = size / 2;

    hCtx.clearRect(0, 0, size, size);

    // 1A. Organic hand-poured outer wax blob silhouette
    hCtx.save();
    hCtx.beginPath();
    const lobes = 14;
    for (let i = 0; i <= 360; i += 2) {
      const rad = (i * Math.PI) / 180;
      const organicWave =
        Math.sin(rad * lobes) * 2.2 +
        Math.cos(rad * 5 + 0.8) * 3.1 +
        Math.sin(rad * 3 - 0.4) * 2.4;
      const r = 92 + organicWave;
      const x = cx + Math.cos(rad) * r;
      const y = cy + Math.sin(rad) * r;
      if (i === 0) hCtx.moveTo(x, y);
      else hCtx.lineTo(x, y);
    }
    hCtx.closePath();

    // Radial height profile for the outer pillowed wax rim (bright = high elevation)
    const rimGrad = hCtx.createRadialGradient(cx, cy, 52, cx, cy, 98);
    rimGrad.addColorStop(0, 'rgb(95, 95, 95)');
    rimGrad.addColorStop(0.58, 'rgb(95, 95, 95)');
    rimGrad.addColorStop(0.76, 'rgb(245, 245, 245)');
    rimGrad.addColorStop(0.91, 'rgb(190, 190, 190)');
    rimGrad.addColorStop(1, 'rgb(20, 20, 20)');
    hCtx.fillStyle = rimGrad;
    hCtx.fill();
    hCtx.restore();

    // 1B. Inner stamped brass die ring (raised double ridge)
    hCtx.strokeStyle = 'rgb(235, 235, 235)';
    hCtx.lineWidth = 4.5;
    hCtx.beginPath();
    hCtx.arc(cx, cy, 62, 0, Math.PI * 2);
    hCtx.stroke();

    hCtx.strokeStyle = 'rgb(205, 205, 205)';
    hCtx.lineWidth = 1.8;
    hCtx.beginPath();
    hCtx.arc(cx, cy, 55, 0, Math.PI * 2);
    hCtx.stroke();

    // 1C. Raised Christian Cross & Botanical Star on the stamp face
    hCtx.strokeStyle = 'rgb(235, 235, 235)';
    hCtx.lineWidth = 2.4;
    hCtx.lineCap = 'round';
    hCtx.beginPath();
    hCtx.moveTo(cx, cy - 44);
    hCtx.lineTo(cx, cy - 31);
    hCtx.moveTo(cx - 5, cy - 39);
    hCtx.lineTo(cx + 5, cy - 39);
    hCtx.stroke();

    // Lower botanical flourish inside stamp
    hCtx.beginPath();
    hCtx.arc(cx, cy + 38, 12, Math.PI * 1.15, Math.PI * 1.85);
    hCtx.stroke();

    // 1D. Deeply embossed raised "A&K" Monogram in the center
    hCtx.fillStyle = 'rgb(250, 250, 250)';
    hCtx.font = '600 40px "Cormorant Garamond", Georgia, serif';
    hCtx.textAlign = 'center';
    hCtx.textBaseline = 'middle';
    hCtx.fillText(monogram, cx, cy + 3);

    // Step 2: Compute per-pixel 3D normals and shade with metallic champagne-bronze PBR-style lighting
    const hData = hCtx.getImageData(0, 0, size, size).data;
    const outImg = ctx.createImageData(size, size);
    const out = outImg.data;

    const radLight = (lightAngleDeg * Math.PI) / 180;
    const lx = Math.cos(radLight) * 0.62;
    const ly = Math.sin(radLight) * 0.62;
    const lz = 0.78;

    // Half-vector for specular highlight (viewer at 0, 0, 1)
    const hx = lx;
    const hy = ly;
    const hz = lz + 1.0;
    const hLen = Math.hypot(hx, hy, hz);
    const nhx = hx / hLen;
    const nhy = hy / hLen;
    const nhz = hz / hLen;

    const heightAt = (x: number, y: number): number => {
      const clampedX = Math.max(0, Math.min(size - 1, x));
      const clampedY = Math.max(0, Math.min(size - 1, y));
      return hData[(clampedY * size + clampedX) * 4] / 255;
    };

    for (let y = 1; y < size - 1; y++) {
      for (let x = 1; x < size - 1; x++) {
        const idx = (y * size + x) * 4;
        const alpha = hData[idx + 3];
        if (alpha < 12) {
          out[idx + 3] = 0;
          continue;
        }

        // Sobel-style height gradient for smooth 3D surface normals
        const hL = heightAt(x - 1, y);
        const hR = heightAt(x + 1, y);
        const hU = heightAt(x, y - 1);
        const hD = heightAt(x, y + 1);
        const hC = heightAt(x, y);

        const bumpStrength = 9.5;
        const nxRaw = (hL - hR) * bumpStrength;
        const nyRaw = (hU - hD) * bumpStrength;
        const nzRaw = 1.0;
        const nLen = Math.hypot(nxRaw, nyRaw, nzRaw);
        const nx = nxRaw / nLen;
        const ny = nyRaw / nLen;
        const nz = nzRaw / nLen;

        // Diffuse Lambertian term
        const ndotl = Math.max(0, nx * lx + ny * ly + nz * lz);

        // Blinn-Phong metallic specular highlight
        const ndoth = Math.max(0, nx * nhx + ny * nhy + nz * nhz);
        const specBroad = Math.pow(ndoth, 18) * 0.52;
        const specSharp = Math.pow(ndoth, 64) * 0.72;

        // Ambient occlusion in deeper recesses
        const ao = 0.58 + 0.42 * hC;

        // Base metallic antique champagne-gold wax color (#B68E49)
        const baseR = 178;
        const baseG = 138;
        const baseB = 72;

        const shade = (0.32 + 0.78 * ndotl) * ao;
        const r = Math.min(255, baseR * shade + specBroad * 245 + specSharp * 255);
        const g = Math.min(255, baseG * shade + specBroad * 222 + specSharp * 250);
        const b = Math.min(255, baseB * shade + specBroad * 165 + specSharp * 215);

        out[idx] = r;
        out[idx + 1] = g;
        out[idx + 2] = b;
        out[idx + 3] = alpha;
      }
    }

    ctx.putImageData(outImg, 0, 0);
  }, [monogram, lightAngleDeg]);

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label="Tap wax seal to break the seal and open your wedding invitation"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`relative w-24 h-24 sm:w-26 sm:h-26 flex items-center justify-center cursor-pointer select-none preserve-3d group ${className}`}
    >
      {/* Physical 3D Contact Shadow Cast by the Raised Wax Seal onto the Envelope Flap */}
      <div
        className={`pointer-events-none absolute inset-1.5 rounded-full bg-[#2A1B0E]/55 blur-[6px] transition-all duration-500 ${
          isBreaking
            ? 'translate-y-4 scale-90 opacity-30'
            : 'translate-y-2 scale-100 opacity-85'
        }`}
        style={{ transform: 'translateZ(-5px)' }}
        aria-hidden="true"
      />

      {/* 3D Extruded Wax Rim Thickness Layer */}
      <div
        className="pointer-events-none absolute inset-2 rounded-full bg-[#5C4119]"
        style={{ transform: 'translateZ(-2px)' }}
        aria-hidden="true"
      />

      {/* Normal-Mapped 3D Wax Seal Canvas */}
      <canvas
        ref={canvasRef}
        className="relative w-full h-full block transition-transform duration-300 group-hover:scale-[1.03] group-active:scale-[0.95]"
        style={{ transform: 'translateZ(2px)' }}
      />

      {/* Seal Release Glint Line during Stage B ("Break the seal") */}
      {isBreaking && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full overflow-hidden"
          style={{ transform: 'translateZ(4px)' }}
          aria-hidden="true"
        >
          <div className="w-2/3 h-full bg-gradient-to-r from-transparent via-[#FFFDF7]/90 to-transparent animate-gold-sweep" />
        </div>
      )}
    </div>
  );
};
