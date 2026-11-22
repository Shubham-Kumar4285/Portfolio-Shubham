import type { CSSProperties } from 'react';

/** Small seeded PRNG so server and client render the same particles (no hydration mismatch). */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Props = {
  /** Play a one-off spark burst (e.g. while attacking). Change `burstKey` to replay it. */
  burst?: boolean;
  burstKey?: number;
};

/**
 * Pixel embers that drift up around a sprite, plus glowing floor traces.
 * Pure CSS; the colour comes from `--ember` (styles/fx.css), so it follows the edition:
 * violet by day, blood red at night.
 */
const EMBERS = 18;

export function Embers({ burst = false, burstKey = 0 }: Props) {
  const r = rng(7);
  const embers = Array.from({ length: EMBERS }, () => {
    const d = 3.5 + r() * 4; // seconds per rise
    return {
      '--x': `${8 + r() * 84}%`,
      '--y': `${r() * 55}%`,
      '--s': `${r() > 0.7 ? 7 : 4}px`,
      '--a': (0.5 + r() * 0.5).toFixed(2),
      '--dx': `${(r() - 0.5) * 40}px`,
      '--rise': `${90 + r() * 140}px`,
      '--d': `${d.toFixed(2)}s`,
      '--delay': `${(-r() * d).toFixed(2)}s`, // negative: already mid-flight on load
    };
  });
  const sparks = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2 + r() * 0.4;
    const dist = 60 + r() * 70;
    return {
      '--dx': `${Math.cos(angle) * dist}px`,
      '--dy': `${Math.sin(angle) * dist * 0.7}px`,
      '--s': `${r() > 0.5 ? 6 : 3}px`,
      '--delay': `${(r() * 0.12).toFixed(2)}s`,
    };
  });

  return (
    <div aria-hidden="true" className="embers">
      <i className="ember-floor" />
      {embers.map((s, i) => (
        <i key={i} className="ember" style={s as CSSProperties} />
      ))}
      {burst && (
        <span key={burstKey} className="ember-burst">
          {sparks.map((s, i) => (
            <i key={i} className="spark" style={s as CSSProperties} />
          ))}
        </span>
      )}
    </div>
  );
}
