'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Embers } from './Embers';
import { SpriteAnimation } from './SpriteAnimation';
import { RONIN, type RoninAnim } from './sheets';

/**
 * The character in a panel: loops `base` (a one-shot like `slash` loops too when it is
 * the base), with edition-coloured embers around him. He strikes once when he scrolls
 * into view and whenever his panel (or, outside a panel, his frame) is hovered.
 */
export function SpriteActor({ base = 'idle', className, label }: { base?: RoninAnim; className?: string; label?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState<RoninAnim>(base);
  const [strikes, setStrikes] = useState(0); // replays the spark burst

  const strike = useCallback(() => {
    setStrikes((n) => n + 1);
    setAnim((a) => (a === base && RONIN.animations[a].loop ? 'slash' : a));
  }, [base]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const host = el.closest('.panel') ?? el.parentElement;
    host?.addEventListener('mouseenter', strike);

    let seen = false;
    const io =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            ([e]) => {
              if (e.isIntersecting && !seen) strike();
              seen = e.isIntersecting;
            },
            { threshold: 0.3 },
          );
    io?.observe(el);
    return () => {
      host?.removeEventListener('mouseenter', strike);
      io?.disconnect();
    };
  }, [strike]);

  const looping = anim === base;
  return (
    <div ref={ref} className={`relative flex items-end justify-center ${className ?? ''}`}>
      <Embers burst={anim === 'slash'} burstKey={strikes} />
      <SpriteAnimation
        sheet={RONIN}
        anim={anim}
        loop={looping || undefined}
        onEnd={() => setAnim(base)}
        onLoop={base === 'slash' ? () => setStrikes((n) => n + 1) : undefined}
        className="glow relative z-[1] h-full"
        label={label}
      />
    </div>
  );
}
